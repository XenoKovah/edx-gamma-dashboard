import React from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';
import Badge from './Badge';
import { EventPropType, ProgressPropType, StatusPropType } from '../propTypes';

const LeaderboardTableRow = ({ profile, status, rank }) => {
  const username = profile.user_uid || '';
  const points = profile.points || 0;
  const badges = profile.badges || {};
  const selfPosition = profile.position === rank;

  return (
    <div
      className={`LeaderboardTable-Row ${selfPosition ? 'LeaderboardTable-Row_highlighted' : ''}`}
      data-testid="leaderboard-table-row"
    >
      <div className="LeaderboardTable-Cell LeaderboardTable-Cell_student">
        <Avatar username={username} urlProfileImage={profile.url_profile_image} position={profile.position} />
        <span className="StudentInfo">
          <span data-testid="username" className="StudentInfo-Name">{username}</span>
          <div data-testid="userstatus" className="StudentInfo-Status">{status}</div>
        </span>
      </div>
      <div className="LeaderboardTable-Cell LeaderboardTable-Cell_progress" data-testid="progress-cell">
        {points}
      </div>
      <div className="LeaderboardTable-Cell LeaderboardTable-Cell_badges" data-testid="badges-cell">
        <div className="Badges">
          {Object.keys(badges).length > 0
              && Object.keys(badges).map((badgeId) => (
                <Badge key={badgeId} url={badges[badgeId].url} />
              ))}
          {Object.keys(badges).length === 0 && selfPosition && !rank && 'No badges yet...'}
        </div>
      </div>
    </div>
  );
};

LeaderboardTableRow.propTypes = {
  profile: PropTypes.shape({
    user_uid: PropTypes.string,
    signup_source: PropTypes.string,
    points: PropTypes.number,
    url_profile_image: PropTypes.string,
    badges: PropTypes.objectOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        done: PropTypes.bool,
        progress: PropTypes.shape(ProgressPropType),
        url: PropTypes.string,
      }),
    ),
    systemStatuses: PropTypes.arrayOf(PropTypes.shape(StatusPropType)).isRequired,
    system_events: PropTypes.arrayOf(PropTypes.shape(EventPropType)).isRequired,
    position: PropTypes.number,
  }).isRequired,
  status: PropTypes.string.isRequired,
  rank: PropTypes.number,
};

LeaderboardTableRow.defaultProps = {
  rank: null,
};

export default LeaderboardTableRow;
