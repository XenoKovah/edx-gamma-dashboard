import React, { useState, useEffect } from 'react';

import { gammaApi } from '../../api';
import { useTranslate } from '../../i18n/utils';
import { getLeaderboardTableProps } from './utils';
import LeaderboardTable from './LeaderboardTable';
import { useScrollToContent } from '../generic/hooks';
import { SubHeader } from '../sub-header';

const LeaderboardPage = () => {
  const [data, setData] = useState({
    top10: [],
    competitors: [],
    rank: null,
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
    }));
  }, []);

  const propsLeaderboardTable = getLeaderboardTableProps(data);

  return (
    <>
      <SubHeader
        id="leaderboard-page-title"
        title={useTranslate('leaderboard.heading.text')}
      />
      <LeaderboardTable
        delimiter={propsLeaderboardTable.delimiter}
        rank={propsLeaderboardTable.rank}
        profiles={propsLeaderboardTable.profiles}
        systemStatuses={propsLeaderboardTable.systemStatuses}
      />
    </>
  );
};

export default LeaderboardPage;
