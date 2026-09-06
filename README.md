# 1Fi Marketplace — SDE Intern Assignment

A "1Fi Marketplace" section built inside the Shop page, matching the existing 1Fi app's
visual language (purple theme, rounded white cards, bottom tab bar) and reusing its
core flow: pick a product → pick a variant → pick an EMI plan → pay.

> **Note on stack:** the 1Fi app itself is a native Android/mobile app, so its source
> isn't available to build inside directly. This is a **React + TypeScript web app**
> that reproduces the Shop → Marketplace experience in the same visual language
> (colors, spacing, components, navigation) based on the reference screenshots, so it
> can be run and reviewed instantly with `npm run dev` — no mobile toolchain required.

## Quick start

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`) in your browser.
For the closest match to the real app, open dev tools and switch to a mobile viewport
(the layout is capped at a phone-width column, same as the reference screens).

Other scripts:
```bash
npm run build      # production build (type-checks first)
npm run preview    # preview the production build locally
```

## Where the assignment lives

| Requirement | Location |
|---|---|
| Shop page with 3 options | `src/pages/shop/ShopPage.tsx` |
| Top Brands (blank) | `src/pages/shop/TopBrandsPage.tsx` |
| Nearby Stores (blank) | `src/pages/shop/NearbyStoresPage.tsx` |
| 1Fi Marketplace listing | `src/pages/shop/MarketplacePage.tsx` |
| Product detail / EMI checkout | `src/pages/shop/ProductDetailPage.tsx` |
| Mock data source | `src/data/products.json` |
| Mock API (latency + error simulation) | `src/api/marketplaceApi.ts` |
| Reusable async-state hook | `src/hooks/useAsync.ts` |
| Selection state (variant/tenure) | `src/store/purchaseStore.ts` (Zustand) |
| Shared UI primitives | `src/components/ui/*` |
| Marketplace-specific components | `src/components/marketplace/*` |

## Feature walkthrough

**Shop → 1Fi Marketplace**
- Hero banner ("0% interest EMIs"), search box, and category chips, styled after the
  existing Shop hero and segmented-tab pattern seen in the app.
- Product grid (2 columns) with a real product photo, brand, name, starting price
  and starting monthly EMI — mirrors the card density used elsewhere in the app
  (EMI Dues table, Limit page's pledged-funds cards, etc).
- Tapping a card opens the product detail / checkout screen.

**Product images**
- Each product in `src/data/products.json` carries an `image` URL (free-to-use,
  no-attribution-required stock photos), so nothing is hardcoded in components —
  `ProductTile` just renders whatever URL the product data gives it.
- `ProductTile` (`src/components/marketplace/ProductTile.tsx`) shows the real photo
  once it loads, and gracefully falls back to the existing category icon tile if
  `image` is missing or the photo fails to load (slow network, broken link, offline
  preview, etc.) — so the UI never shows a broken-image icon.
- To point a product at a different photo, or add a new product, just add/edit the
  `image` field in `products.json`; no component changes are needed.

**Product detail ("Pay using 1Fi")**
- Rebuilt to match the reference "Pay using 1Fi" screen: brand badge, real product
  image, rating, spec highlights, a variant selector (radio rows with price), a
  "Suggested amount" card, and a list of EMI plans (3/6/9/12 months, rate, monthly
  amount).
- Selecting a variant re-fetches EMI plans for that variant's price (simulated
  network call) and preselects a default tenure, same as the reference screen
  defaulting to a mid-length plan.
- A sticky bottom CTA shows the live monthly amount for the selected plan and submits
  a mock "purchase request" API call, with its own loading/disabled/error states and
  a success confirmation screen with a reference ID.
- "Paying to" shows the merchant, same as the reference screen.

**Cross-cutting engineering concerns**
- **No hardcoded UI data**: everything the Marketplace shows comes from
  `src/data/products.json` via `src/api/marketplaceApi.ts`, which simulates network
  delay and an ~8% random failure rate on every call so real loading/error states are
  exercised, not just happy-path UI. Swapping this file for real `fetch()` calls to a
  backend requires no changes to any component — the function signatures are the
  contract.
- **Loading/error/empty states**: every async boundary (product list, product detail,
  EMI plans, purchase submission) has a skeleton/spinner state, a retry-capable error
  state (`ErrorState`), and an empty state where relevant (`EmptyState`), built as
  shared components rather than re-implemented per screen.
- **State management**: local UI state (search, filters) stays in the component that
  owns it; cross-component purchase-selection state (chosen variant, chosen tenure)
  lives in a small Zustand store (`purchaseStore.ts`) so it's easy to reset between
  products and extend later (e.g. a real cart).
- **Component reusability**: `Card`, `SegmentedTabs`, `ProductTile`, `VariantSelector`,
  and `EmiPlanOption` are all generic enough to reuse for a second marketplace surface
  (e.g. featured products on Home) without modification.
- **EMI math**: `getEmiPlans()` documents the simple-interest formula used
  (`principal + principal * rate * tenureMonths/12`, divided by tenure) so it's easy
  to swap for the bank's authoritative calculation later.

## Project structure

```
src/
  api/            mock "backend" calls (products, EMI plans, purchase submission)
  components/
    layout/       AppShell (phone-width frame) + BottomNav
    marketplace/  ProductCard, ProductTile, VariantSelector, EmiPlanOption
    ui/           Card, SegmentedTabs, loading/error/empty states
  data/           products.json (mock catalog)
  hooks/          useAsync (generic loading/error/retry wrapper)
  pages/          route-level screens (Home, Shop + tabs, EMI Dues, Limit, Profile)
  store/          purchaseStore (Zustand)
  types/          shared TypeScript contracts
  utils/          formatting + category-to-icon/gradient mapping
```

## What's intentionally out of scope

Per the assignment brief, **Top Brands** and **Nearby Stores** are left blank. Home,
EMI Dues, Limit and Profile are included only as lightweight static screens so the
bottom navigation and overall app shell feel complete when reviewing the Marketplace
in context — they were not part of the graded scope and were kept intentionally
simple.

## Tech stack

React 19 + TypeScript, Vite, Tailwind CSS v4, React Router v6, Zustand, lucide-react
for icons. No backend is required to run or review this project.

## A note on the product photos

Product images are hotlinked to Unsplash (`images.unsplash.com`), which requires an
internet connection to load when you run the app — same as any real e-commerce
product listing. If you're reviewing offline, the app still works correctly and
falls back to the category icon tile automatically instead of a broken image.
