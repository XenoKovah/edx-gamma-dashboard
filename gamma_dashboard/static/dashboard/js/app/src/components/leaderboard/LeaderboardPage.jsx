import React, { useState, useEffect } from 'react';

import { gammaApi } from '../../api';
import { useTranslate } from '../../i18n/utils';
import LogoDropdown from '../LogoDropdown';
import { getLeaderboardTableProps } from './utils';
import LeaderboardTable from './LeaderboardTable';

const LeaderboardPage = () => {
  const [data, setData] = useState({
    top10: [],
    competitors: [],
    rank: null,
    userUid: null,
    urlProfileImage: '',
    systemStatuses: [],
  });

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
      <div className="gamification-title-wrapper d-flex justify-content-between align-items-center">
        <h1 className="LeaderboardTitle" data-testid="leaderboard-page-title">
          {useTranslate('leaderboard.heading.text')}
        </h1>
        <LogoDropdown />
      </div>
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
