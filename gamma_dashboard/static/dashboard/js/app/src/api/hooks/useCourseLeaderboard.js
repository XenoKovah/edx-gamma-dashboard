import axios from 'axios';
import { useQuery } from 'react-query';

import { convertKeysToCamelCase } from '../helpers/utils';
import { COURSE_LEADERBOARD_URLS } from '../constants';

export function useCourseLeaderboard(courseId = '') {
  return useQuery(
    ['course-leaderboard', courseId],
    async () => {
      try {
        const { data } = await axios.get(COURSE_LEADERBOARD_URLS(courseId).getInfo);
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
      enabled: Boolean(courseId),
      onError: (error) => {
        console.error('Failed to fetch course leaderboard:', error); // eslint-disable-line no-console
      },
    },
  );
}
