import React, { useState, useEffect } from 'react';

import { gammaApi } from '../api';
import DashboardWrapper from './DashboardWrapper';
import { useScrollToContent } from '../generic/hooks';

const MAIN_CONTENT_ID = 'dashboard-page-title';

const DashboardPage = () => {
  // TODO: Move to reducer or discuss React Query + Context
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [dashboardData, setDashboardData] = useState({});

  const userConfigurationId = dashboardData?.gammaUserInfo?.user_avatar_set_info?.id;
  const gammaUserId = dashboardData?.gammaUserInfo?.gamma_user_id;

  useScrollToContent(MAIN_CONTENT_ID, 'a[href="#main"]');

  const fetchDashboardData = () => {
    gammaApi.dashboard.getGameProfile((data) => setDashboardData(data));
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSelectAvatarSet = (targetAvatarSetId) => {
    setIsUpdating(true);
    setUpdateSuccess(false);
    setUpdateError(null);

    gammaApi.dashboard
      .selectUserAvatarSet(gammaUserId, targetAvatarSetId)
      .then(() => {
        setUpdateSuccess(true);
        fetchDashboardData();
      })
      .catch((error) => {
        console.error('Avatar set select failed:', error); // eslint-disable-line no-console
        setUpdateError(error);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const handleUpdateSelectedAvatarSet = (targetAvatarSetId) => {
    setIsUpdating(true);
    setUpdateSuccess(false);
    setUpdateError(null);

    gammaApi.dashboard
      .updateUserAvatarSet(userConfigurationId, gammaUserId, targetAvatarSetId)
      .then(() => {
        setUpdateSuccess(true);
        fetchDashboardData();
      })
      .catch((error) => {
        console.error('Avatar set update failed:', error); // eslint-disable-line no-console
        setUpdateError(error);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <DashboardWrapper
      isUpdating={isUpdating}
      updateError={updateError}
      updateSuccess={updateSuccess}
      setUpdateError={setUpdateError}
      setUpdateSuccess={setUpdateSuccess}
      handleSelectAvatarSet={handleSelectAvatarSet}
      handleUpdateSelectedAvatarSet={handleUpdateSelectedAvatarSet}
      {...dashboardData}
    />
  );
};

export default DashboardPage;
