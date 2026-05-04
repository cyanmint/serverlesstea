// spaconfig.ts — centralised configuration for the SPA.
//
// Works in two modes:
//   Embedded: SPA served by the Gitea Go binary.  window.config is populated
//             by the Go template before the JS runs.
//   Standalone: SPA deployed to GitHub Pages (or any static host).
//               VITE_DEFAULT_API_URL is set at build time to point to the
//               Gitea server; window.config is initialised to empty defaults
//               by the standalone entry HTML synchronous <script> block.

// Build-time API URL injected via VITE_DEFAULT_API_URL env-var.
// Empty string when building in embedded (normal Gitea) mode.
const buildApiUrl: string = import.meta.env['VITE_DEFAULT_API_URL'] ?? '';

// In embedded mode window.config is populated by the Go template before any JS
// runs.  In standalone mode the entry HTML initialises window.config with
// empty defaults via a synchronous <script> block before any ES modules load,
// so the access is always safe.
const cfg = window.config;

/** True when the SPA was built for standalone GitHub Pages deployment. */
export const isStandalone: boolean = Boolean(buildApiUrl);

/**
 * Base URL of the Gitea instance, WITHOUT a trailing slash.
 * Examples:
 *   embedded  →  '' (same origin)
 *   standalone →  'https://gitea.example.com'
 */
export const appSubUrl: string = buildApiUrl ?
  buildApiUrl.replace(/\/$/, '') :
  cfg.appSubUrl;

/**
 * Base URL for all Gitea REST-API v1 calls.
 * Examples:
 *   embedded  →  '/api/v1'
 *   standalone →  'https://gitea.example.com/api/v1'
 */
export const apiBase: string = `${appSubUrl}/api/v1`;

/**
 * URL prefix for bundled static assets (logo, etc.).
 * In embedded mode this comes from window.config; in standalone mode
 * assets are bundled into the frontend itself so the prefix is '.' — a
 * relative path that resolves correctly at any URL sub-path (e.g.
 * https://example.com/gitea/).  Absolute '/img/...' would break on
 * GitHub Pages because the site is not served from the root.
 */
export const assetUrlPrefix: string = buildApiUrl ?
  '.' :
  cfg.assetUrlPrefix;

/**
 * Rewrites a URL that came from the Gitea API so its origin matches the
 * configured backend server.  This is needed in the standalone SPA (deployed
 * to GitHub Pages) because the Gitea server may return absolute URLs with its
 * own hostname, which must be preserved as the clone / download target.
 *
 * In embedded mode the SPA and the backend share the same origin, so no
 * rewriting is required.
 */
export function rewriteToBackend(url: string): string {
  if (!isStandalone || !url || !appSubUrl) return url;
  try {
    const u = new URL(url);
    const backend = new URL(appSubUrl);
    u.protocol = backend.protocol;
    u.host = backend.host;
    return u.toString();
  } catch {
    return url;
  }
}
