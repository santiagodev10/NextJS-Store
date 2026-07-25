# Next.js E-Commerce Store

> A practice project exploring Next.js features, best practices, and integrating a headless CMS (Shopify) with a modern React framework.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- **Headless CMS:** [Shopify](https://www.shopify.com/) (Admin REST API + Storefront GraphQL API)
- **AI:** [Vercel AI SDK](https://sdk.vercel.ai/) + [Google Gemini](https://ai.google.dev/) (shopping assistant chat)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) with localStorage persistence
- **Styling:** SCSS Modules
- **GraphQL Client:** [graphql-request](https://github.com/jasonkuhrt/graphql-request)
- **Validation:** [Zod](https://zod.dev/)

## Features

### Next.js Features Demonstrated

- **App Router** with Route Groups, Dynamic Routes, and Optional Catch-All routes
- **Parallel Routes** (named slots for account page: profile + orders)
- **Server Components** (default) & **Client Components** (`"use client"`)
- **Server Actions** for authentication and cart operations
- **Dynamic Metadata** generation for SEO (`generateMetadata`)
- **Loading UI / Streaming** with `Suspense` boundaries and skeleton loaders
- **Error Boundaries** — global (`error.jsx`) and route-group-scoped
- **Custom Not Found** page (404)
- **Dynamic Imports** with `next/dynamic` (`ssr: false` for client-only components)
- **Edge Runtime** for API routes
- **ISR** with `force-cache`, cache tags, and on-demand revalidation (`revalidatePath`, `revalidateTag`)
- **Image Optimization** (`next/image` with remote patterns for Shopify CDN)
- **Font Optimization** (`next/font/google` — Roboto)

### E-Commerce Features

- Product catalog with collection filtering (optional catch-all routing)
- Product detail pages with dynamic routes (`/product/[handle]`)
- Shopping cart with quantity management, persisting to localStorage via Zustand
- User authentication (signup, login, logout) using Shopify Storefront GraphQL API
- Auth cookies (`httpOnly`, `secure`, `sameSite: strict`)
- Checkout flow redirecting to Shopify checkout URL
- AI Shopping Assistant — chat with Google Gemini that has full product catalog context and generates Markdown product links

## Project Structure

```
src/
├── actions/                  # Server Actions (login, signup, logout, cart)
├── app/
│   ├── (home)/               # Route Group — Homepage
│   ├── account/              # Parallel Routes (@user_info, @orders_info)
│   ├── api/                  # API Routes (products, chat, health, cache)
│   ├── chat/                 # AI chat page
│   ├── login/                # Login page
│   ├── product/[handle]/     # Dynamic product detail page
│   ├── signup/               # Signup page
│   ├── store/[[...categories]]/  # Store with optional catch-all
│   ├── favicon.ico           # Favicon (auto-detected by Next.js)
│   ├── layout.jsx            # Root layout
│   ├── not-found.jsx         # Custom 404
│   └── error.jsx             # Global error boundary
├── components/
│   ├── account/              # Account-related components
│   ├── home/                 # Homepage components (Hero, Description, MainProducts)
│   ├── login/                # Login form
│   ├── product/              # Product detail view
│   ├── shared/               # Shared components (Header, Footer, Chat, ShoppingCart, Loader)
│   ├── signup/               # Signup form
│   └── Store/                # Store components (ProductCard, ProductsWrapper)
├── config/                   # Environment config & store context
├── graphql/                  # GraphQL client singleton, queries & mutations
├── hooks/                    # Zustand stores (shopping cart)
├── scss/                     # Global styles and SCSS variables
├── services/shopify/         # Shopify REST API service layer
└── utils/                    # Auth utilities & Shopify GraphQL helpers
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Shopify store with:
  - **Admin API** access token
  - **Storefront API** private access token
- A [Google Gemini](https://ai.google.dev/) API key (for the AI chat)

### Installation

```bash
git clone https://github.com/<your-username>/nextjs-e-commerce.git
cd nextjs-e-commerce
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
SHOPIFY_HOSTNAME=https://your-store.myshopify.com/
SHOPIFY_TOKEN=your_shopify_admin_api_token
SHOPIFY_GRAPHQL_ENDPOINT=https://your-store.myshopify.com/api/2023-10/graphql.json
SHOPIFY_STOREFRONT_TOKEN=your_storefront_api_token
CACHE_TOKEN=a_secret_token_for_cache_revalidation
GOOGLE_GENERATIVE_AI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:4000
```

| Variable | Description |
|---|---|
| `SHOPIFY_HOSTNAME` | Your Shopify store base URL |
| `SHOPIFY_TOKEN` | Admin API access token (REST API) |
| `SHOPIFY_GRAPHQL_ENDPOINT` | Storefront GraphQL endpoint |
| `SHOPIFY_STOREFRONT_TOKEN` | Storefront API private access token |
| `CACHE_TOKEN` | Secret token for cache revalidation API endpoints |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Gemini API key for AI chat |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (used in metadata and checkout) |

### Development

```bash
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server on port 4000 |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run analyze` | Run bundle analysis (`ANALYZE=true`) |
| `npm run lint` | Run ESLint |
