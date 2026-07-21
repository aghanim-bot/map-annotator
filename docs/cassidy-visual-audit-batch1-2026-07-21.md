# Cassidy visual evidence audit, batch 1 — 2026-07-21

This is a visual-audit record, not a prompt-set or production-data change. It applies the `map-annotation-prompt-setup` evidence standard to the strongest concrete-geometry Cassidy transcript candidate on seven maps not covered by the earlier Blizzard World and Paraíso audits. No application, catalog, deployment, or production file was changed.

## Method and source verification

Candidates were selected from `cassidy-transcript-shortlist-2026-07-21.md`. The parent process subsequently supplied the seven named 30-second clips under `/opt/data/annotated-maps/cassidy-audit-batch1/<map>/`. I ran `sha256sum -c SHA256SUMS` independently in every map directory; all seven returned `OK`. `ffprobe` reports H.264 video at 1280×720 and a 30.020-second container duration (with Vorbis audio) for the inspected set.

I decoded every clip into a one-frame-per-second, 5×6 contact sheet at 512×288 per cell with local clip timestamps. The sheets are temporary review artifacts under `/tmp/cassidy-audit-batch1-frames/`; the source clips and directory manifests are the durable evidence. Verdicts below use only visible pixels, objective text/UI, and continuous frames. Environmental/map identity is recorded only to the specificity supported by the supplied named artifact and visible map-specific scenery or signage; no unseen path is supplied from game knowledge.

| Map | Source clip SHA-256 | Contact sheet and SHA-256 |
|---|---|---|
| Numbani | `18536dc5fb5067b329bb0f48d17bc96c338a8adf2674487db362c2a3a31e02f7` | `/tmp/cassidy-audit-batch1-frames/numbani-contact.jpg` — `daa4736a5775a1aa740fdae3dd4f6fa67d054ca8ddfafb5eac6f31d38c101625` |
| King's Row | `eb62953f935eadeda78705a872333c340419e73c701f7bff1010ccab32170f73` | `/tmp/cassidy-audit-batch1-frames/kings-row-contact.jpg` — `aaf6829b6086a41e3a2c863e95ba19da93e44834f21e276e93fbf781eac5b516` |
| Rialto | `0465e52a74bf90badff4f2ef04f47680260eeabf48f31a3fc3ebae5cd1be929f` | `/tmp/cassidy-audit-batch1-frames/rialto-contact.jpg` — `ff6382bd8012e5fc759e59eb783c86fe069389a4190fb6599e80b003dfc7e6a1` |
| Havana | `26b3d1187eda7014b4b2823e462abacbd7659c630fc8f499ee6f62e5855a9fe7` | `/tmp/cassidy-audit-batch1-frames/havana-contact.jpg` — `6eef91cd69b8252787ce45d0ca24a6a96b2a32ba2bf11ad33f3e23c55c46a8f2` |
| Dorado | `05d7dfb2dfead80e9660943f37090d064f52762ee7ef4c367b4b3cb3dcf72e8a` | `/tmp/cassidy-audit-batch1-frames/dorado-contact.jpg` — `479dd5cb37c4182059db75b1acdf5967a16bf1a18c95ce98c5b2e963e53a68` |
| Circuit Royal | `0dc9830987bba151e2ff7d720ed835d7214eb85ee5caf1e69b579067c4faddcb` | `/tmp/cassidy-audit-batch1-frames/circuit-royal-contact.jpg` — `7ed1907c77982d7ea4a44676bdca3ae4db03cb3efe3df7bdc61ca727e3fb1550` |
| Hollywood | `10f09bbbc267ec154390f89dbd206013cdf38f5dce6786d8fbbb4d377ccfcaf5` | `/tmp/cassidy-audit-batch1-frames/hollywood-contact.jpg` — `ecde592b0eff908dcaf53cb966be8dccb9bc2770663d48ff833c2afd5097f78a` |

## Findings

### Numbani — 447.52

- **Selected candidate and window:** candidate 1, `432.52`–`462.52`: “playing. So Cassidy, you want to be playing here in from this door frame and shooting down main here. Shooting down”.
- **Map identity:** established by the supplied `numbani/447.52.mkv` artifact together with the consistent futuristic city scene and repeated visible `AXIOM`/`AETRIA` environmental branding; no conflicting scene appears.
- **Side and objective phase:** defense during an active payload phase. The HUD says `STOP THE PAYLOAD` throughout and shows the payload track at the top.
- **Visible geometry:** Cassidy moves from the curved street beside the green bus to the recessed blue-interior doorway on the `AXIOM` corner. Local `00:12`–`00:17` shows the doorway interior and the firing sightline back through its rectangular opening; `00:18`–`00:21` shows the same opening from immediately outside/inside.
- **Continuous movement limit:** the clip supports only the short street-to-doorway approach and use of that frame as cover. It does not establish any route beyond the room.
- **Verdict: PASS.** This is an atomic, visibly demonstrated doorway position and sightline down the street.

### King's Row — 2357.359

- **Selected candidate and window:** candidate 2, `2342.359`–`2372.359`: “want you to don't go main and just come up the staircase on the right side and then make try to make this play. It's”.
- **Map identity:** established by the supplied `kings-row/2357.359.mkv` artifact and one continuous nighttime brick-and-stone London street/interior scene with the payload UI; no conflicting scene appears.
- **Side and objective phase:** payload phase. The replay changes observed player/side: local `00:00`–`00:07` says `STOP THE PAYLOAD`, while `00:09` onward says `ESCORT THE PAYLOAD`. The demonstrated stair traversal is in the latter, attacking view.
- **Visible geometry:** local `00:12` shows the street beside the red telephone box; `00:13` enters the right-side red-walled doorway, `00:14` is inside, `00:15` shows the staircase, and `00:16` reaches its upper opening/landing.
- **Continuous movement limit:** the right-side doorway-to-staircase-to-upper-opening segment is continuous at one-second resolution. Neither a start farther back nor the destination implied by “this play” is specified or demonstrated as part of that traversal.
- **Verdict: NARROW.** Retain only “enter the right-side red-walled doorway and climb its staircase to the upper opening”; reject the unspecified follow-on play.

### Rialto — 4037.68

- **Selected candidate and window:** candidate 2, `4022.68`–`4052.68`: “side is to come this way and play this door frame which can be quite good on Casty because it opens up this flank”.
- **Map identity:** established by the supplied `rialto/4037.68.mkv` artifact and its single consistent pale-stone, arched canal-city payload scene; no conflicting scene appears.
- **Side and objective phase:** attack during an active payload phase; the HUD says `ESCORT THE PAYLOAD` and the payload is visibly moving along the street.
- **Visible geometry:** local `00:14`–`00:18` shows the dark side-room entrance immediately off the payload street and the view from its rectangular frame back toward the payload. Local `00:24`–`00:29` repeatedly shows that same room, its arched windows, and the street-facing frame used as cover.
- **Continuous movement limit:** only the side-room doorframe position and its street/flank angle are supported. The clip does not continuously establish a route to it from a concrete earlier start.
- **Verdict: PASS.** The retained claim is the atomic visible doorframe position and angle, not an approach route.

### Havana — 5426.88

- **Selected candidate and window:** candidate 1, `5411.88`–`5441.88`: “So typically, you should try to just roll out this door here and then come up the right side and then play the deny.”
- **Map identity:** established by the supplied `havana/5426.88.mkv` artifact and the uninterrupted industrial distillery/factory payload scene; no conflicting map scene appears.
- **Side and objective phase:** defense during an active payload phase; the HUD says `STOP THE PAYLOAD`.
- **Visible geometry:** the entire usable sequence shows Cassidy fighting on or around an interior upper catwalk, tanks, stairs, crates, and railings. A doorway flashes at the far edge of some views, but the spoken rollout door, right-side path, and a concrete “deny” endpoint are not jointly identified.
- **Continuous movement limit:** no continuous rollout occurs. The clip cuts/replays and remains around the catwalk fight.
- **Verdict: REJECT.** The proposed door-to-right-side route and its destination are not visibly established; “the deny” is also non-geometric.

### Dorado — 6763.679

- **Selected candidate and window:** candidate 2, `6748.679`–`6778.679`: “only really one good play in my opinion and it's by playing the bridge. The bridge is so broken for Cassie. It's”.
- **Map identity:** established by the supplied `dorado/6763.679.mkv` artifact, visible `LUMÉRICO` branding, and the consistent later sunlit tiled-roof town scene; no contradictory named artifact is present.
- **Side and objective phase:** the clip contains a replay transition. Local `00:00`–`00:06` is defense (`STOP THE PAYLOAD`) in the Lumérico interior; local `00:12` onward is attack (`ESCORT THE PAYLOAD`) in the town. The bridge-position evidence is in the attacking segment.
- **Visible geometry:** local `00:16`–`00:23` places Cassidy in a covered elevated passage/bridge with rectangular openings overlooking the street and payload route. After a replay/options interruption, `00:25`–`00:29` shows the connected tiled rooftop overlook.
- **Continuous movement limit:** no complete route onto the bridge is shown, and the options/replay interruption prevents treating the later rooftop frames as continuous movement from it.
- **Verdict: PASS.** “Play the bridge” is an atomic visible position; no access route or continuous bridge-to-roof movement is accepted.

### Circuit Royal — 190.36

- **Selected candidate and window:** candidate 1, `175.36`–`205.36`: “don't really want to get stuck in main. I want to try to rotate to the high ground to try to push things out and”.
- **Map identity:** established by the supplied `circuit-royal/190.36.mkv` artifact and its uninterrupted illuminated luxury-circuit street scene; no conflicting scene appears.
- **Side and objective phase:** attack during an active payload phase; the top HUD shows the blue attacking payload track and the player repeatedly exits the same spawn/side doorway toward the street fight.
- **Visible geometry:** the clip shows an ornate red-and-gold interior doorway and the street immediately outside (`00:01`–`00:14`, again `00:16`–`00:29`). It does not visibly identify a high-ground endpoint or show a climb/rotation from main to one.
- **Continuous movement limit:** only doorway-to-street movement is continuous. That is not the claimed rotation.
- **Verdict: REJECT.** “High ground” remains ambiguous and the proposed main-to-high-ground route is absent.

### Hollywood — 14573.92

- **Selected candidate and window:** candidate 1, `14558.92`–`14588.92`: “shooting the Orisa. Um I come security room on the right side because I need to try to open up an angle. It's going to”.
- **Map identity:** established by the supplied `hollywood/14573.92.mkv` artifact, the visible studio-lot streets, and `HOLLYWOOD` lettering above the arch at local `00:17`–`00:18`.
- **Side and objective phase:** attack on objective A; the HUD explicitly says `ATTACK OBJECTIVE A`, and the point marker remains ahead.
- **Visible geometry:** the right-hand doorway is labeled `SECURITY` on its exterior. Local `00:09`–`00:12` continuously moves from the street beside the blue vehicle through that doorway into the monitor-filled security room; `00:15`–`00:16` shows the inside-to-street opening and `00:27`–`00:29` repeats both label and interior.
- **Continuous movement limit:** the accepted route begins only at the visible street/blue-vehicle position and ends inside the security room. The clip does not support an earlier approach or a further route beyond the room; the angle is simply the room's doorway/window view back to the objective street.
- **Verdict: PASS.** The short right-side street-to-labeled-security-room route and its outward angle are continuously visible.

## Counts and disposition

| Verdict | Count | Maps |
|---|---:|---|
| PASS | 4 | Numbani, Rialto, Dorado, Hollywood |
| NARROW | 1 | King's Row |
| REJECT | 2 | Havana, Circuit Royal |
| BLOCKED | 0 | — |
| **Total** | **7** | **7 maps** |

All seven acquisition blockers are resolved. Accepted evidence is limited to four atomic/continuous visible claims and one explicitly narrowed stair segment; the two clips that do not show their spoken movement claims are rejected rather than completed from transcript or map knowledge.
