# Movocco decisions

Updated: 2026-11-06. Complete requirements: [master-prompt.md](master-prompt.md).

## Approved

- Audience: international visitors and domestic tourists traveling within Morocco.
- Seven ordered phases: Planning, Foundation, Transport Data, Journey Planner, Web MVP, Advanced Features, Mobile Apps (0–6).
- General architecture: web first; monorepo; Next.js, PostgreSQL/PostGIS with Supabase, MapLibre, regional place index, bounded transport graph; React Native/Expo for later native apps. Exact versions/provider setup remain to be checked before use.
- Preserve all master requirements, including deferred features. General architecture approval does not authorize every feature or service action.
- Phase 0 scope baseline only is authorized. Use one approved milestone at a time and three concise tracking files; validate before commit. No paid services, deployment or production changes without permission.
- Public planning, authenticated contributions/saved journeys, official booking links, no launch monetization and no continuous location history by default.

## Critical transport-data gates — unresolved

| Dependency | Evidence required before publication/routing |
| --- | --- |
| Sources and rights | Operator/authority/source reference, explicit license or reuse permission; public web access alone is insufficient |
| Boarding geography | Verified coordinates, entrance/boarding location, direction, local names and access instructions |
| Services | Operator/mode, ordered stops or service area, direction, availability and boarding/alighting restrictions |
| Departure behavior | Dated timetable or verified frequency/window; shared taxis may depart when full; unknown waits stay unknown |
| Fares/durations | Dated evidence, MAD amount/range and per-person/per-vehicle basis, conditions; identify estimates and unknowns |
| Transfers/walking | Verified pedestrian access, connection feasibility, transfer time and any accessibility limitations; proximity alone is insufficient |
| Freshness and operations | Named review owner, observed/verified dates, review interval, conflict resolution and disruption expiry |

Alsa/Amalway and CTM/Supratours are source candidates, not confirmed reusable feeds.
Taxi/rural data need local verification. No licensed Souss-Massa GTFS feed was established by prior research.
No operator outreach or field verification has been performed. An accountable data steward and lawful evidence acquisition are prerequisites for a reliable launch.

## Proposals requiring refinement/confirmation

- Exact launch corridors and numeric coverage targets depend on evidence availability; retain a small Agadir-area scope.
- Atlantic Atlas branding and translation sequence remain proposals; script/editorial choices need Darija/Tachelhit reviewers.
- Prior provider/price research is a dated planning input, not an uptime or zero-cost guarantee. Recheck only the services relevant to the next approved milestone.
- Before hosted accounts: resolve CNDP/overseas processing obligations, email delivery, provider limits and backup/recovery ownership.
- Before mobile release: resolve physical-device access, background permissions, store fees and publishing authorization.

Research references remain in the initial proposal; avoid duplicating its full report here.
