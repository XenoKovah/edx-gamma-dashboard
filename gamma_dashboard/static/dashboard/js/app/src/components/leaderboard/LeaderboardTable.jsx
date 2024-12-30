import React from 'react';
import PropTypes from 'prop-types';

import LeaderboardTableRow from './LeadeboardTableRow';
import { Loader } from '../generic';

import { getUserStatus } from '../../utils';
import { useTranslate } from '../../i18n/utils';
import { ProgressPropType, StatusPropType } from '../propTypes';

const LeaderboardTable = ({
  rank, profiles, systemStatuses, delimiter,
}) => {
  const translatedEmptyText = useTranslate('leaderboard.status.empty.text');

  return (
    <div className="LeaderboardTable" data-testid="leaderboard-table">
      {!profiles ? (
        <Loader />
      ) : (
        profiles.map((profile, index) => (
          <React.Fragment key={profile.userUid}>
            <LeaderboardTableRow
              rank={rank}
              profile={profile}
              status={getUserStatus(systemStatuses, profile.points, translatedEmptyText)}
            />
            {index === delimiter && (
              <div className="LeaderboardTable-Separator" data-testid="leaderboard-table-separator">
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
          progress: PropTypes.shape(ProgressPropType),
          url: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  systemStatuses: PropTypes.arrayOf(PropTypes.shape(StatusPropType)).isRequired,
  rank: PropTypes.number.isRequired,
  delimiter: PropTypes.number,
};

LeaderboardTable.defaultProps = {
  delimiter: null,
};

export default LeaderboardTable;
