import React from 'react';
import { useIntl } from 'react-intl';
import { Error as ErrorIcon } from '@openedx/paragon/icons';

import { useScrollToContent } from '../generic/hooks';
import { useDashboardPageData } from './hooks/useDashboardPageData';
import { Loader, Alert } from '../generic';
import DashboardWrapper from './DashboardWrapper';

import messages from '../i18n';

const MAIN_CONTENT_ID = 'dashboard-page-title';

const DashboardPage = () => {
  const intl = useIntl();

  const {
    isLoading,
    isError,
    avatarProcessingStates,
    avatarResetProcessingMutations,
    handleSelectAvatarSet,
    handleUpdateSelectedAvatarSet,
    gameProfileData,
  } = useDashboardPageData();

  const translations = {
    alertErrorMessage: intl.formatMessage(messages.genericErrorFallbackTitle),
  };

  useScrollToContent(MAIN_CONTENT_ID, 'a[href="#main"]');

  if (isLoading) {
    return <Loader className="text-center" />;
  }

  if (isError) {
    return (
      <Alert
        title={translations.alertErrorMessage}
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
