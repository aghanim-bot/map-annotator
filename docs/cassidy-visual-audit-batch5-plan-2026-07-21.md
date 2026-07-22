# Cassidy visual-audit acquisition batch 5 plan — 2026-07-21

This is an acquisition plan, not a visual audit or prompt-set change. It prepares alternative Cassidy candidates for the five maps whose first full visual audit ended `REJECT`: Havana, Circuit Royal, Antarctic Peninsula, Busan, and Suravasa. Every selection remains a **spoken candidate** with an unresolved phase. No media was retrieved or reviewed, and this document makes no visual-evidence claim.

## Method and source verification

Selections were made from `cassidy-transcript-shortlist-2026-07-21.md` after reviewing all Cassidy visual-audit records and acquisition plans through batch 4. The previously reviewed anchors (`5426.88`, `190.36`, `119`, `5211.12`, and `10725.12`) were excluded. A shortlist row marked `reject transcript fragment` was also ineligible. Among the remaining rows, selection favors a concrete atomic position over a longer or less testable route.

The saved metadata and English JSON3 captions under `/tmp/yt-dlp-cassidy-setcover/` were parsed locally. For every selection, metadata confirms the exact video ID, canonical watch URL, title, and a duration longer than the requested interval. Each anchor is an exact `tStartMs` caption-event start, and the quoted ASR context agrees with the saved event text and shortlist. Each future retrieval interval is exactly 30 seconds, centered on its anchor (`anchor - 15` through `anchor + 15`). These are retrieval coordinates only.

| Map | Video ID | Canonical URL | Anchor | Exact 30-second window |
|---|---|---|---:|---:|
| Havana | `L2vOzXuMsFc` | https://www.youtube.com/watch?v=L2vOzXuMsFc | `5058.4` | `5043.4`–`5073.4` |
| Circuit Royal | `Gh4Mwp-jxcU` | https://www.youtube.com/watch?v=Gh4Mwp-jxcU | `670.12` | `655.12`–`685.12` |
| Antarctic Peninsula | `Gyp2fLNBgUs` | https://www.youtube.com/watch?v=Gyp2fLNBgUs | `428.28` | `413.28`–`443.28` |
| Busan | `z4G6Svb1eRM` | https://www.youtube.com/watch?v=z4G6Svb1eRM | `5749.28` | `5734.28`–`5764.28` |
| Suravasa | `qUFgnR8il4Q` | https://www.youtube.com/watch?v=qUFgnR8il4Q | `10773.359` | `10758.359`–`10788.359` |

## Selections

### Havana — candidate 2

- **Video:** `L2vOzXuMsFc` — [GM Cassidy Coaching - (Numbani, King's Row, Rialto, Havana, Dorado, Midtown)](https://www.youtube.com/watch?v=L2vOzXuMsFc)
- **Anchor and retrieval window:** `5058.4`; `5043.4`–`5073.4`
- **Exact ASR context:**

> Ideally, you use roll to dodge those. We come high ground. Okay, here I would be coming left window, not right window.

- **Why strongest:** the left window is the best atomic object/position among the unreviewed rows. The later audit must treat it independently from the preceding high-ground movement. Candidate 3 gives only a generic right-side fight and no concrete object.

### Circuit Royal — candidate 3

- **Video:** `Gh4Mwp-jxcU` — [Coach fully explains 3 GM Cassidy Wins // Circuit Royal, King's Row, Nepal](https://www.youtube.com/watch?v=Gh4Mwp-jxcU)
- **Anchor and retrieval window:** `670.12`; `655.12`–`685.12`
- **Exact ASR context:**

> fortunately and then uh make the roll over to this right side. You typically want to play this right side. You can

- **Why strongest:** the repeated instruction to play the right side offers an atomic position to test even if the roll is not visible. Candidate 2 describes a left-door-to-right rotation and is therefore the more ambitious route.

### Antarctic Peninsula — candidate 2

- **Video:** `Gyp2fLNBgUs` — [Coach fully explains 3 T500 Cassidy Wins // Antarctic Peninsula, Esperanca, Hollywood](https://www.youtube.com/watch?v=Gyp2fLNBgUs)
- **Anchor and retrieval window:** `428.28`; `413.28`–`443.28`
- **Exact ASR context:**

> right side of the map. Like when my team is playing the left side, play the right side. If my Reaper is flanking, I'm

- **Why strongest:** this supplies a conditional but atomic right-side position opposite the team's left-side setup. Candidate 3 proposes rotating to the other side and is less atomic and less locally specific.

### Busan — candidate 3

- **Video:** `z4G6Svb1eRM` — [Top 500 Cassidy Coaching - Sep 12 2025 (Runasapi, Watchpoint Gibraltar, Ilios, Busan, Junkertown)](https://www.youtube.com/watch?v=z4G6Svb1eRM)
- **Anchor and retrieval window:** `5749.28`; `5734.28`–`5764.28`
- **Exact ASR context:**

> Okay. Don't drop. Don't drop here. Don't drop. You have to stay up top.

- **Why strongest:** staying up top is an atomic positional instruction and avoids assuming a route. Candidate 2 prescribes a left-side rollout but truncates before any concrete object or endpoint.

### Suravasa — candidate 2

- **Video:** `qUFgnR8il4Q` — [Top 500 Cassidy Coaching - Nov 24 2025 (Oasis, Rialto, Runasapi, New Queen Street, Samoa, Suravasa)](https://www.youtube.com/watch?v=qUFgnR8il4Q)
- **Anchor and retrieval window:** `10773.359`; `10758.359`–`10788.359`
- **Exact ASR context:**

> losing." But yes, we should have gone flank. Timmy was right. We should have gone flank. We should have went bang.

- **Why strongest:** this is the only different, non-rejected shortlist row left after candidate 1's visual rejection; candidate 3 is a rejected transcript fragment. It is weaker than the other four selections because the transcript names no concrete flank object, start, or endpoint. A later audit may accept only geometry actually visible in the window and must not infer a route from the word “flank.”

## Acquisition and later-audit limits

The machine-readable acquisition manifest is `/tmp/cassidy-audit-batch5-manifest.tsv`. A future acquisition process may retrieve only the five listed windows. After acquisition, each artifact must be independently verified and its frames reviewed before assigning map/stage identity, side/objective phase, object identity, exact position, route continuity, or a visual verdict. In particular, “left window,” “right side,” and “up top” remain spoken labels until grounded in pixels; none of the rolls, rotations, drops, or flanks may be represented as visibly continuous without continuous frame support.

## Addendum — parent-selected follow-ups, 2026-07-22

These three additional clips were selected and supplied by the parent task after the original five-candidate plan. They are follow-ups for maps that remained reject-only after the planned batch-5 audit; they did **not** come from the original shortlist selection process and do not revise or retroactively extend that selection rationale.

| Map | Anchor | Exact 30-second window | Exact supplied caption context |
|---|---:|---:|---|
| Antarctic Peninsula | `625.36` | `610.36`–`640.36` | “noticed is that the Ram is here and I am pretty sure I rotate to the other side of the map. Yeah. So the reason I rotate” |
| Suravasa | `12208.239` | `12193.239`–`12223.239` | “I mean, there is a window, so just use a window. But it is not like there is no play to be made, right? It is just shoot people” |
| Suravasa | `10132.16` | `10117.16`–`10147.16` | “once you're here, you should just realize, dang, this angle sucks and then come back this way” |

The supplied artifacts are `/opt/data/annotated-maps/cassidy-audit-batch5/antarctic-peninsula-alt2/625.36.mkv`, `/opt/data/annotated-maps/cassidy-audit-batch5/suravasa-alt2/12208.239.mp4`, and `/opt/data/annotated-maps/cassidy-audit-batch5/suravasa-alt3/10132.16.mp4`, each accompanied by `SHA256SUMS`. The same later-audit limits apply: only concrete visible atomic geometry or continuous visible movement may pass or narrow, and deictic endpoints such as “the other side” may not be inferred.
