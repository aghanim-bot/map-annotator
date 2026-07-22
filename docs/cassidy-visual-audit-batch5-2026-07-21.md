# Cassidy visual evidence audit, batch 5 — 2026-07-21

This is a visual-audit record, not a prompt-set or production-data change. It applies the same visible-evidence standard as the prior Cassidy audits to the five alternative clips selected in `cassidy-visual-audit-batch5-plan-2026-07-21.md` and three additional parent-selected follow-ups recorded in that plan's addendum. No application, catalog, deployment, or production file was changed.

## Method and source verification

The supplied artifacts are under `/opt/data/annotated-maps/cassidy-audit-batch5/<map>/`. I independently ran `sha256sum -c SHA256SUMS` in every map directory: **8 clips passed and 0 failed**. Independent reviewers repeated the checksum, decode, one-second-frame, contact-sheet, and pixel review for the original five clips and agreed with their final dispositions; the three parent-selected follow-ups were separately hash-verified, decoded, and pixel-reviewed. FFprobe reports H.264 video at 30 fps for all eight. Havana, Busan, and all three Suravasa clips are 640×360; Circuit Royal and both Antarctic Peninsula clips are 854×480. Container durations are 30.000–30.036 seconds.

I decoded the original seven clips to 30 one-frame-per-second PNGs at 512×288 and 5×6 contact sheets. The original temporary review set is `/tmp/cassidy-audit-batch5-frames/`: `FRAME-SHA256SUMS` contains hashes for **150 frames**, and `CONTACT-SHA256SUMS` contains hashes for **5 sheets**. The first follow-up set is `/tmp/cassidy-audit-batch5-alt2-frames/`: `FRAME-SHA256SUMS` contains hashes for **60 frames**, and `CONTACT-SHA256SUMS` contains hashes for **2 sheets**. The third follow-up was decoded non-destructively to 15 frames at two-second intervals and a 5×3 sheet under `/tmp/cassidy-suravasa-alt3-review-20260722/`; its contact sheet has SHA-256 `1e3652d08406162f175e6fc2ef3b65f388c520f081f8b781b7e9c27a2295dfd4`. Because every acquisition window is centered on its source anchor, clip-local `00:15` aligns with the named anchor. Verdicts use the decoded pixels, objective UI, and visible continuity. Narration, editor drawings, replay/free-camera cuts, generic flank speech, and deictic endpoints do not establish hidden geometry or traversal.

| Map | Source clip SHA-256 | Primary contact-sheet SHA-256 |
|---|---|---|
| Havana | `718be12f44ba345a42c8979df312c660cc52f52c601eb310efa466693095549a` | `ea06e7fcad057ec56ab53eb97485344c699dd6be11e805639f0724d7c0f9b0bc` |
| Circuit Royal | `2794d59d38b8bc14385441fb4c8f003864d18a3f22f338c730e5e3fed1bbc01a` | `6acca355da6704efd445010b7f98d4640c1ba9af1256c4fd35b6848707aad691` |
| Antarctic Peninsula | `792e744e818bd161c60c390d14598d1c670b62fd1d0376ae36cf062b51ba0f05` | `3e9ab9869f02d1d8465af98e5d2aee1c93e6e257626655c010349f479bb06539` |
| Busan | `e6b8f0c0ac32aaa0c742b264b5be7d61bc5a66784663c0d5c8d1d807d9bf650e` | `da5a854fab4ff8156c741e9aba001c76b20e918cb36e116499ec713a939140b0` |
| Suravasa | `b941d7d6ccd682939d25ba4f24e69d705be22db7707074001dcdc7c3e2c05a07` | `67a8bc999f4e23b77aa723a6a821de1b101b0955c1692e6599a5e03b52bdced4` |
| Antarctic Peninsula follow-up | `4f7e06cd2b590d4227a9c6bd0fc71b629f979b15fe747f9c72fcbfd594ce0188` | `c271f449bd133cdb6f5fe43c064f9ab915e7bba8248254aad2a73f823cbdff22` |
| Suravasa follow-up | `70608c54c11bb368c937182def63e558335776f66c9400a8f182268f0c04bd1a` | `7a88a2f5efa84f6ced1f3aaf1011275a2e41fd1530d0c08c4e87f3bcba31c1bc` |
| Suravasa third follow-up | `577543eda202690aebdd19d4766f91ab95e27b3fff72d5fb64a82ef627514fe1` | `1e3652d08406162f175e6fc2ef3b65f388c520f081f8b781b7e9c27a2295dfd4` |

## Findings

### Havana — 5058.4

- **Selected candidate and window:** candidate 2, `5043.4`–`5073.4`: “we come high ground. Okay, here I would be coming left window, not right window.”
- **Map/stage identity:** established by the named artifact and the uninterrupted colorful Havana payload street, including the visible `VIOLA Y ORSINO` mural. No exact checkpoint or numbered stage is displayed, so none is asserted.
- **Side and objective phase:** the observed blue Cassidy is defending during active payload play; the HUD says `STOP THE PAYLOAD`, and the payload is contested during the relevant sequence.
- **Exact atomic geometry:** local approximately `00:13.75`–`00:16.25` continuously moves from the street up the curved exterior steps, through the dark internal stair, and into a blue/teal upper room. Local approximately `00:16`–`00:24` holds the room's unbarred green-trimmed upper window, aiming down the payload street toward the mural. A barred adjacent opening is separately visible and distinguishes the retained window without relying on screen-left terminology.
- **Continuity limit:** the short steps/interior-stair-to-room movement is continuous. Around `00:25` the view cuts to an exterior editor/free camera, so the later facade views do not establish further traversal. The preceding spoken “high ground” is not expanded into a broader route.
- **Verdict: PASS.** Retain the atomic unbarred green-trimmed upper window facing the mural/payload street and, if needed, only the continuously shown street-steps/interior-stair entry to its room. Do not generalize “left window,” add a post-window route, or infer an exact roll.

### Circuit Royal — 670.12

- **Selected candidate and window:** candidate 3, `655.12`–`685.12`: “make the roll over to this right side. You typically want to play this right side.”
- **Map/stage identity:** established by the named artifact and the uninterrupted luxury nighttime Circuit Royal payload street. No exact checkpoint label is visible, so none is asserted.
- **Side and objective phase:** the observed blue Cassidy is defending during active payload play; `STOP THE PAYLOAD` is visible, with the payload contested in the relevant sequence.
- **Exact atomic geometry:** around local `00:14`–`00:23`, Cassidy repeatedly holds the narrow payload-lane strip between the large angled metal cart/barricade and the hotel/shop facade's pillar and display-window wall, firing down the lane. These objects ground the narrated right side to one visible position rather than a generic half of the map.
- **Continuity limit:** the live view continuously shifts into and holds this cover position, then advances around the cart into the broader lower lane around `00:23`–`00:25`. The pixels support the held position, but not a precise roll start or landing; no broader right-side route is accepted.
- **Verdict: PASS.** Retain only the specific right-side payload-lane cover position between the angled cart/barricade and the hotel/shop facade. Reject a generalized “play right side” instruction, an exact roll landing, or a route beyond the visible hold.

### Antarctic Peninsula — 428.28

- **Selected candidate and window:** candidate 2, `413.28`–`443.28`: “when my team is playing the left side, play the right side.”
- **Map/stage identity:** local `00:00`–`00:03` ends an Antarctic Peninsula **Icebreaker** Control round. After the round-complete screen, local `00:12` cuts to the next-stage spawn; visible `HYDROPONICS LAB` signage and the green-and-white interior establish **Labs**.
- **Side and objective phase:** blue wins the opening round 100%–94% and leads 1–0. After the cut, the observed Cassidy is blue in `PREPARE TO ATTACK` for the next Control round, with both teams at 0%.
- **Exact atomic geometry:** local `00:12`–`00:22` remains in Labs spawn facing its paired exit/door area and wall consoles; `00:23`–`00:29` only looks around the same spawn's lockers, console, ceiling, and doorway. The anchor at local `00:15` is stationary in spawn.
- **Continuity limit:** the round/stage transition breaks continuity. No exterior side lane, objective-side position, teammate left-side setup, or opposite right-side position is shown.
- **Verdict: REJECT.** The generic conditional “right side of the map” is not grounded in the pixels. The visible spawn geometry is incidental and must not be narrowed into a substitute prompt.

### Busan — 5749.28

- **Selected candidate and window:** candidate 3, `5734.28`–`5764.28`: “Don't drop here. Don't drop. You have to stay up top.”
- **Map/stage identity:** established by the named artifact and the continuous futuristic Busan Control interior. The central cylindrical pillar, curved raised ring, orange structural members, and broad exterior-facing apertures establish **MEKA Base**.
- **Side and objective phase:** the observed Cassidy is blue during active late Control play. Blue leads one round to zero and progresses toward 94%, while red has 74% banked; the point is contested late in the clip.
- **Exact atomic geometry:** local `00:00`–`00:05` moves from the interior approach up the short steps onto the raised curved ring. Local `00:06`–`00:17`, including the anchor, continuously holds and moves along that upper walkway beside the central pillar/orange structural column, firing across and down toward the lower objective-side lane.
- **Continuity limit:** local `00:18`–`00:25` pauses on the same upper position. Local `00:26`–`00:29` cuts to an overhead/editor view that separately confirms the ring, pillar, and lower drop geometry but cannot extend the live traversal. No drop or full rollout is accepted.
- **Verdict: PASS.** Retain the raised interior ring/walkway beside the central pillar and its angle over the lower objective-side lane, plus only the continuously shown short stair approach. Do not add a drop, a landing, or continuity through the overhead cut.

### Suravasa — 10773.359

- **Selected candidate and window:** candidate 2, `10758.359`–`10788.359`: “we should have gone flank ... We should have went bang.”
- **Map/stage identity:** established by the named artifact and uninterrupted sunlit Indian Suravasa architecture. The HUD identifies the active Flashpoint as **Objective C**.
- **Side and objective phase:** the observed Cassidy is blue while red owns Objective C at 35%, leads the match one round to zero, and has blue at 0% on the active point. Blue is attempting to retake or contest the red-controlled point.
- **Exact atomic geometry:** local `00:00`–`00:16` is a static view from a dark arched interior opening toward a sunlit street, overlaid with a magenta character mark and curved arrow. Later editor/free-camera views separately show an arch and side street, rounded terrace, patterned-wall doorway, an interior room, and Objective C's checkered capture floor and fountain.
- **Continuity limit:** cuts and occluded transitions separate every later exterior, interior, and point view. Cassidy never traverses a flank; the drawn arrow is instruction, not geometry or continuity. The speech names no object, start, endpoint, or unique position.
- **Verdict: REJECT.** Do not convert generic flank speech, the drawing, or disconnected editor views into an atomic position or route. The separately visible room, opening, terrace, and point are incidental rather than a supported narrowing of “flank.”

### Antarctic Peninsula — 625.36 (parent-selected follow-up)

- **Candidate and window:** parent-selected follow-up, `610.36`–`640.36`: “noticed is that the Ram is here and I am pretty sure I rotate to the other side of the map. Yeah. So the reason I rotate”. This was not selected from the original batch-5 shortlist process.
- **Map/stage identity:** established by the named artifact and continuous Antarctic Peninsula **Icebreaker** play. Snowbound green/orange research structures and the exterior `DRILL SITE` and `L SITE` markings are visible.
- **Side and objective phase:** the observed blue Cassidy is in active Control play. Blue leads one round to zero, holds 77%, and red's active-point progress rises from approximately 18% to 42% during the clip.
- **Exact atomic geometry and movement:** around local `00:14`–`00:20`, Cassidy enters the yellow-trimmed doorway into the green-striped interior room, where the allied Ramattra is concretely visible, and crosses the room. Around `00:20`–`00:30`, uninterrupted first-person play exits to the snowy exterior and continues along the outside of the `DRILL SITE`/`L SITE` structures to the gray doorway with an orange lower wall band.
- **Continuity limit:** the movement is continuous, but the narration's “other side of the map” is deictic and supplies no concrete endpoint. The review therefore retains only the visible doorway/interior/exterior movement and does not identify the final gray/orange doorway as “the other side,” infer a destination beyond it, or generalize the path into a map-wide rotation.
- **Verdict: NARROW.** Retain only the continuously visible movement from the yellow-trimmed doorway, across the green-striped room past the allied Ramattra, and around the marked snowy exterior to the gray/orange doorway.

### Suravasa — 12208.239 (parent-selected follow-up)

- **Candidate and window:** parent-selected follow-up, `12193.239`–`12223.239`: “I mean, there is a window, so just use a window. But it is not like there is no play to be made, right? It is just shoot people”. This was not selected from the original batch-5 shortlist process.
- **Map/stage identity:** established by the named artifact and the uninterrupted Suravasa Flashpoint architecture and HUD.
- **Side and objective phase:** the initial editor/spectator view shows blue at two points and 65% against red at zero points and 45%. The later live Cassidy view fights in and beside the active capture area; a spectator-options screen briefly interrupts the presentation around local `00:10`.
- **Exact atomic geometry:** local `00:00`–`00:09` is a static editor/spectator view of a turquoise building, stairs, and an arched entrance with a red drawing overlaid. After the menu interruption, local `00:11`–`00:29` shows Cassidy fighting from the capture-area edge and adjacent orange steps. No specific architectural window is indicated or used.
- **Continuity limit:** in context, “window” is an opportunity to make a play, not a visible architectural object. The static editor view, menu cut, and later live fight do not establish a continuous movement that narrows that opportunity into geometry.
- **Verdict: REJECT.** Do not convert the temporal “window,” the red drawing, the arched entrance, or the later point fight into an atomic window position or route.

### Suravasa — 10132.16 (third parent-selected follow-up)

- **Candidate and window:** parent-selected follow-up, `10117.16`–`10147.16`: “once you're here, you should just realize, dang, this angle sucks and then come back this way.” This was not selected from the original batch-5 shortlist process.
- **Map/stage identity:** established by the named artifact and the uninterrupted Suravasa Flashpoint architecture and HUD. The exact named active flashpoint/subarea is not displayed, so none is asserted.
- **Side and objective phase:** active Flashpoint play. The observed Cassidy is blue while red owns the active point at 35%, leads the match one round to zero, and has blue at 0% on the active point.
- **Exact atomic geometry:** the clip repeatedly shows Cassidy at a sheltered interior arched opening, aiming through it into the sunlit exterior lane. The arch's purple-lit trim and adjacent interior wall distinguish the retained opening from a generic lane or map side.
- **Continuity limit:** the presentation switches among first-person, third-person, and editor/free-camera views. Those changes prevent joining the separately visible exterior lane and later interior views into a continuous retreat, and the deictic “back this way” has no continuously demonstrated endpoint.
- **Verdict: NARROW.** Retain only the sheltered interior arched-opening position and its outward firing angle. Reject a retreat route, endpoint, “main” label, or outcome.

## Batch counts and disposition

| Verdict | Clip count | Clips/maps |
|---|---:|---|
| PASS | 3 | Havana, Circuit Royal, Busan |
| NARROW | 2 | Antarctic Peninsula follow-up, Suravasa third follow-up |
| REJECT | 3 | Antarctic Peninsula original, Suravasa original, Suravasa follow-up |
| BLOCKED | 0 | — |
| **Total** | **8** | **5 maps** |

All eight alternative clips were hash-verified, decoded, and visually audited. The three passes retain exact visible atomic positions. The Antarctic Peninsula follow-up narrows its claim to continuous visible movement without assigning the deictic endpoint, and the third Suravasa follow-up narrows to an atomic arched-opening position without inventing a retreat route. The original Antarctic Peninsula clip and the first two Suravasa clips remain rejects.

## Cassidy 30-map accepted-prompt coverage reconciliation

For this reconciliation, a map is **accepted-covered** when any Cassidy audit records at least one `PASS` or `NARROW` finding for that map. A map is **reject-only** when every completed visual candidate for it is `REJECT`. `docs/source-audit.md` supplies Blizzard World's supported audited prompts; the initial Cassidy visual audit supplies Paraíso; batches 1–4 supply the other 28 maps' first candidates; and this batch supersedes the reject-only coverage status—not the historical verdict—where an alternative clip now passes.

| Final coverage status | Count | Maps |
|---|---:|---|
| At least one PASS or NARROW | **30** | Aatlis, Antarctic Peninsula, Blizzard World, Busan, Circuit Royal, Colosseo, Dorado, Eichenwalde, Esperança, Havana, Hollywood, Ilios, Junkertown, King's Row, Lijiang Tower, Midtown, Neon Junction, Nepal, New Junk City, New Queen Street, Numbani, Oasis, Paraíso, Rialto, Route 66, Runasapi, Samoa, Shambali Monastery, Suravasa, Watchpoint: Gibraltar |
| Still only REJECT | **0** | — |
| **Scoped total** | **30** | **30 accepted-covered + 0 reject-only** |

Before batch 5, the audit record covered **25 of 30** maps with at least one `PASS` or `NARROW`, while Havana, Circuit Royal, Antarctic Peninsula, Busan, and Suravasa were reject-only. The alternative Havana, Circuit Royal, and Busan clips raised accepted coverage to **28 of 30**. The parent-selected Antarctic Peninsula follow-up raised it to **29 of 30**; the third Suravasa follow-up now establishes deliberately narrowed atomic evidence and raises Cassidy accepted-map coverage to **30 of 30**. This is evidence coverage, not authorization to change prompts or production data.
