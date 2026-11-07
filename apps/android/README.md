# Movocco — Android app (Level A pilot)

Expo React Native (TypeScript) app for Movocco, the Moroccan transport guide
and multimodal journey planner for tourists. **Agadir only** for the MVP.

> **Status: Level A pilot / functional demonstration.** This is Milestone 1
> of the Android side quest. It is NOT the completed Movocco project, and it
> must not be presented as a working Agadir transport app.

## What's real vs what's DEMO

**Real:**
- App shell, 3-tab navigation (Plan · Explore · Saved), splash, welcome /
  language selection, all screens listed below. Nearby and Account stay as
  routes, reachable from Plan/Explore and Settings, but are not tabs.
- English + French i18n with persisted language preference; RTL-ready layout
  architecture for Arabic/Darija later (the other five languages are listed
  as planned, not dropped).
- Local saving of journey text (offline reader with saved date + "may be
  outdated" warning), settings (language, theme, larger text, low-data mode,
  privacy, data reliability).
- Turn-by-turn guidance (`guidance/[id]`): one large step at a time, Next /
  Exit, no live GPS tracking.
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

Splash → Welcome / language → Tabs: Plan (journey search, recent searches),
Explore (places with category filters + transport guides), Saved (offline
journeys). Stack screens: place search (grouped: Recent / Popular / Places
in Agadir), journey results, journey detail (steps, schematic map + list,
data-confidence note, save offline, sticky "Start guidance"), guidance
(one step at a time), stop/hub detail ("Plan a trip here"), offline reader,
nearby (GPS hubs), account (guest), settings.

## Design (chosen, 2026-11-07)

Source: `MOVOCCO_APK_DESIGN_4_7eff.md` v1.0, with the app showcase from the
main repo's `public/design-exemple/` as visual reference (reference only —
not bundled).
Tokens in `src/theme.ts`: navy text `#102B46`, brand orange `#F36D3C`
(primary action only), brand cyan `#0D99B5`, warm background `#FAF9F6`,
light mode default with a real dark mode (theme setting: system / light /
dark). System fonts, 8dp grid, 20dp screen padding, card radius 20dp,
touch targets ≥ 48dp. Demo geography is Agadir city only (Talborjt, Souk
El Had, Marina, Founty, Agadir Oufella, Corniche, Hay Essalam, bus/grand
taxi stations); no Taghazout, Aourir, Marrakech or Essaouira.

Showcase elements adopted: navy splash with the M icon, orange primary
buttons, cyan mode tiles, rounded cards, photo-led Explore cards (adapted
to colour-led tiles — no photos are bundled in this pilot), transport rows
with operator / price / duration. Not adopted (design file wins): 5-tab bar,
Agadir → Marrakech / Essaouira journeys, exact departure times, trip-type /
date / passenger pickers.

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

The UI uses the chosen design tokens in `src/theme.ts` (see Design above),
not colours sampled from the logo.

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

## APK — GitHub Actions build (no account, no EAS)

The release APK is built by GitHub Actions from this branch
(`.github/workflows/build-apk.yml`): checkout, Node 20, JDK 17, Android SDK
(platform android-37, build-tools 37.0.0, NDK 27.1.12297006), `npm ci`,
restore the brand PNGs, `expo prebuild --platform android`, then
`./gradlew assembleRelease`. The APK is uploaded as the `movocco-apk`
artifact. It runs on every push to this branch and can also be started
manually (Actions → Build Movocco APK → Run workflow).

No Expo account, no EAS, no paid service, no store publication. The APK
cannot be installed from this machine — it must be handed to a phone.

## Structure

```
apps/android/
  src/app/            Expo Router routes (tabs + stack screens)
  src/components/     Screen shell, badges, schematic map, journey card…
  src/data/           DEMO dataset only (demo.ts) + domain types
  src/i18n/           EN/FR strings + persisted language context
  src/lib/            storage, Supabase client (env only), ranking helpers
  src/settings/       settings context (large text, low-data, theme)
  src/theme.ts        chosen design tokens (MOVOCCO_APK_DESIGN_4_7eff.md)
  scripts/            restore-brand-assets.js
  assets/brand/       brand PNGs (generated) + brand-assets.base64.json
supabase/migrations/  SQL files only — never applied anywhere
```

## Branch rules

Work happens on `astro/movocco-app` only. `main` is the source of truth and
must never be changed from here.
