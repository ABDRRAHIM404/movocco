# Movocco — Android app (Level A pilot)

Expo React Native (TypeScript) app for Movocco, the Moroccan transport guide
and multimodal journey planner for tourists. **Agadir only** for the MVP.

> **Status: Level A pilot / functional demonstration.** This is Milestone 1
> of the Android side quest. It is NOT the completed Movocco project, and it
> must not be presented as a working Agadir transport app.

## What's real vs what's DEMO

**Real:**
- App shell, 5-tab navigation (Plan · Nearby · Explore · Saved · Account),
  splash, welcome / language selection, all screens listed below.
- English + French i18n with persisted language preference; RTL-ready layout
  architecture for Arabic/Darija later (the other five languages are listed
  as planned, not dropped).
- Local saving of journey text (offline reader with saved date + "may be
  outdated" warning), settings (language, larger text, low-data mode, privacy).
- GPS permission flow on Nearby (foreground location only, with denied /
  unavailable fallbacks and manual origin selection).
- Supabase client wired via environment config only (`src/lib/supabase.ts`).
  No Supabase project exists yet, so the client is disabled until one is
  created and approved.
- SQL migrations in `../supabase/migrations/` — **files only, never applied**.

**DEMO / mock (labelled DEMO on every screen that shows it):**
- All places, journeys, fares, durations and boarding instructions come from
  `src/data/demo.ts`, a tiny invented Agadir dataset used only to demonstrate
  the UX. None of it is verified transport information and it must never be
  used to travel. There is no verified Agadir dataset yet.
- The map is a **schematic** (`src/components/MapSchematic.tsx`) with a full
  text/list fallback. It is not MapLibre, not live tracking, and positions
  are approximate. A native MapLibre integration needs a dev build and is a
  later step.
- Ranking (cheapest / fastest / fewest transfers) is only shown where the
  data supports it; incomplete data refuses the ranking honestly.
- Sign-in, account sync, contributions and reporting need a backend and are
  shown as unavailable in this pilot.

**Not in this milestone:** no payments, no monetization, no ads, no
subscriptions, no real-time data, no background location, no Play Store
publication, no AI assistant.

## Screens

Splash → Welcome / language → Tabs: Plan (journey search), Nearby (GPS
hubs), Explore (places + transport guides), Saved (offline journeys),
Account (guest, settings). Stack screens: place search, journey results,
journey detail (steps, schematic map + list, provenance badge, save offline),
stop/hub detail, offline reader, settings.

## Brand assets

The wordmark and nav icon are the supplied files from `main`, copied
unchanged:
- `assets/brand/icon.png` — `public/fav-icon/Neon Roadmap M Icon.png`
- `assets/brand/logo-dark.png` — `public/header/logo-dark.png` (white
  wordmark, for dark surfaces)
- `assets/brand/logo-light.png` — `public/header/logo-light.png` (dark
  wordmark, transparent, for light surfaces)

Because the GitHub connector used to push this branch cannot transfer binary
files, the PNGs are committed as base64 text in
`assets/brand/brand-assets.base64.json` (exact original bytes, SHA-256
verified) and restored locally with:

```sh
npm run assets:restore
```

The UI accent colours are sampled from the logo artwork only. The final
brand palette, logo, fonts and design system are **not approved** yet.

## Run it

```sh
cd apps/android
npm install
npm run assets:restore   # restore the brand PNGs (once per checkout)
cp .env.example .env     # leave blank: no Supabase project exists yet
npm start                # Expo dev server (use Expo Go or a dev build)
```

## Checks

```sh
npm run typecheck   # tsc --noEmit
npm run lint        # expo lint
npm run export      # expo export — JS bundle + web output
```

## APK — known blocker

Producing a signed installable APK needs one of:
1. An **Expo account** (Expo Build / EAS) — no account exists and none may
   be created without approval, or
2. A local Android toolchain (JDK 17 + Android SDK + Gradle) — not
   installed on this machine.

`npm run export` verifies the JS bundle builds, but it is **not** an APK.
The APK step is blocked until the account/toolchain decision is made.

## Structure

```
apps/android/
  src/app/            Expo Router routes (tabs + stack screens)
  src/components/     Screen shell, badges, schematic map, journey card…
  src/data/           DEMO dataset only (demo.ts) + domain types
  src/i18n/           EN/FR strings + persisted language context
  src/lib/            storage, Supabase client (env only), ranking helpers
  src/settings/       settings context (large text, low-data)
  src/theme.ts        provisional theme (final palette unapproved)
  scripts/            restore-brand-assets.js
  assets/brand/       brand PNGs (generated) + brand-assets.base64.json
supabase/migrations/  SQL files only — never applied anywhere
```

## Branch rules

Work happens on `astro/movocco-app` only. `main` is the source of truth and
must never be changed from here.
