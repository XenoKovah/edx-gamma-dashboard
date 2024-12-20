import React from 'react';
import PropTypes from 'prop-types';

import LeaderboardTableRow from './LeadeboardTableRow';
import Loader from '../utility/Loader';

import { getUserStatus } from '../../utility/statusTools';

import '../../styles/app/leaderboard/table.scss';

const LeaderboardTable = ({
  rank, profiles, systemStatuses, delimiter,
}) => (
  <div className="LeaderboardTable" data-testid="leaderboard-table">
    {!profiles ? (
      <Loader />
    ) : (
      profiles.map((profile, index) => (
        <React.Fragment key={profile.userUid}>
          <LeaderboardTableRow
            rank={rank}
            profile={profile}
            status={getUserStatus(systemStatuses, profile.points)}
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
    }),
  ).isRequired,
  systemStatuses: PropTypes.arrayOf(StatusPropType).isRequired,
  rank: PropTypes.number.isRequired,
  delimiter: PropTypes.number,
};

LeaderboardTable.defaultProps = {
  delimiter: null,
};

export default LeaderboardTable;
