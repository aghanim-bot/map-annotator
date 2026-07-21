# Tracer visual evidence audit, batch 1 — 2026-07-21

This is a visual-audit record, not a prompt-set or production-data change. It applies the repository's map-annotation evidence standard to six independently supplied Tracer clips for Shambali Monastery and Paraíso. No application, catalog, deployment, or production file was changed.

These are **2023 sources**: Shambali Monastery was uploaded `2023-02-10` and Paraíso was uploaded `2023-05-28`. Every verdict below is historical visual evidence only. Current-2026 geometry still needs regression confirmation against a current-version capture and the dated 2026 corpus; **none of these rows is current-version approved**.

## Method and source verification

Candidates and exact ASR text come from `tracer-source-cover-2026-07-21.md`. I also reviewed `tracer-source-segmentation-2026-07-21.md`; its segmentation result does not identify these maps or replace the title-plus-clip evidence used here. The requested map-annotation skill was not present in this worktree or the available installed skills, so the audit follows the same visible-pixels, visible-UI, atomic-position, and continuous-route standard documented by the repository's existing visual audits.

The six named clips are under `/opt/data/annotated-maps/tracer-visual-audit-batch1/<map>/`. I ran `sha256sum -c SHA256SUMS` independently in both map directories before decoding: **6 passed, 0 failed**. `ffprobe` reports H.264 video at 640×360 for all six clips. The Paraíso clips are 30.000 seconds at 30 fps; the Shambali clips are 30.030–30.063 seconds at 29.97 fps.

I decoded every clip to one PNG frame per second and a 5×6 contact sheet with clip-relative timestamps under `/tmp/tracer-visual-audit-batch1-frames/`. This produced **180 one-second frames and 6 contact sheets**. Every PNG is hashed in `/tmp/tracer-visual-audit-batch1-frames/FRAME-SHA256SUMS`; contact-sheet hashes are in `/tmp/tracer-visual-audit-batch1-frames/CONTACT-SHA256SUMS`. I inspected the actual contact-sheet pixels and enlarged individual PNGs where an object, endpoint, or UI label needed confirmation.

| Map / anchor | Source clip SHA-256 | Contact sheet SHA-256 |
|---|---|---|
| Shambali Monastery `116.64` | `26d4dfd8f3b8dc3c2590211625f08c32663a1cab1427f3ebd14bec91fa97833d` | `2ba992d0dabf08e2c75d677765e177e2f84977ca5cd3ef6fd6c6a5deafca2594` |
| Shambali Monastery `1324.73` | `74f65033e89396e7551a5ce481655906ce8414ae6c2621749d3b9f0f89a1106c` | `88a70094a0cd0dac45bf8977ceae71c27ee3cab8640a188ad70809bb3a9f8076` |
| Shambali Monastery `1443.77` | `84e0b86139b3a7bfe9b8f2a4731d5e7e869be3cef7d32047cfb2c36865eba6f6` | `6c884c4bd29da3ebf45d2ddb603c710fcb365d3e405e590948b247497a29f652` |
| Paraíso `74.76` | `973e38febdfa4d24309c56b90dab46d33848aceb7fc88fbac07f0dada9cfba55` | `695978ebddac04d3a7bac85c6bb4a49364759bced7df48f93abc99eaa15110fc` |
| Paraíso `260.33` | `92417a35b418c101c93e38216493696ce7537900ad4028283e280eba60db44f3` | `9a3b3f25f34bb07b723445f0d2f5e6517704f3bca00f0b1526dbf1dce8648414` |
| Paraíso `862.19` | `f27eb2e8b4b29faedd492d6fbd445a4b2376dac1f33cd2e0c2992368492bb738` | `b24d810dc7ba617541717dd77f773629e48e72ce191b3562b85f648eac60d0bf` |

Map identity below is established only by each map-named supplied artifact, the parent source's map-specific title, and consistent visible scenery. No clip contains a readable map-title card, and no unseen geometry is supplied from game knowledge.

## Findings

### Shambali Monastery — 116.64

> “more risky because you're easily isolatable there is the long flank route which is coming up around this back area”

- **Map identity:** the named Shambali artifact and parent map-guide title agree with one uninterrupted snowy monastery scene of red timber buildings, stone walls, and mountain architecture; no conflicting scene appears.
- **Side/objective phase:** not established. The editor HUD says `NOT ENOUGH PLAYERS` and `WAITING`; no attack/defense or payload phase is visible.
- **Object/start/direction/endpoint:** the demonstrated movement starts on the snowy road beside the red building, rounds its narrow outer/back side, enters the ground-level rear doorway, climbs the interior stone steps, and reaches the upper red room/balcony overlooking the road.
- **Continuous movement limit:** local `00:00`–`00:14` exposes that ordered traversal continuously with the editor camera. Later views revisit nearby interior and exterior geometry but are not appended as a longer route.
- **Verdict: PASS.** Accept only the visibly shown road-to-back-side-to-rear-door-to-stairs-to-upper-room/balcony route. It does not establish a side, objective phase, target access, or any continuation beyond the balcony.

### Shambali Monastery — 1324.73

> “of you guys are probably familiar with is this flank window right here you can oftentimes catch supports if the cart is”

- **Map identity:** the named Shambali artifact and title agree with the continuous snowy monastery/cave scene; no conflicting scene appears.
- **Side/objective phase:** not established. The only status is `NOT ENOUGH PLAYERS` / `WAITING`; the spoken word “cart” does not establish a phase.
- **Object/start/direction/endpoint:** the visible object is the narrow irregular opening through the rock wall above the lower cobbled passage, looking toward the red-lit doorway/area on the far side. This is an atomic window/angle, not a route.
- **Continuous movement limit:** local `00:14`–`00:29` repeatedly inspects the same rock opening from its near ledge. No approach to the opening and no traversal through it are shown.
- **Verdict: PASS.** Accept the atomic rock-wall flank-window position and its visible angle only. Reject support-catching, cart-relative timing, access-route, and through-window endpoint claims.

### Shambali Monastery — 1443.77

> “right here if you can get from here to this mini health pack you're generally okay once you get here it's not great”

- **Map identity:** the named Shambali artifact and title agree with the uninterrupted rail-yard, stone-tunnel, and monastery scene; no conflicting scene appears.
- **Side/objective phase:** not established. The editor HUD remains `NOT ENOUGH PLAYERS` / `WAITING` and shows no phase-specific objective instruction.
- **Object/start/direction/endpoint:** the movement starts at the green interior doorway beside the rail track, exits toward the track, follows the track-side edge down and around into the lower stone passage, and ends at the visible glowing blue mini health pack on the far stone ledge.
- **Continuous movement limit:** local `00:00`–`00:14` exposes the ordered geometry and the mini-pack endpoint. The camera looks back over pieces of the approach afterward; those reverse/repeated views do not extend the accepted route.
- **Verdict: PASS.** Accept only the shown green-room/track-side-to-lower-passage-to-mini-pack route. No safety outcome, escape beyond the pack, side, or objective phase is established.

### Paraíso — 74.76

> “on defense where she can set up and access the back line the problem your Tracer is that it does not look like you”

- **Map identity:** the named Paraíso artifact and parent Paraíso VOD title agree with the bright hillside-city Point A scene; no conflicting scene appears.
- **Side/objective phase:** defense on Objective A is visible: the replay HUD repeatedly says `DEFEND OBJECTIVE A`.
- **Object/start/direction/endpoint:** the clip shows combat near Objective A, a death/replay change, several elevated and street-level views, and then a long paused view behind a low wall/column. The quoted “setup” has no uniquely identified object or start, and no backline endpoint is visibly tied to it.
- **Continuous movement limit:** no continuous setup-to-backline movement is shown. The death/replay transition and paused replay prevent joining the elevated, street, and low-cover views into a route.
- **Verdict: REJECT.** Defense/Objective A is verified, but the proposed setup position and backline access remain ambiguous.

### Paraíso — 260.33

> “over here okay as they start pushing in then you blink in try pressuring the back line but right now you're not doing”

- **Map identity:** the named Paraíso artifact and title agree with the continuous colorful Point A street, market awnings, overpass, and hillside buildings; no conflicting scene appears.
- **Side/objective phase:** defense on Objective A is visible in the replay HUD.
- **Object/start/direction/endpoint:** local `00:14`–`00:16` shows an atomic street-corner/column position beneath the overpass with a direct visible angle toward enemies in the street. Local `00:17` cuts to first-person Tracer combat elsewhere; it does not expose a blink start or landing that can be joined to the editor view.
- **Continuous movement limit:** the free-camera survey, replay cut, and later overhead view do not form one continuous player traversal. No exact backline endpoint is established.
- **Verdict: NARROW.** Retain only the visible under-overpass corner/column angle toward the Objective A street. Reject the blink-in route, its landing, “as they start pushing in” timing, and backline endpoint.

### Paraíso — 862.19

> “so you're 75 95 you take High Ground go for the honor Yep this is fine I mean you miss it but”

- **Map identity:** the named Paraíso artifact and title agree with the consistent bright city, yellow bus, overpass, and Objective A approach; no conflicting scene appears.
- **Side/objective phase:** attack on Objective A is visible in the HUD.
- **Object/start/direction/endpoint:** the visible player is Sojourn, not Tracer. The clip moves from a red interior doorway into the ground-level street, advances beside the yellow bus, and fights beneath/around the overpass. It does not identify or reach a high-ground platform. “Honor” is preserved ASR and is not converted into a target identity.
- **Continuous movement limit:** only the ground-level doorway-to-bus-to-underpass movement is continuous, and it is not the claimed high-ground access.
- **Verdict: REJECT.** No visible Tracer high-ground position, access route, endpoint, or unambiguous target supports the quoted claim.

## Counts and disposition

| Verdict | Count | Candidates |
|---|---:|---|
| PASS | 3 | Shambali Monastery `116.64`, `1324.73`, `1443.77` |
| NARROW | 1 | Paraíso `260.33` |
| REJECT | 2 | Paraíso `74.76`, `862.19` |
| BLOCKED | 0 | — |
| **Total** | **6** | **6 independently verified clips** |

The batch resolves all six visual candidates: **3 PASS, 1 NARROW, 2 REJECT, 0 BLOCKED**. PASS means only that the atomic position or entire bounded traversal is visible in the dated source. All four retained or narrowed pieces still require current-2026 geometry regression confirmation and are not current-version approved.
