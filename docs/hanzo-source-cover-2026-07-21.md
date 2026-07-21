# Hanzo source acquisition coverage — 2026-07-21

Research cutoff: **2026-07-21**. This combines the original source-acquisition plan with a caption audit of a second, independently retrieved long-form Hanzo source. It uses only saved local evidence and the existing visual audit; no network request, architecture-based map inference, chapter-order inference, or external code was used.

## Decision rule and outcome

A result is acquisition-worthy only when its saved title or description establishes all three of: Hanzo relevance, the target map, and educational/coaching/VOD-review intent. Search-query association is not evidence: the corpus repeatedly returned titles naming a different map or hero. Generic gameplay, highlights/montages, misleading matches, unrelated heroes, and results with no target-map evidence are rejected.

The result is deliberately conservative:

| Coverage class | Maps | Count |
|---|---|---:|
| Visually identified in the saved Hanzo long-form evidence | Antarctic Peninsula; Blizzard World; Busan; Circuit Royal; Colosseo; Dorado; Eichenwalde; Esperança; Havana; Hollywood; Ilios; Junkertown; King's Row; Lijiang Tower; Midtown; Nepal; New Queen Street; Numbani; Rialto; Route 66; Samoa; Shambali Monastery; Watchpoint: Gibraltar | 23 |
| Acquisition candidates from this search corpus | None | 0 |
| Still lacking defensible saved map identity | Aatlis; Neon Junction; New Junk City; Oasis; Paraíso; Runasapi; Suravasa | 7 |
| **Total scoped maps** |  | **30** |

No candidate was chosen from the original flat-search corpus. The separately retrieved `Q00HxoyoMdo` source audited below now has complete, verified `sb1` coverage. Its readable hero-selection map labels add **14** maps beyond the original nine-map visual set. If a future result passes the rule above, retrieve its metadata and available subtitles without downloading video using:

```sh
/opt/data/home/.cache/uv/archive-v0/V6RZnOuEBt0oaw0i3qQAI/bin/yt-dlp --skip-download --write-info-json --write-subs --write-auto-subs --sub-langs 'en.*' 'https://www.youtube.com/watch?v=VIDEO_ID'
```

This is a template only, not a command for any result selected below.

## Corpus integrity

`/opt/data/annotated-maps/direct-source-search/retrieval-results.json` records all 21 Hanzo searches with exit code `0`; its recorded byte count agrees with each file on disk. All 21 JSON files are non-empty and parse successfully. Together they contain 72 returned rows, 34 unique video IDs, 70 rows with a description snippet, and two rows with no description (both occurrences of `S_EEesw1Cp4`). Upload date is absent for every row; `timestamp` and `release_timestamp` are also null throughout. Dates therefore remain **not present**, not guessed.

| Search file | Bytes | SHA-256 |
|---|---:|---|
| `aatlis.json` | 1,953 | `c5be5e8d3482a614b32387d22794906363b19d262d5dc497f048b1ecd2b7eb05` |
| `antarctic-peninsula.json` | 897 | `658074be1d232aa3c48f1e1b2db4e9feea7f04770bd099e59375c0b2151457a6` |
| `blizzard-world.json` | 6,547 | `421c9e1b12f7cd76da197917caa4f1371a494b440da50dfd189079f6ef7eec1d` |
| `busan.json` | 6,440 | `b22927432b9a22a995a4763e6794e3c6a3891e8ca04a0a7a4f06605848b8e4b7` |
| `colosseo.json` | 1,966 | `b86ea1586736061ac921f4fbafb7550e92cb8f324f85f3ae5073b4c5a1e626dc` |
| `dorado.json` | 6,378 | `e8ffb9320b3c96127a44c3fa1ceb95ef14def778b566699c37533e830a1a644a` |
| `havana.json` | 6,502 | `c31f4da461fbedad4f6f662492700500fb7cf7d3ec0cf501cb13cb9d035e70c3` |
| `ilios.json` | 6,425 | `2532f0bc54d3033fff404d4559f6b92e206d3b0ec9afb3c9d70d478a660b22ec` |
| `junkertown.json` | 6,556 | `4612226fcde12db4b8bfa41b75bf87c5ad5e7f1aa21578e08aa32e32c138f28c` |
| `kings-row.json` | 6,604 | `34ed6586cd764c8bc788228c7f740ffc257d81b70056823fc3a91e758e728622` |
| `midtown.json` | 6,500 | `13938c567d87591947a6d449c1e531f85b8d4527d289730e71ee1801d5b63a2c` |
| `neon-junction.json` | 867 | `0ee45b78bd95b0e79715a0d59b8927589e6793ae233aa5e8f1be5cc1ef10fa5f` |
| `new-junk-city.json` | 4,266 | `6a374be846adab746b02a6430fec5b47e94bd0916428c50b8283218fb3e93d4c` |
| `numbani.json` | 6,360 | `28c40bc48e7bf7704c04138f24432d89ea8446bb1c4cb5506623ba2d06341702` |
| `oasis.json` | 6,360 | `bdf4028dcaaaea522496a1b3b97b7b58b456bd915f2a0833f52c32482cce5660` |
| `paraiso.json` | 1,965 | `67b5a45bdf350f6df5daf4ed78f9cd5ba7cb5a5c8ff7aa3824bf0685604cb26f` |
| `route-66.json` | 6,587 | `79cb6b2535fc32c99602eb0771144228a219da314f9fafb42c1e23710a0527f7` |
| `runasapi.json` | 2,032 | `16648ab54935c844429e6e4ba5356f88b9b2d588a8a10e21a7ea5255c30e8a7d` |
| `shambali-monastery.json` | 892 | `335c56c78ddc564b37e11c3d6adb2c0f3ac08e44dfdddaf0914dd3fb153fb044` |
| `suravasa.json` | 6,472 | `736884711fd4f06f29051b29e5241d3a444c44cd680da5daeae536254372af73` |
| `watchpoint-gibraltar.json` | 6,453 | `45b47da47db8da6d8ba63e7c0603fb6a1392105a5606418f684136b1fa9ea517` |

## Already visually identified maps

These nine maps do not have per-map search files because the missing-map search set correctly excluded them. Their status comes from `docs/hanzo-visual-audit-2026-07-21.md`, not from title inference.

| Map | Existing direct source and status |
|---|---|
| Hollywood | [`ZFjzANTx17U`](https://www.youtube.com/watch?v=ZFjzANTx17U), **Hanzo Educational Unranked To Champion (Full Series)**, WizardHyeong: placement #1 title card and geometry visually identify the map; prompts unaudited. |
| Rialto | Same source: placement #2 visually identified; two narrow sightlines accepted as candidate evidence and one row rejected. |
| Lijiang Tower | Same source: placement #3 visually identified as Garden; all three spoken rows rejected after frame review. |
| Nepal | Same source: placement #5 visually identified as Shrine; one narrow sightline and one rejection. |
| Circuit Royal | Same source: placement #6 visually identified; two narrow positions/sightlines and one rejection. |
| Samoa | Same source: placement #7 visually identified from map geometry; exact stage and prompts unaudited. |
| Esperança | Same source: placement #8 visually identified; three narrow positions/sightlines, with route claims rejected. |
| Eichenwalde | Same source: placement #9 title card and geometry visually identify the map; prompts unaudited. |
| New Queen Street | Same source: placement #10 visually identified; one narrow sightline and one rejection. |

## Missing-map result audit

All URLs, IDs, titles, channels, and durations below are the exact saved values. Upload date is **absent** for every row. “Description evidence” reports what the saved snippet does or does not establish; it does not invent omitted text.

### Aatlis — no credible result

- [`FhVoIpLfkGo`](https://www.youtube.com/watch?v=FhVoIpLfkGo) — **The Definitive OW2 MAP Guide (for EVERY hero)** — Spilo — 2,066 s. The description says it discusses picks for “each map,” but neither title nor description names Aatlis and no upload date establishes that this newer map existed. Reject: absent target-map evidence.

### Antarctic Peninsula — no credible result

The saved search returned zero entries.

### Blizzard World — no credible result

- [`EGgZVvV2ioM`](https://www.youtube.com/watch?v=EGgZVvV2ioM) — **The 2-Minute Rule to Perfect Positioning in Overwatch** — The WatchOver — 141 s. Description is a generic positioning-guide pitch. Reject: no Hanzo or Blizzard World evidence.
- [`WMwZ3UHLW9g`](https://www.youtube.com/watch?v=WMwZ3UHLW9g) — **Overwatch 2 Tank Positioning guide on rialto** — DHanHan — 576 s. Description contains channel links only in the saved snippet. Reject: tank content and explicitly Rialto, not Blizzard World.
- [`fu2n7sZeuo8`](https://www.youtube.com/watch?v=fu2n7sZeuo8) — **THE EASIEST WAY TO CARRY ON TANK | Overwatch 2 Tank Guide** — Homeless Coaching — 639 s. Description advertises coaching. Reject: unrelated role and no map evidence.
- [`1CrDa2pkKjA`](https://www.youtube.com/watch?v=1CrDa2pkKjA) — **The COMPLETE OW2 TANK GUIDE (2024): Tips and Tricks for EVERY Hero** — Spilo — 23,949 s. Description enumerates tank heroes. Reject: unrelated role and no Blizzard World evidence.
- [`FhVoIpLfkGo`](https://www.youtube.com/watch?v=FhVoIpLfkGo) — **The Definitive OW2 MAP Guide (for EVERY hero)** — Spilo — 2,066 s. Description generically claims “each map.” Reject: Blizzard World is not named in flat metadata.

### Busan — no credible result

- [`WMwZ3UHLW9g`](https://www.youtube.com/watch?v=WMwZ3UHLW9g) — **Overwatch 2 Tank Positioning guide on rialto** — DHanHan — 576 s. Reject: unrelated role and explicitly Rialto.
- [`FhVoIpLfkGo`](https://www.youtube.com/watch?v=FhVoIpLfkGo) — **The Definitive OW2 MAP Guide (for EVERY hero)** — Spilo — 2,066 s. Description generically claims “each map.” Reject: Busan is not named.
- [`6Usw8SpO8cc`](https://www.youtube.com/watch?v=6Usw8SpO8cc) — **Overwatch 2 Tank Positioning guide Overwatch (Kings Row)** — DHanHan — 527 s. Description repeats tank positioning on King's Row. Reject: unrelated role and wrong map.
- [`6zYH5K2dXPw`](https://www.youtube.com/watch?v=6zYH5K2dXPw) — **23 minutes of Perfect Ana Positioning - Overwatch 2** — mL7 — 1,419 s. Description repeats Ana positioning. Reject: unrelated hero and no Busan evidence.
- [`7loFiPjkODU`](https://www.youtube.com/watch?v=7loFiPjkODU) — **(Educational) Unranked to GM BAPTISTE ONLY** — Skufzy — 16,130 s. Description supplies creator links. Reject: explicitly unrelated hero and no Busan evidence.

### Colosseo — no credible result

- [`IqwZcC4dL4E`](https://www.youtube.com/watch?v=IqwZcC4dL4E) — **I Spent 50 Hours Mastering Freja To PROVE She's The BEST Hero in Overwatch 2** — yeatle — 22,725 s. Description contains creator links only. Reject: explicitly unrelated hero and no Colosseo evidence.

### Dorado — no credible result

- [`1JfG71pXDEQ`](https://www.youtube.com/watch?v=1JfG71pXDEQ) — **How to position in Overwatch | VOD review of a 2200 Soldier** — CurryShotTV — 1,188 s. Description explains generic positioning instruction. Reject: unrelated hero and Dorado is not named.
- [`9m465Cj7Z0E`](https://www.youtube.com/watch?v=9m465Cj7Z0E) — **TRACER FLANK ROUTES ON DORADO - Overwatch Tips #7** — luckySkillFaker — 284 s. Description confirms Tracer routes on Dorado. Reject: target map is established but the hero is explicitly unrelated.
- [`gkx519Vi-co`](https://www.youtube.com/watch?v=gkx519Vi-co) — **Educational Unranked To GM GENJI (90% Winrate)** — Awkward — 32,058 s. Description advertises evaluation/gameplay links. Reject: explicitly unrelated hero and no Dorado evidence.
- [`S_EEesw1Cp4`](https://www.youtube.com/watch?v=S_EEesw1Cp4) — **VOD review bronze sombra** — A Toxic Hanzo Main — 2,069 s. Description absent. Reject: title is explicitly about Sombra; channel name does not make it Hanzo evidence; no Dorado evidence.
- [`sAQOI9vDCMo`](https://www.youtube.com/watch?v=sAQOI9vDCMo) — **Rotations in Overwatch** — Coach Seksi — 412 s. Description offers VOD review. Reject: no Hanzo or Dorado evidence.

### Havana — no credible result

- [`WMwZ3UHLW9g`](https://www.youtube.com/watch?v=WMwZ3UHLW9g) — **Overwatch 2 Tank Positioning guide on rialto** — DHanHan — 576 s. Reject: unrelated role and wrong named map.
- [`EGgZVvV2ioM`](https://www.youtube.com/watch?v=EGgZVvV2ioM) — **The 2-Minute Rule to Perfect Positioning in Overwatch** — The WatchOver — 141 s. Description is generic positioning instruction. Reject: no Hanzo or Havana evidence.
- [`6Usw8SpO8cc`](https://www.youtube.com/watch?v=6Usw8SpO8cc) — **Overwatch 2 Tank Positioning guide Overwatch (Kings Row)** — DHanHan — 527 s. Reject: unrelated role and wrong named map.
- [`fu2n7sZeuo8`](https://www.youtube.com/watch?v=fu2n7sZeuo8) — **THE EASIEST WAY TO CARRY ON TANK | Overwatch 2 Tank Guide** — Homeless Coaching — 639 s. Description advertises coaching. Reject: unrelated role and no Havana evidence.
- [`uKfYMeT_g2E`](https://www.youtube.com/watch?v=uKfYMeT_g2E) — **The Complete Overwatch 2 Escort Guide** — Spilo — 2,387 s. Description confirms generic Escort instruction. Reject: no Hanzo or Havana evidence.

### Ilios — no credible result

- [`6zYH5K2dXPw`](https://www.youtube.com/watch?v=6zYH5K2dXPw) — **23 minutes of Perfect Ana Positioning - Overwatch 2** — mL7 — 1,419 s. Reject: explicitly unrelated hero and no Ilios evidence.
- [`FhVoIpLfkGo`](https://www.youtube.com/watch?v=FhVoIpLfkGo) — **The Definitive OW2 MAP Guide (for EVERY hero)** — Spilo — 2,066 s. Description generically claims “each map.” Reject: Ilios is not named.
- [`tcABXj7t6IE`](https://www.youtube.com/watch?v=tcABXj7t6IE) — **The ULTIMATE 2025 Lucio Guide.** — ohwell — 976 s. Description confirms Lucio guide and includes timestamps. Reject: unrelated hero and no Ilios evidence.
- [`l0O8wovYJds`](https://www.youtube.com/watch?v=l0O8wovYJds) — **Gold Sojourn Coaching (I WILL NOW DEMONSTRATE)** — Spilo Coaching — 2,324 s. Description advertises coaching. Reject: explicitly unrelated hero and no Ilios evidence.
- [`6TalsW4IkvA`](https://www.youtube.com/watch?v=6TalsW4IkvA) — **In-depth Top 500 Tracer Guide!** — Sho — 1,922 s. Description confirms a general Tracer guide. Reject: unrelated hero and no Ilios evidence.

### Junkertown — no credible result

- [`lv8m8YFHbl8`](https://www.youtube.com/watch?v=lv8m8YFHbl8) — **Overwatch Coaching: How to Control the Map as Hanzo (Gold Hanzo Scrim)** — RSCreaM — 3,121 s. Description offers review scheduling and says the first part was not recorded. Hanzo and coaching are established, but Junkertown is absent. Reject: no target-map evidence.
- [`WMwZ3UHLW9g`](https://www.youtube.com/watch?v=WMwZ3UHLW9g) — **Overwatch 2 Tank Positioning guide on rialto** — DHanHan — 576 s. Reject: unrelated role and wrong named map.
- [`FhVoIpLfkGo`](https://www.youtube.com/watch?v=FhVoIpLfkGo) — **The Definitive OW2 MAP Guide (for EVERY hero)** — Spilo — 2,066 s. Description generically claims “each map.” Reject: Junkertown is not named.
- [`gkx519Vi-co`](https://www.youtube.com/watch?v=gkx519Vi-co) — **Educational Unranked To GM GENJI (90% Winrate)** — Awkward — 32,058 s. Reject: explicitly unrelated hero and no Junkertown evidence.
- [`Z0EOeQlW6pc`](https://www.youtube.com/watch?v=Z0EOeQlW6pc) — **Educational Unranked To GM Tracer (43 Win Streak)** — 위자드형 WizardHyeong — 31,788 s. Description promotes a Tracer course. Reject: explicitly unrelated hero and no Junkertown evidence.

### King's Row — no credible result

- [`6Usw8SpO8cc`](https://www.youtube.com/watch?v=6Usw8SpO8cc) — **Overwatch 2 Tank Positioning guide Overwatch (Kings Row)** — DHanHan — 527 s. Description confirms tank positioning on King's Row. Reject: target map is established but the role is unrelated and Hanzo is absent.
- [`VhrRKvcXCRc`](https://www.youtube.com/watch?v=VhrRKvcXCRc) — **The ONLY Positioning Guide You'll EVER NEED - 5 Pro Tips for EVERY ROLE - Overwatch 2 Guide** — GameLeap Overwatch 2 Guides — 675 s. Description promotes a generic course. Reject: no Hanzo or King's Row evidence.
- [`fOV0FBfZdOo`](https://www.youtube.com/watch?v=fOV0FBfZdOo) — **HOW TO PLAY JUNO (FULL GUIDE AND REVIEW)** — Aspen — 1,745 s. Description confirms a hero guide. Reject: explicitly unrelated hero and no King's Row evidence.
- [`RqcMPmy24X0`](https://www.youtube.com/watch?v=RqcMPmy24X0) — **Soldier 76 - Advanced Jumping Positioning - Kings Row Edition** — Mike Base — 172 s. Description confirms Soldier-specific spots. Reject: target map is established but the hero is unrelated.
- [`u52kCNEOMfI`](https://www.youtube.com/watch?v=u52kCNEOMfI) — **How Did THIS Venture Player BEAT The Koreans?! | Venture Guide** — Kajor — 551 s. Description promotes coaching/creator links. Reject: explicitly unrelated hero and no King's Row evidence.

### Midtown — no credible result

- [`EGgZVvV2ioM`](https://www.youtube.com/watch?v=EGgZVvV2ioM) — **The 2-Minute Rule to Perfect Positioning in Overwatch** — The WatchOver — 141 s. Reject: no Hanzo or Midtown evidence.
- [`WMwZ3UHLW9g`](https://www.youtube.com/watch?v=WMwZ3UHLW9g) — **Overwatch 2 Tank Positioning guide on rialto** — DHanHan — 576 s. Reject: unrelated role and wrong named map.
- [`fu2n7sZeuo8`](https://www.youtube.com/watch?v=fu2n7sZeuo8) — **THE EASIEST WAY TO CARRY ON TANK | Overwatch 2 Tank Guide** — Homeless Coaching — 639 s. Reject: unrelated role and no Midtown evidence.
- [`6zYH5K2dXPw`](https://www.youtube.com/watch?v=6zYH5K2dXPw) — **23 minutes of Perfect Ana Positioning - Overwatch 2** — mL7 — 1,419 s. Reject: unrelated hero and no Midtown evidence.
- [`NntlprjWgaY`](https://www.youtube.com/watch?v=NntlprjWgaY) — **AIM and OW2: a Guide on Mechanics and Movement in Overwatch 2** — Spilo — 2,746 s. Description discusses generic aim resources. Reject: no Hanzo or Midtown evidence.

### Neon Junction — no credible result

The saved search returned zero entries.

### New Junk City — no credible result

- [`sYZgzeKbdqk`](https://www.youtube.com/watch?v=sYZgzeKbdqk) — **I Ranked Every Overwatch Map (and explained their biggest problems)** — Spilo — 13,581 s. Description confirms broad map-design discussion. Reject: New Junk City is not named, Hanzo is absent, and this is not hero coaching.
- [`IqwZcC4dL4E`](https://www.youtube.com/watch?v=IqwZcC4dL4E) — **I Spent 50 Hours Mastering Freja To PROVE She's The BEST Hero in Overwatch 2** — yeatle — 22,725 s. Reject: explicitly unrelated hero and no New Junk City evidence.
- [`jy3B3OlKsiQ`](https://www.youtube.com/watch?v=jy3B3OlKsiQ) — **Which map is ANA STRONGEST in? (Tier List)** — KarQ Archives — 1,583 s. Description confirms an Ana map tier list. Reject: explicitly unrelated hero, target map absent, and tier-list format is not positioning/VOD evidence.

### Numbani — no credible result

- [`WMwZ3UHLW9g`](https://www.youtube.com/watch?v=WMwZ3UHLW9g) — **Overwatch 2 Tank Positioning guide on rialto** — DHanHan — 576 s. Reject: unrelated role and wrong named map.
- [`1JfG71pXDEQ`](https://www.youtube.com/watch?v=1JfG71pXDEQ) — **How to position in Overwatch | VOD review of a 2200 Soldier** — CurryShotTV — 1,188 s. Description confirms generic positioning instruction. Reject: unrelated hero and no Numbani evidence.
- [`S_EEesw1Cp4`](https://www.youtube.com/watch?v=S_EEesw1Cp4) — **VOD review bronze sombra** — A Toxic Hanzo Main — 2,069 s. Description absent. Reject: explicitly unrelated hero and no Numbani evidence.
- [`fu2n7sZeuo8`](https://www.youtube.com/watch?v=fu2n7sZeuo8) — **THE EASIEST WAY TO CARRY ON TANK | Overwatch 2 Tank Guide** — Homeless Coaching — 639 s. Reject: unrelated role and no Numbani evidence.
- [`EVyJj8dm1ZI`](https://www.youtube.com/watch?v=EVyJj8dm1ZI) — **REINHARDT GUIDE | HOW TO CARRY EVERY GAME** — lhcloudy — 3,073 s. Description provides creator links. Reject: explicitly unrelated hero and no Numbani evidence.

### Oasis — no credible result

- [`_-a5nLjtSK0`](https://www.youtube.com/watch?v=_-a5nLjtSK0) — **S76 Positioning Guide For Anyone Under Diamond (Part 1 Of 3)** — A Toxic Hanzo Main — 493 s. Description confirms Soldier 76 coaching. Reject: explicitly unrelated hero and no Oasis evidence.
- [`1JfG71pXDEQ`](https://www.youtube.com/watch?v=1JfG71pXDEQ) — **How to position in Overwatch | VOD review of a 2200 Soldier** — CurryShotTV — 1,188 s. Reject: explicitly unrelated hero and no Oasis evidence.
- [`8ahb8m5r5YU`](https://www.youtube.com/watch?v=8ahb8m5r5YU) — **(OUTDATED) A 19 Minute Master Guide To Mercy: Pistol, Staff, Ult, Positioning & Mentality** — Niandra — 1,132 s. Description contains creator credits. Reject: explicitly outdated, unrelated hero, and no Oasis evidence.
- [`iRGCUBi8p34`](https://www.youtube.com/watch?v=iRGCUBi8p34) — **Overwatch - Grandmaster Soldier VOD Review on Oasis [Self] [4350 SR]** — Game Court — 1,107 s. Description confirms a Soldier match on Oasis. Reject: target map and review intent are established, but the hero is unrelated.
- [`FhVoIpLfkGo`](https://www.youtube.com/watch?v=FhVoIpLfkGo) — **The Definitive OW2 MAP Guide (for EVERY hero)** — Spilo — 2,066 s. Description generically claims “each map.” Reject: Oasis is not named.

### Paraíso — no credible result

- [`mpR6Mbgfn0I`](https://www.youtube.com/watch?v=mpR6Mbgfn0I) — **The ULTIMATE Lucio Wallriding Guide (2025 Updated)** — Eskay — 708 s. Description confirms a Lucio wall-riding guide. Reject: explicitly unrelated hero and no Paraíso evidence.

### Route 66 — no credible result

- [`EGgZVvV2ioM`](https://www.youtube.com/watch?v=EGgZVvV2ioM) — **The 2-Minute Rule to Perfect Positioning in Overwatch** — The WatchOver — 141 s. Reject: no Hanzo or Route 66 evidence.
- [`FhVoIpLfkGo`](https://www.youtube.com/watch?v=FhVoIpLfkGo) — **The Definitive OW2 MAP Guide (for EVERY hero)** — Spilo — 2,066 s. Description generically claims “each map.” Reject: Route 66 is not named.
- [`mpR6Mbgfn0I`](https://www.youtube.com/watch?v=mpR6Mbgfn0I) — **The ULTIMATE Lucio Wallriding Guide (2025 Updated)** — Eskay — 708 s. Reject: unrelated hero and no Route 66 evidence.
- [`9m465Cj7Z0E`](https://www.youtube.com/watch?v=9m465Cj7Z0E) — **TRACER FLANK ROUTES ON DORADO - Overwatch Tips #7** — luckySkillFaker — 284 s. Reject: unrelated hero and explicitly Dorado.
- [`ofYCH85Vf8Y`](https://www.youtube.com/watch?v=ofYCH85Vf8Y) — **Overwatch GM Tracer On Eichenwalde Review #1 | Reviewing My Own Gameplay** — CashinClean — 711 s. Description describes the review series. Reject: unrelated hero and explicitly Eichenwalde.

### Runasapi — no credible result

- [`IqwZcC4dL4E`](https://www.youtube.com/watch?v=IqwZcC4dL4E) — **I Spent 50 Hours Mastering Freja To PROVE She's The BEST Hero in Overwatch 2** — yeatle — 22,725 s. Description contains creator links only. Reject: explicitly unrelated hero and no Runasapi evidence.

### Shambali Monastery — no credible result

The saved search returned zero entries.

### Suravasa — no credible result

- [`FhVoIpLfkGo`](https://www.youtube.com/watch?v=FhVoIpLfkGo) — **The Definitive OW2 MAP Guide (for EVERY hero)** — Spilo — 2,066 s. Description generically claims “each map.” Reject: Suravasa is not named.
- [`sYZgzeKbdqk`](https://www.youtube.com/watch?v=sYZgzeKbdqk) — **I Ranked Every Overwatch Map (and explained their biggest problems)** — Spilo — 13,581 s. Description confirms broad map-design discussion. Reject: Suravasa is not named, Hanzo is absent, and format is not hero coaching.
- [`gkx519Vi-co`](https://www.youtube.com/watch?v=gkx519Vi-co) — **Educational Unranked To GM GENJI (90% Winrate)** — Awkward — 32,058 s. Reject: explicitly unrelated hero and no Suravasa evidence.
- [`mpR6Mbgfn0I`](https://www.youtube.com/watch?v=mpR6Mbgfn0I) — **The ULTIMATE Lucio Wallriding Guide (2025 Updated)** — Eskay — 708 s. Reject: explicitly unrelated hero and no Suravasa evidence.
- [`mZ7RxZS3tDk`](https://www.youtube.com/watch?v=mZ7RxZS3tDk) — **Educational Unranked To GM MOIRA (85% Winrate)** — Awkward — 21,269 s. Description advertises evaluation/gameplay links. Reject: explicitly unrelated hero and no Suravasa evidence.

### Watchpoint: Gibraltar — no credible result

- [`uKfYMeT_g2E`](https://www.youtube.com/watch?v=uKfYMeT_g2E) — **The Complete Overwatch 2 Escort Guide** — Spilo — 2,387 s. Description confirms generic Escort instruction. Reject: no Hanzo or Gibraltar evidence.
- [`_-a5nLjtSK0`](https://www.youtube.com/watch?v=_-a5nLjtSK0) — **S76 Positioning Guide For Anyone Under Diamond (Part 1 Of 3)** — A Toxic Hanzo Main — 493 s. Reject: explicitly unrelated hero and no Gibraltar evidence.
- [`6Usw8SpO8cc`](https://www.youtube.com/watch?v=6Usw8SpO8cc) — **Overwatch 2 Tank Positioning guide Overwatch (Kings Row)** — DHanHan — 527 s. Reject: unrelated role and wrong named map.
- [`9m465Cj7Z0E`](https://www.youtube.com/watch?v=9m465Cj7Z0E) — **TRACER FLANK ROUTES ON DORADO - Overwatch Tips #7** — luckySkillFaker — 284 s. Reject: unrelated hero and wrong named map.
- [`sYZgzeKbdqk`](https://www.youtube.com/watch?v=sYZgzeKbdqk) — **I Ranked Every Overwatch Map (and explained their biggest problems)** — Spilo — 13,581 s. Description confirms broad map-design discussion. Reject: Gibraltar is not named, Hanzo is absent, and format is not hero coaching.

## Second long-form source audit: `Q00HxoyoMdo`

### Integrity and metadata

Parsing began only after explicit hashes of all three files under `/opt/data/annotated-maps/hanzo-source-cover/raw/` matched the bare-filename entries in `/opt/data/annotated-maps/hanzo-source-cover/SHA256SUMS`. A direct `sha256sum -c` from the manifest directory cannot find the files because the manifest omits their `raw/` prefix; the values themselves match exactly.

| Saved file | Verified SHA-256 |
|---|---|
| `Q00HxoyoMdo.info.json` | `a74c66b173ad9813bd44a5fc4f1b71768f54849372f8930ea33dba299347aba2` |
| `Q00HxoyoMdo.en-orig.json3` | `2ec79b7d1aa873e0530b7cdbc6fe408a43a50344ee183621b0ab294b0a795e50` |
| `Q00HxoyoMdo.en.json3` | `2ec79b7d1aa873e0530b7cdbc6fe408a43a50344ee183621b0ab294b0a795e50` |
| `Q00HxoyoMdo.mhtml` | `bb2e26265b878c87789a18be0a45ef02de15020382e7e6b8e674bcb73b35f7e1` |

The 104 files `Q00HxoyoMdo-000.jpg` through `Q00HxoyoMdo-103.jpg` under `storyboards-sb1/` also pass every entry in `storyboards-sb1.SHA256SUMS` when checked from that directory. Each is a 5×5 sheet of 160×90 cells at approximately ten-second cadence. Every sheet was visually inspected; enlarged crops were used only to read pixels already present in the verified sheets.

| Field | Exact saved value |
|---|---|
| Source | [`Q00HxoyoMdo`](https://www.youtube.com/watch?v=Q00HxoyoMdo) |
| Title | **Educational Unranked To GM HANZO (95% Winrate)** |
| Channel/uploader | Awkward |
| Upload date | `20240209` (2024-02-09) |
| Duration | `25969` seconds (`7:12:49`) |
| Chapters | `null`; no chapters supplied |
| Description | Reproduced exactly below. It contains no chapter timestamps or map names. |
| Caption language | Automatic captions only: `en-orig`, named **English (Original)**, and `en`, named **English**. The saved JSON3 files are byte-identical and have the same hash. No creator-supplied subtitles are present. |

Exact saved description (the two trailing spaces on the two credited lines are rendered as `\u0020\u0020` so the audit document itself has no trailing whitespace):

```text
Get Your FREE Stat Evaluation: https://rankupacademy.gg/evaluation

▶️ Gameplay & 2nd Channel -  @Awkward3\u0020\u0020
💜 Livestreams - https://twitch.tv/Awkward
🐦 Open Letter - https://twitter.com/AwkwardOW
📷 Real Life - http://instagram.com/danynovak1
👾 Community - https://discord.gg/TYBAY7k
🎵 Tips & Q&A - https://tiktok.com/@awkwardtwitch
💼 Business Inquiries - danynovak.business@gmail.com

Editor:  @projectzeeno\u0020\u0020
Thumbnail: https://x.com/NineteenArt_
```

### Direct map-name evidence and boundaries

Searching the complete verified original-English caption track for all 30 scoped names (including spelling variants) finds only two direct map-name utterances:

| Anchor | Exact auto-caption text | Defensible use |
|---:|---|---|
| `4337.760` | `placement Welcome to Hollywood` | Directly identifies Hollywood at the start of the ensuing match. Claims below are limited to the contiguous play before the next explicit transition at `5273.040`. |
| `5273.040` | `traveling to Nepal peasant that's what` | Directly identifies Nepal at the transition into the ensuing match. Claims below stop at the explicit `victory` caption at `6750.840`. The stage is not named. |

The caption track still contains only those two spoken map names. The verified storyboards supply additional direct identity through the map name printed beneath `COMPETITIVE` on hero selection. Row and column below are one-based. Times are the storyboard sampling positions (`sheet × 250 + cell × 10` seconds), hence approximate rather than frame-exact. A window begins at the readable label and stops before the next readable label/transition; it does not assert an unseen route between sampled cells. Architecture was used only as a cross-check, never as identity evidence.

| Map | Readable identity cell | Conservative identified window | Boundary/evidence note |
|---|---|---:|---|
| Busan | `Q00HxoyoMdo-035.jpg`, r5c1 (`~8950`) | `~8950–9830` | `BUSAN` is readable under `COMPETITIVE`; stop before the Midtown label. Stage unresolved. |
| Midtown | `Q00HxoyoMdo-039.jpg`, r2c4 (`~9830`) | `~9830–11050` | `MIDTOWN` is readable; stop before the Ilios label. |
| Ilios | `Q00HxoyoMdo-044.jpg`, r2c1 (`~11050`) | `~11050–11520` | `ILIOS` is readable; stop before the Havana label. Stage unresolved. |
| Havana | `Q00HxoyoMdo-046.jpg`, r1c3 (`~11520`) | `~11520–12500` | `HAVANA` is readable; stop before the Antarctic Peninsula label. |
| Antarctic Peninsula | `Q00HxoyoMdo-050.jpg`, r3c1 (`~12500`) | `~12500–13140` | `ANTARCTIC PENINSULA` is readable; stop before the next labeled match. Stage unresolved. |
| Shambali Monastery | `Q00HxoyoMdo-060.jpg`, r5c1 (`~15000`) | `~15000–16310` | `SHAMBALI MONASTERY` is readable; stop before the Route 66 label. |
| Route 66 | `Q00HxoyoMdo-065.jpg`, r3c2 (`~16310`) | `~16310–17450` | `ROUTE 66` is readable; stop before the next labeled match. |
| Blizzard World | `Q00HxoyoMdo-072.jpg`, r3c4 (`~18080`) | `~18080–18950` | `BLIZZARD WORLD` is readable; stop before the Colosseo label. |
| Colosseo | `Q00HxoyoMdo-075.jpg`, r5c1 (`~18950`) | `~18950–19780` | `COLOSSEO` is readable; stop before the Numbani label. |
| Numbani | `Q00HxoyoMdo-079.jpg`, r1c4 (`~19780`) | `~19780–20670` | `NUMBANI` is readable; stop before the Junkertown label. |
| Junkertown | `Q00HxoyoMdo-082.jpg`, r4c3 (`~20670`) | `~20670–21920` | `JUNKERTOWN` is readable; stop before the Nepal label. |
| Dorado | `Q00HxoyoMdo-089.jpg`, r4c5 (`~22440`) | `~22440–22850` | `DORADO` is readable; stop before the Gibraltar label. |
| Watchpoint: Gibraltar | `Q00HxoyoMdo-091.jpg`, r3c1 (`~22850`) | `~22850–23320` | `WATCHPOINT: GIBRALTAR` is readable; stop before the next labeled match. |
| King's Row | `Q00HxoyoMdo-097.jpg`, r3c4 (`~24380`) | `~24380–25580` | `KING'S ROW` is readable; stop before the next readable hero-selection label. |

These 14 are newly covered relative to the original nine-map visual set. The storyboard pass also shows readable labels for maps already covered there, but those duplicates do not change the 30-map count. Objective phase remains **unresolved for every row above**: no accepted cell proves an attack/defense side or a named control stage.

### Timestamped actionable claims

These are exact contiguous auto-caption fragments, preserved without silent correction. They are educational spoken claims, not visually verified annotation points; deictic surfaces and endpoints remain unresolved. The cap is three claims per defensibly identified map.

| Map | Anchor | Exact caption claim | Actionable reading, without added phase/geometry |
|---|---:|---|---|
| Hollywood | `4438.239` | `angle heed look creating an aggressive off angle we have an advantage enemies go back of course what will I do walk forward go even behind surprise Hanzo Hanzo definitely didn't expect to see me here but you see I didn't sit here and just kept shooting forever` | Create an aggressive off-angle; when enemies retreat, advance and surprise them instead of remaining static. Exact position/path unresolved. |
| Hollywood | `4619.480` | `going to wall climb create an angle I need to get healed before I go so I'm just going to walk here where they can heal me for a second and there's since there's no damage here I'm going to create enough angle of` | Use wall climb to create an angle, but first move into healing access. Climb surface, destination, and route unresolved. |
| Hollywood | `5178.000` | `I'm going to quickly move to the left side had to Dragon their roog here going to quickly create an off Ango on the left side I know it's it might seem like a long rotation because it actually is but I was already there` | Rotate to the left-side off-angle; the speaker acknowledges it is a long rotation. Exact start/end unresolved. |
| Nepal (stage unresolved) | `5483.400` | `going to create an off angle going to bait him what what am I why am I in the middle of an open space that was such a bad mistake I'm just standing in the open space in the middle at least I used this as cover I mean I wasn't in the open` | Create an off-angle, while avoiding standing in open space and retaining cover. Exact cover/object unresolved. |
| Nepal (stage unresolved) | `6001.520` | `it utilizing my wol climb to jump above the shield creating a quick off angle they're like what the hell's going on shooting from an off angle the enemies go back I go forth Through The High` | Use wall climb to get above a shield and make a quick off-angle; advance as enemies retreat. Landing surface and route unresolved. |
| Nepal (stage unresolved) | `6257.400` | `fundamentals you shoot off angle constantly rotate move around do not spam the tank 24/7` | General Hanzo positioning rule: shoot from off-angles, rotate continually, and do not spend all fire on the tank. |
| Busan (stage unresolved) | `9558.640` | `damage from the off angle use cover I see they're pushing me boom cover playing around` | Apply off-angle damage, then play cover when pushed. Exact cover unresolved. |
| Midtown | `10556.120` | `Peak I got to create an angle from the right side I think that LE standing there I'm going to do much you can't` | Create a right-side angle. Exact position unresolved. |
| Ilios (stage unresolved) | `11252.960` | `change my angles off angle W climb drop down use natural cover to not die keep myself from distance they go back I go` | Change angles, wall-climb/drop, and use natural cover. Exact surfaces unresolved. |
| Havana | `11647.960` | `angle cting off angle pretend like I'm pushing in but I'm not I'm moving back probably going` | Threaten an off-angle while actually backing away. Exact lane unresolved. |
| Antarctic Peninsula (stage unresolved) | `12814.239` | `create off Angle now what was my target priority I was shooting the malga a little bit too much I should have` | Create an off-angle and reassess target priority. Exact angle unresolved. |
| Shambali Monastery | `15503.000` | `out got to switch my angle to The High Ground but there's a c there there's no` | Switch the angle toward high ground. Exact high ground unresolved. |
| Route 66 | `16516.480` | `angle constantly switch around my positioning use my cool Downs use my Sonar Arrow to have to get an idea it's` | Continually change position and use Sonic Arrow for information. Exact positions unresolved. |
| Blizzard World | `18494.958` | `fast going to create an off angle from The High Ground immediately maybe surprise them a bit got to do something` | Quickly create a high-ground off-angle to surprise opponents. Exact high ground unresolved. |
| Colosseo | `19179.680` | `laps they not going to be in open space I don't like be in open space yet I walked way too far forward way to` | Avoid open space and overextending. Exact location unresolved. |
| Numbani | `20162.000` | `here using cover for a second so back up you see using cover for a second back making sure they can kill me in that` | Briefly back into cover. Exact cover unresolved. |
| Junkertown | `21321.558` | `see I climb top PR why because off angle and also mid-range distance but good on him for contesting` | Climb upward for an off-angle at mid-range. Exact surface unresolved. |
| Dorado | `22554.958` | `can Ang go get it KCK CR an off angle on The High Ground Miss every shot that's okay` | Create a high-ground off-angle. Exact high ground unresolved. |
| King's Row | `24624.520` | `thinging off angle from the right ends now not sure why they use [Music]` | Take an off-angle from the right. Exact position unresolved. |

### Unslotted candidates

The remaining caption track contains many potentially actionable references to off-angles, cover, high ground, flanks, wall climbs, left/right sides, and rotations. They are intentionally not enumerated as map claims when they fall outside the accepted labeled windows, inside the deliberate gaps between those windows, or beyond the three-row cap. Assigning gap material from architecture, match sequence, or presumed chapter order would violate the audit rule.

One previously slotted row fails that boundary rule and is retained here as exact rejected evidence rather than silently shifted:

| Former assignment | Anchor | Exact auto-caption text | Rejection reason |
|---|---:|---|---|
| Watchpoint: Gibraltar | `22829.878` | `you natural cover is always W climb to escape W climb to get to off angles High grounds Etc use my L lunges and Escape` | The anchor precedes the accepted Gibraltar window, which begins at the readable identity cell at `~22850`; it therefore cannot be assigned to Gibraltar. No replacement is asserted. |

All other actionable anchors above fall within their corresponding accepted caption- or storyboard-identified windows.

### Storyboard acquisition record

The verified metadata records four MHTML storyboard formats: `sb3` at 48×27 (10×10, 1 fragment), `sb2` at 80×45 (10×10, 26 fragments), `sb1` at 160×90 (5×5, 104 fragments), and `sb0` at 320×180 (3×3, 289 fragments). The complete `sb1` level is now locally preserved and hash-verified. Its cadence is sufficient for the readable selection labels above, but it is not treated as continuous video and cannot prove routes between samples. A future targeted `sb0` or frame acquisition would be useful only for phase/HUD and finer geometry confirmation.

## Acquisition plan

1. Preserve the existing `ZFjzANTx17U` evidence for the nine visually identified maps; do not extrapolate it to other maps.
2. Preserve the verified `Q00HxoyoMdo` MHTML, captions, and complete `sb1` set. Use only the explicitly labeled windows above; do not extrapolate across transitions or storyboard samples.
3. Do not retrieve any of the 34 unique IDs in the original search corpus for Hanzo map annotation. None clears the explicit hero + map + educational-evidence threshold.
4. In a future network-enabled discovery task, search the seven unresolved maps with quoted map names and Hanzo-specific terms, then save fresh flat metadata before deciding. Favor map-named Hanzo coaching, Hanzo VOD reviews, or educational Hanzo long-form sources; exclude generic “every map” claims unless chapters/descriptions explicitly name the target map.
5. For any future chosen ID, use the exact executable and metadata/subtitle command template above first. Only after saved metadata proves the map window should storyboards or video frames be acquired for visual phase/geometry review.
6. Continue to treat unaudited captions, routes, positions, and objective phases as unknown until directly retrieved and audited.

## Counts

| Measure | Count |
|---|---:|
| Scoped maps | 30 |
| Maps in original visual set | 9 |
| Missing maps searched | 21 |
| Non-empty, parsed search files | 21 |
| Successful manifest rows | 21 |
| Returned result rows | 72 |
| Unique returned video IDs | 34 |
| Chosen acquisition candidates | 0 |
| Second long-form sources caption-audited | 1 |
| Verified `sb1` sheets inspected | 104 of 104 |
| Directly caption-identified maps in second source | 2 (Hollywood; Nepal) |
| Newly covered maps from second source | 14 |
| Combined maps with defensible identity evidence | 23 |
| Maps with actionable candidate rows in second source | 15 |
| Actionable candidate rows in second source | 19 |
| Combined identity-covered maps without a second-source actionable candidate row | 8 |
| Maps still lacking defensible saved identity | 7 |
| Invented captions or timestamps | 0 |
