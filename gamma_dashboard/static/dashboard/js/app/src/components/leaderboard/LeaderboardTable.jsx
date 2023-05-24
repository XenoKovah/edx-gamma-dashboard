import React from 'react';
import PropTypes from 'prop-types';

import LeaderboardTableRow from './LeadeboardTableRow';
import Loader from '../utility/Loader';

import { getUserStatus } from '../../utility/statusTools';

import './../../styles/app/leaderboard/table.scss';


const LeaderboardTable = ({ rank, profiles, systemStatuses, delimiter }) => (
  <div className="LeaderboardTable" data-testid="leaderboard-table">
    {!profiles ? (
        <Loader />
      ) : (
      profiles.map((profile, index) => (
        <React.Fragment key={index}>
          <LeaderboardTableRow
            rank={rank}
            profile={profile}
            status={getUserStatus(systemStatuses, profile.points)}
          />
            {index === delimiter && (
              <div className="LeaderboardTable-Separator" data-testid="leaderboard-table-separator">
                  <span/> <span/> <span/>
              </div>
            )}
        </React.Fragment>
      ))
    )}
  </div>
);

LeaderboardTable.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      user_uid: PropTypes.string,
      signup_source: PropTypes.string,
      points: PropTypes.number,
      badges: PropTypes.objectOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
          done: PropTypes.bool,
          progress: PropTypes.object,
          url: PropTypes.string
        })
      )
    })
  ),
  systemStatuses: PropTypes.array,
  rank: PropTypes.number,
  delimiter: PropTypes.number,
};

LeaderboardTableRow.defaultProps = {
  delimiter: null,
};

export default LeaderboardTable;
