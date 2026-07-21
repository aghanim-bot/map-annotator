# Cassidy visual evidence audit, batch 2 — 2026-07-21

This is a visual-audit record, not a prompt-set or production-data change. It applies the same visible-evidence standard as the prior Cassidy audits to exactly seven supplied clips. No application, catalog, deployment, production, or plan file was changed.

## Method and source verification

The seven selected candidates and 30-second windows come from `cassidy-visual-audit-batch2-plan-2026-07-21.md`. The supplied artifacts are under `/opt/data/annotated-maps/cassidy-audit-batch2/<map>/`. I independently ran `sha256sum -c SHA256SUMS` in every map directory: **7 clips passed and 0 failed**. FFprobe reports H.264 video for all seven. Colosseo, Eichenwalde, and New Junk City are 1280×720 at 60 fps with Vorbis audio; Lijiang Tower, Runasapi, Midtown, and Samoa are 640×360 at 30 fps with AAC audio. Container durations are 30.000–30.033 seconds.

I decoded each clip to 30 timestamped one-frame-per-second PNGs at 512×288 and a 5×6 contact sheet. The temporary review set is `/tmp/cassidy-audit-batch2-frames/`: `FRAME-SHA256SUMS` contains hashes for all **210 frames**, and `CONTACT-SHA256SUMS` contains hashes for all **7 sheets**. Verdicts use the actual decoded pixels, UI, and continuous visible movement. A drawn line, narration, replay seek, free-camera jump, or view cut does not establish hidden traversal.

| Map | Source clip SHA-256 | Contact sheet SHA-256 |
|---|---|---|
| Colosseo | `53e76889067888a36a2465071b8cd09a50b27af62bbc822f573e5f44128840d9` | `8ab9fc0f24bff3ca07c0dc3330c3f755fffd6b06dfd709012fff28e0771ae226` |
| Eichenwalde | `6b5e57285a3f3fe41764e0ddf4f28f9bb572262b214fb3f3a415f5d0deb4afaa` | `874fa630858c88a4c038c4790ee0c6de6ae5f5f35c3095b6e230f74932434ee6` |
| New Junk City | `f0e16c595d2eec92388f3248381cca8229c07847a4d8fd909e7640fcb1bef659` | `f2e3e6eb69a72ee8fc8c17ae12ae29f8ae1084c6d330c3eaf7afa9fdec9f764b` |
| Lijiang Tower | `2484156e8cc9840099100b4150570d02cf51390aa4138769f8578dccf3eba141` | `626b08f62531f940c8015799b31cd009f8c8277ecfb857da5ef4b986859abb1f` |
| Runasapi | `6555b4d086b7045759912569d8104b0206920b5a333de72920dab7f3b34c58ea` | `a1185ec4885f8a22186dbf05ed426e6297ba75a72adc777ac379c7249b3d1f92` |
| Midtown | `30da4f12f60e1b6a90eb073855fd9f210088762b4e6ce1347c3ca7dd7e4b1174` | `deb63dde9906c8f0f5a846ddd71b7e7c06acde04f352fbd3f2f89bedc2314ed3` |
| Samoa | `521840072aca822396e5f64e22fff9778f5ce043c8e7d3182aeb834346a159e2` | `d8f380a1242b1b9e8738f8574326d33c463ea6b913e5c414102c34d985f74705` |

## Findings

### Colosseo — 931.839

- **Selected candidate and window:** candidate 1, `916.839`–`946.839`: “roll backwards through this window and then drop and come back to main and reset.”
- **Map identity:** established by the supplied `colosseo/931.839.mkv` artifact and its uninterrupted Roman streetscape, arches, ochre facades, and Push HUD; no conflicting scene appears.
- **Side and objective phase:** the observed Cassidy is on the blue team during active Push play. The top HUD shows blue and red robot distances and a running match clock. A named checkpoint or more exact route phase is not legible, so none is asserted.
- **Visible geometry:** local `00:12` shows the curved main street beside a stone corner; `00:13` shows a blue-lit rectangular window looking onto that same street. Local `00:15`–`00:17` changes to an exterior/editor view of a green door and shallow steps before returning to the earlier street fight at `00:18`.
- **Continuous movement limit:** the window and its street angle are atomic visible geometry. Cassidy is not shown rolling through it, dropping, or continuously returning to main; the intervening viewpoint change cannot supply those legs.
- **Verdict: NARROW.** Retain only the blue-lit window position and its view onto the curved main street. Reject the spoken window-to-drop-to-main route.

### Eichenwalde — 3200.4

- **Selected candidate and window:** candidate 1, `3185.4`–`3215.4`: “come mini room. And then you're just going to shoot from here.”
- **Map identity:** established by the supplied `eichenwalde/3200.4.mkv` artifact and the consistent half-timbered village, forest, castle walls, and Objective A UI.
- **Side and objective phase:** this is the pre-round Objective A setup. The replay changes observed side: `PREPARE YOUR DEFENSE` is visible at `00:19`, while `PREPARE TO ATTACK` appears from `00:20` onward. The geometry demonstration before that switch is therefore not assigned to one observed player side.
- **Visible geometry:** the free camera repeatedly identifies the small ground-floor room: a health-pack pad is visible inside, guitars hang on the wall, and its wide doorway opens toward the exterior stairs/castle side (`00:05`, `00:09`, and `00:13`–`00:18`). The later attacker view stands beside the same exterior stair area (`00:26`–`00:29`).
- **Continuous movement limit:** the clip supports the room as an atomic firing position through its wide opening. It does not show a continuous attacker rollout from spawn or another concrete start into that room; the replay-side transition also prevents joining the later attacker frames to the free-camera sequence.
- **Verdict: PASS.** Retain the visible small-room position and outward doorway angle only. “Mini room” is not strengthened into a health-pack size claim, and no rollout route is accepted.

### New Junk City — 6283.76

- **Selected candidate and window:** candidate 1, `6268.76`–`6298.76`: “make this rotation and you can play this high ground here or sorry, this cover and this high ground.”
- **Map identity:** established by the supplied `new-junk-city/6283.76.mkv` artifact and the uninterrupted overhead view of the map's orange scrap-metal industrial arena.
- **Side and objective phase:** active Flashpoint play is visible in the HUD: blue leads one round to zero and has 52% on the active point. The exact named flashpoint/subarea is not displayed or otherwise uniquely visible, so it remains unspecified.
- **Visible geometry:** the clip remains on one overhead replay/editor view. Green drawing marks a curved ground-level approach, a small square cover position at its left end, a long narrow elevated strip along the left wall, and a second small square position above (`00:13`–`00:28`).
- **Continuous movement limit:** no character or camera traverses the proposed rotation. The progressively drawn line records an instruction, not visible movement, and does not prove connectivity, access, or a complete route.
- **Verdict: NARROW.** Retain only the separately visible/marked cover and elevated strip as atomic geometry. Reject the rotation and any claim that the drawing demonstrates a continuous route onto the high ground.

### Lijiang Tower — 9413.76

- **Selected candidate and window:** candidate 1, `9398.76`–`9428.76`: “Come back bridge. I like playing bridge. Good angle.”
- **Map identity:** established by the supplied `lijiang-tower/9413.76.mp4` artifact and the consistent nighttime Chinese garden architecture. The curved outdoor bridge and circular moon-gate identify the visible stage as **Garden**.
- **Side and objective phase:** the observed Cassidy is on blue during Control. Replay seeks reset the early-round state: some live frames show blue capture percentage increasing, while later replayed frames say `ACTIVATING OBJECTIVE`; both are opening active/activating views of the same Garden point rather than a continuous match timeline.
- **Visible geometry:** local `00:13`–`00:18` repeatedly shows Cassidy holding the curved bridge, using its low sidewall while aiming toward the circular gate and adjacent courtyard.
- **Continuous movement limit:** no access route onto or back to the bridge is shown. The clip supports only the atomic bridge position and its gate/courtyard angle.
- **Verdict: PASS.** “Play bridge” is directly visible; no approach or retreat route is added.

### Runasapi — 12570.319

- **Selected candidate and window:** candidate 1, `12555.319`–`12585.319`: “Don't flank here. I don't think this flank is good.”
- **Map identity:** established by the supplied `runasapi/12570.319.mp4` artifact and its continuous Andean street scene, including the visible `MODA TEXTIL` storefront.
- **Side and objective phase:** the observed Cassidy is on blue during active Push play. The top HUD shows both teams' robot distances and a running clock; no exact named checkpoint is visible.
- **Visible geometry:** local `00:13`–`00:19` shows the red-walled side room and its blue-lit street doorway. Local `00:20`–`00:24` switches to an exterior/replay view that identifies the doorway beneath the `MODA TEXTIL` sign and the short stairs outside; `00:25` returns inside the same room.
- **Continuous movement limit:** the side room/storefront doorway is identifiable, so the negative advice may be tied to that concrete object. The cut to an exterior viewpoint does not show Cassidy completing a flank through the room, nor does it establish a farther endpoint.
- **Verdict: NARROW.** Retain only “do not use the `MODA TEXTIL` side-room doorway as this flank.” Reject a broader flank route, destination, or claim about hidden movement beyond the room.

### Midtown — 9952.8

- **Selected candidate and window:** candidate 2, `9937.8`–`9967.8`: “Keep going. You're coming all the way to the mega room and you're playing here.”
- **Map identity:** established by the supplied `midtown/9952.8.mp4` artifact and the uninterrupted New York streetscape, including `NYPD RESCUE`, `BUS STOP`, taxi, and station architecture.
- **Side and objective phase:** attack on Objective A; `ATTACK OBJECTIVE A` and the red A marker are visible throughout the relevant sequence.
- **Visible geometry:** local `00:10`–`00:12` continuously moves from the street/taxi position through the open green-lit side entrance. Local `00:13`–`00:17` is inside the connected utility room, with lockers, a water cooler, benches, and the orange-framed exit back toward the objective street.
- **Continuous movement limit:** the accepted movement begins at the visible sidewalk beside the taxi, enters the green-lit doorway, and ends in the utility room. It does not establish an earlier route or movement through the farther orange-framed exit. The narration's “mega room” is retained only as a room name and is not strengthened to “mega health pack.”
- **Verdict: PASS.** The sidewalk-to-side-room segment and the atomic room position are continuously visible.

### Samoa — 3754.88

- **Selected candidate and window:** candidate 3, `3739.88`–`3769.88`: “if it's dangerous you have to just go through the hallway. You play in the hallway like this. Play this angle.”
- **Map identity:** established by the supplied `samoa/3754.88.mp4` artifact and the consistent volcanic industrial facility. The exposed lava-lit exterior and machinery establish the visible Control stage as **Volcano**.
- **Side and objective phase:** opening Control round, observed from the blue player view. Both teams are at 0%, and the HUD counts down `CONTROL POINT UNLOCKS IN` during the demonstrated position.
- **Visible geometry:** local `00:03`–`00:07` shows the interior hallway and its two openings; the view then continues down the narrow blue-lit passage and emerges beside the point structure at `00:08`–`00:12`. Later frames separately revisit the adjacent stairs, pillars, and hallway openings.
- **Continuous movement limit:** the clip supports the short interior-hallway-to-point-side opening segment and the atomic angle from that hallway. It does not support an approach before the visible interior room or a continuation across the point.
- **Verdict: PASS.** Retain the visible hallway position/angle and only the continuously shown exit segment.

## Counts and disposition

| Verdict | Count | Maps |
|---|---:|---|
| PASS | 4 | Eichenwalde, Lijiang Tower, Midtown, Samoa |
| NARROW | 3 | Colosseo, New Junk City, Runasapi |
| REJECT | 0 | — |
| BLOCKED | 0 | — |
| **Total** | **7** | **7 maps** |

All seven supplied clips were verified and visually audited. The accepted evidence consists of four visible atomic positions or short continuous segments and three deliberately narrowed claims. No hidden movement, editor-drawn route, or traversal across a replay/viewpoint cut is promoted to a continuous route.
