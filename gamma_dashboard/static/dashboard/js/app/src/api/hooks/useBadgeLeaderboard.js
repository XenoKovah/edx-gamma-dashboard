import axios from 'axios';
import { useQuery } from 'react-query';

import { convertKeysToCamelCase } from '../helpers/utils';
import { BADGE_LEADERBOARD_URLS } from '../constants';
import { usePrefetchOtherView } from './usePrefetchOtherView';

export function useBadgeLeaderboard(badgeSlug = '', courseId = '', hideInstructors = false) {
  const queryKey = (hide) => ['badge-leaderboard', badgeSlug, courseId, hide];
  const fetchView = (hide) => async () => {
    try {
      const { data } = await axios.get(BADGE_LEADERBOARD_URLS(badgeSlug, courseId, hide).getInfo);
      return convertKeysToCamelCase(data) || {};
    } catch (error) {
      const { response, message } = error;
      const enhancedError = new Error(response?.data?.message || message);
      enhancedError.status = response?.status;
      enhancedError.description = response?.data?.error;
      throw enhancedError;
    }
  };
  const query = useQuery(
    queryKey(hideInstructors),
    fetchView(hideInstructors),
    {
      // Both views of a board are cached under their own key, and usePrefetchOtherView warms
      // the other one as soon as this one loads, so even the first flip is instant.
      // keepPreviousData keeps the current table on screen if a flip does have to wait.
      keepPreviousData: true,
      enabled: Boolean(badgeSlug),
      onError: (error) => {
        console.error('Failed to fetch badge leaderboard:', error); // eslint-disable-line no-console
      },
    },
  );
  // An instructor badge's own board is served unfiltered and has no toggle.
  const hasToggle = Boolean(badgeSlug) && !query.data?.badge?.isInstructorBadge;
  usePrefetchOtherView(query, queryKey(!hideInstructors), fetchView(!hideInstructors), hasToggle);
  return query;
}
