import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Info as InfoIcon } from '@openedx/paragon/icons';

import { useScrollToContent } from '../generic/hooks';
import { SubHeader, Alert, Loader } from '../generic';
import { getBadgeLeaderboardTableProps } from './utils';
import { LeaderboardTable, BadgeLeaderboardHeader } from './components';

import { useBadgeLeaderboard } from '../api/hooks/useBadgeLeaderboard';

import messages from '../i18n';

/**
 * Per-badge leaderboard page: the Leaderboard page filtered down to the users
 * who earned a specific badge. It shows the badge (title, large image and
 * description) at the top, then the ranked list of earners.
 */
const BadgeLeaderboardPage = () => {
  const intl = useIntl();
  const { badgeSlug, courseId } = useParams();
  const {
    data: badgeLeaderboardData, isLoading, error, isError,
  } = useBadgeLeaderboard(badgeSlug, courseId);

  const translations = {
    leaderboardTitle: intl.formatMessage(messages.leaderboardHeadingText),
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

  const { rank, profiles, delimiter } = getBadgeLeaderboardTableProps(badgeLeaderboardData);

  return (
    <>
      <SubHeader
        id="leaderboard-page-title"
        title={translations.leaderboardTitle}
      />
      <BadgeLeaderboardHeader badge={badgeLeaderboardData?.badge || {}} />
      <LeaderboardTable
        rank={rank}
        profiles={profiles}
        delimiter={delimiter}
      />
    </>
  );
};

export default BadgeLeaderboardPage;
