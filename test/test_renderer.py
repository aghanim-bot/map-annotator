import json
import unittest
from pathlib import Path
from unittest.mock import patch

from PIL import Image, ImageFont

from tools.render_annotations import draw_annotations, draw_legend, parse_rows


FIXTURE = Path(__file__).parent / "fixtures" / "annotations.json"


class RendererTests(unittest.TestCase):
    def test_parse_rows_reads_ordered_jsonb_point_arrays(self) -> None:
        payload = json.loads(FIXTURE.read_text(encoding="utf-8"))

        self.assertEqual(
            parse_rows(payload),
            [
                {"task_id": "a-single-point", "points": [{"x": 0.1, "y": 0.2}]},
                {
                    "task_id": "b-right-route",
                    "points": [
                        {"x": 0.2, "y": 0.3},
                        {"x": 0.5, "y": 0.6},
                        {"x": 0.8, "y": 0.7},
                    ],
                },
            ],
        )

        malformed = [
            {"task_id": "empty", "points": []},
            {"task_id": "extra", "points": [{"x": 0.1, "y": 0.2, "z": 0.3}]},
            {"task_id": "range", "points": [{"x": 1.1, "y": 0.2}]},
        ]
        for row in malformed:
            with self.subTest(task_id=row["task_id"]):
                with self.assertRaises(ValueError):
                    parse_rows([row])

    def test_draw_annotations_renders_single_points_and_ordered_routes(self) -> None:
        rows = parse_rows(json.loads(FIXTURE.read_text(encoding="utf-8")))
        image = Image.new("RGB", (101, 101), (255, 255, 255))

        rendered = draw_annotations(image, rows, ImageFont.load_default(size=12))

        self.assertEqual(
            rendered,
            [
                ("a-single-point", 1, 10, 20),
                ("b-right-route", 1, 20, 30),
                ("b-right-route", 2, 50, 60),
                ("b-right-route", 3, 80, 70),
            ],
        )
        self.assertEqual(image.getpixel((35, 45)), (255, 210, 74))

    def test_multiple_routes_get_visible_ids_tied_to_sorted_task_order(self) -> None:
        rows = parse_rows(
            [
                {
                    "task_id": "z-route",
                    "points": [{"x": 0.7, "y": 0.7}, {"x": 0.8, "y": 0.8}],
                },
                {"task_id": "a-point", "points": [{"x": 0.1, "y": 0.1}]},
                {
                    "task_id": "m-route",
                    "points": [
                        {"x": 0.2, "y": 0.2},
                        {"x": 0.3, "y": 0.3},
                        {"x": 0.4, "y": 0.4},
                    ],
                },
            ]
        )
        image = Image.new("RGB", (101, 101), (255, 255, 255))
        font = ImageFont.load_default(size=12)

        class RecordingDraw:
            def __init__(self) -> None:
                self.text_calls = []

            def textbbox(self, position, text, **kwargs):
                return (0, 0, len(text) * 7, 12)

            def text(self, position, text, **kwargs):
                self.text_calls.append((position, text, kwargs))

            def rounded_rectangle(self, *args, **kwargs):
                pass

            def line(self, *args, **kwargs):
                pass

            def ellipse(self, *args, **kwargs):
                pass

        legend_draw = RecordingDraw()
        with patch("tools.render_annotations.ImageDraw.Draw", return_value=legend_draw):
            draw_legend(image, rows, font)

        self.assertEqual(
            [text for _, text, _ in legend_draw.text_calls],
            [
                "LIVE ANNOTATIONS",
                "1  a-point",
                "R2  m-route (3 waypoints)",
                "R3  z-route (2 waypoints)",
            ],
        )

        annotation_draw = RecordingDraw()
        with patch("tools.render_annotations.ImageDraw.Draw", return_value=annotation_draw):
            draw_annotations(image, rows, font)

        drawn_text = [text for _, text, _ in annotation_draw.text_calls]
        self.assertEqual([text for text in drawn_text if text.startswith("R")], ["R2", "R3"])
        self.assertEqual(drawn_text.count("1"), 3)
        self.assertEqual(drawn_text.count("2"), 2)
        self.assertEqual(drawn_text.count("3"), 1)


if __name__ == "__main__":
    unittest.main()
