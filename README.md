# 1Fi Marketplace

A full-stack "1Fi Marketplace" section built for the 1Fi SDE Intern assignment — extending the existing Shop page with Top Brands, Nearby Stores, and a fully implemented Marketplace tab for browsing EMI-eligible products backed by mutual funds.

## Overview

The assignment asked for a Marketplace section added to 1Fi's existing Shop experience, matching the app's layout, typography, and navigation. Since the assignment is evaluated from a fresh clone (not inside the real 1Fi codebase), this repo ships as a standalone, mobile-shaped web app that mirrors the real 1Fi app's Shop page — hero banner, tabbed navigation (Top Brands / Nearby Stores / 1Fi Marketplace), bottom nav, and visual language — with the Marketplace tab fully built out end to end.

**What's implemented:**
- Product listing with image, brand, name, price, and lowest available EMI
- Product detail screen with storage/color variant switching
- EMI plan selection (0% interest and extended-tenure groups), with cashback details
- Proceed CTA reflecting the selected plan
- Live search across the product catalog
- Unique URLs per product (`/products/:slug`)
- Loading skeletons and error/retry states throughout
- Top Brands and Nearby Stores tabs intentionally left blank, per the assignment spec

**What's not implemented (out of scope per the assignment):** actual checkout/payment flow, real user accounts, Top Brands/Nearby Stores content.

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router

**Backend**
- Node.js + Express + TypeScript
- Prisma ORM
- PostgreSQL

## Project Structure

```
1fi-marketplace/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   ├── seed.ts             # Seed script (products, variants, EMI plans)
│   │   └── migrations/
│   └── src/
│       ├── controllers/        # Route handlers
│       ├── middleware/         # Validation, error handling
│       ├── routes/             # Express routers
│       ├── lib/                # Prisma client singleton
│       ├── app.ts              # Express app setup
│       └── server.ts           # Entry point
└── frontend/
    └── src/
        ├── components/         # Reusable UI components
        ├── pages/               # Shop and ProductDetail screens
        ├── hooks/               # Data-fetching hooks
        └── lib/                 # API client, formatting helpers
```

## Setup and Run Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL running locally (or a connection string to a hosted instance)

### Backend

```bash
cd backend
npm install
```

Create `backend/.env` (see `.env.example` for the template):
```
DATABASE_URL="postgresql://YOUR_USER@localhost:5432/onefi_marketplace?schema=public"
PORT=4000
CORS_ORIGIN="http://localhost:5173"
```

Run the migration and seed the database:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Start the API:
```bash
npm run dev
```

The API runs at `http://localhost:4000`.

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env` (see `.env.example`):
```
VITE_API_BASE_URL=/api
```

Start the dev server:
```bash
npm run dev
```

The app runs at `http://localhost:5173`. In development, Vite proxies `/api` requests to `http://localhost:4000` (configured in `vite.config.ts`), so no CORS setup is needed locally.

## Schema Used

Three related models, defined in `backend/prisma/schema.prisma`:

**Product** — a sellable item (e.g. "iPhone 17 Pro")
| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | Primary key |
| slug | String | Unique, used in product URLs |
| name, brand, category, description | String | |
| imageUrl | String | |
| mrp, price | Int | Whole rupees |
| createdAt, updatedAt | DateTime | |

**Variant** — a purchasable configuration of a product (e.g. "256GB" or "Cosmic Orange")
| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | Primary key |
| productId | String | Foreign key → Product |
| type | Enum (`COLOR` \| `STORAGE`) | |
| label, value | String | Display label and machine-friendly value |
| priceDelta | Int | Added to the product's base price when selected |
| swatchHex | String? | Used to render a color dot for COLOR variants |
| isDefault | Boolean | |

**EmiPlan** — one EMI option for a product, backed by a mutual fund
| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | Primary key |
| productId | String | Foreign key → Product |
| tenureMonths | Int | |
| interestRate | Float | e.g. 0, 10.5 |
| monthlyAmount | Int | Computed at seed time from price + tenure + rate, never trusted from the client |
| cashbackAmount | Int | |
| fundedBy | String | Defaults to "Mutual Fund SIP" |

Each `Product` has many `Variant`s and many `EmiPlan`s (`onDelete: Cascade`).

## API Endpoints and Example Responses

### `GET /health`
Health check.
```json
{ "status": "ok" }
```

### `GET /api/products`
Returns a lightweight product list for the marketplace grid, including each product's default variants and its cheapest EMI option.

```json
{
  "count": 3,
  "products": [
    {
      "id": "cmtpvrlpu00007e8orbas3e5x",
      "slug": "iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "imageUrl": "https://images.unsplash.com/photo-...",
      "mrp": 134900,
      "price": 127400,
      "defaultVariants": [
        { "type": "STORAGE", "label": "256GB", "value": "256gb" },
        { "type": "COLOR", "label": "Cosmic Orange", "value": "cosmic-orange" }
      ],
      "cheapestMonthly": 3238
    }
  ]
}
```

### `GET /api/products/:slug`
Returns full product detail: all variants and all EMI plans, ordered by tenure.

```json
{
  "product": {
    "id": "cmtpvrlpu00007e8orbas3e5x",
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "brand": "Apple",
    "description": "Apple's flagship Pro model with the A19 Pro chip...",
    "imageUrl": "https://images.unsplash.com/photo-...",
    "mrp": 134900,
    "price": 127400,
    "variants": [
      { "id": "...", "type": "STORAGE", "label": "256GB", "value": "256gb", "priceDelta": 0, "swatchHex": null, "isDefault": true },
      { "id": "...", "type": "COLOR", "label": "Cosmic Orange", "value": "cosmic-orange", "priceDelta": 0, "swatchHex": "#D9683B", "isDefault": true }
    ],
    "emiPlans": [
      { "id": "...", "tenureMonths": 3, "interestRate": 0, "monthlyAmount": 42467, "cashbackAmount": 7500, "fundedBy": "Mutual Fund SIP" }
    ]
  }
}
```

**Error responses**

`400` — malformed slug:
```json
{ "error": "Invalid product slug \"DROP-TABLE-products\"" }
```

`404` — valid slug, no matching product:
```json
{ "error": "No product found with slug \"nonexistent-phone\"" }
```

## Design Decisions

- **EMI amounts are computed, not hardcoded.** The seed script derives every `monthlyAmount` from principal, tenure, and interest rate using flat-rate interest math, so the numbers stay internally consistent and reviewable.
- **Slug validation happens before the database layer.** A regex-based middleware rejects malformed input (e.g. injection attempts) with a `400` before Prisma ever sees it.
- **The cheapest EMI is computed server-side**, not on the client, so the grid's "EMI from ₹X/mo" claim is always backed by a real query rather than client-side estimation.
- **Top Brands and Nearby Stores are intentionally blank**, per the assignment's explicit instruction — implemented as a shared `EmptyState` component rather than left as dead tabs, so the navigation still feels complete.