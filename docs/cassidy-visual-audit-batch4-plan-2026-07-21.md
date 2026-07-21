# Cassidy visual-audit acquisition batch 4 plan — 2026-07-21

This is an acquisition plan, not a visual audit or prompt-set change. It covers exactly Junkertown, Route 66, Shambali Monastery, Watchpoint Gibraltar, Esperanca, New Queen Street, and Neon Junction. Every selection remains a **spoken candidate** with an unresolved phase. No media was retrieved or reviewed, and this document makes no visual-evidence claim.

## Method and source verification

Selections were made from `cassidy-transcript-shortlist-2026-07-21.md` after reviewing all prior Cassidy audit records: `cassidy-visual-audit-2026-07-21.md`, `cassidy-visual-audit-batch1-2026-07-21.md`, `cassidy-visual-audit-batch2-plan-2026-07-21.md`, and `cassidy-visual-audit-batch2-2026-07-21.md`. A candidate marked `reject transcript fragment` is ineligible. The prior audits also require transcript selection, media acquisition, and later pixel review to remain separate; narration, map knowledge, or a future editor/free-camera view cannot establish visible geometry or continuous movement.

The saved metadata and English JSON3 captions under `/tmp/yt-dlp-cassidy-setcover/` were parsed locally. For every selection, the metadata `id`, canonical `webpage_url`, title, and duration agree with the source below. Each anchor is an exact `tStartMs` caption-event start, and the displayed ASR context agrees with the saved event text and the shortlist. Each retrieval interval is exactly 30 seconds (`anchor - 15` through `anchor + 15`) and is within the saved video duration. These are future retrieval coordinates only.

| Map | Video ID | Canonical URL | Anchor | Exact 30-second window |
|---|---|---|---:|---:|
| Junkertown | `z4G6Svb1eRM` | https://www.youtube.com/watch?v=z4G6Svb1eRM | `8936.56` | `8921.56`–`8951.56` |
| Route 66 | `TZCgTBOMESs` | https://www.youtube.com/watch?v=TZCgTBOMESs | `13466.319` | `13451.319`–`13481.319` |
| Shambali Monastery | `I-YOtByLoUw` | https://www.youtube.com/watch?v=I-YOtByLoUw | `2180.88` | `2165.88`–`2195.88` |
| Watchpoint Gibraltar | `z4G6Svb1eRM` | https://www.youtube.com/watch?v=z4G6Svb1eRM | `2688` | `2673`–`2703` |
| Esperanca | `Gyp2fLNBgUs` | https://www.youtube.com/watch?v=Gyp2fLNBgUs | `1016.92` | `1001.92`–`1031.92` |
| New Queen Street | `CrcdZyqoDkc` | https://www.youtube.com/watch?v=CrcdZyqoDkc | `1448.32` | `1433.32`–`1463.32` |
| Neon Junction | `mbDJzrZ77VU` | https://www.youtube.com/watch?v=mbDJzrZ77VU | `181.36` | `166.36`–`196.36` |

## Selections

### Junkertown — candidate 2

- **Video:** `z4G6Svb1eRM` — [Top 500 Cassidy Coaching - Sep 12 2025 (Runasapi, Watchpoint Gibraltar, Ilios, Busan, Junkertown)](https://www.youtube.com/watch?v=z4G6Svb1eRM)
- **Anchor and retrieval window:** `8936.56`; `8921.56`–`8951.56`
- **Exact ASR context:**

> Your best play at this point is to come this side. Walk up the stairs. Walk what the heck? Walk up the stairs. Walk

- **Why strongest:** candidate 2 gives a directed side approach and repeated instruction to climb concrete stairs. Candidate 1 is an atomic mega-room position but contains less action; candidate 3 calls for an unspecified rotation to high ground.

### Route 66 — candidate 2

- **Video:** `TZCgTBOMESs` — [GM Cassidy Coaching - (Hollywood, Samoa, Oasis, Route 66)](https://www.youtube.com/watch?v=TZCgTBOMESs)
- **Anchor and retrieval window:** `13466.319`; `13451.319`–`13481.319`
- **Exact ASR context:**

> left side, you have this rotation to the high ground and you can go for a flank. You can drop. You see, the positions I

- **Why strongest:** candidate 2 links the left side to a high-ground rotation and an explicit drop option. Candidate 1 mentions a wide flank and cover but begins mid-thought without a concrete start; candidate 3 identifies playing up top and dropping but provides less route geometry.

### Shambali Monastery — candidate 3

- **Video:** `I-YOtByLoUw` — [Top 500 Cassidy Coaching w/ Arc - Oct 24 2025 (Shambali Monastery, Lijiang Tower)](https://www.youtube.com/watch?v=I-YOtByLoUw)
- **Anchor and retrieval window:** `2180.88`; `2165.88`–`2195.88`
- **Exact ASR context:**

> If you're in tower, you can late flank behind and mark the angle like this. So, you would drop. I just like I think this

- **Why strongest:** candidate 3 names a tower start, a late flank behind, an angle, and a drop. Candidate 1 names a mega room but does not state an equally concrete action; candidate 2 gives a wide angle and roll without named surrounding geometry.

### Watchpoint Gibraltar — candidate 1

- **Video:** `z4G6Svb1eRM` — [Top 500 Cassidy Coaching - Sep 12 2025 (Runasapi, Watchpoint Gibraltar, Ilios, Busan, Junkertown)](https://www.youtube.com/watch?v=z4G6Svb1eRM)
- **Anchor and retrieval window:** `2688`; `2673`–`2703`
- **Exact ASR context:**

> dropping into shuttle, grabbing mini, and standing here. This angle is really good. This is This angle is like 10%

- **Why strongest:** candidate 1 provides an ordered shuttle drop, mini pickup, and standing angle. Candidate 2 names a bridge rotation but no destination beyond it; candidate 3 repeats the shuttle/mini idea with a less concrete endpoint, “fight.”

### Esperanca — candidate 1

- **Video:** `Gyp2fLNBgUs` — [Coach fully explains 3 T500 Cassidy Wins // Antarctic Peninsula, Esperanca, Hollywood](https://www.youtube.com/watch?v=Gyp2fLNBgUs)
- **Anchor and retrieval window:** `1016.92`; `1001.92`–`1031.92`
- **Exact ASR context:**

> rotate to here cuz it gives me a better angle onto the Orisa specifically, but you really want to play on this bridge.

- **Why strongest:** candidate 1 combines a rotation and target-specific angle with the concrete bridge position. Candidate 2 mentions cover around an unspecified base and high ground; candidate 3 gives only a generic right-side rotation and angle.

### New Queen Street — candidate 1

- **Video:** `CrcdZyqoDkc` — [Top 500 Cassidy Coaching - Jan 31 2026 (New Queen Street, Samoa, Dorado, Blizzard World, Aatlis)](https://www.youtube.com/watch?v=CrcdZyqoDkc)
- **Anchor and retrieval window:** `1448.32`; `1433.32`–`1463.32`
- **Exact ASR context:**

> then you need to use your best judgment to come right side, roll across the bus, and set up on this high ground and take

- **Why strongest:** candidate 1 supplies an ordered right-side approach, roll across a concrete bus, and high-ground endpoint. Candidate 2 is explicitly rejected and ineligible; candidate 3 mentions a left-side flank but no concrete route feature or endpoint.

### Neon Junction — candidate 3

- **Video:** `mbDJzrZ77VU` — [3 GM Cassidy wins fully explained by a T500 Coach // Neon Junction, King's Row, Aatlis](https://www.youtube.com/watch?v=mbDJzrZ77VU)
- **Anchor and retrieval window:** `181.36`; `166.36`–`196.36`
- **Exact ASR context:**

> this." Which is you play on this right side You play on this left-side corner of the statue, and then back up to the

- **Why strongest:** candidate 3 identifies the statue's left-side corner as a position and directs backing away from it. Candidates 1 and 2 mention stair rotations, but neither excerpt supplies a comparably concrete start or endpoint.

## Acquisition and later-audit limits

The machine-readable acquisition manifest is `/tmp/cassidy-audit-batch4-manifest.tsv`. A future acquisition process may retrieve only the seven listed windows. After acquisition, each artifact must be independently verified and its frames reviewed before assigning map identity, side/objective phase, object identity, exact position, or route continuity. In particular, “mini” and “mega room” must not be strengthened into health-pack claims without visible support, and the narrated stairs, drops, rolls, flanks, or rotations must not be represented as visibly continuous unless continuous frames establish them.
