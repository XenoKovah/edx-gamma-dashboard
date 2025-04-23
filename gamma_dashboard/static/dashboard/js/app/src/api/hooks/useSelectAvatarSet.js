import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { getDefaultHeaders } from '../helpers/utils';
import { DASHBOARD_URLS } from '../constants';

export function useSelectAvatarSet() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ gammaUserId, selectedAvatarSetId }) => {
      const { data } = await axios.post(
        DASHBOARD_URLS.selectUserAvatarSet(),
        {
          user: gammaUserId,
          avatar_set: selectedAvatarSetId,
        },
        {
          headers: getDefaultHeaders(),
        },
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('gameProfile');
      },
      onError: (error) => {
        console.error('Failed to select avatar:', error); // eslint-disable-line no-console
      },
    },
  );
}
