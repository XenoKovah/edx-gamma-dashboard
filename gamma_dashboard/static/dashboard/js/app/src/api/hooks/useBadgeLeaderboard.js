import axios from 'axios';
import { useQuery } from 'react-query';

import { convertKeysToCamelCase } from '../helpers/utils';
import { BADGE_LEADERBOARD_URLS } from '../constants';

export function useBadgeLeaderboard(badgeSlug = '', courseId = '') {
  return useQuery(
    ['badge-leaderboard', badgeSlug, courseId],
    async () => {
      try {
        const { data } = await axios.get(BADGE_LEADERBOARD_URLS(badgeSlug, courseId).getInfo);
        return convertKeysToCamelCase(data) || {};
      } catch (error) {
        const { response, message } = error;
        const enhancedError = new Error(response?.data?.message || message);
        enhancedError.status = response?.status;
        enhancedError.description = response?.data?.error;
        throw enhancedError;
      }
    },
    {
      enabled: Boolean(badgeSlug),
      onError: (error) => {
        console.error('Failed to fetch badge leaderboard:', error); // eslint-disable-line no-console
      },
    },
  );
}
