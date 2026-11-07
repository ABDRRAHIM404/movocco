# Movocco — editable frontend prototype

Open `index.html` in a browser. No build or backend required.

## Pages
- `index.html` — home and route search
- `results.html` — transport comparisons, sorting
- `journey.html` — step-by-step travel instructions and save/share
- `destinations.html` — search and filter destinations
- `destination.html` — destination guide
- `transport.html` — overview of transport types
- `saved.html` — saved journeys via `localStorage`

## How to customize
- **Page text/layout:** edit the corresponding `.html` page.
- **Colors, typography, responsive layout:** edit variables at the top of `styles.css`.
- **Routes, prices, travel duration, destinations:** edit `ROUTES` and `DESTINATIONS` near the top of `app.js`.
- **Logo in header:** `assets/app-icon.png` is referenced in `app.js` → `siteChrome()`; replace the asset or change this path.
- **Images:** replace the `.jpg` images in `assets/` while keeping the same filenames, or update the paths.
- **Navigation/header/footer:** edit `siteChrome()` in `app.js` so the changes appear on every page.

### Demo sample routes
Agadir → Taghazout; Agadir → Aourir; Agadir → Marrakech; Agadir → Essaouira; Marrakech → Essaouira; Agadir → Agadir Airport.

**Important:** All displayed fares, durations, operators, frequencies, and boarding points are illustrative placeholder data, NOT verified public transit data. The concept map is decorative and not geographical.

No network requests, analytics, login, payments, or booking functions are included. Saved journeys stay in the local browser only.
