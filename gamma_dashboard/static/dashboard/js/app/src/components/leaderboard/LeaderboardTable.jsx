import React from 'react';
import PropTypes from 'prop-types';

import LeaderboardCard from './LeaderboardCard';
import { Loader } from '../generic';

import { getUserStatus } from '../../utils';
import { useTranslate } from '../../i18n/utils';
import { ProfilePropType, StatusPropType } from '../propTypes';

const LeaderboardTable = ({
  rank, profiles, systemStatuses, delimiter,
}) => {
  const translatedEmptyText = useTranslate('leaderboard.status.empty.text');

  return (
    <div className="leaderboard-table" data-testid="leaderboard-table">
      {!profiles.length ? (
        <Loader />
      ) : (
        profiles.map((profile, index) => (
          <React.Fragment key={profile.userUid}>
            <LeaderboardCard
              rank={rank || 0}
              profile={profile}
              status={getUserStatus(systemStatuses, profile.points, translatedEmptyText)}
            />
            {index === delimiter && (
              <div className="leaderboard-table-separator" data-testid="leaderboard-table-separator">
                <span /> <span /> <span />
              </div>
            )}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

LeaderboardTable.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape(ProfilePropType)),
  systemStatuses: PropTypes.arrayOf(PropTypes.shape(StatusPropType)),
  rank: PropTypes.number,
  delimiter: PropTypes.number,
};

LeaderboardTable.defaultProps = {
  profiles: [],
  systemStatuses: [],
  rank: 0,
  delimiter: null,
};

export default LeaderboardTable;
