# Hero/map source inventory

Research cutoff: **2026-07-21**.

This is an inventory, not a prompt audit. A video title or timestamped link is only a candidate. A prompt becomes supported only after its spoken/textual claim and/or reviewed visual frames are recorded in `docs/source-audit.md`.

## Cassidy

Tale Coaching's 2026 videos provide broad candidate coverage. The existing Blizzard World/Cassidy audit remains the only completed map-specific audit.

| Video | Title-derived candidate map coverage | Status |
|---|---|---|
| [CDBTR5W_MS0](https://www.youtube.com/watch?v=CDBTR5W_MS0) | Lijiang Tower; Aatlis; Route 66; Suravasa | Candidate only |
| [qUFgnR8il4Q](https://www.youtube.com/watch?v=qUFgnR8il4Q) | Rialto; New Queen Street; Samoa; Suravasa; Runasapi; Aatlis | Candidate only |
| [CrcdZyqoDkc](https://www.youtube.com/watch?v=CrcdZyqoDkc) | Dorado; Blizzard World; Aatlis; New Queen Street; Samoa | **Blizzard World segment audited; other maps candidate only** |
| [VgNqCuHLrkU](https://www.youtube.com/watch?v=VgNqCuHLrkU) | Antarctic Peninsula; Colosseo | Candidate only |
| [osrHm4U9cDE](https://www.youtube.com/watch?v=osrHm4U9cDE) | Runasapi; Havana; Circuit Royal | Candidate only |
| [JV17y5O9p_o](https://www.youtube.com/watch?v=JV17y5O9p_o) | Shambali Monastery; Samoa | Candidate only |
| [Gh4Mwp-jxcU](https://www.youtube.com/watch?v=Gh4Mwp-jxcU) | Nepal; Circuit Royal; King's Row | Candidate only |
| [D7YhHung_Fg](https://www.youtube.com/watch?v=D7YhHung_Fg) | Paraíso; Numbani; King's Row | Candidate only; Paraíso chapter transcript-bounded at `570.64`–`5567.6` seconds |
| [mbDJzrZ77VU](https://www.youtube.com/watch?v=mbDJzrZ77VU) | Neon Junction; King's Row; Aatlis | Candidate only |

Additional Tale Coaching search results close the earlier title-level gaps:

| Video | Additional title-derived coverage |
|---|---|
| [z4G6Svb1eRM](https://www.youtube.com/watch?v=z4G6Svb1eRM) | Busan; Ilios; Junkertown; Watchpoint: Gibraltar; Runasapi |
| [5udNBZoUYNE](https://www.youtube.com/watch?v=5udNBZoUYNE) | New Junk City; Dorado; Lijiang Tower; King's Row |
| [GY1lh6h8-gk](https://www.youtube.com/watch?v=GY1lh6h8-gk) | Eichenwalde; Lijiang Tower; Route 66; Rialto |
| [Gyp2fLNBgUs](https://www.youtube.com/watch?v=Gyp2fLNBgUs) | Antarctic Peninsula; Esperança; Hollywood |
| [Q6cgiEUJZZU](https://www.youtube.com/watch?v=Q6cgiEUJZZU) | Midtown |
| [bN1PcaSM3lk](https://www.youtube.com/watch?v=bN1PcaSM3lk) | Circuit Royal; Watchpoint: Gibraltar; Esperança |

A saved 100-result channel search found at least one Cassidy/Tale title naming **every one of the 30 scoped maps**, and the Cassidy transcript shortlist now includes candidate rows for all 30. This is complete candidate discovery and shortlist coverage, not a completed audit: candidate chapter segmentation is resolved for all 30 maps, but exact claims, visual frames, and objective phases remain unaudited. The Paraíso chapter window is transcript-bounded at `570.64`–`5567.6` seconds, but its shortlist rows remain spoken candidates with unresolved phases pending frame and disposition review.

## Hanzo

| Video | Scope | Evidence access |
|---|---|---|
| [ZFjzANTx17U](https://www.youtube.com/watch?v=ZFjzANTx17U) | “Hanzo Educational Unranked To Champion (Full Series)” | A saved English JSON3 auto-caption transcript now exists (SHA-256 `46f88c67b092f8c3742ca222fb0600c22b62c68bebafa504b6768952efb0c25d`), alongside saved metadata (SHA-256 `65984ec361b05717efeda2a4590d99bfd1adbb162ef98467d11f93e7172ef0f1`). The [candidate shortlist](hanzo-transcript-shortlist-2026-07-21.md) covers six visually identified placement maps; no prompt has been accepted. |

The video's first ten placement-match chapter boundaries are 00:00:37, 00:12:20, 00:19:24, 00:26:05, 00:39:42, 00:46:00, 00:57:51, 01:11:52, 01:25:39, and 01:41:52. Reviewed high-resolution storyboard frames establish these high-confidence map candidates:

| Placement | Start | Map | Evidence note |
|---:|---:|---|---|
| 2 | 00:12:20 | Rialto | Map name is visible in the transition frame; gameplay geometry agrees. |
| 3 | 00:19:24 | Lijiang Tower | Chinese control-stage geometry is visible; exact submap still requires a stage-level audit. |
| 5 | 00:39:42 | Nepal | Snowy red-temple control geometry is visible; exact submap still requires audit. |
| 6 | 00:46:00 | Circuit Royal | Monaco/French signage and map geometry are visible. |
| 8 | 01:11:52 | Esperança | Portuguese Push geometry and barricade play are visible. |
| 10 | 01:41:52 | New Queen Street | Toronto Push geometry and objective activation are visible. |

The remaining four placement maps are intentionally left unresolved rather than guessed. The English JSON3 candidate shortlist contains 16 spoken-candidate rows across the six identified maps. None supports a specific position prompt yet: timestamped frames still need to establish each object, route/position, and objective phase before any row can become live-eligible.

## Tracer

| Video | Scope | Evidence access |
|---|---|---|
| [Z0EOeQlW6pc](https://www.youtube.com/watch?v=Z0EOeQlW6pc) | “Educational Unranked To GM Tracer (43 Win Streak)” | A saved Korean-track JSON3 exists (SHA-256 `37454715e145a8144404fd600565eed058c90bb8db663dd5e5a48487c282c72d`), alongside saved metadata (SHA-256 `22099fd6e2bafc550d08dedec1a349d27b87113836d0794f8fb7528ac54c4381`). The metadata chapter bounds are Intro `0`–`107`, Placement `107`–`7033`, Platinum `7033`–`15623`, Diamond `15623`–`25912`, and Master `25912`–`31788` seconds. The Korean-labeled track is mixed-language at row level, containing English commentary and Hangul content, so not every row requires translation. However, the source has no map-specific chaptering: map windows must first be visually segmented before any candidate can be assigned to a map. No map identity is inferred, and no map-specific prompt is accepted. |

## Retrieval notes

- Watch pages, player metadata, caption metadata, and storyboards were downloaded to distinct raw temporary files before parsing.
- No third-party GitHub code was executed.
- Storyboards are coarse visual evidence. A frame can establish visible geometry or a route only when the map, phase, object, and destination are unambiguous.
- Generic full-series titles do not establish map coverage by themselves.

## Coverage status

- **Completed map/hero audit:** Blizzard World × Cassidy.
- **Candidate source coverage:** Cassidy transcript shortlist covers all 30 scoped maps; one long-form educational source each for Hanzo and Tracer. This remains candidate-only coverage, not an audit.
- **Completed all-phase coverage:** none beyond the existing Blizzard World/Cassidy prompt set.
- The staged generated catalog must therefore remain separate from live audited prompts.
