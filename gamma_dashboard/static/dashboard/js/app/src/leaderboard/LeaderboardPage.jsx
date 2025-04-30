import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Info as InfoIcon } from '@openedx/paragon/icons';

import { useScrollToContent } from '../generic/hooks';
import { SubHeader, Alert, Loader } from '../generic';
import { getLeaderboardTableProps } from './utils';
import { LeaderboardTable } from './components';

import { useLeaderboard } from '../api/hooks/useLeaderboard';

import messages from '../i18n';

const LeaderboardPage = () => {
  const intl = useIntl();
  const { courseId } = useParams();
  const {
    data: leaderboardData, isLoading, error, isError,
  } = useLeaderboard(courseId);

  const translations = {
    alertTitle: intl.formatMessage(messages.leaderboardHeadingText),
    errorTitle: intl.formatMessage(messages.genericErrorFallbackTitle),
  };

  useScrollToContent('leaderboard-page-title', 'a[href="#main"]');

  if (isLoading) {
    return <Loader className="text-center" />;
  }

  if (isError) {
    switch (error.status) {
      case 404:
        return (
          <Alert
            className="mt-6"
            title={error.message}
            variant="danger"
            icon={InfoIcon}
          >
            <p>{error.description || translations.errorTitle}</p>
          </Alert>
        );
      default:
        return (
          <Alert
            className="mt-6"
            title={translations.errorTitle}
            variant="danger"
            icon={InfoIcon}
          />
        );
    }
  }

  const {
    rank,
    profiles,
    delimiter,
    systemStatuses,
  } = getLeaderboardTableProps(leaderboardData);

  return (
    <>
      <SubHeader
        id="leaderboard-page-title"
        title={translations.alertTitle}
      />
      <LeaderboardTable
        rank={rank}
        profiles={profiles}
        delimiter={delimiter}
        systemStatuses={systemStatuses}
      />
    </>
  );
};

export default LeaderboardPage;
