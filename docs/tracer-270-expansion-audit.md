# Tracer 30-map × 3-prompt expansion audit — 2026-07-22

## Executive result

**Accepted: 90/90 required prompts. Gap: 0. All thirty maps reach 3/3.** This is an evidence audit, not a prompt proposal or production-data change. The three existing Shambali tasks are counted here only after a separate 2026-07-22 geometry-compatibility check; no production data was changed.

The ten exact local leads and the three prioritized discovery VODs were retrieved and reviewed as media, not captions alone. Fresh searches were also run for 12 uncovered maps and preserved under the new raw root. A second map-specific search retrieved and verified 15 additional metadata/caption sets and three narrow-media candidate sets; none was promoted without a retrieved media window. There are no exact Reddit comment permalinks in the acquisition.

## Scope and hard acceptance gate

The scope is exactly the 30 entries of `mapPool` in `data/annotation-sets.js`, matching `docs/competitive-5v5-scope-2026-07-21.md`. A row is accepted only when all of the following are simultaneously present:

1. an exact timestamped `https://www.youtube.com/watch?v=VIDEO&t=SECONDSs` URL or an exact Reddit comment permalink;
2. an exact source quote;
3. current-version, frame-visible, unambiguous atomic point geometry, or a continuously visible bounded route with start, direction, and endpoint;
4. map/phase/side semantics no broader than the source and pixels establish; and
5. no generic “high ground,” “flank,” “cover,” or blind selection.

`PASS`/`NARROW` in an old-source visual audit is not enough where that audit expressly withholds current-version approval. Pending-frame rows and dated geometry remain rejected.

## Local retrieve → verify → parse record

- Inspected the repository rules and inventories first: `production-prompt-audit-2026-07-22.md`, `tracer-source-cover-2026-07-21.md`, `tracer-source-segmentation-2026-07-21.md`, `tracer-visual-audit-batch1-2026-07-21.md`, `competitive-5v5-scope-2026-07-21.md`, and map-image provenance.
- Retrieved complete 720p media, info JSON, both English JSON3 tracks, and thumbnails for the eight previously caption-only leads into `/opt/data/annotated-maps/tracer-expansion-20260722/raw/leads/`. Freshly retrieved three narrow 720p Shambali windows and the Paraíso 74.760 window into that root; after the remaining two remote cuts throttled, placed the already independently verified 260.330 and 862.190 source clips in the same raw root and checksummed them there.
- Generated and independently verified per-source `SHA256SUMS`. The eight complete lead videos total about 1.9 GiB. After the complete-source review manifest was added, **all 38 checksum manifests under the audit root verify**. No retained artifact was parsed or frame-reviewed before acquisition and checksum verification.
- Decoded **60 frames per anchor at 2 fps** for 21 anchors and **80 frames per anchor** for the three Nepal anchors: **1,500 full-resolution frames** plus 24 dense sheets under `/opt/data/annotated-maps/tracer-expansion-20260722/review/`. Its 1,524-file checksum manifest verifies cleanly. The six Shambali/Paraíso clips retain their earlier dense audit and are all preserved under the new raw root.
- Ran fresh `ytsearch5` discovery for Antarctic Peninsula, Busan, Ilios, Lijiang Tower, Samoa, Circuit Royal, Havana, Rialto, Route 66, Aatlis, New Junk City, and Suravasa. Search JSON/stderr and a checksum manifest are under `raw/search/`. Retrieved complete 720p video for Ilios `cdzCPEGJEMk` and `cnGiDs0wpgg` and Rialto `kiUztEOVX8o` under `raw/media/`; all three validate and their manifest verifies. The exact map-named New Junk City result `96X2nSgD_OA` was explicitly unavailable when retrieval was attempted.
- Preserved raw YouTube result pages for Oasis, King's Row, and Paraíso under `raw/search2/`, then retrieved and verified metadata/captions for eight map-specific leads under `raw/discovery2/`. Narrow 720p media for current King's Row `uTYxMf9CrrM` and 2024 Paraíso `ioVipmP31n4`, plus narrow source-resolution media for 2026 Oasis `A6JKBR9iQYQ`, are under `raw/media2/`. The 2026 Paraíso follow-up search and metadata are under `raw/discovery3/`; low-resolution map-identification samples under `raw/scans/` proved the two current search hits were Flashpoint/Push and Hollywood/other-map false positives, not Paraíso evidence.
- Added **1,972 full-resolution 2 fps frames**, 20 dense sheets, and 16 low-resolution map-identification scan frames under `review2/` for the prioritized Ilios/Rialto anchors and the retrieved Oasis/King's Row/Paraíso windows. The 2,008-image `review2/SHA256SUMS` manifest verifies. Interrupted remote-cut artifacts failed container/content validation; they were deleted and excluded before final manifests or parsing.
- Preserved and verified three new current-source searches under `raw/discovery4/`, then retrieved complete 720p media, info JSON, and thumbnails for 2025 Rialto gameplay `EXXR_Au6bIY` and the map-chaptered 2025 Tracer blink source `ppD_KB9N29I` under `raw/media4/`. The sources were not parsed until both new raw manifests verified. Decoded **835 full-resolution frames** plus 12 dense sheets under `review3/`; its manifest verifies. The current gameplay was inspected at one-second density across all 463 seconds, and the Paraíso, Ilios, and Rialto instructional chapters at two frames per second.
- Regressed the three concrete 2023 Rialto anchors directly against the 2025-09-11 gameplay: current [64s](https://www.youtube.com/watch?v=EXXR_Au6bIY&t=64s) retains the left room's small pack, illuminated stair, lounge, columns, and street arches; current [86s](https://www.youtube.com/watch?v=EXXR_Au6bIY&t=86s) retains the Garden grass court, low walls, and same arch/angle; current [332s](https://www.youtube.com/watch?v=EXXR_Au6bIY&t=332s) retains the canal-side mega room's arched exit and interior furniture. Each promotion below cites both the original atomic Tracer evidence and this independent current-build chain.
- For every accepted dated row, compared the visible route/point against the matching 2026-07-22 MapSpots capture retained at `/opt/data/annotated-maps/mapspots-overhead-20260722/raw/`. Acceptance is limited to geometry whose entrances, corridors/edges, stairs, rooms, and endpoint remain present. This compatibility check does not add phase or side semantics.
- No unfamiliar repository code was run.

### Final-gap continuation acquisition

- Created the independent continuation root `/opt/data/annotated-maps/tracer-expansion-continuation-20260722/`; no prior raw or review artifact was overwritten.
- Ran 23 literal YouTube searches covering exact map + Tracer and map-specific gameplay, VOD review, guide, and spots terms. Preserved 46 result/stderr artifacts and verified their manifest before inspecting results.
- Retrieved and verified 11 candidate metadata/thumbnail/caption sets, then seven complete initial 720p media sources. A current Runasapi AV1 acquisition (`7fGTJ5Juv6s`) failed full random-access decoding and was rejected; three explicit H.264 replacements were acquired, checksummed, and fully decoded before parsing.
- Inspected time-indexed complete-match scans, then decoded 3,511 retained dense/coarse full-resolution review images and sheets. The continuation review manifest verifies cleanly. Aatlis and Neon Junction candidate windows were decoded at 8 fps across all promoted geometry; the three one-slot candidates received the same dense treatment.

### Complete `ppD_KB9N29I` pass

- Audited the complete 1002.541-second, 1280×720 source from the opening “Blizzard World” card through final numbered spot **#215** and the end card. The source contains 27 metadata chapters and 28 separate on-screen map cards because the combined metadata chapter `Runasapi/Survasa` contains separate “Runasapi” and misspelled on-screen “Survasa” cards.
- Decoded the complete source at 2 fps (**2,005 full-resolution frames**), then every still-incomplete map chapter at 8 fps (**4,844 full-resolution frames**). Generated 101 timestamped whole-source sheets, 18 whole-chapter sheets, and 18 dense first-window sheets under `/opt/data/annotated-maps/tracer-expansion-20260722/review4/`.
- Created `/opt/data/annotated-maps/tracer-expansion-20260722/review4/SHA256SUMS` covering every derived frame and sheet. The manifest contains **6,986 entries** and verifies cleanly. The pre-existing raw `media4/SHA256SUMS` also re-verifies, including the complete `ppD_KB9N29I.mp4` (`bb28f7a70278bfc4ed58bb5f8776ac187f7c5e5e65466c8779e2a28ed9592238`).
- Dense review confirms continuous start, aim/direction, blink, and stable landing for every newly accepted row below. Alternate inputs or later variants ending on the same landing were not counted separately. Chapters for the nine already-complete maps were reviewed in the whole-source pass but yielded no duplicate accepted rows.

## Accepted evidence ledger

| Map | Exact source and quote | Accepted concrete geometry | Current compatibility |
|---|---|---|---|
| Oasis | [40.070s](https://www.youtube.com/watch?v=C-DThafJgSc&t=40.070s) — “black is a useful flanking route here slightly on that first rotation” | Gardens: the black-marked route from the lower-right spawn-side entrance, around the outside-right edge, to the right-side point approach. | The full marked line is visible at once; the 2026 Gardens overhead retains the same outer edge, entrance, and endpoint corridor. |
| Oasis | [287.720s](https://www.youtube.com/watch?v=C-DThafJgSc&t=287.720s) — “this is still a reasonably good flank route because it's still pretty fast” | Gardens: upper spawn-side doorway, down the exterior right-side stairs/path, through the lower side passage, ending at the point-side arch. | Continuous free-camera traversal; all bounded segments match the 2026 Gardens capture. |
| Oasis | [795.760s](https://www.youtube.com/watch?v=A6JKBR9iQYQ&t=795.760s) — “Get the health pack. There you go.” | University: the small health pack in the short recessed alcove off the spawn-side outer room; only the visible pack/alcove point is retained. | Uploaded 2026-06-15 and frame-visible in current gameplay; the alcove and pack marker also align with the 2026 University overhead. Distinct from both Gardens routes. |
| Dorado | [73.860s](https://www.youtube.com/watch?v=9m465Cj7Z0E&t=73.860s) — “spawn just blinking over here and then again another blink behind the cover over to this side” | Attacker-spawn exit to the seaside outer ledge, around the corner cover, ending at the first side doorway. | Continuous first-person demonstration; spawn exit, ledge, corner, and doorway remain in the 2026 full-map capture. |
| Dorado | [172.410s](https://www.youtube.com/watch?v=9m465Cj7Z0E&t=172.410s) — “first one is up these stairs then up these stairs” | First street: lower side stairs, second stair flight, ending on the connected rooftop/high platform. | Both stair flights and rooftop connection match the 2026 capture. |
| Dorado | [249.960s](https://www.youtube.com/watch?v=9m465Cj7Z0E&t=249.960s) — “go all the way to the left then again down in here around like this” | Final interior: left doorway, down through the blue-lit lab corridor, around its inner bend, ending at the opposite orange-floor exit. | The dated first-person traversal is continuous and the same corridor/exit chain is present in the 2026 capture. |
| Shambali Monastery | [116.640s](https://www.youtube.com/watch?v=PrG4IvMNOYI&t=116.640s) — “there is the long flank route which is coming up around this back area” | Snowy road beside the red building, around its back side, through the rear door, up the stone steps, ending in the upper red room/balcony. | Rechecked against the 2026 full-map capture: exterior edge, rear door, stair volume, and balcony remain aligned. |
| Shambali Monastery | [1324.730s](https://www.youtube.com/watch?v=PrG4IvMNOYI&t=1324.730s) — “this flank window right here” | Atomic rock-wall opening above the lower cobbled passage, using only its visible angle toward the red-lit doorway. | The same rock opening, lower passage, and far doorway are visible in the 2026 capture. |
| Shambali Monastery | [1443.770s](https://www.youtube.com/watch?v=PrG4IvMNOYI&t=1443.770s) — “get from here to this mini health pack” | Green interior doorway beside the rail track, along the track-side edge, down into the lower stone passage, ending at the mini-pack ledge. | Door, track edge, lower passage, and ledge remain continuous in the 2026 capture. |
| Watchpoint: Gibraltar | [90.950s](https://www.youtube.com/watch?v=t28t0xtdpPc&t=90.950s) — “I really like this flank route because you can just get behind” | Spawn-side outer upper ledge, through the blue-lit server-room doorway and room, ending at the opposite exterior upper ledge. | Continuous traversal; both ledges and the connecting room match the 2026 full-map capture. |
| Watchpoint: Gibraltar | [210.949s](https://www.youtube.com/watch?v=t28t0xtdpPc&t=210.949s) — “we can try to take the high ground from them” | Lower server-room entrance, up the interior stairs, through the room, ending on the exterior hangar high ground. | The complete interior-to-exterior connection remains present in the 2026 capture. |
| Watchpoint: Gibraltar | [407.550s](https://www.youtube.com/watch?v=t28t0xtdpPc&t=407.550s) — “use one blink to get to this ledge and then another blink” | Hangar-side lower stair, through the small side room, onto its narrow exterior ledge, ending on the upper platform overlooking the launch area. | All traversed stairs, room, ledge, and platform match the 2026 capture. |
| King's Row | [30.840s](https://www.youtube.com/watch?v=cmpcWo-NoAM&t=30.840s) — “come up onto this balcony here blink across and then get to this point” | Hotel street entrance, up the interior stairs, across the upper rooms, through the far doorway, ending on the balcony/ledge facing Objective A street. | Continuous first-person route; hotel entry, stair, room chain, and balcony remain in the 2026 capture. |
| King's Row | [153.370s](https://www.youtube.com/watch?v=cmpcWo-NoAM&t=153.370s) — “wrap all the way around the high ground and drop down on to them” | Objective A street-side hotel doorway, through the long upper interior, ending at the rear ledge above the point-side street; no drop is included. | Doorway, interior chain, and rear ledge match the 2026 capture; the unseen drop is expressly excluded. |
| King's Row | [1159.080s](https://www.youtube.com/watch?v=uTYxMf9CrrM&t=1159.080s) — “control right room the mega room and play from here” | Final foundry: the right-side mega-pack room and its doorway angle onto the final payload lane; no route beyond the room is inferred. | The room, mega pack, doorway, and lane are visible in the 2024 source and remain aligned in the 2026 full-map capture. Distinct from both hotel routes. |
| Ilios | [119.399s](https://www.youtube.com/watch?v=cnGiDs0wpgg&t=119.399s) — “sit here and wait for the health pack” | Ruins: the small health pack beside the outer seaside column/low rectangular cover; only the visible pack-side point is retained. | The 2016 frame freezes on the exact pack and adjacent column/cover; the same outer platform, column, cover, and pack marker remain in the 2026 Ruins overhead. |
| Ilios | [702.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=702.250s) — on-screen “Ilios” chapter and “# 152” | Lighthouse: blink from the orange building's outer wooden balcony to the narrow red-brown trellis/roof ledge across the gap. | Uploaded 2025-05-19; the stage is established by the Lighthouse objective building and orange sunset geometry, and the numbered demonstration continuously shows both ledges and the landing. Distinct from Ruins. |
| Ilios | [722.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=722.250s) — on-screen “Ilios” chapter and “# 155” | Well: blink from the outer red-tile roof corner beside the lamp post to the connected white ledge facing the statue/sea side. | Uploaded 2025-05-19; white-and-blue Well geometry, the statue, sea edge, start, direction, and landing are all continuously visible. Distinct from Lighthouse and Ruins. |
| Rialto | [319.860s](https://www.youtube.com/watch?v=kiUztEOVX8o&t=319.860s) — “take the left path and take this left room” | First phase: the left-side room containing the small pack, illuminated stair, lounge seating, and three columned arches back onto the payload street. | The 2023 editor view establishes the atomic room. Independent current gameplay at [64s](https://www.youtube.com/watch?v=EXXR_Au6bIY&t=64s), uploaded 2025-09-11, visibly retains the same pack, stair, lounge, columns, and street openings. |
| Rialto | [409.020s](https://www.youtube.com/watch?v=kiUztEOVX8o&t=409.020s) — “you go and take Garden this angle is also very strong” | First phase Garden: the grass court beside the blue-pattern wall, using the low-wall arch angle back toward the payload lane. | The 2023 editor view fixes the exact court and arch. Independent current gameplay at [86s](https://www.youtube.com/watch?v=EXXR_Au6bIY&t=86s) visibly reproduces the grass court, low wall, arch, and lane angle. |
| Rialto | [620.160s](https://www.youtube.com/watch?v=kiUztEOVX8o&t=620.160s) — “taking Mega room here is very very strong” | Canal-side mega room: the pack room beside the canal, including only its arched doorway angle onto the payload street. | The 2023 Tracer frames show the pack, canal edge, room, and arch. Independent current gameplay at [332s](https://www.youtube.com/watch?v=EXXR_Au6bIY&t=332s) visibly retains the same arched exit, cabinet/lounge furniture, and payload-street opening. |
| Numbani | [50.540s](https://www.youtube.com/watch?v=_cEuKUAZ0oI&t=50.540s) — “either blink to this hallway here or I'm going to blink up” | Objective A approach: left exterior bend to the ivy-lined lower hallway entrance and its interior stair; only this demonstrated alternative. | The bounded hallway/stair alternative matches the 2026 full-map capture. |
| Numbani | [272.290s](https://www.youtube.com/watch?v=_cEuKUAZ0oI&t=272.290s) — “staircase of the Sigma building and then we have access to the high ground above it” | AXIOM/Sigma-building street doorway, up the interior stair, ending on the white balcony above the street. | Continuous demonstration; doorway, stair, and balcony remain aligned in the 2026 capture. |
| Numbani | [352.240s](https://www.youtube.com/watch?v=_cEuKUAZ0oI&t=352.240s) “come up to this high ground here and we come out this door” | Objective A outer lower entrance, through the gold-trim room and far door, ending on the curved exterior balcony. | The room-through-door balcony route matches the 2026 capture. |
| Paraíso | [260.330s](https://www.youtube.com/watch?v=jBeGrmJVVPE&t=260.330s) — “over here okay as they start pushing in” | Defense Objective A: atomic under-overpass street corner beside the rectangular column, using only its visible street angle. | The corner, column, overpass, and street angle match the 2026 full-map capture; blink/backline claims remain excluded. |
| Paraíso | [162.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=162.250s) — on-screen “Paraíso” chapter and “# 34” | Objective A approach: blink from the pale wall/planting edge to the shrub-height ledge facing the green Perímetro café and palm-lined street. | Uploaded 2025-05-19; the numbered Tracer demonstration continuously shows the exact start, direction, landing, café sign, and street. Spatially distinct from the under-overpass corner. |
| Paraíso | [202.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=202.250s) — on-screen “Paraíso” chapter and “# 40” | Final Clube Sinestesia interior: blink from the central machine-side platform onto the narrow upper rail beside the split stair. | Uploaded 2025-05-19; the club wall text, machine, stair, start platform, direction, and rail landing are continuously visible. Distinct from both Objective A points. |

### Newly accepted from the complete map-chaptered source

All rows below use the 2025-05-19 complete source. The quoted text is the exact on-screen map card and numbered overlay. Each timestamp falls inside the continuous demonstration, and the preceding/following dense frames establish the start, direction, and stable landing.

| Map | Exact source and on-screen labels | Accepted concrete blink geometry |
|---|---|---|
| Blizzard World | [5.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=5.250s) — “Blizzard World”, “# 1” | First approach: timber stair-side wall to the sloped blue awning/roof across the opening. |
| Blizzard World | [9.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=9.250s) — “Blizzard World”, “# 2” | First approach: lower wooden lip to the separate upper timber platform beside the crate. |
| Blizzard World | [12.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=12.250s) — “Blizzard World”, “# 3” | First approach: crate-side floor to the narrow crate-top/rail landing overlooking the lane. |
| Midtown | [79.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=79.250s) — “Midtown”, “# 19” | Opening station street: yellow taxi/doorway edge to the narrow station-sign ledge above the green entrance. |
| Midtown | [83.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=83.250s) — “Midtown”, “# 20” | Station interior window opening to the exterior green awning/ledge above the street. |
| Midtown | [87.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=87.250s) — “Midtown”, “# 21” | White street-vehicle roof to the separate dark facade ledge across the gap. |
| Eichenwalde | [209.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=209.250s) — “Eichenwalde”, “# 41” | Objective A approach: bridge planks to the broken stone-wall top beside the battering cart. |
| Eichenwalde | [214.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=214.250s) — “Eichenwalde”, “# 42” | Objective A: cart-side ground to the battering ram’s rounded upper barrel. |
| Eichenwalde | [217.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=217.250s) — “Eichenwalde”, “# 43” | Objective A: battering-ram side to the distinct stone corner/raised wall overlooking the point. |
| Hollywood | [239.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=239.250s) — “Hollywood”, “# 47” | Objective A street: curb beside the blue SUV to the vehicle roof. |
| Hollywood | [243.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=243.250s) — “Hollywood”, “# 48” | Objective A: orange kiosk/box top across to the narrow gray studio-wall ledge. |
| Hollywood | [247.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=247.250s) — “Hollywood”, “# 49” | Objective A: street-side orange platform to the separate gray facade lip above the poster wall. |
| Havana | [320.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=320.250s) — “Havana”, “# 66” | First street: pavement to the low café awning/roof beneath the “Café del Sol” sign. |
| Havana | [326.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=326.250s) — “Havana”, “# 67” | First street: red bus roof/upper edge to the opposite green building’s narrow balcony ledge. |
| Havana | [333.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=333.250s) — “Havana”, “# 68” | Distillery interior: lower blue-lit corridor floor to the circular machine/pipe housing ledge. |
| Junkertown | [382.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=382.250s) — “Junkertown”, “# 75” | First lane: street beside the shack to the narrow wooden building ledge. |
| Junkertown | [387.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=387.250s) — “Junkertown”, “# 76” | First lane: orange floor/doorway edge to the higher white shack-side lip. |
| Junkertown | [391.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=391.250s) — “Junkertown”, “# 77” | First lane: lower wall base to the distinct white wall-top platform overlooking the road. |
| Circuit Royal | [429.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=429.250s) — “Circuit Royal”, “# 88” | Opening hotel street: grass verge to the narrow top of the brown lamp/utility pedestal. |
| Circuit Royal | [433.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=433.250s) — “Circuit Royal”, “# 89” | Casino entrance: lower pink sign/awning edge to its raised top lip. |
| Circuit Royal | [438.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=438.250s) — “Circuit Royal”, “# 90” | Opening street: pink umbrella/awning top across to the separate hotel-balcony ledge. |
| Route 66 | [606.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=606.250s) — “Route 66”, “# 130” | Attacker-side canyon: ground beside the diner outbuilding to the low roof edge. |
| Route 66 | [610.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=610.250s) — “Route 66”, “# 131” | Canyon lane: roadside crate/rock edge to the red metal platform above it. |
| Route 66 | [614.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=614.250s) — “Route 66”, “# 132” | Canyon lane: lower red-rock ledge to the separate pale trailer/roof platform. |
| Antarctic Peninsula | [676.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=676.250s) — “Antarctic Peninsula”, “# 145” | Labs: snowy exterior ledge to the white laboratory doorway lip. |
| Antarctic Peninsula | [680.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=680.250s) — “Antarctic Peninsula”, “# 146” | Labs: lower orange-lit passage to the separate white stair/upper threshold. |
| Antarctic Peninsula | [684.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=684.250s) — “Antarctic Peninsula”, “# 147” | Sublevel: dark lower ice-cave floor to the blue ice shelf beside the doorway. |
| Lijiang Tower | [768.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=768.250s) — “Lijiang Tower”, “# 166” | Night Market: outer walkway to the curved pavilion/roof lip beside the objective building. |
| Lijiang Tower | [771.750s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=771.750s) — “Lijiang Tower”, “# 167” | Night Market: lower pavilion edge to a distinct higher curved eave. |
| Lijiang Tower | [776.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=776.250s) — “Lijiang Tower”, “# 168” | Night Market: lion-statue street to the narrow shop awning/upper wall lip. |
| Nepal | [802.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=802.250s) — “Nepal”, “# 174” | Village: outer snowy ledge to the wooden stair/bridge landing. |
| Nepal | [805.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=805.250s) — “Nepal”, “# 175” | Village: lower path beside the point to the raised wooden balcony lip. |
| Nepal | [808.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=808.250s) — “Nepal”, “# 176” | Village: central path to the distinct temple-roof corner; the on-screen instruction visibly aims at the top corner. |
| Busan | [854.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=854.250s) — “Busan”, “# 186” | MEKA Base: lower control-room floor to the narrow gray console/wall ledge. |
| Busan | [858.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=858.250s) — “Busan”, “# 187” | MEKA Base: orange interior floor to the separate white stair-rail/upper lip. |
| Busan | [862.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=862.250s) — “Busan”, “# 188” | Downtown: street-side lower cover to the white transit-building balcony ledge. |
| Samoa | [879.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=879.250s) — “Samoa”, “# 191” | Downtown: lower rooftop beside the objective to the red curved roof/upper lip. |
| Samoa | [883.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=883.250s) — “Samoa”, “# 192” | Beach: shaded doorway floor to the exterior curved veranda ledge. |
| Samoa | [886.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=886.250s) — “Samoa”, “# 193” | Beach: lower terrace to the surfboard-shaped roof ridge. |
| New Queen Street | [913.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=913.250s) — “New Queen Street”, “# 197” | Side street: blue snowbank/curb to the narrow brick sign/wall ledge. |
| New Queen Street | [918.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=918.250s) — “New Queen Street”, “# 198” | Main lane: lower street to the red-canopy building’s raised awning/high-ground lip. |
| New Queen Street | [924.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=924.250s) — “New Queen Street”, “# 199” | Robot lane: sidewalk beside the TS-1 path to the enclosed tan skybridge interior. |
| Colosseo | [940.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=940.250s) — “Colosseo”, “# 201” | Opening lane: lower red wall edge to the narrow arched-building window lip. |
| Colosseo | [944.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=944.250s) — “Colosseo”, “# 202” | Colosseum-side street: low curved cover to the separate pale arch/roof ledge. |
| Colosseo | [948.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=948.250s) — “Colosseo”, “# 203” | Central street: lower window/awning edge to the opposite narrow facade lip. |
| Esperança | [958.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=958.250s) — “Esperança”, “# 205” | Tram street: blue-tile lower wall to the raised tram/awning-side ledge. |
| Esperança | [962.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=962.250s) — “Esperança”, “# 206” | Checkered-floor interior to the separate exterior window/balcony lip above the tram lane. |
| Esperança | [965.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=965.250s) — “Esperança”, “# 207” | Garden-side lower path to the narrow planter/greenery ledge. |
| Runasapi | [973.750s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=973.750s) — “Runasapi”, “# 210” | Opening street: blue road beside the green bus to the bus roof. |
| Runasapi | [976.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=976.250s) — “Runasapi”, “# 211” | Taxi street: yellow taxi/curb to the narrow blue utility-box/wall ledge. |
| Suravasa | [980.750s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=980.750s) — on-screen misspelling “Survasa”, “# 212” | Palace courtyard: tiled lower floor to the white balustrade/landing beside the green arch. |
| Suravasa | [983.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=983.250s) — on-screen misspelling “Survasa”, “# 213” | Blue courtyard: lower stone path to the distinct upper window/terrace lip. |
| New Junk City | [988.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=988.250s) — “New Junk City”, “# 214” | Orange industrial site: lower ramp beside the crate to the narrow gray container/upper platform. |
| New Junk City | [995.250s](https://www.youtube.com/watch?v=ppD_KB9N29I&t=995.250s) — “New Junk City”, “# 215” | Blue industrial site: lower lane to the raised rail/upper walkway overlooking the objective. |

### Final-gap continuation — fresh 2026 sources

All nine rows below were acquired under the separate continuation root `/opt/data/annotated-maps/tracer-expansion-continuation-20260722/`. Search results, metadata/captions, complete media, coarse scans, and dense full-resolution frames were checksummed before review. Aatlis and Neon Junction identity is explicit in the exact source metadata; Aatlis additionally exposes the readable Station, Resort, and Town Center phase labels, while Neon Junction retains the phase-specific objective/payload HUD throughout the three windows.

| Map | Exact source and quote/on-screen label | Accepted concrete geometry | Distinctness/current identity |
|---|---|---|---|
| Aatlis | [21.500s](https://www.youtube.com/watch?v=vv5SD_NGads&t=21.500s) — on-screen/ASR “station”; metadata title “tracer gameplay \| aatlis \| 42-8” | Station phase: the short blue-tile approach into the arched portal entrance and the connected purple interior landing. | Uploaded 2026-02-26; complete 2026 gameplay and dense 8 fps frames retain start, entrance, and landing. Spatially separate from Resort and Town Center. |
| Aatlis | [373.000s](https://www.youtube.com/watch?v=vv5SD_NGads&t=373.000s) — on-screen/ASR “Resort”; metadata title “tracer gameplay \| aatlis \| 42-8” | Resort phase: the outer white-and-blue curved platform at the cylindrical building, bounded by the short stair and orange-lit side doorway. | Uploaded 2026-02-26; the readable Resort phase and continuous surrounding geometry identify this point independently of Station and Town Center. |
| Aatlis | [541.000s](https://www.youtube.com/watch?v=vv5SD_NGads&t=541.000s) — “next point. Town center.”; metadata title “tracer gameplay \| aatlis \| 42-8” | Town Center phase: the blue-lit recessed doorway/short stair beside the round white exterior building. | Uploaded 2026-02-26; the named next phase, doorway, stair, and round facade remain continuously visible. Distinct from both earlier phases. |
| Neon Junction | [8.500s](https://www.youtube.com/watch?v=WuYTnt3Wc0s&t=8.500s) — on-screen Objective A HUD; metadata title “Neon Junction - Tracer map Overwatch 2026 06 29 23 46 56” | Objective A: the white stair landing opening onto the street beside the large bee shop sign. | Uploaded 2026-06-30; exact map identity is readable in metadata and dense frames retain the stair, landing, shop facade, and Objective A state. |
| Neon Junction | [128.500s](https://www.youtube.com/watch?v=WuYTnt3Wc0s&t=128.500s) — on-screen “ESCORT THE PAYLOAD”; exact Neon Junction metadata title | Mid-payload: the pale interior doorway, short exterior stair, and landing at the rounded blue street column. | Complete 2026 match; the route is continuously visible and is spatially/phase distinct from Objective A and the final interior. |
| Neon Junction | [318.500s](https://www.youtube.com/watch?v=WuYTnt3Wc0s&t=318.500s) — on-screen “ESCORT THE PAYLOAD”; exact Neon Junction metadata title | Final phase: the orange-lit weapon-display corridor corner and its adjoining narrow side doorway. | Complete 2026 match; final payload progress, corridor, doorway, and landing remain visible across the dense window. |
| Runasapi | [334.000s](https://www.youtube.com/watch?v=fUoO2GhPqIE&t=334.000s) — on-screen small-health-pack model; metadata title “Tracer - Geekay AlphaYi CHAMP 4 Gameplay \| Runasapi” | The small health pack in the blue-trim recessed room at the base of the short exterior stair. | Uploaded 2026-02-23; complete H.264 media passed a full decode. This room/pack is neither #210’s green-bus roof nor #211’s taxi/blue-box landing. |
| Suravasa | [588.000s](https://www.youtube.com/watch?v=uQnqvp8oGHs&t=588.000s) — “Flashpoint Garden.”; metadata title “tracer gameplay \| suravasa” | Garden phase: the green outer ledge behind the low teal wall, through the curved blue-lit opening, ending on the connected objective-side path. | Uploaded 2026-02-18; dense frames show the entire bounded route. It does not land at #212’s balustrade or #213’s upper window/terrace lip. |
| New Junk City | [399.000s](https://www.youtube.com/watch?v=gstMzhbr_B8&t=399.000s) — “next flash point. The ducks.” (ASR for the readable Ducts phase); metadata title explicitly names New Junk City and Tracer | Ducts phase: the red spawn-side room, through the green-arrow exit, down the exterior lane, ending at the first purple-wall corner before the objective approach. | Uploaded 2026-02-04; start, direction, doorway, lane, and endpoint are continuously visible. The endpoint is distinct from #214’s gray-container platform and #215’s raised rail/walkway. |

## Per-map accepted count and exact blocker

| Mode | Map | Accepted | Gap to 3 | Exact blocker |
|---|---|---:|---:|---|
| Control | Antarctic Peninsula | 3 | 0 | **Complete:** current #145–147 provide three distinct, stage-identified Labs/Sublevel landings. |
| Control | Busan | 3 | 0 | **Complete:** current #186–188 provide two MEKA Base landings and a distinct Downtown landing. |
| Control | Ilios | 3 | 0 | **Complete:** the Ruins pack point plus current, stage-identified Lighthouse #152 and Well #155 blink points passed dense review. |
| Control | Lijiang Tower | 3 | 0 | **Complete:** current Night Market #166–168 are three distinct landings. |
| Control | Nepal | 3 | 0 | **Complete:** current Village #174–176 replace, rather than rehabilitate, the three rejected old coaching anchors. |
| Control | Oasis | 3 | 0 | **Complete:** two Gardens routes plus the current University recessed health-pack point passed dense review. |
| Control | Samoa | 3 | 0 | **Complete:** current #191–193 provide distinct Downtown/Beach landings. |
| Escort | Circuit Royal | 3 | 0 | **Complete:** current #88–90 provide three distinct opening-street/hotel landings. |
| Escort | Dorado | 3 | 0 | **Complete:** three continuous routes passed dense review and current compatibility. |
| Escort | Havana | 3 | 0 | **Complete:** current #66–68 provide two first-street landings and a distinct distillery landing. |
| Escort | Junkertown | 3 | 0 | **Complete:** current #75–77 replace, rather than rehabilitate, all three rejected old anchors. |
| Escort | Rialto | 3 | 0 | **Complete:** the concrete 2023 left room, Garden arch/angle, and canal-side mega room each match exact geometry independently visible in complete 2025 gameplay. |
| Escort | Route 66 | 3 | 0 | **Complete:** current #130–132 provide three distinct canyon-lane landings. |
| Escort | Shambali Monastery | 3 | 0 | **Complete:** all three dated rows passed an independent 2026 geometry check. |
| Escort | Watchpoint: Gibraltar | 3 | 0 | **Complete:** three continuous routes passed dense review and current compatibility. |
| Flashpoint | Aatlis | 3 | 0 | **Complete:** fresh 2026 gameplay provides phase-bounded Station, Resort, and Town Center points with exact metadata identity. |
| Flashpoint | New Junk City | 3 | 0 | **Complete:** the fresh 2026 Ducts route is distinct from #214 and #215. |
| Flashpoint | Suravasa | 3 | 0 | **Complete:** the fresh 2026 Garden route is distinct from #212 and #213. |
| Hybrid | Blizzard World | 3 | 0 | **Complete:** current #1–3 provide three distinct approach landings. |
| Hybrid | Eichenwalde | 3 | 0 | **Complete:** current #41–43 replace, rather than rehabilitate, the rejected old coaching anchors. |
| Hybrid | Hollywood | 3 | 0 | **Complete:** current #47–49 provide three distinct Objective A landings. |
| Hybrid | King's Row | 3 | 0 | **Complete:** two hotel routes plus the distinct final-foundry right mega room passed dense review/current regression. |
| Hybrid | Midtown | 3 | 0 | **Complete:** current #19–21 provide three distinct station-street landings. |
| Hybrid | Neon Junction | 3 | 0 | **Complete:** exact 2026 map metadata plus Objective A, mid-payload, and final-phase geometry passed dense review. |
| Hybrid | Numbani | 3 | 0 | **Complete:** three distinct routes passed dense review and current compatibility. |
| Hybrid | Paraíso | 3 | 0 | **Complete:** the under-overpass corner plus current #34 Objective A café-side and #40 final-club rail blink points passed dense review. |
| Push | Colosseo | 3 | 0 | **Complete:** current #201–203 provide three distinct central/opening-lane landings. |
| Push | Esperança | 3 | 0 | **Complete:** current #205–207 provide three distinct tram/interior/garden landings. |
| Push | New Queen Street | 3 | 0 | **Complete:** current #197–199 provide three distinct side-street/main-lane/skybridge landings. |
| Push | Runasapi | 3 | 0 | **Complete:** the fresh 2026 recessed small-pack point is distinct from #210 and #211. |
| **Total** | **30 maps** | **90** | **0** | **All thirty maps reach 3/3.** |

## Rejected candidates — exact-source ledger

Every row below has an exact timestamped watch URL and exact preserved ASR quote, but fails at least one visual/current-version gate. These are **not prompts** and must not be selected blindly.

| Map | Exact source | Exact quote | Rejection |
|---|---|---|---|
| Nepal | [142.090s](https://www.youtube.com/watch?v=2eg2nFsHfBc&t=142.090s) | “right and then you would have would have had a really good angle to be behind your opponents and flanked them instead” | Dense frames freeze on one temple doorway after combat; the spoken behind-angle has no unique atomic point. |
| Nepal | [373.809s](https://www.youtube.com/watch?v=2eg2nFsHfBc&t=373.809s) | “you you could have stayed on that flanking route and and continued your flank but you kind of you stopped so” | Dense frames show Sanctum combat and repositioning, not a continuously bounded start/direction/endpoint route. |
| Nepal | [595.590s](https://www.youtube.com/watch?v=2eg2nFsHfBc&t=595.590s) | “playing tracer try to think about your escape path right like try to think about okay I'm going in now how am I” | Dense Shrine combat confirms only generic/incomplete escape-path advice; no bounded route is demonstrated. |
| Oasis | [2107.000s](https://www.youtube.com/watch?v=C-DThafJgSc&t=2107.000s) | “city center. There we go. The right-hand route near the cars. Okay, so we'll go there. So, you're” | Dense frames identify City Center, but the free camera leaves the playable map and flies above the skyline before returning; no continuous player-valid route can be joined. |
| Ilios | [169.019s](https://www.youtube.com/watch?v=cdzCPEGJEMk&t=169.019s) | “going in the uh in the setup” | The 2023 Ruins frames show ordinary combat/repositioning; “the setup” is generic and has no atomic point or bounded route. |
| Ilios | [685.320s](https://www.youtube.com/watch?v=cdzCPEGJEMk&t=685.320s) | “no that was that was a health spot” | ASR is ambiguous and the dense window shows live Lighthouse combat, not a uniquely indicated health-pack point. |
| Ilios | [229.159s](https://www.youtube.com/watch?v=cnGiDs0wpgg&t=229.159s) | “behind them and you have massive damage output” | The 2016 Ruins gameplay shows combat movement; “behind them” is relational and does not establish an atomic point or complete route. |
| Ilios | [1032.280s](https://www.youtube.com/watch?v=cnGiDs0wpgg&t=1032.280s) | “you're just behind like they don't they're not even shooting at you” | Generic opponent-relative positioning during live combat; no named point, start, direction, or endpoint. |
| Rialto | [448.199s](https://www.youtube.com/watch?v=kiUztEOVX8o&t=448.199s) | “then you take High Ground above them” | The editor view shows a raised first-phase area, but the quote remains generic and does not identify one atomic platform; the new current source does not cure that semantic failure. |
| Rialto | [795.180s](https://www.youtube.com/watch?v=kiUztEOVX8o&t=795.180s) | “use this Mega as your position then use arches here” | Two points are mentioned and shown, but no single atomic selection or continuously demonstrated route joins them; the new current source does not turn the pair into one row. |
| Rialto | [1596.900s](https://www.youtube.com/watch?v=kiUztEOVX8o&t=1596.900s) | “once it gets to this corner this area is also good for you to control” | The final-phase window/corner area is visible, but “this area” remains broader than an atomic point; the new current source does not uniquely narrow it. |
| Junkertown | [434.550s](https://www.youtube.com/watch?v=T6NRW06wtAo&t=434.550s) | “a few seconds before the next fight starts immediately take the stairs up hide over there set up for your next” | Pre-OW2; stairs and destination pending frames. |
| Junkertown | [1021.670s](https://www.youtube.com/watch?v=T6NRW06wtAo&t=1021.670s) | “phenomenal for tracer any part of the map with like really good high ground uh that can offer threat to logan gives” | Generic high-ground commentary; no atomic platform. |
| Junkertown | [1319.590s](https://www.youtube.com/watch?v=T6NRW06wtAo&t=1319.590s) | “and flankers need a lot of setup time going up on the high ground trying to get the jump on ash trying to” | Generic/incomplete; route and platform unseen/current-unverified. |
| Eichenwalde | [392.629s](https://www.youtube.com/watch?v=ofYCH85Vf8Y&t=392.629s) | “and also know where the whole facts are new there's a health pack in that room so if I ever did get low” | Pre-OW2; room/pack coordinate not frame-verified. |
| Eichenwalde | [548.160s](https://www.youtube.com/watch?v=ofYCH85Vf8Y&t=548.160s) | “fence I am doing my tracer things I'm behind them but that soldier was out of position but I didn't want to really” | Generic flank narration; exact fence/point absent. |
| Eichenwalde | [648.720s](https://www.youtube.com/watch?v=ofYCH85Vf8Y&t=648.720s) | “and I took the same route that I usually do I always take that right because it's” | Incomplete/generic route; no visible bounds or current verification. |
| King's Row | [250.270s](https://www.youtube.com/watch?v=cmpcWo-NoAM&t=250.270s) | “be around this corner here on their first offense so what we can do to flank that is we can come around this right” | Dense frames circle the checkpoint interior but never establish the spoken right-side endpoint or a phase-bounded complete route. |
| King's Row | [473.919s](https://www.youtube.com/watch?v=uTYxMf9CrrM&t=473.919s) | “just walk here and stand behind the card another easy way one blink here” | The editor rapidly presents several alternative D.Va-bomb escapes; the ASR says “card” for cart and none is isolated as one complete atomic route. |
| King's Row | [577.760s](https://www.youtube.com/watch?v=uTYxMf9CrrM&t=577.760s) | “or I can flank through this way I got some options” | A speculative alternative with a deictic direction and no demonstrated endpoint; the following double blink is criticized rather than prescribed. |
| Paraíso | [74.760s](https://www.youtube.com/watch?v=jBeGrmJVVPE&t=74.760s) | “on defense where she can set up and access the back line the problem your Tracer is that it does not look like you” | 2023 clip verifies defense/Objective A but no unique setup point or continuous backline route; visual-audit REJECT. |
| Paraíso | [862.190s](https://www.youtube.com/watch?v=jBeGrmJVVPE&t=862.190s) | “so you're 75 95 you take High Ground go for the honor Yep this is fine I mean you miss it but” | Visible hero is Sojourn, no high-ground endpoint is reached, target is ambiguous, and geometry is dated; visual-audit REJECT. |
| Paraíso | [927.320s](https://www.youtube.com/watch?v=ioVipmP31n4&t=927.320s) | “health pack in here you go over here” | The retrieved window shows a blank drawing canvas with an unlabelled square, not playable map pixels; the deictic claim cannot establish geometry. |
| Paraíso | [1482.600s](https://www.youtube.com/watch?v=ioVipmP31n4&t=1482.600s) | “I would have stayed behind this trunk real quick” | A dark interior crate/cover is visible, but the 2024 source is dated, Paraíso has no 2026 overhead capture, and the object is not established as a current atomic point. |
| Paraíso | [1583.120s](https://www.youtube.com/watch?v=ioVipmP31n4&t=1583.120s) | “oh he took the stairs” | This describes the opposing Mauga's unseen approach; it neither instructs Tracer nor continuously shows the stair route, and current geometry is unavailable. |
| Runasapi | [0s](https://www.youtube.com/watch?v=7fGTJ5Juv6s&t=0s) | metadata title “tracer gameplay \| runasapi \| 27-3” | The complete 2026 AV1 acquisition produced repeated invalid-OBU/libdav1d failures during random-access review. A checksum proves file identity, not decodability; the source was excluded and replaced with independently acquired H.264 media. |
| Runasapi | [285s](https://www.youtube.com/watch?v=fUoO2GhPqIE&t=285s) | on-screen Runasapi match HUD | Dense frames revisit the red-bus street and do not prove an endpoint distinct from accepted #210; rejected as an endpoint variant. |
| New Junk City | [365s](https://www.youtube.com/watch?v=gstMzhbr_B8&t=365s) | “next flash point. The ducks.” | Dense frames begin after a death and do not continuously establish the route start; rejected in favor of the later fully visible Ducts spawn-to-corner route. |

The older unslotted `Z0EOeQlW6pc` source adds no map rows: its eight spoken candidates lack defensible map identity and atomic/continuous geometry, as documented in `tracer-source-segmentation-2026-07-21.md`.

### Complete-source exclusions and exact shortfalls

These are deliberate non-promotions from the complete source, not unseen candidates. They keep completed maps from being duplicated and distinguish a source that genuinely runs out of demonstrations from a failed visual gate.

| Map/section | Exact numbered scope | Disposition |
|---|---|---|
| King's Row | #13–18 | Whole chapter reviewed; excluded because King's Row was already 3/3. |
| Numbani | #26–33 | Whole chapter reviewed; excluded because Numbani was already 3/3. |
| Paraíso | #34–40 | Whole chapter reviewed; #34 and #40 were already accepted and the map was already 3/3; no duplicates added. |
| Dorado | #57–65 | Whole chapter reviewed; excluded because Dorado was already 3/3. |
| Rialto | #95–100 | Whole chapter reviewed; excluded because Rialto was already 3/3. |
| Shambali Monastery | #101–106 | Whole chapter reviewed; excluded because Shambali Monastery was already 3/3. |
| Watchpoint: Gibraltar | #107–129 | Whole chapter reviewed; excluded because Watchpoint: Gibraltar was already 3/3. |
| Ilios | #151–165 | Whole chapter reviewed; #152 and #155 were already accepted and the map was already 3/3; no duplicates added. |
| Oasis | #182–185 | Whole chapter reviewed; excluded because Oasis was already 3/3. |
| Runasapi | #210–211 only | Both are valid and retained. Rejected as a 3/3 claim because the on-screen section ends without a third numbered spot. |
| Suravasa | #212–213 only | Both are valid and retained. Rejected as a 3/3 claim because the on-screen “Survasa” section ends without a third numbered spot. |
| New Junk City | #214–215 only | Both are valid and retained. Rejected as a 3/3 claim because the video ends after #215 without a third numbered spot. |

## Closed-gap acquisition manifest

Each requested item means a **current-build** source window, independently saved and checksummed before parsing/review. YouTube acquisitions must retain info JSON, exact caption track, exact `t=` URL, and a high-resolution window long enough to prove the full point or continuous route. Reddit acquisitions must retain the exact comment permalink and exact comment text, plus separate current-build visual evidence for its geometry. Three candidates per map must be spatially distinct and non-generic.

| Map | Need | Existing lead to retrieve/compare | Required acquisition |
|---|---:|---|---|
| Antarctic Peninsula | 0 | Three accepted current numbered rows | Complete. |
| Busan | 0 | Three accepted current numbered rows | Complete. |
| Ilios | 0 | Three accepted rows | Complete. |
| Lijiang Tower | 0 | Three accepted current numbered rows | Complete. |
| Nepal | 0 | Three accepted current numbered rows; old anchors remain rejected | Complete. |
| Oasis | 0 | Three accepted rows | Complete. |
| Samoa | 0 | Three accepted current numbered rows | Complete. |
| Circuit Royal | 0 | Three accepted current numbered rows | Complete. |
| Dorado | 0 | Three accepted rows | Complete. |
| Havana | 0 | Three accepted current numbered rows | Complete. |
| Junkertown | 0 | Three accepted current numbered rows; old anchors remain rejected | Complete. |
| Rialto | 0 | Three accepted rows; complete 2025 gameplay independently confirms every promoted 2023 point | Complete. |
| Route 66 | 0 | Three accepted current numbered rows | Complete. |
| Shambali Monastery | 0 | Three accepted rows | Complete. |
| Watchpoint: Gibraltar | 0 | Three accepted rows | Complete. |
| Aatlis | 0 | Three accepted fresh 2026 phase-bounded rows | Complete. |
| New Junk City | 0 | #214, #215, and fresh 2026 Ducts route accepted | Complete; third endpoint is distinct. |
| Suravasa | 0 | #212, #213, and fresh 2026 Garden route accepted | Complete; third endpoint is distinct. |
| Blizzard World | 0 | Three accepted current numbered rows | Complete. |
| Eichenwalde | 0 | Three accepted current numbered rows; old anchors remain rejected | Complete. |
| Hollywood | 0 | Three accepted current numbered rows | Complete. |
| King's Row | 0 | Three accepted rows | Complete. |
| Midtown | 0 | Three accepted current numbered rows | Complete. |
| Neon Junction | 0 | Three accepted fresh 2026 phase-bounded rows with exact map metadata | Complete. |
| Numbani | 0 | Three accepted rows | Complete. |
| Paraíso | 0 | Three accepted rows | Complete. |
| Colosseo | 0 | Three accepted current numbered rows | Complete. |
| Esperança | 0 | Three accepted current numbered rows | Complete. |
| New Queen Street | 0 | Three accepted current numbered rows | Complete. |
| Runasapi | 0 | #210, #211, and fresh 2026 recessed-pack point accepted | Complete; third endpoint is distinct. |

## Promotion checklist

For each future row: retrieve narrowly; record the canonical exact URL/permalink; checksum raw metadata, captions, and video independently; parse only after verification; preserve the exact quote; inspect the actual high-resolution frames; name only a uniquely visible point or continuously bounded route; record phase/side only if visible or explicitly sourced; compare dated leads against current-build geometry; and keep failures in a separate rejected ledger. A map reaches coverage only at three independently defensible rows.

All 38 manifests in the original audit root and all 6 manifests in the continuation root verify: **44/44 checksum manifests pass**. No app, production data, test, asset, or deployment file was edited. No deployment was run and no commit was created.
