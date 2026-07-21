# Hanzo caption and visual evidence audit

Research cutoff: **2026-07-21**.

This document audits the 16 rows in `hanzo-transcript-shortlist-2026-07-21.md`. It does not add production prompts. A **narrow** disposition records an atomic position or sightline supported by the caption and sampled frame, but is not a live-eligibility decision. A **reject** disposition means the spoken fragment cannot support a map-annotation target at the available visual cadence. No full route passes: movement between roughly ten-second storyboard cells is not treated as visible.

## Evidence integrity and method

- Source video: [Hanzo Educational Unranked To Champion (Full Series)](https://www.youtube.com/watch?v=ZFjzANTx17U)
- `/tmp/yt-dlp-hanzo/ZFjzANTx17U.en.json3`: 3,643,380 bytes; SHA-256 `46f88c67b092f8c3742ca222fb0600c22b62c68bebafa504b6768952efb0c25d` (**matches the shortlist**).
- `/tmp/yt-dlp-hanzo-meta/ZFjzANTx17U.info.json`: 724,357 bytes; SHA-256 `65984ec361b05717efeda2a4590d99bfd1adbb162ef98467d11f93e7172ef0f1` (**matches the shortlist**).
- Full saved level-2 storyboard set: `/tmp/storyboards-level2/ZFjzANTx17U-000.jpg` through `ZFjzANTx17U-117.jpg`; each sheet is 800×450, arranged as 5×5 cells of 160×90. The metadata describes this level as approximately 9.99 seconds per cell. `/tmp/hanzo-storyboard-sha256.txt` contains the per-sheet hashes and has SHA-256 `c786b161ef1faa9e7ca6a26fd3e74a9936f31d150b3249cc5dfc6257a94741c5`.
- Selected higher-resolution level-3 evidence is under `/tmp/hanzo-placement-storyboards/` and `/tmp/hanzo-circuit-*-storyboards/`. The placement manifest `/tmp/hanzo-placement-frame-manifest.json` hashes to `d82e14fbc98b39e37ce1c17b39f17cfd982284d63fd9f27188a105186ae2aae0`; the Circuit Royal overview manifest `/tmp/hanzo-circuit-frame-manifest.json` hashes to `9983c7f52cf186e84372433faac0d8c17a965a8cf23bfc32835dc0c449aa8a12`.
- Audit crops are in `/tmp/hanzo-shortlist-frames/`. They are nearest-cell crops enlarged with nearest-neighbor scaling for review, not new source frames. Their hashes are recorded below. “~760” therefore means the nearest storyboard sample, not a frame extracted at exactly 758.639.
- Map/stage and phase judgments use visible title cards, recognizable geometry, and visible HUD text/state only. They are not inferred from placement or chapter order.

## Audited shortlist

| Map / phase established by frames | Caption anchor and exact quote | Nearest visual evidence | Disposition |
|---|---|---|---|
| Rialto; defending, before/at the first payload release | `758.639`: `>> I just put a sonic arrow here.` | ~760, sheet 003 cell 1: Hanzo is on the balustraded upper walkway looking along the canal-side first payload lane. The coarse cell does not show the arrow impact. | **Narrow** to the visible upper-walkway sightline. Reject any exact Sonic Arrow impact point. |
| Rialto; defending, payload round active | `932.240`: `>> Are we going to hit a flank? The B is literally AFK. Maybe we can Orisa might put aggro on us here.` | ~930, sheet 003 cell 18: exterior stone stair/landing beside a masonry wall. No start, direction, or endpoint of a flank is visible. | **Reject** as a route or point; this is speculative speech. |
| Rialto; defending, payload round active | `1039.039`: `>> Just going to take this angle. Maybe we can catch something.` | ~1040, sheet 004 cell 4: a shadowed interior doorway looking onto a bright street and payload lane. | **Narrow** to the visible doorway sightline; “this angle” supplies no stronger named geometry. |
| Lijiang Tower: Garden; Control objective locked/pre-fight | `1176.960`: `can hold the right side, it's going to be tough. Might have to play open. If they have a comp that doesn't like hard control the right side, then I think we take the right side. The right side should probably be the best for us here.` | ~1180, sheet 004 cell 18; higher-resolution sheet 0013 also reviewed: green spawn doors and the pre-round objective marker are visible. No right-side endpoint or path is shown. | **Reject** as a point or route. Repetition of “right side” does not identify geometry. |
| Lijiang Tower: Garden; opening Control fight | `1209.039`: `>> Going to take the angle behind them. Makes a lot of pressure.` | ~1210, sheet 004 cell 21; higher-resolution sheet 0013: Hanzo aims through a circular moon gate from the orange courtyard. The sampled frame does not establish that the position is behind the opponents. | **Reject** the “behind them” relationship and any route; the visible moon-gate sightline lacks a stable spoken target. |
| Lijiang Tower: Garden; Control round active | `1379.440`: `>> All right, I'm going to try take the top. I got to be careful about the Widow. I'm instantly going to Sonic the top as well. So, in case there's a Widow, I'll have the upper hand.` | ~1380, sheet 005 cell 13: open paved approach with Garden’s red/green architecture. Neither a completed climb nor an unambiguous top surface/arrow impact is visible. | **Reject** the top destination, climb, and Sonic point. |
| Nepal: Shrine; Control objective locked/opening | `2416.800`: `>> Going to Sonic at the start. No one's left.` | ~2420, sheet 009 cell 17; higher-resolution sheet 0026: snowy red-temple exterior and elevated approach are visible. The arrow impact and meaning of “left” are not. | **Reject** as an exact Sonic point or directional prompt. |
| Nepal: Shrine; Control round active | `2678.400`: `>> Just going to spam this angle while Ryan walks. Got to be careful what tank they have. As long as their tank isn't too close here, we're fine.` | ~2680, sheet 010 cell 18: Hanzo holds the stone steps beside the red temple wall, looking toward the snowy lane. | **Narrow** to the visible step-to-lane sightline. “Ryan” and “here” do not establish an endpoint or route. |
| Circuit Royal; attacking, objective A opening | `2782.480`: `>> And I'm going to use my wall climb to get up on the high ground on the right side there.` | ~2780, sheet 011 cell 3; 320×180 contact `/tmp/hanzo-circuit-highground-contact.jpg`: a yellow-framed spawn-side opening is visible at 46:20, followed by attack-lane views. The climb and landing occur between samples. | **Reject** as a route or high-ground point; the destination surface is not unambiguously shown. |
| Circuit Royal; defending, payload round active | `3299.839`: `>> I'm not dropping down there cuz therea's down there. I'll just die. I'd rather peek their ass. Thea won't see me. Oh, she's dead anyway. I'm going to go flank` | ~3300, sheet 013 cell 5; `/tmp/hanzo-circuit-flank-contact.jpg`: exterior upper ledge by the AETRIA doorway is visible, followed by interior and other ledge views at ten-second gaps. | **Narrow** to the visible AETRIA upper-ledge position. Reject “drop down” and the full flank route: start/direction/endpoint are not continuously established. |
| Circuit Royal; defending, payload round active | `3368.480`: `>> If I kill him, we have a good angle from behind as well. So, >> honestly, we don't even need it.` | ~3370, sheet 013 cell 12; `/tmp/hanzo-circuit-flank-contact.jpg`: a side doorway/ledge looks toward the tree-lined lane. The HUD and teammate markers do not prove “behind” relative to the target. | **Narrow** to the visible side-doorway sightline; reject the “from behind” relationship. |
| Esperança; opening Push fight, bot not yet materially displaced | `4333.040`: `>> Get this angle to a little bit late. I should have done the way earlier. I'm just going to stay on this angle cuz my team is already on a left angle. No need to stack with them. Better to have another angle.` | ~4330, sheet 017 cell 8; higher-resolution sheet 0048: Hanzo holds the outside corner of a red façade, looking into the adjacent street. Teammates are elsewhere, but “left angle” is not geometrically resolved. | **Narrow** to the visible red-façade corner sightline; reject the claimed team-angle relationship. |
| Esperança; Push round active | `4496.080`: `take cover. I'm isolating the angle m shooting the monkey. He's primal. I want to get out of there before he promis me into his team.` | ~4500, sheet 018 cell 0: elevated stone steps/terrace looking down the roadway while engaging Winston. | **Narrow** to the visible terrace-to-road sightline. No retreat route or endpoint is shown. |
| Esperança; Push round active | `4885.199`: `I'll go for flank cuz a lot of stuff is going on. Might not expect me.` | ~4890, sheet 019 cell 14: close combat at an interior stair/landing. The sampled sequence does not show a complete approach or destination. | **Narrow** only to the visible interior stair position; reject the flank route. |
| New Queen Street; opening Push fight/objective activating | `6141.360`: `>> Guys, no cover to play with. Just walks on main alone. So punishable. Going to put a Sonic in main so we know where they're walking. Don't want them to walk bottom enough without having a setup on it.` | ~6140, sheet 024 cell 14; higher-resolution sheet 0068: Hanzo is on the curved elevated parapet overlooking the broad main lane. The arrow impact and the word transcribed as “bottom” are not visually resolved. | **Narrow** to the parapet-to-main sightline. Reject an exact Sonic point and any “bottom” geometry. |
| New Queen Street; Push round active, exact bot location obscured | `6520.880`: `>> I want to take the left side again. I feel like main >> I mean being open is good but like >> this is too open, you know?` | ~6520, sheet 026 cell 2: the scoreboard covers nearly all geometry. Adjacent coarse cells confirm the match remains on New Queen Street but do not establish this left-side target. | **Reject** as a point or route. |

## Derived crop hashes

| Anchor | Crop path | SHA-256 |
|---:|---|---|
| 758 | `/tmp/hanzo-shortlist-frames/758.jpg` | `3717ee464b54ab0ffbdb7218c15facbdc479275917d0cc6307e5e79f3534eeef` |
| 932 | `/tmp/hanzo-shortlist-frames/932.jpg` | `6092502bdb8871ec05501366467b52a9e12b01a180da67a0d1ba5b4976504d35` |
| 1039 | `/tmp/hanzo-shortlist-frames/1039.jpg` | `0785b15592ec8247a3f30ee146afe79dd38c69a5d20a3e74d5f0e97b61b31a04` |
| 1176 | `/tmp/hanzo-shortlist-frames/1176.jpg` | `7de4a921e7099bfd1fd928be3dca6da638ab77fc8578f96afd40c822b5adf4ac` |
| 1209 | `/tmp/hanzo-shortlist-frames/1209.jpg` | `330f35ed5d0ae9c433b7fa574af4ebf3adc41b7928eb7ebe8cb240527d02b1ce` |
| 1379 | `/tmp/hanzo-shortlist-frames/1379.jpg` | `5c19408e9cfadc4a0938162369ce2f92baa0662afb50a4983ba52896119efdcb` |
| 2416 | `/tmp/hanzo-shortlist-frames/2416.jpg` | `6a06ccc447215b07b60960f67546c47ef050f4f2be75a6cef681df1ce8c1a482` |
| 2678 | `/tmp/hanzo-shortlist-frames/2678.jpg` | `6e77ac69e71b0d0b21f8417ed831c7e821dd77053109a67ee4acd10467ae7b8a` |
| 2782 | `/tmp/hanzo-shortlist-frames/2782.jpg` | `effd28e919fa4a6f5c29ec0e7277f51628296696cfae1340ae89ca7d808507bb` |
| 3299 | `/tmp/hanzo-shortlist-frames/3299.jpg` | `58ead2d4f5127747070d58b5f82e569dfb1861d6325cb09771cea8ba5e03c064` |
| 3368 | `/tmp/hanzo-shortlist-frames/3368.jpg` | `7bb2f0f84e906e032f6bdbe4ccbe45fa66193b911e56e19fc413bbd79333f3aa` |
| 4333 | `/tmp/hanzo-shortlist-frames/4333.jpg` | `9f880220777bf01f3ffec3caacb40e973859fa5f5c158c63a492f00d07910936` |
| 4496 | `/tmp/hanzo-shortlist-frames/4496.jpg` | `d18b1831ad6fd23971a8bcad94dde3408854824a009ef9b25c35d9f75b739fee` |
| 4885 | `/tmp/hanzo-shortlist-frames/4885.jpg` | `dfd87366b0b856cacbd5e6555849efcda5cbae0c5e2c47c68b89cfbc99a91094` |
| 6141 | `/tmp/hanzo-shortlist-frames/6141.jpg` | `3570b8bfd60d98f4da7a583623a4d603ff7c48422abe459bbfc348bf65d45bf2` |
| 6520 | `/tmp/hanzo-shortlist-frames/6520.jpg` | `11a6c37310657feecb1108e3300c1aaba58d9c727ae60d1b0d6e19aa7e011eb0` |

## Additional visually resolved placement chapters

These identities come from visible map title cards plus agreeing gameplay geometry; none is inferred from chapter order. No additional prompt rows were audited for them.

| Placement chapter (metadata bounds) | Map | Direct visual evidence | Disposition |
|---|---|---|---|
| Placement #1, 37–740 | Hollywood | `/tmp/hanzo-placement-storyboards/sheet-0000.jpg`: the `HOLLYWOOD` title card and Overwatch logo are visible, followed by its studio-street geometry. | Map chapter accepted; phase/route prompts unaudited. |
| Placement #7, 3471–4312 | Samoa | `/tmp/hanzo-placement-storyboards/sheet-0039.jpg`: Samoa’s tropical control geometry, central objective structure, and round HUD are visible. | Map chapter accepted; exact stage and prompts remain unaudited. |
| Placement #9, 5139–6112 | Eichenwalde | `/tmp/hanzo-placement-storyboards/sheet-0057.jpg`: the `EICHENWALDE` title card is visible, followed by the village attack approach. | Map chapter accepted; objective phase beyond the visible opening and all prompts remain unaudited. |

Placement #4 (1565–2382) remains unresolved. Its saved frames were not sufficiently distinctive to record a map identity without relying on prior game knowledge.

## Counts

| Measure | Count |
|---|---:|
| Shortlisted rows reviewed | 16 |
| Pass without narrowing | 0 |
| Narrow | 9 |
| Reject | 7 |
| Full routes accepted | 0 |
| Maps in shortlisted rows | 6 |
| Control stages newly resolved | 2 |
| Additional map chapters accepted | 3 |
| Placement chapters still unresolved | 1 |
| Live production prompts changed | 0 |
