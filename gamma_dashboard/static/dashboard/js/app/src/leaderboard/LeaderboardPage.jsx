import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Info as InfoIcon } from '@openedx/paragon/icons';

import { gammaApi } from '../api';
import { useScrollToContent } from '../generic/hooks';
import { SubHeader, Alert } from '../generic';
import { getLeaderboardTableProps } from './utils';
import { LeaderboardTable } from './components';

import messages from '../i18n';

const LeaderboardPage = () => {
  const intl = useIntl();
  const { courseId } = useParams();
  const [data, setData] = useState({
    top10: [],
    competitors: [],
    rank: 0,
    userUid: null,
    urlProfileImage: '',
    systemStatuses: [],
  });
  const [error, setError] = useState(null);

  const translations = {
    alertTitle: intl.formatMessage(messages.leaderboardHeadingText),
  };

  useScrollToContent('leaderboard-page-title', 'a[href="#main"]');

  useEffect(() => {
    gammaApi.leaderboard.getInfo((res) => {
      if (res.error) {
        setError(res.error);
      } else {
        setData({
          top10: res.top10 || [],
          competitors: res.competitors || [],
          rank: res.rank || null,
          userUid: res.user_uid || null,
          urlProfileImage: res.url_profile_image || null,
          systemStatuses: res.system_statuses || [],
        });
      }
    }, courseId);
  }, [courseId]);

  const {
    rank,
    profiles,
    delimiter,
    systemStatuses,
  } = getLeaderboardTableProps(data);

  if (error) {
    return (
      <Alert
        className="mt-6"
        title={error}
        variant="danger"
        icon={InfoIcon}
      />
    );
  }

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
