import axios from 'axios';
import { useQuery } from 'react-query';

import { convertKeysToCamelCase } from '../helpers/utils';
import { LEADERBOARD_URLS } from '../constants';

export function useLeaderboard(courseId = '') {
  return useQuery(
    ['leaderboard', courseId],
    async () => {
      const { data } = await axios.get(LEADERBOARD_URLS(courseId).getInfo);
      return convertKeysToCamelCase(data) || {};
    },
    {
      onError: (error) => {
        console.error('Failed to fetch leaderboard:', error); // eslint-disable-line no-console
      },
    },
  );
}
