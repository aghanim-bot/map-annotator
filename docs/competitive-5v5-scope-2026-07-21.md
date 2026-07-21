# Competitive 5v5 map scope — 2026-07-21

Research cutoff: **2026-07-21**.

## Scope decision

This corpus targets **Ranked Role Queue 5v5**. It excludes Ranked Open Queue 6v6, Stadium Ranked, Arcade/temporary Competitive modes, Assault, and Clash.

The current standard Competitive ruleset consists of **Control, Escort, Flashpoint, Hybrid, and Push**. The live map catalogue identifies these standard maps as the maps used for Unranked and Competitive Play. Its Clash section separately records that Clash left Competitive in Season 15 and later left Quick Play.

Blizzard's 2026-07-15 format update independently distinguishes Ranked Role Queue 5v5, Ranked Open Queue 6v6, and Stadium Ranked as separate populations. Blizzard's 2026-06-16 Season 3 announcement adds **Neon Junction** as a Hybrid map and describes its capture-then-escort structure.

## Included maps

| Mode | Maps | Count |
|---|---|---:|
| Control | Antarctic Peninsula; Busan; Ilios; Lijiang Tower; Nepal; Oasis; Samoa | 7 |
| Escort | Circuit Royal; Dorado; Havana; Junkertown; Rialto; Route 66; Shambali Monastery; Watchpoint: Gibraltar | 8 |
| Flashpoint | Aatlis; New Junk City; Suravasa | 3 |
| Hybrid | Blizzard World; Eichenwalde; Hollywood; King's Row; Midtown; Neon Junction; Numbani; Paraíso | 8 |
| Push | Colosseo; Esperança; New Queen Street; Runasapi | 4 |
| **Total** |  | **30** |

## Explicit exclusions

| Exclusion | Reason |
|---|---|
| Hanaoka; Throne of Anubis | Clash was removed from Competitive Play in Season 15. |
| Hanamura; Horizon Lunar Colony; Paris; Temple of Anubis; Volskaya Industries | Assault/Arcade maps, not standard Competitive Role Queue maps. |
| Stadium variants and Stadium-only maps | Stadium Ranked is a separate queue and format. |
| Ranked Open Queue | The current Open Queue format is 6v6, while this corpus is explicitly 5v5. |
| Seasonal, event, Deathmatch, Elimination, Capture the Flag, and Custom maps | Not part of standard Competitive Role Queue 5v5. |

## Annotation-phase model

The corpus uses every meaningful objective phase and side without multiplying identical geometry for overtime/time-bank repeats.

| Mode | Phase IDs per map |
|---|---|
| Control | One phase for each of the map's three round stages. Both teams attack the same objective, so prompts are side-aware only where the geometry is not interchangeable. |
| Escort | `attack-checkpoint-1..3` and `defense-checkpoint-1..3`. Extra rounds reuse these phases. |
| Flashpoint | One phase for each of the five possible objective sites. Team-side variants are added only where spawn/approach geometry differs materially. |
| Hybrid | `attack-point-a`, `defense-point-a`, `attack-checkpoint-1..2`, and `defense-checkpoint-1..2`. Extra rounds reuse these phases. |
| Push | `neutral-opening`, plus one phase for each team's push direction before and after its forward spawn checkpoint. |

## Sources

1. Overwatch Wiki, **Maps** (live page retrieved 2026-07-21): https://overwatch.fandom.com/wiki/Maps
   - States that Standard Play maps are used for Unranked and Competitive Play.
   - Lists the current maps by Control, Escort, Flashpoint, Hybrid, Push, and Clash.
   - Records that Clash was removed from Competitive Play in Season 15.
2. Blizzard Entertainment, **Ride in with Claws Out for Reign of Talon – Season 3: Into the Tiger's Den**, 2026-06-16: https://overwatch.blizzard.com/en-us/news/24271881/ride-in-with-claws-out-for-reign-of-talon-season-3-into-the-tigers-den/
   - Introduces Neon Junction as a Hybrid map and describes capture followed by payload escort.
3. Blizzard Entertainment, **Director's Take: Future Formats**, 2026-07-15: https://overwatch.blizzard.com/en-us/news/24289101/director-s-take-future-formats/
   - Separately reports Ranked Role Queue 5v5, Ranked Open Queue 6v6, and Stadium Ranked participation.
4. Overwatch Wiki, **Competitive Play** (live page retrieved 2026-07-21): https://overwatch.fandom.com/wiki/Competitive_Play
   - Describes the Competitive rulesets for Control, Escort, Flashpoint, Hybrid, and Push and records 5v5 Open Queue's replacement by 6v6 Open Queue.

## Confidence and maintenance

- **High confidence:** the five included modes, the 30-map list, Neon Junction's inclusion, and the separation of 5v5 Role Queue from 6v6 Open Queue and Stadium.
- **High confidence exclusion:** Clash, Assault, Stadium, Arcade, and temporary modes.
- The map list is date-stamped because Blizzard can disable or rework maps independently of the general catalogue. Before a future deployment, recheck official patch notes and the live map catalogue.
