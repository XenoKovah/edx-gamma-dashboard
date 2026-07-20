import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Info as InfoIcon } from '@openedx/paragon/icons';

import { useScrollToContent } from '../generic/hooks';
import { SubHeader, Alert, Loader } from '../generic';
import { getBadgeLeaderboardTableProps, getBadgeInProgressProps } from './utils';
import { useHideInstructors } from './hooks';
import { LeaderboardTable, LeaderboardView, HideInstructorsToggle } from './components';

import { useCourseLeaderboard } from '../api/hooks/useCourseLeaderboard';

import messages from '../i18n';

/**
 * Course leaderboard page. Like the per-badge page, it shows two sections:
 * "Completed" (learners who earned the course certificate, ranked by their course
 * points) and "In progress" (active, not-yet-certified learners ranked by their
 * course grade percentage).
 */
const CourseLeaderboardPage = () => {
  const intl = useIntl();
  const { courseId } = useParams();
  const [hideInstructors, toggleHideInstructors] = useHideInstructors();
  const {
    data: courseLeaderboardData, isLoading, isPreviousData, error, isError,
  } = useCourseLeaderboard(courseId, hideInstructors);

  const translations = {
    leaderboardTitle: intl.formatMessage(messages.leaderboardHeadingText),
    completedTitle: intl.formatMessage(messages.courseLeaderboardCompletedSectionTitle),
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

  const { profiles } = getBadgeLeaderboardTableProps(courseLeaderboardData);
  const { profiles: inProgressProfiles } = getBadgeInProgressProps(courseLeaderboardData);
  const currentUserUid = courseLeaderboardData?.userUid;

  const hasCompleted = profiles.length > 0;
  const hasInProgress = inProgressProfiles.length > 0;

  return (
    <>
      <SubHeader
        id="leaderboard-page-title"
        title={translations.leaderboardTitle}
        actions={(
          <HideInstructorsToggle
            hideInstructors={hideInstructors}
            onToggle={toggleHideInstructors}
            isBusy={isPreviousData}
          />
        )}
      />

      <LeaderboardView instructorsHidden={hideInstructors} isRefreshing={isPreviousData}>
        {hasCompleted && (
          <>
            <h2 className="badge-leaderboard-section-title" data-testid="course-leaderboard-completed-title">
              {translations.completedTitle}
            </h2>
            <LeaderboardTable currentUserUid={currentUserUid} profiles={profiles} />
          </>
        )}

        {hasInProgress && (
          <>
            <h2 className="badge-leaderboard-section-title" data-testid="course-leaderboard-in-progress-title">
              {translations.inProgressTitle}
            </h2>
            <LeaderboardTable currentUserUid={currentUserUid} profiles={inProgressProfiles} showProgress />
          </>
        )}

        {!hasCompleted && !hasInProgress && (
          <LeaderboardTable profiles={[]} />
        )}
      </LeaderboardView>
    </>
  );
};

export default CourseLeaderboardPage;
