import React from 'react';
import { Error as ErrorIcon } from '@openedx/paragon/icons';

import { useTranslate } from '../i18n/utils';
import { useScrollToContent } from '../generic/hooks';
import { useDashboardPageData } from './hooks/useDashboardPageData';
import { Loader, Alert } from '../generic';
import DashboardWrapper from './DashboardWrapper';

const MAIN_CONTENT_ID = 'dashboard-page-title';

const DashboardPage = () => {
  const {
    isLoading,
    isError,
    avatarProcessingStates,
    avatarResetProcessingMutations,
    handleSelectAvatarSet,
    handleUpdateSelectedAvatarSet,
    gameProfileData,
  } = useDashboardPageData();

  const messages = {
    alertErrorMessage: useTranslate('generic.error.fallback.title'),
  };

  useScrollToContent(MAIN_CONTENT_ID, 'a[href="#main"]');

  if (isLoading) {
    return <Loader className="text-center" />;
  }

  if (isError) {
    return (
      <Alert
        title={messages.alertErrorMessage}
        className="dashboard-page-error-alert"
        variant="danger"
        icon={ErrorIcon}
      />
    );
  }

  return (
    <DashboardWrapper
      avatarProcessingStates={avatarProcessingStates}
      avatarResetProcessingMutations={avatarResetProcessingMutations}
      handleSelectAvatarSet={handleSelectAvatarSet}
      handleUpdateSelectedAvatarSet={handleUpdateSelectedAvatarSet}
      {...gameProfileData}
    />
  );
};

export default DashboardPage;
