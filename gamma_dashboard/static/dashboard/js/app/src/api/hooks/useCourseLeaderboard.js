import axios from 'axios';
import { useQuery } from 'react-query';

import { convertKeysToCamelCase } from '../helpers/utils';
import { COURSE_LEADERBOARD_URLS } from '../constants';

export function useCourseLeaderboard(courseId = '', hideInstructors = false) {
  return useQuery(
    ['course-leaderboard', courseId, hideInstructors],
    async () => {
      try {
        const { data } = await axios.get(COURSE_LEADERBOARD_URLS(courseId, hideInstructors).getInfo);
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
      // Both views of a board are cached under their own key, so the first look at each
      // costs a fetch and every flip after that is instant. keepPreviousData keeps the
      // current table on screen while the other one loads rather than blanking the page.
      keepPreviousData: true,
      enabled: Boolean(courseId),
      onError: (error) => {
        console.error('Failed to fetch course leaderboard:', error); // eslint-disable-line no-console
      },
    },
  );
}
