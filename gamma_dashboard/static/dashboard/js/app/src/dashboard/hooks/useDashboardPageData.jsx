import { useGameProfile } from '../../api/hooks/useGameProfile';
import { useAvatarMutations } from '../../api/hooks';

export const useDashboardPageData = () => {
  const {
    data: gameProfileData,
    isLoading,
    isError,
  } = useGameProfile();

  const {
    mutations,
    avatarProcessingStates,
    avatarResetProcessingMutations,
  } = useAvatarMutations();

  const handleSelectAvatarSet = (targetAvatarSetId) => {
    const { user: gammaUserId } = gameProfileData.gammaUserInfo;
    mutations.selectAvatarSet({
      gammaUserId,
      selectedAvatarSetId: targetAvatarSetId,
    });
  };

  const handleUpdateSelectedAvatarSet = (targetAvatarSetId) => {
    const { id: userConfigurationId, user: gammaUserId } = gameProfileData.gammaUserInfo;
    mutations.updateAvatarSet({
      userConfigurationId,
      gammaUserId,
      selectedAvatarSetId: targetAvatarSetId,
    });
  };

  return {
    isLoading,
    isError,
    gameProfileData,
    avatarProcessingStates,
    avatarResetProcessingMutations,
    handleSelectAvatarSet,
    handleUpdateSelectedAvatarSet,
  };
};
