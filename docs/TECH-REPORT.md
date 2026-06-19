# MO Globe Trucking — Shipping & Hardening Tech Report

**Project:** Vite + React 18 logistics SPA
**Phase:** Pre-launch polish, performance, error-handling, testing
**Status:** Build ✅ · Lint ✅ (0/0) · Tests ✅ (14/14) · Bundle budget ✅

---

## 1. Executive summary

The app was redesigned and then hardened for shipping. This pass delivered five
things: a **~35% smaller initial JS payload** via route-level code-splitting, an
**app-wide error boundary**, **SEO/social metadata**, a **Vitest test suite**
(14 tests covering error-handling, components, and data integrity), and a broad
**UI/UX consolidation** (two-button system, Lucide icons replacing emojis, a
single shared page-hero, consistent hero heights). Architecture graphs were
generated with the sys-design suite (`graph-logistics/`).

---

## 2. Performance

### Route-level code-splitting (the headline win)
Every route is now `React.lazy` + `<Suspense>` (`src/App.jsx`), and Vite vendor
chunks are split via `manualChunks` (`vite.config.js`). MUI — the single largest
dependency — is used **only** on `/admin` and `/login`, so it no longer ships to
the typical visitor.

| Metric | Before | After |
|---|---:|---:|
| Initial JS (single bundle) | **658 KB** | — |
| `react-vendor` (react, react-dom, router) | in bundle | 158 KB (cached) |
| `motion` (framer-motion) | in bundle | 128 KB (cached) |
| `index` (app shell: navbar, footer, providers, error boundary) | in bundle | 118 KB |
| `mui` (@mui + @emotion) | **in bundle** | **203 KB — lazy, /admin + /login only** |
| Home route chunk | — | 7.4 KB (+ small per-component chunks) |
| **Initial JS on `/`** | **~658 KB** | **≈ 430 KB** (MUI 203 KB deferred) |

CSS is now split per route as well (each page ships its own stylesheet; shared
globals in `index-*.css` 24 KB), so a visitor only downloads the styles for the
page they land on.

**Caching benefit:** `react-vendor` and `motion` are isolated, long-cache-friendly
chunks — app updates no longer bust the vendor cache.

### Other performance work
- **Lazy images:** below-the-fold About images use `loading="lazy"` + `decoding="async"`.
- **`framer-motion` honours `prefers-reduced-motion`** throughout (the `Reveal`/`Stagger`/`PageHero`/`PageTransition` primitives collapse to static markup).
- **Bundle budget gate:** `npm run size` (`scripts/check-bundle.mjs`) fails CI if any chunk exceeds 250 KB — guards against accidentally re-bundling MUI into a shared chunk.

### Remaining performance opportunity (not done — needs image tooling)
The hero/about raster assets are heavy: `pexels-…webp` 1.5 MB, `IMG_4627.webp`
1.3 MB, `IMG_4610.webp` 774 KB. Re-encoding/resizing these (e.g. to ~1600px max,
quality ~75) would materially improve LCP. Requires an image pipeline (sharp/squoosh)
and is flagged as a follow-up.

---

## 3. Error handling

- **App-wide `ErrorBoundary`** (`src/components/ErrorBoundary/`) wraps the provider
  tree in `main.jsx`. A render error anywhere now shows a branded fallback ("We hit
  a bump in the road" + Back-to-Home) instead of a white screen. `componentDidCatch`
  logs for debugging (the hook point for Sentry/etc.).
- **Data layer:** `BlogProvider` (`src/Context.jsx`) exposes `loading` and `error`
  state; the Trucks page renders skeletons while loading and a graceful message on
  fetch failure.
- **Forms:** Contact / Job / Quote / Track all use `try/catch` around the shared
  Telegram call and surface an inline error status; the submit button is disabled
  with a spinner while in flight.
- **Routing:** unknown routes fall through to a styled 404.

---

## 4. Shipping polish

- **`index.html`** now has full primary meta (title, description, keywords, author,
  robots, theme-color, canonical), **Open Graph** (link-preview cards for FB/LinkedIn/
  WhatsApp/Telegram), and **Twitter `summary_large_image`** tags.
- **Fixed a production bug:** the favicon pointed at `public/logo-for-website.svg`
  (broken in the build, since Vite serves `public/` at root) → corrected to
  `/logo-for-website.svg`, plus an apple-touch-icon.
- **`public/robots.txt`** (disallows `/admin`, `/login`) and **`public/sitemap.xml`**
  (8 public routes) added.
- **Secrets hygiene:** Telegram credentials moved out of hardcoded source into
  `.env.local` (`VITE_TELEGRAM_BOT_TOKEN` / `VITE_TELEGRAM_CHAT_ID`), gitignored,
  with a tracked `.env.example`. One shared util `src/lib/telegram.js`.
- **ESLint was unusable** (old `.eslintrc`-format config under `"type":"module"`) →
  replaced with a proper ESLint 9 flat config; `npm run lint` is clean (0/0).

> ⚠ **Pre-launch actions for the owner:** (1) the bot token is still in git history
> and `VITE_*` vars are inlined into the client bundle (not runtime-secret) — **rotate
> the token** and consider a server-side proxy if true secrecy is needed; (2) replace
> the placeholder domain `www.moglobetrucking.com` in `index.html`/`sitemap.xml`/`robots.txt`
> with the real deployed domain; (3) the admin auth is client-only (localStorage token,
> hardcoded creds) — not real security.

---

## 5. Testing

Added **Vitest + React Testing Library** (jsdom), config in `vite.config.js`,
polyfills (`matchMedia`, `IntersectionObserver`) in `src/test/setup.js`.

| Test file | Covers |
|---|---|
| `ErrorBoundary.test.jsx` | renders children normally; renders fallback when a child throws |
| `lib/trailers.test.js` | data integrity — 6 types, required fields, unique ids, `TRAILER_NAMES` sync |
| `Trailers/TrailersSection.test.jsx` | renders all 6 trailer cards + section title + quote CTA |
| `TrackModal/TrackModal.test.jsx` | closed renders nothing; open renders dialog + fields; closes on button click and on Escape |
| `QuoteCom/QuoteCom.test.jsx` | dropdown lists 6 trailer types; **error path** — failed Telegram send shows error message |

**Result:** 5 files, **14 tests, all passing.** Commands: `npm test`, `npm run test:watch`.
Plus `npm run size` for the bundle-budget gate.

---

## 6. UI/UX consolidation

- **Two-button system.** Replaced ~6 ad-hoc button treatments with exactly two
  global styles: **`.btn-primary`** (navy fill `#001F3F`, white text, white 2px
  border; inverts to white-on-navy on hover) and **`.btn-secondary`** (white,
  navy text, transparent→navy 2px border, white glow on hover). Borders are a
  consistent 2px in every state (no hover layout-shift); removed a global
  `button:hover` border footgun; normalized form-submit borders. Fixed several
  white-on-white hover bugs caused by the legacy `--color-primary-dark: #fff` token.
- **Emojis → Lucide icons.** All UI emojis (⚡👷📡🔧💰🛣️🏥📋📎✓✕✉✆⊙) replaced with
  `react-icons/lu` (Lucide) icons. Telegram message emojis kept (they render in
  Telegram, not the app).
- **Shared `PageHero`.** Trucks, Services, About, and Contact now use one hero
  component → pixel-identical heroes. Home hero stays full-viewport (`100vh`);
  all secondary heroes share `--hero-height`.
- **Embedded heroes hidden on home.** About/Contact render their hero only on
  their own routes (`showHero` prop), so the home page isn't a stack of dark banners.
- **Trailers section** (home + /services): 6 types from `src/lib/trailers.js`,
  real masked SVG icons (`public/icons/`, mirrored, blue-tinted) on a blue-tinted
  background; "Opportunities" cards use Noun Project icons in the navy circles.
- **Fixed a code-splitting regression:** `JobOfferCom` used `JobCom.css` classes
  but didn't import the stylesheet — it relied on the old single CSS bundle. After
  splitting, its styles were orphaned on the home page; fixed by importing the CSS
  directly in the component.

---

## 7. Architecture (see `graph-logistics/` for diagrams)

```
main.jsx
  └ BrowserRouter → ErrorBoundary → BlogProvider → TrackModalProvider → App
        BlogProvider  → GET midnight-sec-back.onrender.com/api/products  (loading/error)
        App           → NavbarCom + <Suspense><AnimatePresence><Routes/> (lazy) + FooterCom + <TrackModal/>
```

- **Routing:** all routes code-split; `AnimatePresence` page transitions; `/admin` behind `ProtectedRoute`.
- **Shared libs:** `lib/telegram.js` (browser→Telegram Bot API), `lib/trailers.js` (single source of truth), `lib/motion.js` (variants).
- **Motion layer:** `components/Motion/` — `Reveal`, `Stagger`, `StaggerItem`, `PageTransition` (all reduced-motion aware).
- **Reusable UI:** `PageHero`, `TrailersSection` + `TrailerIcon`, `TrackModal` (global via context), `RouteFallback`.
- **Forms** post to Telegram via the shared util. **Auth** is client-only (localStorage token).
- **Build:** `manualChunks` → `react-vendor` / `motion` / `mui` (lazy).

---

## 8. Verification

| Gate | Command | Result |
|---|---|---|
| Production build | `npm run build` | ✅ succeeds |
| Lint | `npm run lint` | ✅ 0 errors, 0 warnings |
| Unit/component tests | `npm test` | ✅ 14/14 pass |
| Bundle budget | `npm run size` | ✅ all chunks < 250 KB |

---

## 9. Pre-launch checklist

- [ ] Rotate the Telegram bot token (exposed in git history + client bundle).
- [ ] Set the real domain in `index.html`, `sitemap.xml`, `robots.txt`.
- [ ] (Optional, recommended) move the Telegram call behind a server-side proxy for true secrecy.
- [ ] (Optional) re-encode the large hero/about images to improve LCP.
- [ ] Confirm Noun Project icon attribution requirements for `public/icons/noun-*.svg` (free tier is usually CC-BY).
- [ ] Replace client-only admin auth with real authentication if `/admin` will be internet-exposed.
