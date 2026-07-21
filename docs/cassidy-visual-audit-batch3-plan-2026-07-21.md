# Cassidy visual-audit acquisition batch 3 plan — 2026-07-21

This is an acquisition plan, not a visual audit or prompt-set change. It covers exactly seven unaudited Cassidy maps: Antarctic Peninsula, Busan, Ilios, Nepal, Oasis, Aatlis, and Suravasa. Every selection remains a **spoken candidate** with an unresolved phase. No media was retrieved or reviewed, and this document makes no visual-evidence claim.

## Method and source verification

Candidates were selected from `cassidy-transcript-shortlist-2026-07-21.md` after reviewing all prior Cassidy visual-audit records and the batch 2 acquisition plan. Rejected transcript fragments were ineligible. Selection favors a non-rejected excerpt with an explicit object, position, traversal, or action that a later reviewer can test in frames; transcript wording is not promoted into evidence.

The saved metadata and English JSON3 captions under `/tmp/yt-dlp-cassidy-setcover/` were parsed locally. For every row below, metadata confirms the exact video ID, canonical watch URL, title, and a duration longer than the requested window. The anchor agrees with the corresponding saved caption event boundary, and the quoted context agrees with the surrounding saved JSON3 events. Each future retrieval window is exactly 30 seconds, centered on the anchor (`anchor - 15` through `anchor + 15`).

| Map | Video ID | Canonical URL | Anchor | Exact 30-second window |
|---|---|---|---:|---:|
| Antarctic Peninsula | `Gyp2fLNBgUs` | https://www.youtube.com/watch?v=Gyp2fLNBgUs | `119` | `104`–`134` |
| Busan | `z4G6Svb1eRM` | https://www.youtube.com/watch?v=z4G6Svb1eRM | `5211.12` | `5196.12`–`5226.12` |
| Ilios | `z4G6Svb1eRM` | https://www.youtube.com/watch?v=z4G6Svb1eRM | `3431.44` | `3416.44`–`3446.44` |
| Nepal | `Gh4Mwp-jxcU` | https://www.youtube.com/watch?v=Gh4Mwp-jxcU | `2000.44` | `1985.44`–`2015.44` |
| Oasis | `TZCgTBOMESs` | https://www.youtube.com/watch?v=TZCgTBOMESs | `9307.92` | `9292.92`–`9322.92` |
| Aatlis | `CrcdZyqoDkc` | https://www.youtube.com/watch?v=CrcdZyqoDkc | `11330.96` | `11315.96`–`11345.96` |
| Suravasa | `qUFgnR8il4Q` | https://www.youtube.com/watch?v=qUFgnR8il4Q | `10725.12` | `10710.12`–`10740.12` |

## Selections

### Antarctic Peninsula — candidate 1

- **Video:** `Gyp2fLNBgUs` — [Coach fully explains 3 T500 Cassidy Wins // Antarctic Peninsula, Esperanca, Hollywood](https://www.youtube.com/watch?v=Gyp2fLNBgUs)
- **Anchor and retrieval window:** `119`; `104`–`134`
- **Exact ASR context:**

> My goal on the rollout here is to go to the high ground. It's going to be better for Cassidy's effective range and also

- **Why strongest:** candidate 1 gives a rollout action and a concrete high-ground destination. Candidates 2 and 3 describe switching sides of the map but do not identify a comparably concrete object or endpoint.

### Busan — candidate 1

- **Video:** `z4G6Svb1eRM` — [Top 500 Cassidy Coaching - Sep 12 2025 (Runasapi, Watchpoint Gibraltar, Ilios, Busan, Junkertown)](https://www.youtube.com/watch?v=z4G6Svb1eRM)
- **Anchor and retrieval window:** `5211.12`; `5196.12`–`5226.12`
- **Exact ASR context:**

> flanks from here are really good as well. You can flank out this window, which I do all the time, and flank

- **Why strongest:** candidate 1 identifies a window and an action through it. Candidate 2 prescribes the left side but truncates before a concrete object or destination; candidate 3 supplies a stay-up-top prohibition without equally specific local geometry.

### Ilios — candidate 1

- **Video:** `z4G6Svb1eRM` — [Top 500 Cassidy Coaching - Sep 12 2025 (Runasapi, Watchpoint Gibraltar, Ilios, Busan, Junkertown)](https://www.youtube.com/watch?v=z4G6Svb1eRM)
- **Anchor and retrieval window:** `3431.44`; `3416.44`–`3446.44`
- **Exact ASR context:**

> alternative, which is play here. And what you do is you poke out for the mini room. You get mini room control. And

- **Why strongest:** candidate 1 ties a poke action to the concrete mini-room objective and its control. Candidate 2 discusses denying an unnamed rotation; candidate 3 gives a flank direction but no named geometry.

### Nepal — candidate 2

- **Video:** `Gh4Mwp-jxcU` — [Coach fully explains 3 GM Cassidy Wins // Circuit Royal, King's Row, Nepal](https://www.youtube.com/watch?v=Gh4Mwp-jxcU)
- **Anchor and retrieval window:** `2000.44`; `1985.44`–`2015.44`
- **Exact ASR context:**

> what do you do? You go main. So, I stand on this bridge so that when someone does rotate main, I can stuff the rotation.

- **Why strongest:** candidate 2 names the bridge position, the main rotation it watches, and the denial action. Candidates 1 and 3 offer generic flank/right-side movement without a concrete object or endpoint.

### Oasis — candidate 1

- **Video:** `TZCgTBOMESs` — [GM Cassidy Coaching - (Hollywood, Samoa, Oasis, Route 66)](https://www.youtube.com/watch?v=TZCgTBOMESs)
- **Anchor and retrieval window:** `9307.92`; `9292.92`–`9322.92`
- **Exact ASR context:**

> even need to play the angle. So just this is a plain main situation right now or play on high ground guard. Either one

- **Why strongest:** candidate 1 identifies two testable atomic positions/actions: play main or guard from high ground. Candidate 2 gives rotation timing without concrete geometry, while candidate 3 names only the right side.

### Aatlis — candidate 3

- **Video:** `CrcdZyqoDkc` — [Top 500 Cassidy Coaching - Jan 31 2026 (New Queen Street, Samoa, Dorado, Blizzard World, Aatlis)](https://www.youtube.com/watch?v=CrcdZyqoDkc)
- **Anchor and retrieval window:** `11330.96`; `11315.96`–`11345.96`
- **Exact ASR context:**

> you see the Rodock here, you actually could just drop main like this and go for this play. That actually be really

- **Why strongest:** candidate 3 gives the explicit drop-to-main action. Candidate 1 is rejected and therefore ineligible; candidate 2 prescribes the left side but does not name a concrete object or endpoint.

### Suravasa — candidate 1

- **Video:** `qUFgnR8il4Q` — [Top 500 Cassidy Coaching - Nov 24 2025 (Oasis, Rialto, Runasapi, New Queen Street, Samoa, Suravasa)](https://www.youtube.com/watch?v=qUFgnR8il4Q)
- **Anchor and retrieval window:** `10725.12`; `10710.12`–`10740.12`
- **Exact ASR context:**

> But if he's going main because he said, "Okay, my Reaper has a deep flank. I'm going to go main." Then this is fine.

- **Why strongest:** candidate 1 gives a concrete conditional action: use main when Reaper owns the deep flank. Candidate 2 recommends a flank but names no object, route, or endpoint; candidate 3 is rejected and ineligible.

## Acquisition and later-audit limits

The machine-readable acquisition manifest is `/tmp/cassidy-audit-batch3-manifest.tsv`. A future acquisition process may retrieve only the seven listed windows. After acquisition, each artifact must be independently verified and its frames reviewed before assigning map identity, stage, side/objective phase, object identity, position, route continuity, or a visual verdict. In particular, “mini room” must not be strengthened into a health-pack size claim, “high ground” must remain unresolved until visible geometry identifies it, and spoken movement must not be represented as a continuous route without continuous frame support.
