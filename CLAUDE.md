# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview built output
- `npm run lint` — ESLint over the repo

No test runner is configured.

## Architecture

Vite + React 18 SPA (logistics company site) using `react-router-dom` v6. Provider chain in `src/main.jsx`: `<BrowserRouter>` → `<BlogProvider>` → `<App/>`. `src/App.jsx` mounts `NavbarCom`, a `<Routes>` block (inside `<main className="main-app">`), and `FooterCom`. Public routes (`/`, `/about`, `/apply`, `/contact`, `/trucks`, `/services`, `/privacy`, 404) map to page components under `src/Pages/`. `src/Pages/Scroll To Top/ScrollToTop.jsx` resets scroll on navigation.

Each page under `src/Pages/<name>/` is a thin wrapper that renders a matching feature component from `src/components/` (e.g. `Pages/home/Home.jsx` → `components/HomeCom/HomeCom.jsx`). Shared layout (`NavbarCom`, `FooterCom`) and a `Construction` maintenance overlay (currently commented out in `App.jsx`) also live under `src/components/`.

**Backend & global state.** A single hosted API at `https://midnight-sec-back.onrender.com/api/products/` backs the "trucks/products" content. `src/Context.jsx` exposes `BlogProvider` / `useBlog()`, which GETs that endpoint into an `array` on mount and exposes `{ array, getData, setArray }`. `BlogProvider` already wraps `<App/>`, so `useBlog()` works in any page. The API base URL is hardcoded in both `Context.jsx` and `AdminPanel.jsx` — change both if it moves.

**Admin / auth (client-only, not secure).** `/login` and `/admin` add a CRUD panel for the products API. Auth is simulated entirely in the browser: credentials come from `VITE_ADMIN_LOGIN` / `VITE_ADMIN_PASSWORD` (env) via the shared `src/lib/auth.js` helper, which both `Pages/Login/Login.jsx` and `components/ProtectedRoute/ProtectedRoute.jsx` import. A successful login stores `btoa("login:password")` (exported as `AUTH_TOKEN`) in `localStorage.token`; `ProtectedRoute` gates `/admin` by comparing that token; logout removes it. Because Vite inlines `VITE_*` into the client bundle, these are NOT secret at runtime — this is a demo gate, not real security. `AdminPanel.jsx` does GET/POST/PUT/DELETE against the products endpoint (POST to `…/products/`, PUT/DELETE by `…/products/{_id}`). It is plain semantic HTML + `AdminPanel.css` (a fleet-roster card grid), not MUI. The edit/create payload sends only `{ name, description, image }` — do NOT add empty-string numeric fields (`price:''`/`kvt:''`), which the Mongoose backend rejects with a cast error. User-facing dates use `src/lib/date.js` (`formatDateUS` → American MM.DD.YYYY).

**Styling.** Design tokens are CSS custom properties defined in `src/index.css` `:root` — colors (`--color-primary`, `--color-dark`, `--color-mid`, …), fonts (`--font-display` = Barlow Condensed, `--font-body` = Rubik), and spacing. Prefer these `var(--…)` tokens over hardcoded values. The UI stack mixes MUI (`@mui/material` + `@mui/icons-material`, styled via the `sx` prop), Emotion, styled-components, FontAwesome, `react-icons`, and plain per-component CSS. Phone inputs use `react-phone-input-2` + `libphonenumber-js`; HTTP via `axios` or `fetch`.

Build uses `@vitejs/plugin-react-swc`. Folder names are case-sensitive and irregular (`Pages/`, `Image/`, `Scroll To Top/`, mixed-case component files like `AbourtCom.jsx`, `privacy.jsx`) — keep imports matching the exact on-disk casing for Linux/CI builds.
