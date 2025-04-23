import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { getDefaultHeaders } from '../helpers/utils';
import { DASHBOARD_URLS } from '../constants';

export function useUpdateAvatarSet() {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ userConfigurationId, gammaUserId, selectedAvatarSetId }) => {
      const { data } = await axios.patch(
        DASHBOARD_URLS.updateUserAvatarSet(userConfigurationId),
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
        console.error('Failed to update avatar:', error); // eslint-disable-line no-console
      },
    },
  );
}
