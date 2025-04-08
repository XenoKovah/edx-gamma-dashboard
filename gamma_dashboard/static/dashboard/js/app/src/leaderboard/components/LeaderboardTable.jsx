import React from 'react';
import PropTypes from 'prop-types';

import { Loader } from '../../generic';
import { ProfilePropType } from '../propTypes';
import LeaderboardCard from './LeaderboardCard';

const LeaderboardTable = ({
  rank, profiles = [], delimiter,
}) => (
  <div className="leaderboard-table" data-testid="leaderboard-table">
    {!profiles.length ? (
      <Loader />
    ) : (
      profiles.map((profile, index) => (
        <React.Fragment key={profile.userUid}>
          <LeaderboardCard
            rank={rank || 0}
            profile={profile}
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

LeaderboardTable.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape(ProfilePropType)),
  rank: PropTypes.number,
  delimiter: PropTypes.number,
};

LeaderboardTable.defaultProps = {
  profiles: [],
  rank: 0,
  delimiter: null,
};

export default LeaderboardTable;
