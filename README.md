# Inventis Pharma — inventispharma.org

Production website for **Inventis Pharma (Pvt) Ltd**, Sri Lanka's importer and
distributor of biomedical devices, dialysis consumables, rehabilitation aids,
homecare apparatus, and surgical equipment.

Built with **Next.js 16** (App Router) · **React 19** · **Tailwind CSS v4** · **GSAP**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (must be clean)
```

## Deployment

The app is a standard Next.js server build (SSR + on-demand image
optimization). Deploy to any Node host or Vercel:

```bash
npm run build && npm run start   # or `vercel deploy`
```

`/contact` is server-rendered on demand (it reads `?subject=`); every other
route is statically prerendered. If you deploy behind a CDN/proxy, forward the
`Accept` header so the image optimizer can negotiate AVIF/WebP.

The canonical origin is set once in [`src/lib/site.ts`](src/lib/site.ts)
(`SITE_URL`). Update it there if the domain changes — canonical tags, the
sitemap, robots, Open Graph, and JSON-LD all derive from it.

## SEO

- Per-route canonical URLs and distinct titles/descriptions (no cannibalization).
  `/contact?subject=…` deep-links canonicalize to `/contact`.
- Structured data (JSON-LD) in [`src/lib/schema.ts`](src/lib/schema.ts): a single
  canonical `MedicalBusiness` + `WebSite` graph referenced by per-page
  `WebPage`/`BreadcrumbList`/`FAQPage` nodes.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` and the
  `icon.svg` / `apple-icon.tsx` / `opengraph-image.tsx` metadata routes.

## Media & performance

- All raster images are optimized WebP; the hero ships as compressed
  `hero_video.mp4` + `hero_video.webm` with a `hero_poster.webp` poster.
  Re-encode source media with `ffmpeg` / `cwebp` (see git history for commands).
- On the first visit of each session a [`Preloader`](src/components/Preloader.tsx)
  pre-downloads the hero poster + video, then reveals the page.
- Security headers, long-lived asset caching, and the image `qualities` / `formats`
  allow-list live in [`next.config.ts`](next.config.ts).
- All motion honors `prefers-reduced-motion`.

## Project layout

```
src/
  app/            routes, metadata routes (sitemap/robots/manifest/icons)
  components/     Header, Footer, per-page clients, Preloader, JsonLd
  lib/            site constants, schema builders, shared content (faqs)
public/           optimized images + hero video/poster
```
