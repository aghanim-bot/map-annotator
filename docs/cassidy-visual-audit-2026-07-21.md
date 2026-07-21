# Cassidy visual evidence audit — 2026-07-21

This is a visual audit, not a prompt-set change. It applies the `map-annotation-prompt-setup` evidence standard to Cassidy shortlist candidates and records only what the preserved pixels, objective UI, and saved captions establish. No application, catalog, asset, deployment, or production-data file was changed.

## Method and preserved evidence

The Paraíso source is [D7YhHung_Fg](https://www.youtube.com/watch?v=D7YhHung_Fg), “Top 500 Cassidy Coaching - Dec 1 2025 (King's Row, Numbani, Paraiso).” The saved metadata identifies the upload date as `20251202`, duration as `14501` seconds, and source URL as above. Its SHA-256 is `3a57eb5b4b6e8d937c5de65f597d71820bf4384139829b5d215f094c811ef740` at `/tmp/yt-dlp-cassidy-setcover/D7YhHung_Fg.info.json`. The saved English JSON3 captions have SHA-256 `f27805b14a29a87c217da46af0df512f532992cec1f2ff21d4c6b3884066f095` at `/tmp/yt-dlp-cassidy-setcover/D7YhHung_Fg.en.json3`.

The six preserved visual artifacts under `/opt/data/annotated-maps/paraiso-cassidy/evidence-clips/` were verified first with `sha256sum -c SHA256SUMS`: **6 passed, 0 failed**. The three clips decode as 1280×720 H.264 at 60 fps. Exact preserved hashes are:

| Artifact | SHA-256 |
|---|---|
| `intro.mkv` | `ef3a51977ecaf0bf7e1fd5ea078df86d5b9b91d0bba90a92b03592b8cfdf94ec` |
| `intro-contact.jpg` | `52341f8d9f2b7e34962c98fcae766ba83aff4e96a0d8f4526b62cb5c40250823` |
| `attack-route.mkv` | `f8d5f408116527602507b07258cf89867ad2201502b452192f46d9b340c85b9a` |
| `attack-route-contact.jpg` | `ab78be6e3f9f0249828ecf9daf1c55e18ecb0a530d5adc5447201c6558b57b8a` |
| `bridge-route.mkv` | `e4f7670f42d5c226c7ec79692edcff3deed74285ba1a9236ec5b075fccd66704` |
| `bridge-route-contact.jpg` | `84ad92922bc276fed4f438d944c29718b0120e4e940d2b8e5f7bb40485e56d86` |

I reviewed the contact sheets and independently decoded each clip at one-second intervals. Clip-relative/source alignment was established from the spoken caption at the cited instant: `intro` relative 10.00 = source 1074.32, `attack-route` relative 12.00 = source 1893.20, and `bridge-route` relative 13.00 = source 3627.44. Thus the reviewed source windows are 1064.32–1086.323, 1881.20–1905.203, and 3614.44–3640.443 respectively. “Full route shown” below means the visible sequence establishes the ordered traversal without filling a cut or viewpoint jump with game knowledge.

## Paraíso findings

### 1. 1074.32 — opening rollout/high-ground explanation

Exact caption:

> “Okay, so immediately we're doing the wrong roll out and pariso. So one thing to understand about this map is that as you walk out of spawn, you're going to encounter this high ground.”

- **Map identity:** supported by the explicit spoken “pariso” and matching Brazilian streetscape in the reviewed pixels, including `BAR DO PEIXUXA` signage. The pixels alone do not display a map-title card.
- **Side/objective phase:** the live frames at 1064.32–1076.32 visibly show `DEFEND OBJECTIVE A`. The narration describes a hypothetical attacker walking out of spawn, but the clip never shows attacker spawn or an attack rollout. These must not be conflated.
- **Concrete start/object/destination:** no concrete start is shown. The street outside the bar is visible through 1076.32; after a dark transition at approximately 1077.32, a static elevated editor view shows a high-ground/overpass structure from about 1078.32 onward. The transition does not establish a path between them.
- **Full route shown:** **no**. Neither attacker spawn nor movement from spawn to the high ground is visible.
- **Verdict: NARROW.** The source can support only the visible Point A street/high-ground concept, with the phase caveat above. It does not support an attacker rollout route or a spawn-to-high-ground annotation.

### 2. 1893.20 — attacker access to high ground

Exact caption:

> “Okay. From as an attacker, as Cassidy The only way you can do it is come this way, buy for this high ground, and then you can roll across like this to get up here. Okay, that's that's basically the only way. There's also a roll tech off these trash cans, but it's really hard.”

- **Map identity:** supported by the Paraíso chapter narration and the same distinctive dense, brightly colored Brazilian hillside geometry. No map-title card appears in this clip.
- **Side/objective phase:** narration explicitly says “as an attacker.” The visible UI says `ESCORT THE PAYLOAD`, so this is post-capture payload attack, not Objective A attack.
- **Concrete start/object/destination:** the free-camera sequence begins with an overhead view of the roof cluster at 1881.20, descends to the roof with a circular vent around 1885.20, follows the red-building roof and doorway around 1887.20–1890.20, passes through the lit interior around 1891.20–1892.20, shows the green-building ledges/balcony around 1893.20–1899.20, points at three trash cans around 1901.20, and reaches the elevated roadway/high ground around 1902.20–1904.20. These are visible objects; the trash cans must not be promoted to a health pack or other unstated object.
- **Full route shown:** **yes, for the demonstrated roof/interior/ledge approach to the elevated roadway**. The camera continuously exposes the ordered geometry and the narration supplies attacker direction and Cassidy roll. It does not show Cassidy executing the roll, so it cannot establish a precise roll landing or prove the stronger exclusivity claim “the only way.”
- **Verdict: PASS**, narrowly phrased as the demonstrated attacker access route from the roof with the circular vent, through the red-building interior and green ledges, to the elevated roadway. Reject any wording that claims an exact roll landing, names an unseen object, or asserts this is the only possible route.

### 3. 3627.44 — bridge/window/point rotation

Exact caption:

> “cuz this angle's actually pretty good for Cass because what you do is you peak like this, unswing, walk this way. You can walk across the bridge and then peek this way and then you can drop out the window like this and then come back to point. That would be like your rotation.”

- **Map identity:** supported by the Paraíso chapter and consistent visible geometry/signage, including the `LIVRARIA` storefront at the end of the clip. No map-title card is visible.
- **Side/objective phase:** the UI visibly says `ATTACK OBJECTIVE A`; the red capture boundary is visible at approximately 3630.44–3632.44. This is Objective A attack.
- **Concrete start/object/destination:** the sequence shows a dark upper room/window angle at 3614.44–3624.44, an editor-camera view toward/across the bridge at about 3625.44–3629.44, the Objective A capture area around 3630.44–3632.44, an interior doorway/stairs view at 3633.44, and the street outside the `LIVRARIA` around 3636.44–3639.44. The named bridge, window/interior, and point are each visible.
- **Full route shown:** **no**. The video jumps between the room, editor-camera bridge/point views, interior, and street. It never visibly follows one continuous traversal from the initial angle across the bridge, out the window, and back to point. The ordering may be spoken, but hidden movement must not be invented as frame evidence.
- **Verdict: NARROW.** The source supports atomic points or separately worded visible segments (upper-room angle, bridge, Objective A area, or `LIVRARIA`-side exit). Reject the full multi-leg route as visually unverified.

## Additional shortlist attempt

The Numbani candidate at [447.52](https://www.youtube.com/watch?v=L2vOzXuMsFc&t=447.52s) was selected as the strongest next point candidate because its saved caption says, “So Cassidy, you want to be playing here in from this door frame and shooting down main here.” The saved metadata and captions exist under `/tmp/yt-dlp-cassidy-setcover/`, but there is no saved clip or frame artifact there. A narrow retrieval was attempted only after selecting the exact 437.52–457.52 window; it could not start because no `yt-dlp` executable is installed or discoverable in the available local paths. No transcript-only verdict is assigned. This is a precise tooling/acquisition blocker, not evidence against the candidate.

## Counts and disposition

| Scope | Pass | Narrow | Reject | Blocked/no visual verdict | Total |
|---|---:|---:|---:|---:|---:|
| Paraíso preserved candidates | 1 | 2 | 0 | 0 | 3 |
| Additional Numbani attempt | 0 | 0 | 0 | 1 | 1 |
| **All rows handled here** | **1** | **2** | **0** | **1** | **4** |

No row in this audit was added to production data. The single pass is an evidence verdict only; prompt design and stable task identity would still be required before any implementation.
