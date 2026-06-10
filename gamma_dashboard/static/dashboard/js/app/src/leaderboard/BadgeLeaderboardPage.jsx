import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Info as InfoIcon } from '@openedx/paragon/icons';

import { useScrollToContent } from '../generic/hooks';
import { SubHeader, Alert, Loader } from '../generic';
import { getBadgeLeaderboardTableProps, getBadgeInProgressProps } from './utils';
import { LeaderboardTable, BadgeLeaderboardHeader } from './components';

import { useBadgeLeaderboard } from '../api/hooks/useBadgeLeaderboard';

import messages from '../i18n';

/**
 * Per-badge leaderboard page: the Leaderboard page filtered down to a specific
 * badge. It shows the badge (title, large image and description) at the top, then
 * the users who earned it (ranked by points) and, below, the users still making
 * progress toward it (ranked by their progress percentage).
 */
const BadgeLeaderboardPage = () => {
  const intl = useIntl();
  const { badgeSlug, courseId } = useParams();
  const {
    data: badgeLeaderboardData, isLoading, error, isError,
  } = useBadgeLeaderboard(badgeSlug, courseId);

  const translations = {
    leaderboardTitle: intl.formatMessage(messages.leaderboardHeadingText),
    earnedTitle: intl.formatMessage(messages.badgeLeaderboardEarnedSectionTitle),
    inProgressTitle: intl.formatMessage(messages.badgeLeaderboardInProgressSectionTitle),
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
  const {
    rank: inProgressRank,
    profiles: inProgressProfiles,
  } = getBadgeInProgressProps(badgeLeaderboardData);

  const hasEarners = profiles.length > 0;
  const hasInProgress = inProgressProfiles.length > 0;

  return (
    <>
      <SubHeader
        id="leaderboard-page-title"
        title={translations.leaderboardTitle}
      />
      <BadgeLeaderboardHeader badge={badgeLeaderboardData?.badge || {}} />

      {hasEarners && (
        <>
          {hasInProgress && (
            <h2 className="badge-leaderboard-section-title" data-testid="badge-leaderboard-earned-title">
              {translations.earnedTitle}
            </h2>
          )}
          <LeaderboardTable
            rank={rank}
            profiles={profiles}
            delimiter={delimiter}
          />
        </>
      )}

      {hasInProgress && (
        <>
          <h2 className="badge-leaderboard-section-title" data-testid="badge-leaderboard-in-progress-title">
            {translations.inProgressTitle}
          </h2>
          <LeaderboardTable
            rank={inProgressRank}
            profiles={inProgressProfiles}
            showProgress
          />
        </>
      )}

      {!hasEarners && !hasInProgress && (
        <LeaderboardTable rank={0} profiles={[]} />
      )}
    </>
  );
};

export default BadgeLeaderboardPage;
