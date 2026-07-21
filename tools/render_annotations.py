#!/usr/bin/env python3
"""Fetch public map annotations and render deterministic markers over a map copy."""

from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from PIL import Image, ImageDraw, ImageFont


REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_ENDPOINT = "https://postgrest.sirstoke.me/map_annotations"
DEFAULT_MAP = REPOSITORY_ROOT / "maps" / "blizzard-world-2025-11-18.webp"
DEFAULT_OUTPUT = REPOSITORY_ROOT / "renders" / "blizzard-world-cassidy-attack.png"
DEFAULT_MAP_SHA256 = "adb3bd467550a0ffcfce319c054dca2c3b8dd1c0e3171159cf12e6f2e16ecbd3"
MARKER_FILL = (226, 38, 54)
MARKER_RADIUS = 16


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Render filtered public PostgREST annotations over an immutable WebP."
    )
    parser.add_argument("--endpoint", default=DEFAULT_ENDPOINT)
    parser.add_argument("--map-id", default="blizzard-world")
    parser.add_argument("--map-version", default="2025-11-18")
    parser.add_argument("--hero-id", default="cassidy")
    parser.add_argument("--mode-id", default="attack")
    parser.add_argument("--source-map", type=Path, default=DEFAULT_MAP)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument(
        "--expected-map-sha256",
        default=DEFAULT_MAP_SHA256,
        help="fail before rendering if the source map hash differs; use an empty value to disable",
    )
    return parser.parse_args()


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def fetch_rows(args: argparse.Namespace) -> list[dict[str, Any]]:
    query = urlencode(
        {
            "map_id": f"eq.{args.map_id}",
            "map_version": f"eq.{args.map_version}",
            "hero_id": f"eq.{args.hero_id}",
            "mode_id": f"eq.{args.mode_id}",
            "select": "task_id,x,y",
            "order": "task_id.asc",
        }
    )
    request = Request(
        f"{args.endpoint}?{query}",
        headers={"Accept": "application/json", "User-Agent": "map-annotator-renderer/1"},
    )
    with urlopen(request, timeout=30) as response:
        payload = json.load(response)

    if not isinstance(payload, list):
        raise ValueError("PostgREST response must be a JSON array")

    rows: list[dict[str, Any]] = []
    task_ids: set[str] = set()
    for raw_row in payload:
        if not isinstance(raw_row, dict):
            raise ValueError("every annotation must be a JSON object")
        task_id = raw_row.get("task_id")
        if not isinstance(task_id, str) or not task_id:
            raise ValueError("every annotation must have a non-empty task_id")
        if task_id in task_ids:
            raise ValueError(f"duplicate task_id in response: {task_id}")
        task_ids.add(task_id)

        x = float(raw_row.get("x"))
        y = float(raw_row.get("y"))
        if not math.isfinite(x) or not math.isfinite(y) or not (0 <= x <= 1 and 0 <= y <= 1):
            raise ValueError(f"coordinates for {task_id} must be finite values from 0 through 1")
        rows.append({"task_id": task_id, "x": x, "y": y})

    return sorted(rows, key=lambda row: row["task_id"])


def pixel_point(row: dict[str, Any], width: int, height: int) -> tuple[int, int]:
    return round(row["x"] * (width - 1)), round(row["y"] * (height - 1))


def draw_legend(image: Image.Image, rows: list[dict[str, Any]], font: ImageFont.ImageFont) -> None:
    draw = ImageDraw.Draw(image, "RGBA")
    entries = ["LIVE ANNOTATIONS"] + [f"{number}  {row['task_id']}" for number, row in enumerate(rows, 1)]
    padding = 10
    line_height = 19
    text_width = max(draw.textbbox((0, 0), entry, font=font)[2] for entry in entries)
    panel_width = text_width + padding * 2
    panel_height = line_height * len(entries) + padding * 2
    draw.rounded_rectangle(
        (10, 10, 10 + panel_width, 10 + panel_height),
        radius=7,
        fill=(9, 18, 25, 220),
        outline=(255, 255, 255, 205),
        width=1,
    )
    for line, entry in enumerate(entries):
        color = (255, 255, 255, 255) if line == 0 else (232, 240, 244, 255)
        draw.text((10 + padding, 10 + padding + line * line_height), entry, font=font, fill=color)


def draw_markers(
    image: Image.Image,
    rows: list[dict[str, Any]],
    marker_font: ImageFont.ImageFont,
) -> list[tuple[str, int, int]]:
    width, height = image.size
    draw = ImageDraw.Draw(image)
    points: list[tuple[str, int, int]] = []
    for number, row in enumerate(rows, 1):
        x, y = pixel_point(row, width, height)
        points.append((row["task_id"], x, y))
        radius = MARKER_RADIUS
        draw.ellipse(
            (x - radius - 3, y - radius - 3, x + radius + 3, y + radius + 3),
            fill=(23, 28, 33),
        )
        draw.ellipse(
            (x - radius, y - radius, x + radius, y + radius),
            fill=MARKER_FILL,
            outline=(255, 255, 255),
            width=3,
        )
        draw.text(
            (x, y),
            str(number),
            anchor="mm",
            font=marker_font,
            fill=(255, 255, 255),
            stroke_width=1,
            stroke_fill=(23, 28, 33),
        )
    return points


def main() -> None:
    args = parse_args()
    source_map = args.source_map.resolve()
    output = args.output.resolve()
    if source_map == output:
        raise ValueError("output must differ from the immutable source map")

    source_hash = sha256(source_map)
    if args.expected_map_sha256 and source_hash != args.expected_map_sha256:
        raise ValueError(
            f"source map SHA-256 is {source_hash}, expected {args.expected_map_sha256}"
        )

    rows = fetch_rows(args)
    if not rows:
        raise ValueError("the selected filters returned no annotations")

    with Image.open(source_map) as opened:
        image = opened.convert("RGB")
    width, height = image.size
    legend_font = ImageFont.load_default(size=14)
    marker_font = ImageFont.load_default(size=18)
    draw_legend(image, rows, legend_font)
    points = draw_markers(image, rows, marker_font)

    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output, format="PNG", optimize=False, compress_level=9)

    print(f"Fetched and rendered {len(rows)} annotation(s) to {output}")
    print(f"Source map: {width}x{height}, SHA-256 {source_hash}")
    for task_id, x, y in points:
        print(f"{task_id}: ({x}, {y})")


if __name__ == "__main__":
    main()
