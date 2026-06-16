# RSK Auto Detailing

Premium auto detailing website for **Hamilton & the GTA** — exterior & interior detailing, paint correction, ceramic coating, windshield repair, and cosmetic mods. Static site with a cinematic intro, flexible booking (quote / deposit / pay-in-full), and Stripe payment links.

**Live:** https://rsk-detailing.vercel.app

## Features

- **Cinematic intro overlay** — a full-screen wash-off video plays on first visit, then fades to the site. Plays once per session; users can skip, scroll, or press Esc to dismiss.
- **Responsive design** — desktop and mobile layouts, with the intro video adapting to portrait screens.
- **Services & pricing** — seven services, each with a quote request, optional deposit, and full online payment.
- **Stripe payment links** — deposits and full payments handled via hosted Stripe checkout (no backend required).
- **Quote request form** — collects customer/vehicle/service details (see "Quote form" below for activation).
- **Gallery** with filtering and lightbox, animated process steps, FAQ accordion, and testimonials.

## Structure

```
rsk-detailing-site/
├── index.html        # markup + content
├── css/
│   └── styles.css    # all styles
├── js/
│   └── main.js       # interactivity (intro overlay, cursor, scroll animations, gallery, FAQ)
├── media/
│   └── intro.mp4     # intro overlay video
├── assets/           # gallery images, hero frames, 3D models
├── vercel.json       # deployment config (clean URLs)
└── README.md
```

> **Note:** the intro video lives in `media/`, not `public/`. Vercel treats a `public/` folder as a special build-output directory, which caused a 404 — `media/` avoids that.

## Run locally

```bash
python3 -m http.server 5500
```

Then open http://localhost:5500 — or use the VS Code Live Server extension.

## Deployment

Hosted on **Vercel**, deployed automatically on every push to `main`. No build step — it's a static site served from the repo root. The `vercel.json` enables clean URLs.

## Quote form

The contact form (`#quoteForm`) is currently in demo mode (`action="#"`) — it shows a success message but does **not** send submissions anywhere yet.

To receive quote requests by email:

1. Create a form at [formspree.io](https://formspree.io) pointed at **rskdetailing@gmail.com**.
2. Copy the endpoint URL (e.g. `https://formspree.io/f/xxxxxxxx`).
3. In `index.html`, change the form's `action="#"` to that URL.

`js/main.js` already handles the real submission (background POST, keeps the user on-page, shows the success/error message). No other change needed.

## Stripe

Payments use Stripe **Payment Links** (`buy.stripe.com/...`) that open hosted checkout in a new tab. Before launch, confirm every link is in **live mode** (no orange "TEST MODE" banner).

## Contact

- Email: rskdetailing@gmail.com
- Instagram: [@rsk_autodetailing](https://www.instagram.com/rsk_autodetailing)
- Service area: Hamilton & GTA — Toronto, Mississauga, Brampton, Burlington, Oakville, Ancaster

---

© 2026 RSK Auto Detailing. All rights reserved.