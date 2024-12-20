import React from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';
import Badge from './Badge';

import '../../styles/app/leaderboard/table-row.scss';

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

const EventPropType = PropTypes.shape({
  count: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
});

const StatusPropType = PropTypes.shape({
  statusUid: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  active: PropTypes.bool.isRequired,
  statusPoints: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});

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
        progress: PropTypes.shape({
          edxForumCommentCreated: EventPropType,
          openassessmentblockSaveSubmission: EventPropType,
          edxBookmarkAdded: EventPropType,
          edxForumThreadCreated: EventPropType,
          edxForumResponseCreated: EventPropType,
          edxForumThreadVoted: EventPropType,
          stopVideo: EventPropType,
          edxCertificateCreated: EventPropType,
          edxGradesProblemSubmitted: EventPropType,
          edxCourseEnrollmentActivated: EventPropType,
          problemCheck: EventPropType,
          problemGraded: EventPropType,
        }),
        url: PropTypes.string,
      }),
    ),
    systemStatuses: PropTypes.arrayOf(StatusPropType).isRequired,
    system_events: PropTypes.arrayOf(EventPropType).isRequired,
    position: PropTypes.number,
  }).isRequired,
  status: PropTypes.string.isRequired,
  rank: PropTypes.number,
};

LeaderboardTableRow.defaultProps = {
  rank: null,
};

export default LeaderboardTableRow;
