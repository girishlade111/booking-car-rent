# Car Rental Booking — Booking UI

A modern **car-rental booking web app**: a tabbed booking wizard that walks
the user through pickup/return location, rental dates, car selection, and a
booking summary with a mock payment step — styled with shadcn UI components
and Tailwind CSS.

## What it does

- **Tabbed booking flow:** Location → Dates → Car → Summary, with next/back
  navigation and progress tabs.
- **Location selector:** pickup and return locations.
- **Date selector:** rental start/end date picking.
- **Car selector:** browse available cars with details per vehicle —
  category, seats, transmission, fuel type, luggage capacity, and
  price-per-day.
- **Booking summary:** review the full trip (dates, locations, car, total
  price) before confirming.
- **Mock payment step:** Stripe Elements UI wired with a demo/test key and
  a mocked client secret, so the checkout flow can be demoed end-to-end
  without real credentials.
- Responsive layout for desktop and mobile.

## Tech stack

- **Framework:** Next.js (App Router) + React + TypeScript
- **UI:** Tailwind CSS, shadcn-style components, Radix UI primitives
- **Payments (demo):** `@stripe/react-stripe-js`, `@stripe/stripe-js`
- **Validation:** `zod`, `react-hook-form`
- **Tooling:** ESLint, PostCSS

## Quick start

```bash
npm install
npm run dev     # http://localhost:3000
```

Build / serve production:

```bash
npm run build
npm run start
```

> No environment variables are required to run the demo — the Stripe
> integration uses a mock test key and generates a fake client secret
> client-side (`components/stripe.tsx`). For a real deployment, replace
> the mock key with your Stripe publishable key and create the payment
> intent on a backend.

## Project structure

```
app/                     # Next.js App Router (layout, page, globals.css)
components/
  car-rental-booking.tsx # Booking wizard shell (tab state + flow)
  location-selector.tsx  # Pickup / return location step
  date-selector.tsx      # Rental date-range step
  car-selector.tsx       # Car list + selection step
  booking-summary.tsx    # Trip + price summary step
  stripe.tsx             # Stripe Elements wrapper (mock payment step)
  theme-provider.tsx     # Dark/light theme
  ui/                    # shadcn-style primitives
lib/utils.ts             # Shared helpers (cn, etc.)
types/car.ts             # Car interface
public/                  # Static assets
next.config.mjs          # `output: 'export'` — ships as a static site
```

## Deployment

The app has **no server actions, no API routes, and no env vars**, so it
builds to a fully static site:

```bash
npm run build   # outputs to ./out
```

Deploy the `./out` directory to any static host — Cloudflare Pages, GitHub
Pages, Netlify, or Vercel. Live on Cloudflare Pages (see repo homepage).

---

Built by Girish Lade — https://ladestack.in
