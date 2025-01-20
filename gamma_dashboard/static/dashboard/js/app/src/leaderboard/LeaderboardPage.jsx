import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { gammaApi } from '../api';
import { useTranslate } from '../i18n/utils';
import { useScrollToContent } from '../generic/hooks';
import { SubHeader } from '../generic';
import { getLeaderboardTableProps } from './utils';
import { LeaderboardTable } from './components';

const LeaderboardPage = () => {
  const { courseId } = useParams();
  const [data, setData] = useState({
    top10: [],
    competitors: [],
    rank: 0,
    userUid: null,
    urlProfileImage: '',
    systemStatuses: [],
  });

  useScrollToContent('leaderboard-page-title', 'a[href="#main"]');

  useEffect(() => {
    gammaApi.leaderboard.getInfo((res) => setData({
      top10: res.top10 || [],
      competitors: res.competitors || [],
      rank: res.rank || null,
      userUid: res.user_uid || null,
      urlProfileImage: res.url_profile_image || null,
      systemStatuses: res.system_statuses || [],
    }), courseId);
  }, []);

  const {
    rank,
    profiles,
    delimiter,
    systemStatuses,
  } = getLeaderboardTableProps(data);

  return (
    <>
      <SubHeader
        id="leaderboard-page-title"
        title={useTranslate('leaderboard.heading.text')}
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
