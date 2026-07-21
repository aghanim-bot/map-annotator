# Map Annotator

A dependency-free static app for saving prompt-driven point and route annotations with normalized map coordinates. The initial annotation set is Blizzard World / Cassidy / Attack on map revision `2025-11-18`.

## Run

Serve this directory with any static file server, for example:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080/` to inspect the UI. Live reads and writes must run from an origin accepted by the existing AnyCors configuration, such as the deployed `https://static.sirstoke.me/map-annotator/` URL.

The browser connects directly to the PostgREST resource exposed from the `api` schema:

```text
https://anycors.sirstoke.me/https://postgrest.sirstoke.me/map_annotations
```

PostgREST exposes `api.map_annotations` as `/map_annotations`; the schema name does not appear in the resource URL.

## Storage

Each annotation is one row keyed by:

```text
(map_id, map_version, hero_id, mode_id, task_id)
```

The row stores `points jsonb` as an ordered, non-empty array of normalized coordinate objects. A point annotation has one element, and a route has two or more elements:

```json
[{"x": 0.1, "y": 0.2}]
```

```json
[{"x": 0.2, "y": 0.3}, {"x": 0.5, "y": 0.6}, {"x": 0.8, "y": 0.7}]
```

Waypoints are deliberately not normalized into separate database rows. The database constraint requires every element to contain only finite numeric `x` and `y` values from `0` through `1`.

For a fresh database, run [sql/schema.sql](sql/schema.sql) as the table owner in a database that already has the `web_anon` role:

```sh
psql -v ON_ERROR_STOP=1 -f sql/schema.sql
```

For the existing `api.map_annotations` table with scalar `x` and `y` columns, run [sql/migrate-points-jsonb.sql](sql/migrate-points-jsonb.sql):

```sh
psql -v ON_ERROR_STOP=1 -f sql/migrate-points-jsonb.sql
```

The migration is transactional and idempotent. It adds `points`, converts each legacy row to a one-element array, validates and makes the column required, drops `x/y`, preserves table and schema grants, and sends `NOTIFY pgrst, 'reload schema'`. Rerunning it after the columns have been dropped is safe. As with any production migration, take and verify a backup first.

## Annotation tasks

Add map assets under `maps/`, then add an object to `annotationSets` in `app.js`. Each map revision, hero, and mode combination needs stable IDs and at least one prompt. Increment `mapVersion` whenever the map image or geometry changes; saved coordinates are loaded only for an exact map ID, map version, hero, and mode match.

Existing three-value task tuples default to a point annotation:

```js
['stable-task-id', 'Click the requested location.', source]
```

Route tasks opt in with optional metadata:

```js
['stable-route-id', 'Trace the requested route.', source, { kind: 'route', minPoints: 2 }]
```

Point clicks save immediately and advance. Route clicks append ordered waypoints to a local draft. `Undo last` changes only that draft, and nothing is persisted until `Save route` is pressed with at least `minPoints` waypoints. Navigating back to a saved route loads an editable copy.

The included `a-right-rotation-route` prompt documents the right-side Point A rotation and links to the source video at `2:13:54`. All original point task IDs remain unchanged.

The source map is copied without transformation as `maps/blizzard-world-2025-11-18.webp` (SHA-256: `adb3bd467550a0ffcfce319c054dca2c3b8dd1c0e3171159cf12e6f2e16ecbd3`).

## Test

Run all dependency-free Node tests with:

```sh
node --test
```

The renderer test uses `uv run --with pillow` internally. The PostgreSQL integration test creates a disposable `postgres:17-alpine` Docker container, builds the old `api` schema with two sample rows, runs the migration twice, and checks preservation, route storage, grants, dropped columns, and rejected JSONB. If the Docker command or daemon is unavailable, that test reports an explicit skip while the SQL contract test still runs.

Useful direct checks are:

```sh
node --check annotation-model.js
node --check app.js
python3 -m py_compile tools/render_annotations.py test/test_renderer.py
sh -n deploy/update-static.sh
git diff --check
```

## Render annotations

The deterministic Pillow renderer reads `task_id,points` from the public PostgREST resource, filters it to Blizzard World / Cassidy / Attack by default, and draws the returned annotations over an in-memory copy of the WebP:

```sh
uv run --with pillow tools/render_annotations.py
```

The default output is `renders/blizzard-world-cassidy-attack.png`. For the same source image and response rows, annotations and the compact task-ID legend are rendered deterministically in sorted task-ID order. Each route gets a visible ID from that order (`R2`, for example), shown both in the legend and beside the route; its waypoints remain numbered in JSONB array order. Routes use a polyline, while one-element arrays retain single-point markers. Normalized coordinates use `round(x * (width - 1))` and `round(y * (height - 1))`.

The tool refuses to overwrite the immutable source map and verifies its documented SHA-256 before rendering. It does not use generative image editing or require credentials. Run `uv run --with pillow tools/render_annotations.py --help` for filter, endpoint, input, and output overrides. Do not run the live renderer until the endpoint uses the compatible `points` schema.

## Deploy

The updater currently installed on the server predates immutable asset publication. Before this release is deployed, manually replace that old updater with the repository version; running the old updater against this release is not mixed-version safe. This SSH command performs the required one-time replacement directly at the path used by the `hermes-media` account on `daedalus`:

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

The script defaults to the public `main` branch of `https://github.com/aghanim-bot/map-annotator.git`. It keeps its locked checkout in `/var/data/static/.deploy/map-annotator`. For each commit it first installs immutable `style.<commit>.css`, `annotation-model.<commit>.js`, and `app.<commit>.js` files, then generates an index referencing those exact filenames and atomically publishes `index.html` last. The repository index continues to reference the unversioned source files so serving the checkout locally still works. Map and optional render trees are copied without deleting existing files; older commit-versioned assets and unrelated files in the public directory are also left in place. The public `/var/data/static/map-annotator` directory is not a Git checkout. Override a deployment explicitly with environment variables, for example:

```sh
STATIC_ROOT=/srv/static REPO_URL=https://github.com/aghanim-bot/map-annotator.git BRANCH=main /var/data/static/update-map-annotator.sh
```
