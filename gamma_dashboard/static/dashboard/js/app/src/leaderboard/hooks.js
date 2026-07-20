import { useCallback, useState } from 'react';

// Persisted so the choice survives navigating between the leaderboards (a learner who
// hid instructors on the main board means it on the per-country one too) and coming back
// later. It is a display preference, not account data, so it stays in the browser.
const HIDE_INSTRUCTORS_STORAGE_KEY = 'gamma.leaderboard.hide-instructors';

/**
 * Read the stored "hide instructors" preference.
 *
 * Defaults to showing everyone — the leaderboard a learner has always seen — and treats
 * a browser that refuses storage (private mode, blocked cookies) as "no preference"
 * rather than failing the render.
 *
 * @returns {boolean}
 */
const readStoredPreference = () => {
  try {
    return window.localStorage.getItem(HIDE_INSTRUCTORS_STORAGE_KEY) === 'true';
  } catch (error) {
    return false;
  }
};

/**
 * Whether the leaderboards should currently leave instructors out, plus a toggle.
 *
 * The flag is part of every leaderboard query key, so the two views are fetched once
 * each and then cached: flipping back and forth costs nothing after the first look at
 * each one.
 *
 * @returns {[boolean, function(): void]} the current preference and a function to flip it.
 */
export const useHideInstructors = () => {
  const [hideInstructors, setHideInstructors] = useState(readStoredPreference);

  const toggleHideInstructors = useCallback(() => {
    setHideInstructors((previous) => {
      const next = !previous;
      try {
        window.localStorage.setItem(HIDE_INSTRUCTORS_STORAGE_KEY, String(next));
      } catch (error) {
        // A browser that refuses storage simply forgets the choice on the next visit.
      }
      return next;
    });
  }, []);

  return [hideInstructors, toggleHideInstructors];
};

export { HIDE_INSTRUCTORS_STORAGE_KEY };
