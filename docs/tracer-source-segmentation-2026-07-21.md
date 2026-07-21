# Tracer source segmentation — 2026-07-21

Research cutoff: **2026-07-21**.

## Result

This is an operator-facing source audit, not a prompt set. The supplied artifacts do not establish a map identity for any reviewed candidate window to the standard required for map annotation. Accordingly, this audit accepts **0 map windows** and **0 positioning/route candidates** for a map slot. It preserves **8 unslotted spoken candidates** for possible high-resolution follow-up.

This conservative result is intentional. The video has rank chapters, not map chapters; no scoped map name occurs in the caption track; and the saved 160×90 storyboard cells are approximately ten seconds apart. Several scenes resemble known maps, but resemblance to architecture is not map identity evidence. The coarse cells also cannot prove movement hidden between cells.

## Scope and rules applied

- Source: [Educational Unranked To GM Tracer (43 Win Streak)](https://www.youtube.com/watch?v=Z0EOeQlW6pc).
- Hero: Tracer.
- Target corpus: Competitive Role Queue 5v5 and the 30-map scope in `competitive-5v5-scope-2026-07-21.md`.
- Spoken English is transcribed exactly as present in the mixed Korean/English JSON3 track, including recognition errors. No meaning is assigned to Hangul or other non-English speech.
- A map is accepted only from readable map-name/source text or an otherwise unambiguous visual identifier. Architecture alone is not used.
- A point needs one visible, unambiguous target. A route needs a visible start, direction, and endpoint. A storyboard gap cannot supply any of them.

## Evidence artifacts

The artifacts were already saved separately before this audit. They were verified as non-empty files and checksummed before JSON parsing or visual review.

| Artifact | Size | SHA-256 | Use |
|---|---:|---|---|
| `/tmp/yt-dlp-tracer/Z0EOeQlW6pc.ko.json3` | 1,479,764 bytes | `37454715e145a8144404fd600565eed058c90bb8db663dd5e5a48487c282c72d` | Mixed-language timed captions |
| `/tmp/yt-dlp-tracer-meta/Z0EOeQlW6pc.info.json` | 729,100 bytes | `22099fd6e2bafc550d08dedec1a349d27b87113836d0794f8fb7528ac54c4381` | Title, duration, rank chapters, storyboard manifest |
| `/tmp/yt-player/Z0EOeQlW6pc.json` | 9,033 bytes | `3ef001d2f38eddcee73d227d39bfc5c8d2a639fe31c70af66201afc2632c772d` | Saved player response; login-required response, no map evidence |

Saved visual evidence reviewed includes `/tmp/storyboards-level2/Z0EOeQlW6pc-000.jpg` through `-127.jpg` (160×90 cells in 5×5 sheets), the 32 level-1 sheets, the level-0 sheet, and the five labeled storyboard sample sheets. The metadata describes the level-2 cell interval as approximately 9.996 seconds. No new network retrieval was required; therefore there is no new raw download or checksum to record.

The only source-defined windows are rank chapters: Intro `0`–`107`, Placement `107`–`7033`, Platinum `7033`–`15623`, Diamond `15623`–`25912`, and Master `25912`–`31788` seconds. These are not map windows.

## Map-window disposition

Gameplay boundaries and score/rank-overlay changes are visible in the storyboards, but a match boundary is not a map identity. Loading/title text is not readable at the saved resolution, the metadata description supplies only rank timecodes, and caption search found no occurrence of any scoped map name (including spelling variants for Paraíso and Esperança).

| Window class | Count | Disposition |
|---|---:|---|
| Accepted map windows | **0** | None has defensible map identity evidence. |
| Candidate-containing reviewed windows | **8** | Kept unslotted below; bounds are visual-review neighborhoods, not claimed full-match bounds. |

## Unslotted spoken candidates

All timestamps are JSON3 `tStartMs` values. “Objective phase” remains unresolved in every row because neither the speech nor the reviewed coarse cell proves the corpus phase and side.

| Time / review neighborhood | Exact English coaching context | Map identity evidence | Objective phase | Concrete visual geometry | Visual-review verdict |
|---|---|---|---|---|---|
| `174.239` / `160`–`190` | “using cover the car” | None; no readable map name in the reviewed cells. | Unresolved | A street fight and vehicle-shaped cover are visible, but the exact referenced car and a single annotation target are not distinguishable at 160×90. | **Unslotted; reject as point.** Speech supplies a cover concept, not an auditable coordinate. |
| `816.680` / `800`–`840` | “I think We're going to secure the first point but the One thing that I really want to empas on the first engagement” | None. | Unresolved; “first point” is spoken but does not prove a mode, side, or phase ID. | Urban gameplay is visible; the objective boundary/target is not unambiguous. | **Unslotted; reject.** This is fight commentary, not a position or route. |
| `1119.960` / `1100`–`1140` | “movement distracting three of them much using the Heal pack” | None. | Unresolved | Interior/exterior combat cells are visible, but the health-pack model and its exact floor position cannot be resolved. | **Unslotted; reject as point.** “Heal pack” is spoken, but visual coordinate evidence fails. |
| `2593.480` / `2580`–`2635` | “drop and going for the high ground but he sees too many people just rather for the down” | None. | Unresolved | Adjacent cells show combat around an interior opening, but no continuous drop-to-high-ground movement or endpoints. | **Unslotted; reject as route.** Speech is ASR-fragmented and the storyboard gap hides the movement. |
| `4869.639` / `4850`–`4980` | “at this game He's really good using the small map geometry like the boss TR par slight verticality or that little” | None. | Unresolved | The cells show snowy streets, red-leaved trees, doorways, and elevation changes; no single object is selected by the incomplete speech. | **Unslotted; reject.** Generic geometry/verticality is not an atomic target. |
| `5772.760` / `5750`–`5850` | “hold car and just make it to the next fight” | None. | Unresolved | Coarse cells show an enclosed fight area, but do not prove which vehicle/object “car” denotes or a route to a later fight. | **Unslotted; reject as point/route.** Neither target nor endpoint is established. |
| `12952.960` / `12940`–`12980` | “through the whole game He's just chilling on the high ground” | None. | Unresolved | Multiple elevations are visible in the neighborhood, but the exact platform/ledge intended by “the high ground” is not uniquely visible. | **Unslotted; reject as point.** The claim is strategic and non-atomic. |
| `27795.440` / `27780`–`27875` | “he just holding choke holding the line and focus the tars that cross line” followed at `27812.080` by “just playing a little slow with the cover” | None. | Unresolved | The cells show an indoor fight with walls/openings, but no unique choke line, crossing line, or cover target can be recovered. | **Unslotted; reject as route/point.** Start, direction, endpoint, and exact cover all remain ambiguous. |

## Follow-up gate

A later audit may promote a row only after a narrowly retrieved high-resolution window is saved, independently verified, checksummed, and then parsed/reviewed. The window must contain readable map identity evidence and continuous geometry for the claimed point or route. Translation would be required before using Korean speech; none was attempted here.

No application code, catalog data, assets, deployment files, or production data were changed.
