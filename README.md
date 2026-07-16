# Stilletos Decor & Catering — Vanilla HTML/CSS/JS Rewrite

A full port of the original React/TypeScript app to plain HTML, CSS, and
JavaScript. No build step, no frameworks, no npm install — just open
`index.html` in a browser (or serve the folder with any static file server).

## Structure

```
stilletos-decor/
├── index.html            single-page shell: header, both site panels, footer, cart, transition curtain
├── css/
│   ├── base.css           tokens, reset, layout, header/footer, toggle button, transition curtain
│   ├── adult-theme.css    Stilletos Decor (black & gold) — hero, services, rentals, gallery
│   ├── kids-theme.css     Stilletos Kids (pink/purple/amber) — hero, packages, rentals, gallery
│   └── cart.css           quote cart drawer + toast
├── js/
│   ├── data.js             all business data (rentals, services, packages, gallery, contact info)
│   ├── cart.js              cart state, localStorage persistence, WhatsApp quote message builder
│   ├── adult-site.js        renders + wires the Services / Rentals / Gallery tabs
│   ├── kids-site.js         renders + wires the Packages / Rentals / Gallery tabs + floating bubbles
│   └── app.js                experience toggle (curtain transition), header/footer theming, boot
└── assets/images/            logos + hero photos (bundled locally instead of a Vite asset pipeline)
```

## Notable behavior preserved from the original

- **Experience toggle** — the floating bottom-right button swaps between the
  elegant "Stilletos Decor" (adult events) and playful "Stilletos Kids"
  experiences, with the same curtain-wipe transition timing (750ms swap,
  1.5s total).
- **Quote cart** — adding rentals or a kids package (with a chosen guest
  count) persists to `localStorage`, and "Submit via WA" builds the same
  formatted WhatsApp inquiry message and opens `wa.me` with it pre-filled.
- **Auto-cycling gallery** — the 12-tile gallery grids advance every 3
  seconds, same as before. This pauses automatically for
  `prefers-reduced-motion` users and whenever that tab isn't the active one.
- **Kids package pricing** — the 10/15/20-guest toggle updates the displayed
  price and the "selected option" that gets added to the cart.
- Rental/service/package data lives entirely in `js/data.js`, so updating
  prices, descriptions, or adding new items doesn't require touching any
  markup or rendering code.

## Changelog — reliability fixes

- **Fixed:** the floating experience-toggle button (bottom right) sat at a
  lower stacking order than the cart drawer's full-screen backdrop, so once
  you added anything to the quote cart, the toggle button became an
  invisible dead click until you closed the cart. It now fades out cleanly
  while the cart is open and fades back in the instant you close it — no
  more "the button doesn't do anything" confusion.
- **Fixed:** several buttons (Clear All, Submit via WA, quantity +/-, remove)
  changed color instantly on hover instead of transitioning. Every button
  and link across the site now shares one consistent hover/press transition,
  including a slight scale-down on click for tactile feedback.
- **Hardened:** `app.js` now boots the cart, the adult site, and the kids
  site independently (each wrapped so one failing can't silently stop the
  others from initializing). Previously, if any single piece threw an error
  during startup, everything after it in the boot sequence would silently
  never run — which is the most likely explanation if tabs or "Add to
  Quote" buttons appeared completely inert.
- **Hardened:** every DOM lookup in the init paths (`cart.js`,
  `adult-site.js`, `kids-site.js`, `app.js`) now checks the element exists
  before using it, instead of assuming the markup is always intact.
- Verified with an automated click-through of every tab, every "Add to
  Quote" button, both package guest-count toggles, the cart's open / close /
  clear / quantity controls, and the experience toggle — both served over
  HTTP and opened directly as a local `file://` page — with zero console
  errors in either case.

## Notes

- Product/gallery photography still points at the original Unsplash URLs —
  swap the `image` fields in `js/data.js` for your own hosted photos
  whenever you're ready (same for the Google Maps embed and social links,
  which live in `BUSINESS_INFO`).
- All four bundled JPGs (`assets/images/`) are the original logo and hero
  photography, so those two heroes and the toggle button work offline with
  no external requests.
