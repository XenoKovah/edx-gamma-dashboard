import axios from 'axios';
import { useQuery } from 'react-query';

import { convertKeysToCamelCase } from '../helpers/utils';
import { COUNTRY_LEADERBOARD_URLS } from '../constants';

export function useCountryLeaderboard(country = '') {
  return useQuery(
    ['country-leaderboard', country],
    async () => {
      try {
        const { data } = await axios.get(COUNTRY_LEADERBOARD_URLS(country).getInfo);
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
      enabled: Boolean(country),
      onError: (error) => {
        console.error('Failed to fetch country leaderboard:', error); // eslint-disable-line no-console
      },
    },
  );
}
