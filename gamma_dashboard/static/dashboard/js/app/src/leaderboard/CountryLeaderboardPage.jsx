import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Info as InfoIcon } from '@openedx/paragon/icons';

import { useScrollToContent } from '../generic/hooks';
import { SubHeader, Alert, Loader } from '../generic';
import { getBadgeLeaderboardTableProps } from './utils';
import { LeaderboardTable } from './components';

import { useCountryLeaderboard } from '../api/hooks/useCountryLeaderboard';

import messages from '../i18n';

/**
 * Per-country leaderboard page: the leaderboard filtered to the learners who share a
 * given profile country. Only learners who make their country public are included
 * (the backend resolves this live from each learner's profile-visibility setting).
 *
 * It reuses the regular leaderboard table — a flat list ranked by points (tied
 * learners share a position), with the current user highlighted by their uid — so
 * the shape and mapper are shared with the per-badge leaderboard page.
 */
const CountryLeaderboardPage = () => {
  const intl = useIntl();
  const { country } = useParams();
  const {
    data: countryLeaderboardData, isLoading, error, isError,
  } = useCountryLeaderboard(country);

  const translations = {
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

  const { profiles, delimiter } = getBadgeLeaderboardTableProps(countryLeaderboardData);
  const countryName = countryLeaderboardData?.countryName || country;
  const title = intl.formatMessage(messages.countryLeaderboardHeadingText, { country: countryName });

  return (
    <>
      <SubHeader
        id="leaderboard-page-title"
        title={title}
      />
      <LeaderboardTable
        currentUserUid={countryLeaderboardData?.userUid}
        profiles={profiles}
        delimiter={delimiter}
      />
    </>
  );
};

export default CountryLeaderboardPage;
