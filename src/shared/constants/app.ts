/**
 * Absolute URLs to the Optikk web app (a separate origin from this marketing
 * site). Auth entry points MUST use these so the browser does a full-page
 * navigation to `app.optikk.in` - a client-side router `<Link>` would stay on
 * this SPA and never reach the app (or the Firebase Hosting redirect).
 *
 * Override the origin per environment with `VITE_APP_BASE_URL`
 * (e.g. `http://localhost:5173` for local dev), mirroring `VITE_API_BASE_URL`.
 */
const APP_BASE = "https://app.optikk.in";

export const APP_URLS = {
  login: `${APP_BASE}/login`,
  signup: `${APP_BASE}/signup`,
} as const;
