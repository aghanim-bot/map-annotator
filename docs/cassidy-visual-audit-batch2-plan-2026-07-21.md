# Cassidy visual-audit acquisition batch 2 plan — 2026-07-21

This is an acquisition plan, not a visual audit or prompt-set change. It applies the `map-annotation-prompt-setup` evidence standard to exactly seven unaudited Cassidy maps: Colosseo, Eichenwalde, New Junk City, Lijiang Tower, Runasapi, Midtown, and Samoa. Every selection below remains a **spoken candidate** with an unresolved phase. No media was retrieved or reviewed, and this document makes no visual-evidence claim.

## Method and source verification

The candidates and exact ASR contexts come from `cassidy-transcript-shortlist-2026-07-21.md`; the prior two Cassidy visual-audit documents establish the separation between transcript selection, clip acquisition, and later pixel review. The source inventory independently identifies all three videos as Cassidy candidate sources and does not promote any of these rows to audited status.

The saved metadata and English JSON3 captions under `/tmp/yt-dlp-cassidy-setcover/` were parsed locally. Metadata confirms each ID, canonical watch URL, title, and duration. Each selected anchor and exact context agrees with the corresponding saved JSON3 caption events. The requested retrieval window is exactly 30 seconds, centered on its anchor (`anchor - 15` through `anchor + 15`); these are future retrieval coordinates only.

| Map | Video ID | Anchor | Exact 30-second window |
|---|---|---:|---:|
| Colosseo | `EYlDMi5BOtM` | `931.839` | `916.839`–`946.839` |
| Eichenwalde | `EYlDMi5BOtM` | `3200.4` | `3185.4`–`3215.4` |
| New Junk City | `EYlDMi5BOtM` | `6283.76` | `6268.76`–`6298.76` |
| Lijiang Tower | `EYlDMi5BOtM` | `9413.76` | `9398.76`–`9428.76` |
| Runasapi | `EYlDMi5BOtM` | `12570.319` | `12555.319`–`12585.319` |
| Midtown | `L2vOzXuMsFc` | `9952.8` | `9937.8`–`9967.8` |
| Samoa | `CrcdZyqoDkc` | `3754.88` | `3739.88`–`3769.88` |

## Selections

### Colosseo — candidate 1

- **Video:** `EYlDMi5BOtM` — [GM Cassidy Coaching - (Colosseo, Eichenwalde, New Junk City, Lijiang Tower, Runasapi, Hollywood)](https://www.youtube.com/watch?v=EYlDMi5BOtM)
- **Anchor and retrieval window:** `931.839`; `916.839`–`946.839`
- **Exact ASR context:**

> should be roll backwards through this window and then drop and come back to main and reset. Okay, this this fight is

- **Why strongest:** candidate 1 gives an ordered action through a concrete window, followed by a drop and return to main. Candidate 2 mentions a mini room, descent, and flank but leaves the route relationships looser; candidate 3 offers an angle through the mini but no equally explicit traversal.

### Eichenwalde — candidate 1

- **Video:** `EYlDMi5BOtM` — [GM Cassidy Coaching - (Colosseo, Eichenwalde, New Junk City, Lijiang Tower, Runasapi, Hollywood)](https://www.youtube.com/watch?v=EYlDMi5BOtM)
- **Anchor and retrieval window:** `3200.4`; `3185.4`–`3215.4`
- **Exact ASR context:**

> mini room. This is your roll out. You're going to come mini room. And then you're just going to shoot from here. Okay.

- **Why strongest:** candidate 1 identifies the mini room as both rollout destination and firing position. Candidate 2 is chiefly a prohibition against main and names no destination; candidate 3 calls for a flank but does not name its path or endpoint.

### New Junk City — candidate 1

- **Video:** `EYlDMi5BOtM` — [GM Cassidy Coaching - (Colosseo, Eichenwalde, New Junk City, Lijiang Tower, Runasapi, Hollywood)](https://www.youtube.com/watch?v=EYlDMi5BOtM)
- **Anchor and retrieval window:** `6283.76`; `6268.76`–`6298.76`
- **Exact ASR context:**

> We want to make this rotation and you can play this high ground here or sorry, this cover and this high ground. I mean,

- **Why strongest:** candidate 1 explicitly pairs a rotation with cover and high-ground geometry, including the speaker's correction. Candidate 2 gives only a generic right-side flank and range judgment; candidate 3 says to back up and play main without a comparably concrete object.

### Lijiang Tower — candidate 1

- **Video:** `EYlDMi5BOtM` — [GM Cassidy Coaching - (Colosseo, Eichenwalde, New Junk City, Lijiang Tower, Runasapi, Hollywood)](https://www.youtube.com/watch?v=EYlDMi5BOtM)
- **Anchor and retrieval window:** `9413.76`; `9398.76`–`9428.76`
- **Exact ASR context:**

> >> Come back bridge. I like playing bridge. Good angle. >> This is also good because you don't take

- **Why strongest:** candidate 1 names an atomic bridge position and its angle. Candidate 2 describes rotating back to a mini room but its excerpt begins mid-rationale; candidate 3 compares bridge and white room but is less direct about the intended action.

### Runasapi — candidate 1

- **Video:** `EYlDMi5BOtM` — [GM Cassidy Coaching - (Colosseo, Eichenwalde, New Junk City, Lijiang Tower, Runasapi, Hollywood)](https://www.youtube.com/watch?v=EYlDMi5BOtM)
- **Anchor and retrieval window:** `12570.319`; `12555.319`–`12585.319`
- **Exact ASR context:**

> Don't flank here. I I don't think this flank is good, right? I mean, I guess you can catch him in the rotation out,

- **Why strongest:** candidate 1 gives an explicit negative action to inspect and ties the flank to an opponent rotation. Candidate 2 is explicitly rejected in the shortlist and is ineligible. Candidate 3 is non-rejected but only says the flank timing is good, without a concrete route feature or endpoint.

### Midtown — candidate 2

- **Video:** `L2vOzXuMsFc` — [GM Cassidy Coaching - (Numbani, King's Row, Rialto, Havana, Dorado, Midtown)](https://www.youtube.com/watch?v=L2vOzXuMsFc)
- **Anchor and retrieval window:** `9952.8`; `9937.8`–`9967.8`
- **Exact ASR context:**

> need to just keep going. Keep going. You're coming all the way to the mega room and you're playing here, okay? And

- **Why strongest:** candidate 2 names a concrete destination, directs continued movement to it, and specifies playing there. Candidate 1 contrasts rolling left and right but does not identify the surrounding geometry; candidate 3 mentions a hallway and roll but truncates before the roll destination.

### Samoa — candidate 3

- **Video:** `CrcdZyqoDkc` — [Top 500 Cassidy Coaching - Jan 31 2026 (New Queen Street, Samoa, Dorado, Blizzard World, Aatlis)](https://www.youtube.com/watch?v=CrcdZyqoDkc)
- **Anchor and retrieval window:** `3754.88`; `3739.88`–`3769.88`
- **Exact ASR context:**

> side but if it's dangerous you have to just go through the hallway. You play in the hallway like this. Play this angle.

- **Why strongest:** candidate 3 supplies a conditional hallway traversal plus an atomic hallway position and angle. Candidate 1 identifies a preferred mega hallway on the right but gives less action detail; candidate 2 rejects the right side in favor of left without naming concrete geometry.

## Acquisition and later-audit limits

The machine-readable acquisition manifest is `/tmp/cassidy-audit-batch2-manifest.tsv`. A future acquisition process may retrieve only the seven listed windows. After acquisition, each artifact must be independently verified and its frames reviewed before assigning map identity, side/objective phase, object identity, point location, or route continuity. In particular, “mega room” must not be strengthened to “mega health pack,” and transcript ordering must not be represented as a visibly continuous route without continuous frame support.
