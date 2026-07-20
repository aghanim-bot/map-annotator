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

## Add annotation sets

Add map assets under `maps/`, then add an object to `annotationSets` in `app.js`. Each map revision, hero, and mode combination needs stable IDs and at least one prompt. Increment `mapVersion` whenever the map image or geometry changes; saved coordinates are loaded only for an exact map ID, map version, hero, and mode match.

The source map is copied without transformation as `maps/blizzard-world-2025-11-18.webp` (SHA-256: `adb3bd467550a0ffcfce319c054dca2c3b8dd1c0e3171159cf12e6f2e16ecbd3`).
