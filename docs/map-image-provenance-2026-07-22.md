# Production map-image provenance — 2026-07-22 r2

Production annotation is gated to 17 reviewed MapSpots assets generated on 2026-07-22. They show current-build geometry from a true near-orthographic overhead view, with no HUD or player markers. Control-map assets are labeled composites containing all three stages. These coordinate surfaces support human collection prompts; they do not establish strategic correctness.

## Ready production assets

Busan, Colosseo, Dorado, Esperança, Havana, Ilios, King's Row, Lijiang Tower, Midtown, Nepal, New Queen Street, Numbani, Oasis, Runasapi, Samoa, Shambali Monastery, and Suravasa use `maps/<slug>-2026-07-22-r2.webp`.

The 17 r2 files are the only map images shipped by the current repository and the only images referenced by annotation sets. Their source captures came from MapSpots (`https://mapspots.net/maps/...`); 29 decoded source files were visually reviewed, and the six Control maps were assembled into labeled three-stage composites on 2026-07-22. Original downloaded captures and the exact source manifest are retained outside the repository at `/opt/data/annotated-maps/mapspots-overhead-20260722/`.

## Awaiting current overhead captures

Aatlis, Antarctic Peninsula, Blizzard World, Circuit Royal, Eichenwalde, Hollywood, Junkertown, Neon Junction, New Junk City, Paraíso, Rialto, Route 66, and Watchpoint: Gibraltar remain in pool metadata with `imageryStatus: "pending"`. They are not selectable, have no generated annotation sets, and are not deployed.

Earlier audit documents describe historical candidates and must not be read as current production approval. The required handoff for completing pending maps is [`manual-overhead-capture-spec.md`](manual-overhead-capture-spec.md).
