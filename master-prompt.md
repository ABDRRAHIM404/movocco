# MOVOCCO 2.0 — MASTER PROJECT PROMPT

## YOUR ROLE

Act as a senior product architect, full-stack engineer, mobile architect, UX/UI designer, transportation systems specialist, and technical researcher.

We are rebuilding **Movocco** completely from scratch.

Movocco is a Moroccan transportation guide and multimodal journey-planning platform exclusively for international tourists visiting Morocco and domestic tourists traveling within Morocco, using local transportation.

The goal is to create a reliable, beautiful, intuitive, multilingual transportation platform accessible through:

- A responsive website
- A native Android application
- A native iOS application

**CURRENT AUTHORIZATION: The general architecture and phased approach are approved. Phase 0 planning documentation is approved. Do not start coding, install dependencies, or begin another milestone without approval. Never deploy, purchase services, or modify production without explicit permission.**

Do not describe Movocco as a SaaS product.

---

## 1. PROJECT VISION

Build a premium Moroccan transportation guide and intelligent journey planner.

Movocco must help users discover how to travel from point A to point B using Morocco's transportation networks, including connections that are difficult to find on conventional mapping platforms.

Begin with **Souss-Massa**, then progressively expand throughout Morocco.

Design the architecture for nationwide coverage from the beginning, without unnecessarily complicating the initial implementation.

Prioritize:

- Transportation information accuracy
- Easy journey planning
- Affordable transportation discovery
- Community-powered local knowledge
- Mobile-first usability
- Accessibility and low-bandwidth performance
- Scalability and maintainability

## 2. SUPPORTED TRANSPORTATION

Support these transportation categories:

1. Grand taxis
2. Petit taxis
3. City buses, including Alsa where applicable
4. Intercity buses, including CTM and Supratours
5. Ride-hailing services such as InDrive
6. Rural and informal shared transportation
7. Airport transfers
8. ONCF trains

Design a flexible transport data model that supports different operators, service patterns, fare structures, availability rules, and route types.

Do not assume all transport modes exist in every region.

## 3. INTELLIGENT JOURNEY PLANNER

The planner must support:

- Multiple journey options ranked by cheapest, fastest, and fewest transfers
- Estimated fares and total journey costs
- Estimated travel duration
- Step-by-step journey instructions
- Transfer points and connections
- Stations and stops on an interactive map
- Departure schedules where available
- Walking directions to stations
- Local travel tips and warnings
- Community-supplied route information

### Routing architecture

Use a **hybrid intelligent routing approach** combining:

- Manually verified transportation routes
- Automatic route and transfer calculations
- Clearly labeled fallback suggestions when data is incomplete

Research appropriate graph-based journey-planning algorithms and routing engines.

Do not invent schedules, prices, connections, or service availability.

Explain how to handle variable-frequency shared taxis, routes without fixed timetables, incomplete geographic data, and uncertain fares.

## 4. SEARCH AND DISCOVERY

Support:

- Searches by city, town, village, and neighborhood
- Landmarks, hotels, airports, and tourist attractions
- Multilingual place names
- Autocomplete and spelling correction
- GPS-based origin selection
- Nearby transportation discovery
- Popular destinations and suggested journeys
- Map-based origin and destination selection
- Recent searches and favorite destinations

Research suitable geocoding, place-search, and geographic-data solutions.

## 5. INTERACTIVE MAPS

Required features:

- Transportation stops, stations, and hubs
- Complete route and transfer visualization
- Walking connections
- GPS positioning
- Nearby transport discovery
- Live step-by-step navigation
- Transport-category filters
- Estimated fares and travel times

Evaluate OpenStreetMap, MapLibre, Leaflet, and other suitable mapping technologies.

Consider performance, licensing, reliability, offline limitations, and free-tier restrictions.

Full offline maps are not required initially.

## 6. ACTIVE JOURNEY EXPERIENCE

During an active journey, provide:

- Step-by-step journey timeline
- GPS location tracking
- Current journey stage
- Upcoming transfer information
- Destination and transfer-stop notifications
- Journey recalculation
- Nearby alternative transportation
- In-journey issue reporting

Research the limitations of browser-based navigation, mobile background location tracking, and notification delivery.

Distinguish between capabilities achievable on web and those requiring native mobile functionality.

## 7. TRANSPORT DATA STRATEGY

Combine six data acquisition and validation methods:

1. Manual entry and verification through the admin dashboard
2. Official transport datasets and APIs, when legally accessible
3. Community transportation contributions
4. OpenStreetMap geographic data
5. AI-assisted data organization and anomaly detection
6. Source-based verification and confidence tracking

Every important transport record should include appropriate provenance and freshness metadata.

Differentiate:

- Officially verified information
- Admin-verified information
- Community-confirmed information
- Estimates
- Unconfirmed submissions
- Outdated information

Provide source references and last-updated dates.

Do not treat community voting or AI output as official verification.

Research real data availability in Souss-Massa and explicitly identify data gaps, licensing restrictions, and information requiring field verification.

## 8. COMMUNITY SYSTEM

Authenticated users can:

- Suggest routes, stations, and stops
- Report fare changes
- Report incorrect or outdated information
- Share local transportation tips
- Rate transportation routes and services
- Vote to confirm community submissions
- Report temporary service disruptions

Design moderation, abuse prevention, reputation, contribution history, and verification workflows.

Community contributions must not silently overwrite verified transportation data.

## 9. AUTHENTICATION AND USER ROLES

Journey planning must be publicly accessible without registration.

Accounts are required for contributions, voting, and saved journeys.

Support:

- Email authentication
- Google authentication
- Traveler accounts
- Moderators
- Administrators

Design secure permissions, account deletion, and personal-data controls.

## 10. MULTILINGUAL SUPPORT

Support seven languages:

- English
- French
- Modern Standard Arabic
- Moroccan Darija
- Tamazight / Tachelhit
- Spanish
- German

Include:

- Proper right-to-left interfaces for Arabic and Darija
- Localization of interface content
- Multilingual place names and search
- Translation management
- Language persistence
- Accessible font and typography choices

Research appropriate writing conventions and translation quality requirements for Tachelhit and Darija.

Do not assume all languages use the same script or layout conventions.

Build the localization architecture from the beginning, while proposing a realistic phased translation rollout.

## 11. AI TRAVEL ASSISTANT

Provide an AI assistant that answers questions about Moroccan transportation.

The assistant must rely on verified platform information and appropriately identified sources.

It should:

- Explain transportation options
- Answer route-related questions
- Clarify transfers and local travel practices
- Communicate uncertainty when information is incomplete
- Avoid fabricating prices, schedules, or transport operators

Separately, AI may assist administrators with identifying incomplete records and organizing contributions.

Research low-cost implementation strategies, including whether AI features should be delayed until sustainable infrastructure is available.

## 12. ADMIN DASHBOARD

Design a comprehensive administration system covering:

- Routes, stations, stops, and connections
- Operators and transport services
- Fares, schedules, and durations
- Community submissions and verification
- Users, roles, and moderation
- Translation management
- Destination guides and travel tips
- Visitor analytics and journey-search analytics
- Service disruptions and alerts
- Website content, images, and settings

Include audit logs, validation workflows, and role-based access.

Prioritize efficient data-entry tools for building the initial Souss-Massa transport network.

## 13. BOOKINGS

Initially, Movocco will provide links to official transportation booking platforms when available.

Do not build payment processing or internal ticket reservations for the initial release.

Structure the system so that supported booking partnerships can be integrated later.

## 14. DESIGN AND BRAND IDENTITY

Completely redesign Movocco's visual identity while keeping its name.

Brand characteristics:

- Modern and minimalist
- Premium and sophisticated
- Adventurous and welcoming
- Subtly inspired by Moroccan culture
- International-quality user experience

Combine premium travel editorial design with the practicality of a modern transportation application.

Research and propose:

- Brand identity directions
- Logo concepts
- Color palettes
- Typography systems
- Iconography
- UI components
- Responsive layouts
- Interaction and motion guidelines

Avoid generic travel templates and excessive decorative elements.

### Homepage

Use a hybrid homepage with:

- Prominent journey search
- High-quality Moroccan destination photography
- Popular journeys
- Destination discovery
- Clear access to transportation information

The primary function must remain journey planning.

## 15. PERFORMANCE, ACCESSIBILITY, AND CONNECTIVITY

Requirements:

- Fast loading on slow mobile connections
- Low-data mode
- Reduced imagery and animations when requested
- Offline-accessible saved journey instructions
- Cached recently viewed routes and stations
- Screen-reader and keyboard accessibility
- Adjustable text sizing and high contrast
- Reduced-motion support
- Graceful GPS and map-service fallbacks

Aim for WCAG 2.2 AA accessibility where applicable.

Account for users traveling through rural areas with intermittent internet access.

## 16. SECURITY AND PRIVACY

Plan for:

- Secure authentication
- Role-based access control
- GPS privacy and minimal data collection
- User account and data deletion
- Anti-spam protections
- Abuse reporting
- API rate limiting
- Admin activity audit logs
- Database backups and recovery
- Privacy-friendly analytics and consent controls

Identify relevant Moroccan data-protection obligations and any applicable requirements for international users.

Do not store continuous location histories unless strictly necessary and explicitly authorized.

## 17. MONETIZATION

No monetization at launch.

Do not introduce advertising, paid subscriptions, sponsored rankings, or affiliate monetization into the initial product.

Focus on reliability, usefulness, adoption, and community growth.

## 18. TECHNOLOGY RESEARCH

Do not assume a predefined tech stack.

Research and compare suitable solutions for:

- Frontend framework
- Native Android and iOS applications
- Backend architecture
- Database and geospatial extensions
- Authentication
- Maps and geocoding
- Routing engines
- Content management
- Internationalization
- Testing
- Monitoring
- Hosting and deployment

Compare realistic options, including technologies such as Next.js, React Native, Expo, Flutter, PostgreSQL/PostGIS, Supabase, and appropriate open-source routing tools.

These are examples, not mandatory choices.

Evaluate performance, maintainability, code sharing, scalability, developer experience, licensing, and operating costs.

## 19. REPOSITORY ARCHITECTURE

Evaluate:

- Monorepo
- Separate repositories

Recommend the structure best suited to web, Android, iOS, shared business logic, and backend services.

Explain the tradeoffs and how the chosen structure supports phased development.

## 20. BUDGET CONSTRAINT

The initial budget is approximately zero.

Prioritize:

- Open-source technologies
- Sustainable free tiers
- Minimal infrastructure complexity
- Efficient resource utilization
- Avoiding vendor lock-in
- Clear upgrade paths

Research actual provider limits, not assumed or outdated quotas.

Account for mapping API usage, geocoding restrictions, AI inference, database growth, native app tooling, and app-store publishing fees.

Separate free development/testing from services and accounts required for public release.

Never purchase services, upgrade accounts, or deploy without my approval.

## 21. DEVELOPMENT ROADMAP

Use exactly these seven phases, in dependency order:

**Phase 0 — Planning**
Tourist-focused MVP, complete requirement mapping, architecture decisions, and transport-data dependencies.

**Phase 1 — Foundation**
Architecture, database, authentication, design system, localization foundations, security, accessibility, and core infrastructure.

**Phase 2 — Transport Data**
Essential administration, licensed sourcing, data entry, moderation and verification foundations, geographic records, fares, calendars, and provenance.

**Phase 3 — Journey Planner**
Geographic search, hybrid multimodal routing, maps, walking connections, and transparent uncertainty.

**Phase 4 — Web MVP**
Responsive tourist experience, community submissions, saved journeys, official booking links, launch translations, offline instructions, and launch-readiness checks. Public deployment requires separate approval.

**Phase 5 — Advanced Features**
AI assistant and admin assistance, advanced community capabilities, active navigation, multilingual completeness, broader coverage, comprehensive administration, and further accessibility and performance improvements.

**Phase 6 — Mobile Apps**
Native Android and iOS applications, platform-specific functionality, background journey assistance, and release preparation. Publishing and paid services require separate approval.

All approved requirements remain in this specification, including deferred features. Deferral does not authorize implementation or remove a requirement. Accessibility, privacy, security, and performance apply from the foundation onward.

For every phase, provide dependencies, priorities, deliverables, testing requirements, and measurable acceptance criteria.

Identify the smallest useful MVP that can realistically launch in Souss-Massa.

## 22. CODEX DEVELOPMENT RULES

After the plan is approved:

1. Work on one approved milestone at a time; identify its tasks, dependencies, and acceptance criteria before starting. Never skip dependencies.
2. Run appropriate linting, tests, type-checking, and production builds after implementation; fix failures before committing. Use documentation consistency checks for documentation-only milestones.
3. Commit completed milestones to Git.
4. Maintain only three concise core tracking files: PLAN.md, PROGRESS.md, and DECISIONS.md. The master specification remains the complete requirements source.
5. Record architecture decisions in DECISIONS.md; keep milestone scope in PLAN.md and results, checks, blockers, and next steps in PROGRESS.md.
6. Write automated tests for critical functionality.
7. Avoid unnecessary dependencies and overengineering.
8. Conduct security, accessibility, and performance reviews.
9. Never deploy, purchase services, or modify production without explicit approval.
10. Never implement unapproved features. Preserve every approved requirement, including deferred scope, in the master specification.
11. Keep responses extremely concise: completed work, tests, blockers, next step. Avoid repeated research, unnecessary explanations, excessive documentation, and unnecessary dependencies.

Do not claim a feature is complete unless it satisfies its acceptance criteria and appropriate checks have passed.

## 23. REQUIRED PLANNING DELIVERABLES

Before writing code, produce:

1. Executive product vision and positioning
2. Competitor and existing-solution analysis
3. Souss-Massa transportation data feasibility research
4. Complete feature inventory and prioritized requirements
5. User personas and critical user journeys
6. Information architecture and proposed screens
7. Brand and UX/UI design direction
8. Technology comparison matrix and recommendations
9. Web/mobile/backend/repository architecture
10. Geospatial database and transport graph design
11. Multimodal routing algorithm strategy
12. Transport-data sourcing and verification strategy
13. Community moderation and administration architecture
14. Security, privacy, and localization strategy
15. Free-tier infrastructure analysis and cost risks
16. MVP definition and phased development roadmap
17. Testing strategy and milestone acceptance criteria
18. Outstanding risks, assumptions, and decisions requiring approval

Use current official documentation and credible sources when conducting technical and transportation research.

Separate verified findings from assumptions and recommendations.

If browsing or external research is unavailable, explicitly identify what remains unverified rather than inventing findings.

## FINAL INSTRUCTION

The initial research-backed proposal has been presented, and the general architecture, phased approach, and Phase 0 task list are approved.

Complete Phase 0 planning only. Do not start coding or another milestone without approval. Within an approved milestone, perform its authorized work, required checks, and Git commit without asking again. Deployment, paid services, and production changes always require explicit permission.

Use PLAN.md, PROGRESS.md, and DECISIONS.md to continue incrementally while preserving this complete master specification.
