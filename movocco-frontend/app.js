/* MOVOCCO — Frontend interactions and SAMPLE DATA.
   Everything runs locally. Edit the ROUTES and DESTINATIONS arrays below.
   No backend, tracking, or external API is used. */
"use strict";

const DESTINATIONS = [
  {
    slug: "agadir",
    name: "Agadir",
    region: "coast",
    label: "Atlantic coast",
    image: "agadir.jpg",
    tagline: "Ocean views and easygoing city life.",
    description:
      "A lively Atlantic coastal city and a useful starting point for exploring the Souss-Massa region.",
    highlights: ["Beach promenade", "Coastal viewpoints", "City markets"],
  },
  {
    slug: "taghazout",
    name: "Taghazout",
    region: "coast",
    label: "Surf town",
    image: "taghazout.jpg",
    tagline: "Slow down beside the Atlantic.",
    description:
      "A small coastal destination known for its relaxed atmosphere, surfing culture, and beautiful sea views.",
    highlights: ["Surf beaches", "Seaside cafés", "Coastal walks"],
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    region: "city",
    label: "Imperial city",
    image: "marrakech.jpg",
    tagline: "A city full of color and energy.",
    description:
      "One of Morocco’s best-known destinations, rich in markets, gardens, architecture, and lively public squares.",
    highlights: ["Medina", "Gardens", "Historic architecture"],
  },
  {
    slug: "essaouira",
    name: "Essaouira",
    region: "coast",
    label: "Historic seaside city",
    image: "essaouira.jpg",
    tagline: "Sea breezes meet old-city charm.",
    description:
      "A coastal city with a historic medina, active fishing port, and a relaxed artistic atmosphere.",
    highlights: ["Old medina", "Harbor", "Oceanfront ramparts"],
  },
  {
    slug: "aourir",
    name: "Aourir",
    region: "nature",
    label: "Coastal village",
    image: "taghazout.jpg",
    tagline: "Discover the road north of Agadir.",
    description:
      "A town along the coast north of Agadir, often explored as part of a wider trip towards Tamraght and Taghazout.",
    highlights: ["Local markets", "Coastal access", "Village atmosphere"],
  },
];

// Prices, durations, and steps below are FICTIONAL UI examples—not verified service data.
const ROUTES = [
  {
    id: "agadir-taghazout-bus",
    from: "Agadir",
    to: "Taghazout",
    mode: "City bus",
    icon: "🚌",
    operator: "Local bus (demo)",
    price: 12,
    minutes: 40,
    frequency: "Example: regular service",
    boarding: "Central bus stop (illustrative)",
    tag: "Budget-friendly",
    steps: [
      "Reach the local departure point in Agadir",
      "Confirm the correct bus with the operator",
      "Ride towards Taghazout",
      "Get off at your confirmed destination stop",
    ],
    tips: [
      "Confirm the route number and boarding location locally.",
      "Carry some cash for small transport fares.",
    ],
  },
  {
    id: "agadir-taghazout-taxi",
    from: "Agadir",
    to: "Taghazout",
    mode: "Grand taxi",
    icon: "🚕",
    operator: "Shared taxi (demo)",
    price: 30,
    minutes: 28,
    frequency: "Departure may depend on passengers",
    boarding: "Shared taxi stand (illustrative)",
    tag: "Fewer stops",
    steps: [
      "Find the correct shared-taxi departure stand",
      "Ask the driver to confirm the destination and fare",
      "Board when the taxi is ready",
      "Arrive in the Taghazout area",
    ],
    tips: [
      "Agree on the fare before boarding.",
      "Shared taxi departures can vary.",
    ],
  },
  {
    id: "agadir-aourir-bus",
    from: "Agadir",
    to: "Aourir",
    mode: "City bus",
    icon: "🚌",
    operator: "Local bus (demo)",
    price: 8,
    minutes: 28,
    frequency: "Example service",
    boarding: "Bus stop in Agadir (illustrative)",
    tag: "Simple connection",
    steps: [
      "Find the right bus stop",
      "Confirm the destination",
      "Travel north towards Aourir",
      "Exit at your chosen stop",
    ],
    tips: ["Check current local timetables before leaving."],
  },
  {
    id: "agadir-marrakech-coach",
    from: "Agadir",
    to: "Marrakech",
    mode: "Intercity bus",
    icon: "🚍",
    operator: "Intercity coach (demo)",
    price: 120,
    minutes: 225,
    frequency: "Scheduled departures (check operator)",
    boarding: "Agadir coach station (illustrative)",
    tag: "Long-distance",
    steps: [
      "Find the operator’s departure terminal",
      "Check in or buy your ticket",
      "Board the coach to Marrakech",
      "Arrive at the confirmed Marrakech terminal",
    ],
    tips: [
      "Check the operator’s exact station and luggage policy.",
      "Book early during busy travel periods.",
    ],
  },
  {
    id: "marrakech-essaouira-coach",
    from: "Marrakech",
    to: "Essaouira",
    mode: "Intercity bus",
    icon: "🚍",
    operator: "Intercity coach (demo)",
    price: 95,
    minutes: 180,
    frequency: "Scheduled departures (check operator)",
    boarding: "Coach station (illustrative)",
    tag: "Coastal escape",
    steps: [
      "Head to the departure station",
      "Confirm departure bay and boarding time",
      "Travel towards Essaouira",
      "Exit at the indicated bus terminal",
    ],
    tips: ["Keep a copy of your booking when applicable."],
  },
  {
    id: "agadir-essaouira-coach",
    from: "Agadir",
    to: "Essaouira",
    mode: "Intercity bus",
    icon: "🚍",
    operator: "Coach service (demo)",
    price: 100,
    minutes: 210,
    frequency: "Example departures",
    boarding: "Agadir coach station (illustrative)",
    tag: "Scenic option",
    steps: [
      "Go to the correct coach station",
      "Check the departure time",
      "Board your coach",
      "Arrive at Essaouira terminal",
    ],
    tips: ["Confirm schedules directly with the operator."],
  },
  {
    id: "agadir-airport-taxi",
    from: "Agadir",
    to: "Agadir Airport",
    mode: "Taxi",
    icon: "🚕",
    operator: "Airport ground transport (demo)",
    price: 180,
    minutes: 35,
    frequency: "Availability varies",
    boarding: "Confirmed taxi pickup point",
    tag: "Airport transfer",
    steps: [
      "Choose an authorized pickup point",
      "Confirm fare before departure",
      "Travel to the airport",
      "Check your terminal",
    ],
    tips: ["Allow extra time for airport security."],
  },
];

const $ = (selector) => document.querySelector(selector);
const query = new URLSearchParams(location.search);
const clean = (s) => String(s || "").trim();
const norm = (s) => clean(s).toLowerCase();
const cap = (s) => clean(s).replace(/\b\w/g, (c) => c.toUpperCase());
const params = (from, to) =>
  `from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
const routeURL = (r) => `journey.html?id=${encodeURIComponent(r.id)}`;
const asset = (name) => `assets/${name}`;
const favorites = () => {
  try {
    return JSON.parse(localStorage.getItem("movocco:saved") || "[]");
  } catch {
    return [];
  }
};
function saveFavorites(ids) {
  localStorage.setItem("movocco:saved", JSON.stringify(ids));
}
function toast(message) {
  const node = $("#toast");
  if (!node) return;
  node.textContent = message;
  node.classList.add("visible");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => node.classList.remove("visible"), 2800);
}

function siteChrome() {
  const page = document.body.dataset.page;
  const items = [
    ["index.html", "Home", "home"],
    ["destinations.html", "Destinations", "destinations"],
    ["transport.html", "Transport", "transport"],
    ["saved.html", "Saved", "saved"],
  ];
  $("#site-header").innerHTML =
    `<header class="site-header"><div class="container nav-container"><a href="index.html" class="brand" aria-label="Movocco home"><img class="brand-logo" src="${asset("logo-dark.png")}" alt="Movocco — Travel, Plan, Explore Morocco"></a><nav class="nav-links" id="main-nav" aria-label="Main navigation">${items.map(([url, label, key]) => `<a class="${page === key ? "current" : ""}" href="${url}">${label}</a>`).join("")}</nav><div class="nav-actions"><a class="nav-icon" href="saved.html" aria-label="Saved journeys">♡</a><a class="signin" href="saved.html">My trips</a><button id="menu-toggle" class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">☰</button></div></div></header>`;
  $("#site-footer").innerHTML =
    `<footer class="footer"><div class="container"><div class="footer-grid"><div><a class="brand" href="index.html"><img class="brand-logo" src="${asset("logo-dark.png")}" alt="Movocco"></a><p>Discover Morocco and understand how to get there. A friendly prototype for travel planning.</p></div><div><h4>Explore</h4><a href="destinations.html">Destinations</a><a href="transport.html">Transport guide</a><a href="index.html">Plan a journey</a></div><div><h4>Your journey</h4><a href="saved.html">Saved routes</a><a href="results.html?from=Agadir&to=Taghazout">Try a sample route</a><a href="README.md">About this demo</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Movocco · UI prototype</span><span>Example routes, fares and schedules are not verified</span></div></div></footer>`;
  $("#menu-toggle").addEventListener("click", () => {
    const nav = $("#main-nav");
    const expanded = nav.classList.toggle("open");
    $("#menu-toggle").setAttribute("aria-expanded", String(expanded));
  });
  const datalist = document.createElement("datalist");
  datalist.id = "places";
  datalist.innerHTML = [
    ...new Set([...DESTINATIONS.map((d) => d.name), "Agadir Airport"]),
  ]
    .map((x) => `<option value="${x}"></option>`)
    .join("");
  document.body.append(datalist);
  document.querySelectorAll(".swap-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      const form = btn.closest("form");
      const from = form.querySelector('[name="from"]'),
        to = form.querySelector('[name="to"]');
      [from.value, to.value] = [to.value, from.value];
    }),
  );
}

function destinationCard(d) {
  return `<a class="destination-card" href="destination.html?place=${encodeURIComponent(d.slug)}"><img src="${asset(d.image)}" alt="${d.name}, Morocco" loading="lazy"><div class="destination-card-body"><small>${d.label}</small><h3>${d.name} ↗</h3><p>${d.tagline}</p></div></a>`;
}
function homePage() {
  const featured = $("#featured-destinations");
  featured.innerHTML = DESTINATIONS.slice(0, 4).map(destinationCard).join("");
  const date = $('#home-search input[name="date"]');
  date.value = new Date().toISOString().slice(0, 10);
  date.min = date.value;
}
function resultsFor(from, to) {
  return ROUTES.filter(
    (r) => norm(r.from) === norm(from) && norm(r.to) === norm(to),
  );
}
function resultCard(r) {
  return `<article class="result-card"><div class="result-top"><div class="result-type"><span class="mode-symbol">${r.icon}</span><div><h3>${r.mode}</h3><span class="subtitle">${r.operator}</span></div></div><div class="result-price">≈ ${r.price} MAD</div></div><div class="result-meta"><span>◷ ≈ ${r.minutes} min</span><span>⌖ ${r.boarding}</span></div><div class="result-footer"><span class="tiny-tag">${r.tag}</span><a href="${routeURL(r)}">View journey →</a></div></article>`;
}
function fallbackCard(from, to) {
  return `<div class="empty-state"><h2>No sample route found</h2><p>There isn't a demo connection for <b>${escapeHTML(from)}</b> to <b>${escapeHTML(to)}</b> yet. Try Agadir → Taghazout or Agadir → Marrakech.</p><a class="primary-btn" href="results.html?from=Agadir&to=Taghazout">Try an example →</a></div>`;
}
function escapeHTML(value) {
  return clean(value).replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        ch
      ],
  );
}
function resultsPage() {
  const from = cap(query.get("from") || "Agadir"),
    to = cap(query.get("to") || "Taghazout");
  $("#results-title").textContent = `${from} → ${to}`;
  $('#results-search [name="from"]').value = from;
  $('#results-search [name="to"]').value = to;
  $("#map-origin").textContent = from;
  $("#map-destination").textContent = to;
  const list = $("#route-results"),
    count = $("#result-count");
  function render() {
    const rows = [...resultsFor(from, to)];
    const s = $("#sort-options").value;
    if (s === "cheapest") rows.sort((a, b) => a.price - b.price);
    if (s === "fastest") rows.sort((a, b) => a.minutes - b.minutes);
    count.textContent = rows.length;
    list.innerHTML = rows.length
      ? rows.map(resultCard).join("")
      : fallbackCard(from, to);
  }
  $("#sort-options").addEventListener("change", render);
  render();
}
function journeyPage() {
  const r = ROUTES.find((x) => x.id === query.get("id")) || ROUTES[0];
  $("#journey-title").textContent = `${r.from} → ${r.to}`;
  $("#back-results").href = `results.html?${params(r.from, r.to)}`;
  $("#find-another").href = `results.html?${params(r.from, r.to)}`;
  $("#journey-summary").innerHTML =
    `<div><span class="eyebrow light">${r.icon} ${r.mode} · ${r.operator}</span><h2>${r.from} → ${r.to}</h2><p>◷ Approx. ${r.minutes} min · ${r.frequency}</p></div><div class="cost">≈ ${r.price} MAD</div>`;
  $("#journey-steps").innerHTML = r.steps
    .map(
      (step, i) =>
        `<div class="step"><div class="step-marker"><span>${i + 1}</span></div><div class="step-content"><strong>${escapeHTML(step)}</strong><p>${i === 0 ? `Starting point: ${r.boarding}` : i === r.steps.length - 1 ? "You have reached your destination." : "Follow any local operator or station instructions."}</p></div></div>`,
    )
    .join("");
  $("#journey-notes").innerHTML = r.tips
    .map((t) => `<div class="tip">✓ ${escapeHTML(t)}</div>`)
    .join("");
  const save = $("#save-route");
  function update() {
    save.textContent = favorites().includes(r.id)
      ? "♥ Saved journey"
      : "♡ Save journey";
  }
  save.addEventListener("click", () => {
    const f = favorites();
    if (f.includes(r.id)) saveFavorites(f.filter((id) => id !== r.id));
    else saveFavorites([...f, r.id]);
    update();
    toast(
      favorites().includes(r.id)
        ? "Journey saved on this device"
        : "Journey removed from saved",
    );
  });
  update();
  $("#share-route").addEventListener("click", async () => {
    try {
      if (navigator.share)
        await navigator.share({
          title: "My Movocco journey",
          url: location.href,
        });
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(location.href);
        toast("Journey link copied");
      } else prompt("Copy journey link:", location.href);
    } catch {}
  });
}
function destinationsPage() {
  const search = $("#destination-search"),
    cards = $("#all-destinations");
  let region = "all";
  function draw() {
    const q = norm(search.value);
    const rows = DESTINATIONS.filter(
      (d) =>
        (region === "all" || d.region === region) &&
        (norm(d.name).includes(q) || norm(d.label).includes(q)),
    );
    cards.innerHTML = rows.map(destinationCard).join("");
    $("#empty-destinations").hidden = rows.length > 0;
  }
  search.addEventListener("input", draw);
  $("#destination-filters").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-region]");
    if (!btn) return;
    region = btn.dataset.region;
    $("#destination-filters")
      .querySelectorAll("button")
      .forEach((el) => el.classList.toggle("active", el === btn));
    draw();
  });
  draw();
}
function destinationPage() {
  const d =
    DESTINATIONS.find((x) => x.slug === query.get("place")) || DESTINATIONS[0];
  document.title = `${d.name} | Movocco`;
  $("#destination-banner").style.backgroundImage =
    `linear-gradient(0deg,#071a38db,transparent),url('${asset(d.image)}')`;
  $("#destination-name").textContent = d.name;
  $("#destination-tagline").textContent = d.tagline;
  $("#destination-description").textContent = d.description;
  $("#destination-highlights").innerHTML = d.highlights
    .map((h) => `<span>${escapeHTML(h)}</span>`)
    .join("");
  $("#destination-route-link").href =
    `results.html?${params("Agadir", d.name)}`;
}
function savedPage() {
  const rows = favorites()
    .map((id) => ROUTES.find((r) => r.id === id))
    .filter(Boolean);
  $("#saved-empty").hidden = rows.length > 0;
  $("#saved-list").innerHTML = rows.map(resultCard).join("");
}

siteChrome();
const pages = {
  home: homePage,
  results: resultsPage,
  journey: journeyPage,
  destinations: destinationsPage,
  destination: destinationPage,
  saved: savedPage,
};
pages[document.body.dataset.page]?.();
