# Map Annotator

A dependency-free static app for collecting human point and route judgments on game-map images. The production corpus covers the 30 Competitive Role Queue 5v5 maps dated 2026-07-21 and exactly Cassidy, Hanzo, and Tracer.

The 90 selectable annotation sets (30 maps × 3 heroes) each contain four prompts, for 360 tasks total. Prompts ask people to select geometry visible in the corresponding map image; they are collection prompts, not audited recommendations. Nineteen image bases are overhead, composite-layout, or aerial views; eleven are scenic/loading-screen views, so no prompt assumes unseen geometry.

## Run

Serve this directory with any static file server, for example:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080/`. Live reads and writes require an origin accepted by the existing AnyCors configuration. The browser uses:

```text
https://anycors.sirstoke.me/https://postgrest.sirstoke.me/map_annotations
```

## Annotation data and assets

[`data/annotation-sets.js`](data/annotation-sets.js) is a dependency-free browser/CommonJS module containing the generated annotation sets. Each set selects one immutable `maps/<map-slug>-2026-07-22.webp` image and has stable semantic task IDs. The selectors retain map, hero, and mode selection; Previous and Next navigate the four tasks. Image source, basis, and integrity information is recorded in [`docs/map-image-provenance-2026-07-22.md`](docs/map-image-provenance-2026-07-22.md).

Point tasks save immediately. Route tasks collect ordered waypoints locally, require at least two points, and save only when **Save route** is pressed. Existing PostgREST load/upsert behavior is unchanged. Rows are keyed by:

```text
(map_id, map_version, hero_id, mode_id, task_id)
```

The `points jsonb` field is an ordered nonempty array of normalized `{x, y}` coordinates. See [`sql/schema.sql`](sql/schema.sql) for a fresh database and [`sql/migrate-points-jsonb.sql`](sql/migrate-points-jsonb.sql) for the idempotent legacy migration.

## Test

Run the complete local validation suite with:

```sh
node --test
find . -type f -name '*.js' -not -path './.git/*' -exec node --check {} \;
sh -n deploy/update-static.sh
git diff --check
```

The Node suite verifies corpus counts and IDs, metadata, all 30 nonempty dated images, removal of the former catalog, database contracts, rendering, and atomic deployment ordering. The PostgreSQL integration test skips explicitly when Docker is unavailable.

## Render annotations

The deterministic Pillow renderer in [`tools/render_annotations.py`](tools/render_annotations.py) reads saved PostgREST rows and draws point/route annotations without modifying its source image. Use `--help` for its filters and paths. Do not run it against a live endpoint until that endpoint uses the compatible `points` schema.

## Deploy

[`deploy/update-static.sh`](deploy/update-static.sh) maintains a locked checkout, validates every required runtime file and all 30 dated map images, installs commit-versioned CSS and JavaScript plus the image tree, then atomically publishes `index.html` last. The repository index retains unversioned paths for local serving. Older immutable assets are retained.

The updater defaults to `/var/data/static`, the public `main` branch, and the repository URL declared in the script. Override `STATIC_ROOT`, `REPO_URL`, or `BRANCH` explicitly when needed. No deployment is performed by the test suite.
