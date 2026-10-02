import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

// How long a prefetched view counts as fresh: the boards themselves refresh about once a minute.
const PREFETCH_STALE_MS = 60 * 1000;

/**
 * Warm the other view of a leaderboard (instructors shown / hidden) in the background.
 *
 * Each view is cached under its own query key, so without this the first "Hide/Show Instructors"
 * click waits for a fetch. Once the current view has loaded, fetch the other one too: then the
 * first click is as instant as every later one.
 *
 * @param {object} query - The current view's useQuery result.
 * @param {Array} otherKey - The other view's query key.
 * @param {Function} fetchOther - Fetches the other view.
 * @param {boolean} enabled - False where there's no toggle (e.g. an instructor badge's own board).
 */
export function usePrefetchOtherView(query, otherKey, fetchOther, enabled = true) {
  const queryClient = useQueryClient();
  const keyId = JSON.stringify(otherKey);

  useEffect(() => {
    if (enabled && query.isSuccess) {
      queryClient.prefetchQuery(otherKey, fetchOther, { staleTime: PREFETCH_STALE_MS });
    }
  }, [enabled, query.isSuccess, keyId]); // eslint-disable-line react-hooks/exhaustive-deps
}
