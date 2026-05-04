// queryHistory.ts — Vue Router 4 RouterHistory implementation that encodes
// the current route in the URL *query string* rather than the path or hash.
//
// Encoding:
//   App route '/'            →  URL '?'         (empty query string)
//   App route '/user/login'  →  URL '?user/login'
//   App route '/owner/repo'  →  URL '?owner/repo'
//
// This scheme is ideal for static-file hosts (GitHub Pages) because:
//   • The server always serves the same index.html regardless of the query.
//   • No 404-redirect tricks are needed.
//   • Browser back/forward work correctly via the History API.

import type {RouterHistory, HistoryState} from 'vue-router';

// NavigationCallback is declared in vue-router but not exported; extract it.
type NavigationCallback = Parameters<RouterHistory['listen']>[0];
// Extract NavigationInformation from the callback's third parameter type.
type NavigationInfo = Parameters<NavigationCallback>[2];

/** Convert an app route path (e.g. '/user/login') to a URL query string. */
function pathToSearch(path: string): string {
  if (!path || path === '/') return '?';
  const stripped = path.startsWith('/') ? path.slice(1) : path;
  return `?${stripped}`;
}

/** Read the current app route from window.location.search. */
function pathFromSearch(): string {
  const s = window.location.search;
  if (!s || s === '?') return '/';
  return `/${s.slice(1)}`;
}

/**
 * Creates a RouterHistory that stores routes in the URL query string.
 * Designed for static-file deployments where server-side routing is
 * unavailable.
 */
export function createQueryHistory(): RouterHistory {
  let currentPath = pathFromSearch();
  const callbacks = new Set<NavigationCallback>();

  function onPopState() {
    const newPath = pathFromSearch();
    const prev = currentPath;
    currentPath = newPath;
    const info = {delta: 0, type: 'pop', direction: ''} as unknown as NavigationInfo;
    for (const cb of callbacks) cb(newPath, prev, info);
  }

  window.addEventListener('popstate', onPopState);

  return {
    base: '',

    get location(): string {
      return currentPath;
    },

    get state(): HistoryState {
      return (window.history.state ?? {}) as HistoryState;
    },

    push(to: string, data?: HistoryState): void {
      window.history.pushState(data ?? {}, '', window.location.pathname + pathToSearch(to));
      currentPath = to;
    },

    replace(to: string, data?: HistoryState): void {
      window.history.replaceState(data ?? {}, '', window.location.pathname + pathToSearch(to));
      currentPath = to;
    },

    go(delta: number): void {
      window.history.go(delta);
    },

    listen(callback: NavigationCallback): () => void {
      callbacks.add(callback);
      return () => callbacks.delete(callback);
    },

    /**
     * Returns the href string Vue Router should place in <RouterLink>.
     * e.g. createHref('/user/login') → '?user/login'
     */
    createHref(location: string): string {
      return pathToSearch(location);
    },

    destroy(): void {
      window.removeEventListener('popstate', onPopState);
      callbacks.clear();
    },
  };
}
