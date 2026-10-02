import axios from 'axios';
import { useQuery } from 'react-query';

import { convertKeysToCamelCase } from '../helpers/utils';
import { COUNTRY_LEADERBOARD_URLS } from '../constants';
import { usePrefetchOtherView } from './usePrefetchOtherView';

export function useCountryLeaderboard(country = '', hideInstructors = false) {
  const queryKey = (hide) => ['country-leaderboard', country, hide];
  const fetchView = (hide) => async () => {
    try {
      const { data } = await axios.get(COUNTRY_LEADERBOARD_URLS(country, hide).getInfo);
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
      enabled: Boolean(country),
      onError: (error) => {
        console.error('Failed to fetch country leaderboard:', error); // eslint-disable-line no-console
      },
    },
  );
  usePrefetchOtherView(query, queryKey(!hideInstructors), fetchView(!hideInstructors), Boolean(country));
  return query;
}
