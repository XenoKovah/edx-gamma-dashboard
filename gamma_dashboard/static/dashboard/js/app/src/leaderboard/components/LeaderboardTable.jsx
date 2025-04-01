import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { Loader } from '../../generic';
import { getUserStatus } from '../../utils';
import { ProfilePropType, StatusPropType } from '../propTypes';
import LeaderboardCard from './LeaderboardCard';

import messages from '../../i18n';

const LeaderboardTable = ({
  rank, profiles = [], systemStatuses, delimiter,
}) => {
  const intl = useIntl();
  const translatedEmptyText = intl.formatMessage(messages.leaderboardStatusEmptyText);

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
