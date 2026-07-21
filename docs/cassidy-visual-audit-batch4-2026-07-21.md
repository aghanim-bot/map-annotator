# Cassidy visual evidence audit, batch 4 — 2026-07-21

This is a visual-audit record, not a prompt-set or production-data change. It applies the same visible-evidence standard as the prior Cassidy audits to exactly seven supplied clips. No application, catalog, deployment, production, or plan file was changed.

## Method and source verification

The seven selected candidates and exact 30-second windows come from `cassidy-visual-audit-batch4-plan-2026-07-21.md`. The supplied artifacts are under `/opt/data/annotated-maps/cassidy-audit-batch4/<map>/`. I independently ran `sha256sum -c SHA256SUMS` in every map directory: **7 clips passed and 0 failed**. FFprobe reports H.264 video for all seven. Junkertown, Route 66, Shambali Monastery, and Watchpoint: Gibraltar are 640×360 at 30 fps; Esperança is 854×480 at 30 fps; New Queen Street and Neon Junction are 1280×720 at 60 fps. Container durations are 30.000–30.033 seconds.

I decoded each clip to 30 timestamped one-frame-per-second PNGs at 512×288 and a 5×6 contact sheet. The temporary review set is `/tmp/cassidy-audit-batch4-frames/`: `FRAME-SHA256SUMS` contains hashes for all **210 frames**, and `CONTACT-SHA256SUMS` contains hashes for all **7 sheets**. Verdicts use the decoded pixels, objective UI, and visible continuity. Narration, an editor/free-camera jump, a drawn route, or a replay cut does not establish hidden traversal.

| Map | Source clip SHA-256 | Contact sheet SHA-256 |
|---|---|---|
| Junkertown | `dae76a4d41b0210e567ebc43fb4bbb674764856110fde4a75a35b5771fd61f9d` | `4c4fe4f3dc3436bd3e2d6fa2d6ce9ef52bd01d5a9a8dafdf07fa69b0cc34ae4c` |
| Route 66 | `d2c479e2398af5e4c9cc0481dc77d81ae2cdb3de1f7708ad8fca7cb20ba426e6` | `31ec90bb1bf2bda5f1a84793ed2da6a9c8ed652ef3132d1f612c9589f8aa2681` |
| Shambali Monastery | `90434621cef1fcf29805285317d14a950d3b9ebcb2176521d292bef74303a3cf` | `461e49fca307f0915f96730b9e6cf4c30f2bd29627d2357fca80c3419fcb7396` |
| Watchpoint: Gibraltar | `dc19239e3c8dd1f363f1d853f4474f409d008e981250cd6cc6a2a63e100b95a6` | `b6bd5d4c365397cea5fe35ccc00f1112d8f88d88ea38b4d9b9ae201df335e138` |
| Esperança | `6d05883bc0a35d950ba39d68d2af6da073b8446221502a32d185c64de44211c4` | `32479b378c4fedb9f596b959c6a86037a60c7fee4c60cdd72fd6077ffadd8cf4` |
| New Queen Street | `3a56d0d03b95c49b72e4b10dd9297dcc0061e12dc0bbfb92e6df8a21da9f047a` | `71022165417033fd609ab80ca1575f41cc7881094a9a864f66b574617a0d79a0` |
| Neon Junction | `823b52bf7c2365a2bc0abd0a1b9fe0fefb1a77a0fe4f3447f9c86b0be5efdb2b` | `ec2f7e0d35cdcb77d282ce4f8041e46377195f215507a3a16f0adad10abf9070` |

## Findings

### Junkertown — 8936.56

- **Selected candidate and window:** candidate 2, `8921.56`–`8951.56`: “come this side. Walk up the stairs.”
- **Map/stage identity:** established by the named artifact and the uninterrupted Australian scrapyard payload scene. The clip does not display a more exact named subarea.
- **Side and objective phase:** attack during an active payload phase; `ESCORT THE PAYLOAD` is visible through the relevant sequence.
- **Visible geometry:** the clip changes from live main-road play to editor/free-camera views around wooden catwalks, small rooms, windows, exterior ledges, a trough, side alleys, and finally a broad exterior staircase at local `00:28`. These views identify the staircase and nearby scrap-built structures separately.
- **Continuity limit:** no continuous movement begins at a concrete “this side” position and climbs the staircase. Dark/clipped frames and repeated viewpoint jumps separate the displayed objects, and the stairs appear only near the end.
- **Verdict: NARROW.** Retain only the broad exterior staircase as atomic geometry. Reject the narrated side-to-stairs route and any endpoint beyond the stair view.

### Route 66 — 13466.319

- **Selected candidate and window:** candidate 2, `13451.319`–`13481.319`: “left side, you have this rotation to the high ground ... You can drop.”
- **Map/stage identity:** established by the named artifact and the consistent industrial Route 66 payload interior. No more exact named subarea is visibly established.
- **Side and objective phase:** defense during an active payload phase; the HUD says `STOP THE PAYLOAD` throughout.
- **Visible geometry:** editor/replay views repeatedly show an upper dark platform/ledge overlooking the payload floor, a doorway into a red-walled side room, and that room's opening back toward the fight.
- **Continuity limit:** the clip jumps among overhead, room, and floor-facing views. It never shows a left-side approach onto the upper platform or a completed drop from it.
- **Verdict: NARROW.** Retain the upper overlook and red-walled room opening as separate atomic positions. Reject the left-side rotation, flank, and drop as unverified movement.

### Shambali Monastery — 2180.88

- **Selected candidate and window:** candidate 3, `2165.88`–`2195.88`: “If you're in tower, you can late flank behind ... you would drop.”
- **Map/stage identity:** established by the named artifact and the continuous snowy Himalayan monastery payload environment. The clip does not show a uniquely named subarea label.
- **Side and objective phase:** defense during an active payload phase; `STOP THE PAYLOAD` is visible in the reviewed UI.
- **Visible geometry:** the early frames show the payload road and adjacent stone openings. Later free-camera views separately show snowy upper walkways, a tower-like red-and-stone structure, and an elevated opening/ledge overlooking lower roofs and road geometry.
- **Continuity limit:** cuts and viewpoint changes separate the road, upper walkway, tower opening, and lower area. No player or camera continuously traverses from inside the tower, behind the fight, and down to an endpoint.
- **Verdict: NARROW.** Retain only the tower-side elevated opening/ledge as an atomic angle. Reject the late flank, drop, and any claimed landing position.

### Watchpoint: Gibraltar — 2688

- **Selected candidate and window:** candidate 1, `2673`–`2703`: “dropping into shuttle, grabbing mini, and standing here.”
- **Map/stage identity:** established by the named artifact and the uninterrupted Watchpoint hangar/shuttle environment.
- **Side and objective phase:** defense during an active payload phase; the HUD visibly says `STOP THE PAYLOAD`.
- **Visible geometry:** live/replay frames show the hangar fight around the shuttle. At local `00:14` a small blue health-pack pickup is visibly present at the end of a lower passage; later editor views repeatedly show the top/side of the shuttle and its angle across the hangar.
- **Continuity limit:** the clip does not show a continuous drop into the shuttle area, travel to the pickup, and movement to the final standing angle. The pickup passage and shuttle-top views are separated by replay/editor viewpoint changes.
- **Verdict: NARROW.** Retain the shuttle-top/side overlook and the separately visible lower-passage small health pack as atomic geometry. Reject the ordered drop–pickup–stand route.

### Esperança — 1016.92

- **Selected candidate and window:** candidate 1, `1001.92`–`1031.92`: “rotate to here ... you really want to play on this bridge.”
- **Map/stage identity:** established by the named artifact and its consistent Portuguese streetscape during Push. No exact named checkpoint is displayed.
- **Side and objective phase:** the observed Cassidy is on blue during active Push play; both teams' distances and the running match state are visible.
- **Visible geometry:** local `00:00`–`00:19` continuously holds and fights from the elevated stone bridge/terrace beside a large arched doorway, looking down onto the robot lane and lower stairs. At about `00:20` Cassidy leaves that position and joins the lower fight.
- **Continuity limit:** no approach onto the bridge from a concrete earlier start is shown, so the spoken rotation is not accepted. The bridge itself and its downward angle are continuously visible.
- **Verdict: PASS.** Retain the atomic elevated bridge/terrace position beside the stone arch and its angle onto the robot lane; do not add an access route.

### New Queen Street — 1448.32

- **Selected candidate and window:** candidate 1, `1433.32`–`1463.32`: “come right side, roll across the bus, and set up on this high ground.”
- **Map/stage identity:** established by the named artifact and the uninterrupted snowy Toronto Push streetscape.
- **Side and objective phase:** opening Push setup from the blue player's view; the HUD says the robot unlocks in 35 seconds at local `00:14`, and both teams are at zero distance.
- **Visible geometry:** one mostly static replay view shows the curved street, a bus at the right edge, the low corner building/awning, and higher facade/ledge geometry. Green drawing progressively marks an intended path and rectangular elevated endpoint.
- **Continuity limit:** neither Cassidy nor the camera traverses the proposal. The drawing is instruction, not pixel evidence of movement, connectivity, a roll across the bus, or a reachable high-ground landing.
- **Verdict: NARROW.** Retain the bus and marked elevated facade/ledge as separate atomic geometry. Reject the right-side bus-to-high-ground route and exact roll landing.

### Neon Junction — 181.36

- **Selected candidate and window:** candidate 3, `166.36`–`196.36`: “play on this left-side corner of the statue, and then back up.”
- **Map/stage identity:** established by the named artifact and the uninterrupted bright commercial Neon Junction environment. The objective UI identifies the visible Clash stage as **Objective A**.
- **Side and objective phase:** defense of Objective A; `DEFEND OBJECTIVE A` is visible, with the observed Cassidy on blue.
- **Visible geometry:** the large red statue stands on a raised purple plinth in the center street. Cassidy repeatedly uses the plinth's street-left corner and adjacent bus-side lane as cover while aiming toward the attackers; the same corner remains identifiable across the brief scoreboard interruption at local `00:16`.
- **Continuity limit:** the clip supports the corner as an atomic position. It does not define a concrete endpoint for the narrated “back up,” so no retreat route is accepted.
- **Verdict: PASS.** Retain the statue-plinth street-left corner as the Objective A defensive position. Reject any unspecified continuation away from it.

## Counts and disposition

| Verdict | Count | Maps |
|---|---:|---|
| PASS | 2 | Esperança, Neon Junction |
| NARROW | 5 | Junkertown, Route 66, Shambali Monastery, Watchpoint: Gibraltar, New Queen Street |
| REJECT | 0 | — |
| BLOCKED | 0 | — |
| **Total** | **7** | **7 maps** |

All seven supplied clips were independently verified and visually audited. The two passes are atomic visible positions. The five narrowed findings preserve only separately visible geometry; none promotes a cut, free-camera jump, editor drawing, narration, or hidden movement into a continuous route.
