# Map Annotator

A dependency-free static app for saving one normalized map point per prompt. The initial annotation set is Blizzard World / Cassidy / Attack on map revision `2025-11-18`.

## Run

Serve this directory with any static file server, for example:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080/` to inspect the UI. Live reads and writes must run from an origin accepted by the existing AnyCors configuration, such as the deployed `https://static.sirstoke.me/map-annotator/` URL.

The browser connects directly to:

```text
https://anycors.sirstoke.me/https://postgrest.sirstoke.me/map_annotations
```

The PostgREST `map_annotations` table and its `web_anon` select/insert/update grants must already exist as described in the approved plan.

## Deploy

Install the versioned deployment script from the repository root. This SSH command copies it directly to the path used by the `hermes-media` account on `daedalus`:

```sh
ssh hermes-media@daedalus 'install -m 0755 /dev/stdin /var/data/static/update-map-annotator.sh' < deploy/update-static.sh
```

Run a deployment non-interactively over SSH with:

```sh
ssh hermes-media@daedalus '/var/data/static/update-map-annotator.sh'
```

An autonomous runner such as cron or a service timer should invoke the same absolute command, with no working-directory setup required:

```sh
/var/data/static/update-map-annotator.sh
```

The script defaults to the public `main` branch of `https://github.com/aghanim-bot/map-annotator.git`. It keeps its locked checkout in `/var/data/static/.deploy/map-annotator` and publishes only `index.html`, `style.css`, `app.js`, `maps/`, and `renders/` when that directory exists. The public `/var/data/static/map-annotator` directory is not a Git checkout, and unrelated files there are left in place. Override a deployment explicitly with environment variables, for example:

```sh
STATIC_ROOT=/srv/static REPO_URL=https://github.com/aghanim-bot/map-annotator.git BRANCH=main /var/data/static/update-map-annotator.sh
```

## Add annotation sets

Add map assets under `maps/`, then add an object to `annotationSets` in `app.js`. Each map revision, hero, and mode combination needs stable IDs and at least one prompt. Increment `mapVersion` whenever the map image or geometry changes; saved coordinates are loaded only for an exact map ID, map version, hero, and mode match.

The source map is copied without transformation as `maps/blizzard-world-2025-11-18.webp` (SHA-256: `adb3bd467550a0ffcfce319c054dca2c3b8dd1c0e3171159cf12e6f2e16ecbd3`).

## Render live annotations

The repository renderer reads the same public PostgREST table directly, filters it to Blizzard World / Cassidy / Attack by default, and draws the returned points over an in-memory copy of the WebP:

```sh
uv run --with pillow tools/render_annotations.py
```

The default output is `renders/blizzard-world-cassidy-attack.png`. For the same source image and response rows, markers and the compact task-ID legend are rendered deterministically in sorted task-ID order. Normalized coordinates use `round(x * (width - 1))` and `round(y * (height - 1))`. The tool refuses to overwrite the source map and verifies its documented SHA-256 before rendering; it does not use generative image editing or require credentials. Run `uv run --with pillow tools/render_annotations.py --help` for filter, endpoint, input, and output overrides.
