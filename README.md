# Map Annotator

A dependency-free static app for collecting human point and route judgments on game-map images. Metadata retains the full 30-map Competitive Role Queue 5v5 pool dated 2026-07-21 and exactly Cassidy, Hanzo, and Tracer.

The reviewed imagery gate currently makes 17 maps selectable. The evidence-backed corpus contains 21 map/hero sets and 25 tasks: Cassidy has 17 maps and 17 tasks, Hanzo has 3 maps and 5 tasks, and Tracer has 1 map and 3 tasks. Unavailable map/hero combinations are omitted rather than filled with blind prompts. The other 13 maps remain explicit pending metadata and cannot produce a prompt. Every selectable image is a current, true overhead MapSpots capture; Control maps use labeled three-stage composites.

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

[`data/annotation-sets.js`](data/annotation-sets.js) is a dependency-free browser/CommonJS module containing full-pool imagery metadata plus annotation sets derived only from ready maps. Each set selects one immutable `maps/<map-slug>-2026-07-22-r2.webp` image and has stable semantic task IDs. The selectors retain map, hero, and mode selection; Previous and Next navigate the available tasks. The live corpus is documented in the [`production prompt audit`](docs/production-prompt-audit-2026-07-22.md). Current production imagery status is recorded in [`docs/map-image-provenance-2026-07-22.md`](docs/map-image-provenance-2026-07-22.md); the capture handoff for missing maps is in [`docs/manual-overhead-capture-spec.md`](docs/manual-overhead-capture-spec.md).

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

The Node suite verifies the 30-record pool, 17/13 imagery gate, 21 map/hero sets and 25 tasks, r2-only image references, database contracts, rendering, and atomic deployment ordering. The PostgreSQL integration test skips explicitly when Docker is unavailable.

## Render annotations

The deterministic Pillow renderer in [`tools/render_annotations.py`](tools/render_annotations.py) reads saved PostgREST rows and draws point/route annotations without modifying its source image. Use `--help` for its filters and paths. Do not run it against a live endpoint until that endpoint uses the compatible `points` schema.

## Deploy

[`deploy/update-static.sh`](deploy/update-static.sh) maintains a locked checkout, validates the runtime files and 17 ready r2 map images, installs commit-versioned CSS and JavaScript plus only those ready images, then atomically publishes `index.html` last. The repository index retains unversioned paths for local serving. Existing versioned JavaScript assets remain immutable.

The updater defaults to `/var/data/static`, the public `main` branch, and the repository URL declared in the script. Override `STATIC_ROOT`, `REPO_URL`, or `BRANCH` explicitly when needed. No deployment is performed by the test suite.
