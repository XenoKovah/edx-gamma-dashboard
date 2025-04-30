import axios from 'axios';
import { useQuery } from 'react-query';

import { convertKeysToCamelCase } from '../helpers/utils';
import { LEADERBOARD_URLS } from '../constants';

export function useLeaderboard(courseId = '') {
  return useQuery(
    ['leaderboard', courseId],
    async () => {
      try {
        const { data } = await axios.get(LEADERBOARD_URLS(courseId).getInfo);
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
      onError: (error) => {
        console.error('Failed to fetch leaderboard:', error); // eslint-disable-line no-console
      },
    },
  );
}
