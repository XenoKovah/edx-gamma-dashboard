import axios from 'axios';
import { useQuery } from 'react-query';

import { DASHBOARD_URLS } from '../constants';
import { prepareDashboardData } from '../helpers';

export function useGameProfile() {
  return useQuery(
    'gameProfile',
    async () => {
      const { data } = await axios.get(DASHBOARD_URLS.getGameProfile);
      return prepareDashboardData(data) || {};
    },
    {
      onError: (error) => {
        console.error('Failed to fetch game profile:', error); // eslint-disable-line no-console
      },
    },
  );
}
