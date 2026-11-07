# Movocco — HTML + CSS practice version

This project deliberately contains **no JavaScript**.

## Getting started
1. Unzip the project.
2. Open the folder in VS Code.
3. Open `index.html` in your browser (or with the Live Server extension).
4. Click the navigation links to explore.

## Files
- `index.html` — Homepage + native HTML search form.
- `results.html` — Fixed demo transport results.
- `journey.html` — Route steps; anchor links jump to each route.
- `destinations.html` — Places in Agadir.
- `destination.html` — Individual places using anchor sections.
- `transport.html` — Transport type guides.
- `saved.html` — Saved-journey placeholder (persistence requires programming).
- `styles.css` — The **only CSS file** for every page.
- `assets/` — Local logo and photo files.

## What works without JavaScript?
- Navigation between HTML pages.
- Dropdown form controls.
- Route links and page anchors.
- Responsive mobile menu using HTML `<details>`.
- CSS hover effects and responsive layouts.

## Limitations
The search form opens `results.html`, but can't filter results based on the selected places without JavaScript or server code. The sample routes and prices are **illustrative, not verified**. The Saved page is a static placeholder. Do not present demo prices as real transport information.

## Easy edits
- Change colors at the top of `styles.css` (`:root`).
- Replace `assets/logo-dark.png` to change the header logo.
- Change homepage heading in `index.html`.
- Change route cards in `results.html` and corresponding sections in `journey.html`.
- Replace `assets/agadir.jpg` with your own local photos or add new images to `assets/`.

The city focus is Agadir only.
