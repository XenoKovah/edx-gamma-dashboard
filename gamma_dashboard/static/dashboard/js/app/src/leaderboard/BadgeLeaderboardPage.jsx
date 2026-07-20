import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Info as InfoIcon } from '@openedx/paragon/icons';

import { useScrollToContent } from '../generic/hooks';
import { SubHeader, Alert, Loader } from '../generic';
import { getBadgeLeaderboardTableProps, getBadgeInProgressProps } from './utils';
import { useHideInstructors } from './hooks';
import {
  LeaderboardTable, LeaderboardView, BadgeLeaderboardHeader, HideInstructorsToggle,
} from './components';

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
  const [hideInstructors, toggleHideInstructors] = useHideInstructors();
  const {
    data: badgeLeaderboardData, isLoading, isFetching, error, isError,
  } = useBadgeLeaderboard(badgeSlug, courseId, hideInstructors);

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

  const { profiles, delimiter } = getBadgeLeaderboardTableProps(badgeLeaderboardData);
  const { profiles: inProgressProfiles } = getBadgeInProgressProps(badgeLeaderboardData);
  const currentUserUid = badgeLeaderboardData?.userUid;

  const hasEarners = profiles.length > 0;
  const hasInProgress = inProgressProfiles.length > 0;

  // An instructor badge's own board is every instructor and nobody else, so filtering it
  // would just empty the page. The backend serves it unfiltered and says so here, which
  // is what lets a sticky "hide instructors" preference not follow the learner into a
  // blank list.
  const isInstructorBadge = Boolean(badgeLeaderboardData?.badge?.isInstructorBadge);
  const canHideInstructors = !isInstructorBadge;
  const instructorsHidden = hideInstructors && canHideInstructors;

  return (
    <>
      <SubHeader
        id="leaderboard-page-title"
        title={translations.leaderboardTitle}
        actions={canHideInstructors && (
          <HideInstructorsToggle
            hideInstructors={hideInstructors}
            onToggle={toggleHideInstructors}
            isBusy={isFetching}
          />
        )}
      />
      <BadgeLeaderboardHeader badge={badgeLeaderboardData?.badge || {}} />

      <LeaderboardView instructorsHidden={instructorsHidden} isRefreshing={isFetching}>
        {hasEarners && (
          <>
            {hasInProgress && (
              <h2 className="badge-leaderboard-section-title" data-testid="badge-leaderboard-earned-title">
                {translations.earnedTitle}
              </h2>
            )}
            <LeaderboardTable
              currentUserUid={currentUserUid}
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
              currentUserUid={currentUserUid}
              profiles={inProgressProfiles}
              showProgress
            />
          </>
        )}

        {!hasEarners && !hasInProgress && (
          <LeaderboardTable profiles={[]} />
        )}
      </LeaderboardView>
    </>
  );
};

export default BadgeLeaderboardPage;
