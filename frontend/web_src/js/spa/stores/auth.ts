import {ref} from 'vue';
import {getCurrentUser, type User} from '../api/index.ts';

/** Reactive reference to the currently signed-in user, or null when not signed in. */
export const currentUser = ref<User | null>(null);

/** True while the initial auth check is in flight. */
export const authLoading = ref(true);

// A single in-flight promise so concurrent callers share the same fetch.
let initPromise: Promise<void> | null = null;

/**
 * Initialize auth state.  Safe to call from multiple components — the API is
 * only ever hit once per page load.  Subsequent calls return the cached result
 * immediately via the same promise.
 */
export function initAuth(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      try {
        currentUser.value = await getCurrentUser();
      } catch {
        currentUser.value = null;
      } finally {
        authLoading.value = false;
      }
    })();
  }
  return initPromise;
}
