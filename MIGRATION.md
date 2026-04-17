# TinyNest - Next.js + Cloudflare Pages Migration

## Migration Summary

This branch (`medusa-integration`) contains the migration from **Vite + TanStack Router** to **Next.js + Cloudflare Pages**.

### What Changed

#### Removed
- `vite.config.ts` + Vite build system
- `@tanstack/react-router`, `@tanstack/react-start` routing
- `src/routes/` directory (TanStack Router format)
- `@cloudflare/vite-plugin` (replaced with `@cloudflare/next-on-pages`)

#### Added
- **Next.js 14** framework
- **App Router** (`app/` directory)
- **Cloudflare Pages** deployment support
- `next.config.js` for Next.js configuration
- `next-on-pages.config.ts` for Cloudflare integration
- Updated `wrangler.jsonc` for Cloudflare Pages

#### Migrated
- `src/styles.css` → `app/globals.css`
- `src/routes/index.tsx` → `app/page.tsx`
- `src/routes/shop.tsx` → `app/shop/page.tsx`
- All components in `src/components/` remain unchanged
- All utilities in `src/lib/` remain unchanged

### Project Structure

```
.
├── app/
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout (metadata, fonts)
│   ├── page.tsx            # Home page
│   └── shop/
│       └── page.tsx        # Shop page
├── components/             # Reusable components (moved from src/)
├── lib/                    # Utilities (moved from src/)
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── next-on-pages.config.ts # Cloudflare Pages configuration
├── wrangler.jsonc          # Wrangler CLI configuration
└── tsconfig.json           # TypeScript config (updated for Next.js)
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- Bun or npm/yarn
- Cloudflare account (for deployment)

### Install Dependencies
```bash
bun install
# or
npm install
```

### Development
```bash
bun run dev
# or
npm run dev
```

Server runs on `http://localhost:3000`

### Build
```bash
bun run build
# or
npm run build
```

### Production Start
```bash
bun run start
# or
npm run start
```

## Cloudflare Pages Deployment

### Setup Wrangler
```bash
bun install -D wrangler
bun exec wrangler login
```

### Deploy to Cloudflare Pages
```bash
bun exec wrangler pages deploy .next
```

Or connect your GitHub repo to Cloudflare Pages for CI/CD.

## Medusa Integration (Future)

This branch is prepared for **Medusa Commerce** integration in subsequent commits.

### Next Steps for Medusa
1. Install Medusa backend
2. Set up `@medusajs/medusa-react` client
3. Create Medusa API routes in `app/api/`
4. Integrate product catalog
5. Build cart & checkout flows

Medusa setup will NOT begin until explicitly requested.

## Skills Installed
- ✅ Wrangler (Cloudflare CLI)
- ✅ Flare - Cloudflare Pages Deploy
- ✅ Medusa Commerce (VS Code extension)

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

### Required Variables
- `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID
- `NEXT_PUBLIC_CLOUDFLARE_API_TOKEN` - Cloudflare API token
- `NEXT_PUBLIC_APP_URL` - Application base URL

### Optional Variables (for Medusa)
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` - Medusa backend URL
- `MEDUSA_ADMIN_SECRET` - Medusa admin secret

## Notes

- Components use `"use client"` directive (Client Components) where needed for interactivity
- GSAP animations work perfectly with Next.js
- TailwindCSS v4 integration included
- All Radix UI components compatible

## Breaking Changes

- Route imports: Change from `/shop` to `/shop` (same path, native Next.js)
- No more TanStack Router – use Next.js Link for navigation
- Server-side rendering enabled for better performance & SEO

---

**Status**: Migration complete. Ready for Medusa integration on demand.
