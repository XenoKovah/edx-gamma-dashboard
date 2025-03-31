import { useUpdateAvatarSet } from './useUpdateAvatarSet';
import { useSelectAvatarSet } from './useSelectAvatarSet';

export function useAvatarMutations() {
  const {
    mutate: updateAvatarSet,
    isLoading: isUpdatingAvatarSet,
    isError: isUpdateAvatarSetError,
    isSuccess: isUpdateAvatarSetSuccess,
    reset: resetAvatarSetMutation,
  } = useUpdateAvatarSet();

  const {
    mutate: selectAvatarSet,
    isLoading: isSelectingAvatarSet,
    isError: isSelectAvatarSetError,
    isSuccess: isSelectAvatarSetSuccess,
    reset: resetSelectAvatarMutation,
  } = useSelectAvatarSet();

  const resetAllMutations = () => {
    resetAvatarSetMutation();
    resetSelectAvatarMutation();
  };

  const isLoading = isUpdatingAvatarSet || isSelectingAvatarSet;
  const hasError = isUpdateAvatarSetError || isSelectAvatarSetError;
  const isSuccess = isUpdateAvatarSetSuccess || isSelectAvatarSetSuccess;

  return {
    mutations: {
      updateAvatarSet,
      selectAvatarSet,
    },
    avatarProcessingStates: {
      isLoading,
      hasError,
      isSuccess,
      details: {
        update: {
          isLoading: isUpdatingAvatarSet,
          isError: isUpdateAvatarSetError,
          isSuccess: isUpdateAvatarSetSuccess,
        },
        select: {
          isLoading: isSelectingAvatarSet,
          isError: isSelectAvatarSetError,
          isSuccess: isSelectAvatarSetSuccess,
        },
      },
    },
    avatarResetProcessingMutations: {
      all: resetAllMutations,
      update: resetAvatarSetMutation,
      select: resetSelectAvatarMutation,
    },
  };
}
