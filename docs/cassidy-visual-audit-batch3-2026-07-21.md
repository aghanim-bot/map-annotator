# Cassidy visual evidence audit, batch 3 — 2026-07-21

This is a visual-audit record, not a prompt-set or production-data change. It applies the same visible-evidence standard as the prior Cassidy audits to exactly seven supplied clips. No application, catalog, deployment, production, or plan file was changed.

## Method and source verification

The seven selected candidates and 30-second windows come from `cassidy-visual-audit-batch3-plan-2026-07-21.md`. The supplied artifacts are under `/opt/data/annotated-maps/cassidy-audit-batch3/<map>/`. I independently ran `sha256sum -c SHA256SUMS` in every map directory: **7 clips passed and 0 failed**. FFprobe reports H.264 video at 640×360 and 30 fps for all seven, with container durations of 30.000–30.033 seconds.

I decoded each clip to 30 timestamped one-frame-per-second PNGs at 512×288 and a 5×6 contact sheet. The temporary review set is `/tmp/cassidy-audit-batch3-frames/`: `FRAME-SHA256SUMS` contains hashes for all **210 frames**, and `CONTACT-SHA256SUMS` contains hashes for all **7 sheets**. Verdicts use the decoded pixels, objective UI, and continuous visible movement. Narration, a drawn mark, a replay seek, or a viewpoint cut does not establish hidden traversal.

| Map | Source clip SHA-256 | Contact sheet SHA-256 |
|---|---|---|
| Antarctic Peninsula | `4e647457aa48212e68879b410d03e0606d57f0efc73be25bf18fd95b6a2a4bb4` | `8a5fc544c93e7cc17400b42d36de4ffcf04d497c45ffa05ae36e9b227f92f778` |
| Busan | `5dd175ac0ad50766ac1a34ff6d5e4b6a9ff8791443f810dc1584dddcda656cab` | `6edbdc8722ab5465c51dda2b143c6bbfcd39671764484a73e398bce52ca1f49a` |
| Ilios | `f2e5e11f0a17d751c0f0c5e463101486badbd7156e950c9f89cd1e775199bd9e` | `c7f7ad440dccac6184e80215ac22ebe136320e1cccca69cffd1d90660ed19208` |
| Nepal | `b003a3f68fd29624c095e4cdb0e47097ce5196629b0f926bbe6c3d0cc72787af` | `2ff0da4c9129670e24e95c3bd60bdef02342fff1aa33a97722d03beb77dec773` |
| Oasis | `3c5f63fdc51cfdb8f13b09f0447fc3f3f4e80af412a0bc86cc074d96bf6681ff` | `0399009a7634351ff5eb83636de7ca9d41177f7396b3701f45b560568b44547c` |
| Aatlis | `6589ffc25c3d4f3da878b28b61f5c4f5fb5da0d5436177738c657000e0bc57a0` | `639c255b93fc37c8bf4d3ddc1fddda9bc1ae50c56698352662cb71f3e81313de` |
| Suravasa | `c0231644554df201b18ce928b9f898ffbe4a17c9546f33b4a22116f3ba197dc5` | `f5647459752e7ef1a4c9675ef71eb19d1d3223c829ae7211b36e998b9d4bdc6b` |

## Findings

### Antarctic Peninsula — 119

- **Selected candidate and window:** candidate 1, `104`–`134`: “My goal on the rollout here is to go to the high ground.”
- **Map identity and stage:** established by the supplied `antarctic-peninsula/119.mp4` artifact and the consistent snowbound industrial exterior. The outdoor machinery and exposed icy objective area establish the Control stage as **Icebreaker**.
- **Side and objective phase:** the observed Cassidy is on blue. Local `00:00`–`00:15` is `PREPARE TO ATTACK` in spawn; after menu/replay interruptions, `00:23` onward says `ACTIVATING OBJECTIVE` in the opening Control round.
- **Visible geometry:** the early sequence holds the two-panel spawn exit and its narrow windows. The later sequence separately shows the snowy exterior, objective structure, and surrounding cover.
- **Continuity limit:** the clip never identifies a specific high-ground endpoint or continuously shows a rollout to one. Menus and the abrupt transition from spawn to the exterior prevent joining those positions into a route.
- **Verdict: REJECT.** “High ground” remains ambiguous, and the claimed rollout is not visibly demonstrated.

### Busan — 5211.12

- **Selected candidate and window:** candidate 1, `5196.12`–`5226.12`: “You can flank out this window.”
- **Map identity and stage:** established by the supplied `busan/5211.12.mp4` artifact and the traditional Korean temple complex with autumn foliage. The visible Control stage is **Sanctuary**.
- **Side and objective phase:** the overhead replay UI shows an opening Control round at 0–0 with `CONTROL POINT UNLOCKS IN`; local `00:24` onward changes to active first-person fighting. The cut changes viewpoint and observed player context, so it is not one continuous demonstration.
- **Visible geometry:** local `00:00`–`00:22` is a fixed overhead/editor view of the central roofed temple and adjacent lanes. Yellow drawn lines and boxes accumulate over that view. Local `00:24`–`00:29` shows a separate ground-level fight among the temple pillars and steps.
- **Continuity limit:** no player traverses a window, and the claimed window is not uniquely identifiable from the overhead pixels. The drawing cannot prove the object's identity, access, or a flank route; the later first-person cut does not repair that gap.
- **Verdict: REJECT.** The spoken window flank is neither an established atomic position nor a continuous route.

### Ilios — 3431.44

- **Selected candidate and window:** candidate 1, `3416.44`–`3446.44`: “poke out for the mini room. You get mini room control.”
- **Map identity and stage:** established by the supplied `ilios/3431.44.mp4` artifact and the continuous white-and-blue seaside village. The coastal buildings and lighthouse-side settlement establish the Control stage as **Lighthouse**.
- **Side and objective phase:** the replay/editor HUD shows blue and red at 0–0 while the control point unlock countdown runs. No later captured phase is shown.
- **Visible geometry:** the free camera repeatedly shows the compact ground-floor room with a central pillar, two exterior openings, wall displays, and a visible health-pack pad (`00:00`–`00:04`, `00:09`–`00:19`). It also shows the immediately adjacent exterior lane and stairs from multiple viewpoints.
- **Continuity limit:** the clip supports the room as an atomic position with outward angles. It does not show a player continuously poking into it or taking control, and “mini room” is retained only as the spoken room name—not as a health-pack-size claim.
- **Verdict: PASS.** Retain only the visible room position and its exterior openings; do not add an approach route or control outcome.

### Nepal — 2000.44

- **Selected candidate and window:** candidate 2, `1985.44`–`2015.44`: “I stand on this bridge so that when someone does rotate main, I can stuff the rotation.”
- **Map identity and stage:** established by the supplied `nepal/2000.44.mp4` artifact and the uninterrupted snowy red-brick settlement. The exterior houses, bridge, and courtyard establish the Control stage as **Village**.
- **Side and objective phase:** the observed Cassidy is on blue in the opening Control round. The HUD counts down to unlock and remains 0–0 through the demonstrated bridge position.
- **Visible geometry:** local `00:00` exits a small room onto the snow; `00:01`–`00:04` moves onto the wooden-railed bridge. Cassidy then holds that elevated bridge and aims across the central red-building lane through `00:26`, before moving into the connected interior at `00:27`–`00:29`.
- **Continuity limit:** the short room-exit-to-bridge movement and bridge angle are continuous. The clip does not show an enemy completing the narrated main rotation, so no denial result or broader team-strategy claim is retained.
- **Verdict: PASS.** Retain the visible bridge position, its angle toward the central lane, and only the continuously shown short approach onto it.

### Oasis — 9307.92

- **Selected candidate and window:** candidate 1, `9292.92`–`9322.92`: “this is a plain main situation right now or play on high ground guard.”
- **Map identity and stage:** established by the supplied `oasis/9307.92.mp4` artifact and the consistent gold-stone garden complex, water, palms, and arched architecture. The visible Control stage is **Gardens**.
- **Side and objective phase:** active Control play. The overhead replay HUD shows blue at 44% and red at 21%; after the viewpoint cut, red advances to 25% while the observed first-person Cassidy is on red.
- **Visible geometry:** local `00:00`–`00:18` is a fixed elevated replay/editor view of an arched lane, stair edge, and lower courtyard, with drawn figures and circles. Local `00:19`–`00:29` cuts to Cassidy holding an interior arched doorway framed by blue lighting and firing toward the objective-side exterior.
- **Continuity limit:** the first-person segment supports the doorway as an atomic firing position, but the clip does not visibly establish whether the narration meant that position by “main” or “high ground.” No movement connects the overhead view to the later doorway.
- **Verdict: NARROW.** Retain only the visible interior arched-doorway position and its exterior angle. Reject the main/high-ground label, the unshown access route, and the drawn tactical instruction.

### Aatlis — 11330.96

- **Selected candidate and window:** candidate 3, `11315.96`–`11345.96`: “you actually could just drop main like this and go for this play.”
- **Map identity and stage:** established by the supplied `aatlis/11330.96.mp4` artifact and the uninterrupted blue-violet North African futuristic architecture. The HUD establishes Flashpoint; the exact named active flashpoint/subarea is not displayed, so none is asserted.
- **Side and objective phase:** active opening Flashpoint play, observed from blue. Both teams are at 0 points, and the HUD counts down `FLASHPOINT UNLOCKS IN` during the relevant sequence.
- **Visible geometry:** most frames show Cassidy holding a sheltered upper corner beside a rectangular exterior opening (`00:00`–`00:16`, `00:19`–`00:29`). Local `00:17`–`00:18` abruptly changes to a dark stairwell/editor view and then returns.
- **Continuity limit:** the upper corner/opening and the stairwell are separately visible, but the viewpoint cut does not show Cassidy dropping or prove a continuous connection to “main.” The follow-on “play” has no concrete visible endpoint.
- **Verdict: NARROW.** Retain only the upper corner and exterior-opening angle as an atomic position. Reject the drop-to-main route and unspecified follow-on play.

### Suravasa — 10725.12

- **Selected candidate and window:** candidate 1, `10710.12`–`10740.12`: “if he's going main because he said, ‘Okay, my Reaper has a deep flank. I'm going to go main.’ Then this is fine.”
- **Map identity and stage:** established by the supplied `suravasa/10725.12.mp4` artifact and the consistent sunlit Indian garden architecture. The HUD establishes active Flashpoint play; no exact named flashpoint/subarea is displayed.
- **Side and objective phase:** the replay HUD shows red leading one round to zero and holding the active point at 35%; blue has 0% on that point. The observed/editor view is not assigned a player side.
- **Visible geometry:** the clip is almost entirely a paused replay/editor view from a dark interior opening toward an exterior arched lane. A pink circle and other drawn marks are added; no character traverses the opening or a route called main.
- **Continuity limit:** “main” is not uniquely grounded in the visible pixels, and the proposed choice depends on generic team-strategy speech about Reaper's hidden deep flank. Neither that flank nor Cassidy's conditional movement is shown.
- **Verdict: REJECT.** Do not convert the conditional team strategy, drawn mark, or unnamed main route into spatial evidence.

## Counts and disposition

| Verdict | Count | Maps |
|---|---:|---|
| PASS | 2 | Ilios, Nepal |
| NARROW | 2 | Oasis, Aatlis |
| REJECT | 3 | Antarctic Peninsula, Busan, Suravasa |
| BLOCKED | 0 | — |
| **Total** | **7** | **7 maps** |

All seven supplied clips were verified and visually audited. Accepted evidence is limited to two directly visible atomic/continuous claims and two deliberately narrowed atomic positions. Ambiguous high ground or main labels, drawn routes, viewpoint-cut movement, and conditional team-strategy speech are rejected rather than completed from narration or map knowledge.
