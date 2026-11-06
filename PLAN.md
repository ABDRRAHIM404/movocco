# Movocco plan

Updated: 2026-11-06. Requirements authority: [master-prompt.md](master-prompt.md).
Audience: international tourists visiting Morocco and domestic tourists traveling within Morocco.
Only Phase 0 is authorized. One milestone at a time; no skipped dependencies.

## Phase sequence and exit gates

Each phase depends on the preceding phase's accepted deliverables. Before work starts,
define and obtain approval for a small milestone's tasks, dependencies, and acceptance criteria.

| Phase | Priority / deliverables | Acceptance and checks |
| --- | --- | --- |
| 0 Planning | Tourist scope, requirement mapping, decisions, data dependencies | All 23 specification sections accounted for; no implementation |
| 1 Foundation | Monorepo, database, auth/roles, design and locale foundations | Permission and validation tests pass; RTL shell, lint, types, build checked |
| 2 Transport Data | Essential admin, sourcing/imports, places, directional services, fares, calendars, evidence | Publish only licensed/authorized, reviewed data; import, provenance, moderation and geography checks pass |
| 3 Journey Planner | Place search, graph, fare logic, walking connections, maps | All selected, independently verified reference journeys pass; count is flexible; unknowns remain unknown; no invented connections |
| 4 Web MVP | Tourist flows, contributions, saved instructions, booking links, launch translations | Critical browser flows, deletion, offline snapshots, accessibility and performance checks pass; no deployment without approval |
| 5 Advanced Features | Remaining community/admin scope, navigation, AI, full localization, wider coverage | Feature-specific tests; AI source/refusal checks; seven languages reviewed; navigation limitations explicit |
| 6 Mobile Apps | Native Android/iOS, background assistance, release preparation | Physical-device permission, termination, battery and connectivity tests pass; publishing separately approved |

For code milestones: fix relevant test, lint, type-check and build failures before committing.
Accessibility, privacy, security and low-bandwidth support begin in Phase 1, not Phase 5.

## Tourist-focused web MVP

- Initial area: Agadir only. Inezgane, Aït Melloul, Aourir, Tamraght and Taghazout are future expansion areas requiring explicit approval; airport or other connections outside Agadir also require scope approval.
- Public planning from places, hotels, landmarks and airports; multilingual aliases, GPS/map selection, nearby discovery and clear no-coverage states.
- Compare supported journeys by cost, time and transfers; boarding/walking/transfer instructions, sourced estimates, freshness, alerts and maps with text alternatives.
- Essential admin, moderated submissions and issue reports; email/Google accounts for contributions and saved journeys; deletion and role enforcement.
- Saved offline instructions, cached recent transport records, low-data controls; official booking links only; no launch monetization or payments.
- Proposed translation order: English/French/MSA, then Darija/Tachelhit, then Spanish/German. Core launch translations need human review.
- Flexible estimates, not mandatory requirements: 20–30 directional service patterns, 30–50 boarding points/hubs, and 15 reference journeys. Actual coverage depends on independently verified transportation data; retain the goal of at least two verified modes.
- All eight transport categories remain required; include actual services only where verified. AI, advanced navigation/community features and mobile apps are deferred, not removed.

## Requirement-to-phase map

References point to complete requirements in the master specification; each row covers its entire section.

| Master section(s) | Delivery allocation |
| --- | --- |
| 1 Vision | 0 scope; 4 tourist web experience; 5 expansion |
| 2 Transport categories | 1 flexible model; 2 verified initial modes; 5 nationwide coverage |
| 3 Journey planner | 2 evidence; 3 algorithms, ranking and instructions; 5 extensions |
| 4 Search/discovery | 2 place data; 3 search/GPS/map selection; 4 recents/favorites/discovery |
| 5 Maps | 3 routes, stops, transfers, filters; 5 live navigation; 6 native integration |
| 6 Active journeys | 4 basic timeline; 5 tracking, alerts, recalculation, alternatives/reporting; 6 background capabilities |
| 7 Data strategy | 0 feasibility; 1 provenance model; 2 sourcing/verification; 4 contributions; 5 AI assistance |
| 8 Community | 2 moderation foundations; 4 submissions/tips/reports/history; 5 ratings/voting/reputation/appeals |
| 9 Auth/roles | 1 permissions and auth; 4 public flows, deletion and saved journeys |
| 10 Languages | 0 script decisions; 1 locale/RTL architecture; 4 launch translations; 5 all seven languages |
| 11 AI | 0 defer for cost/data readiness; 5 grounded traveler/admin assistance |
| 12 Admin | 2 transport editing, verification, audit; 4 launch content/translations/alerts/analytics; 5 comprehensive remaining controls |
| 13 Bookings | 4 official links; 5 partnership-ready extension boundaries; no initial internal reservations/payments |
| 14 Brand/design | 0 direction; 1 tokens/components; 4 responsive editorial/search experience; 6 mobile adaptation |
| 15 Performance/accessibility | 1 foundations; 3 map/GPS fallbacks; 4 offline/cache and release gates; 5–6 continued improvements |
| 16 Security/privacy | 0 obligations; 1 controls; 2–6 ongoing permission, retention, abuse, backup and privacy checks |
| 17 Monetization | 0–6 enforce no launch monetization |
| 18–20 Technology/repository/budget | 0 comparisons/decisions; 1 setup; 2–6 validate relevant limits before adoption; no paid services without permission |
| 21–22 Roadmap/development rules | 0–6 dependency order, approved milestones, checks, concise tracking and commits |
| 23 Planning deliverables | 0 prior research proposal plus this baseline; resolve milestone-specific details before coding |

## Milestone 0.1 — Scope baseline

- Authorization: user approved Phase 0 on 2026-11-06.
- Dependencies: reviewed master requirements, prior research proposal, approved scope corrections.
- Tasks: align master audience/phases/rules; create these three trackers; map every requirement and MVP boundary; record transport-data gates and unresolved decisions.
- Acceptance: all 23 sections traceable; substantive product requirements retained; seven exact phases; data unknowns explicit; no application code, dependencies, services or deployment.
- Validation: compare unchanged requirement sections to the original; check mapping, links, phase sequence, tracker scope and Git diff.
- Next proposed milestone: 1.1, local foundation skeleton only, after approval of its concrete task list and remaining setup decisions. Transport ingestion and routing must wait for their dependencies.

## Proposed milestone 1.1 — Local web skeleton (not authorized)

- Dependencies: accepted Phase 0 baseline, explicit milestone approval; check current framework/runtime compatibility before installation.
- Tasks: create a minimal TypeScript monorepo and Next.js web shell with basic layout structure; configure lint/type/build scripts and lockfile; establish seven-locale metadata and LTR/RTL layout foundations with clearly labeled untranslated content.
- Acceptance: local web shell builds; lint and type checks pass; locale direction and keyboard behavior checked; no fabricated transport data, hosted resources, auth integration or deployment. Logo, colors, typography, homepage design and brand identity must not be finalized without explicit approval.
- Later Foundation milestones must establish database/auth/permissions and design foundations before Transport Data starts. Branding and translation content remain subject to review.
