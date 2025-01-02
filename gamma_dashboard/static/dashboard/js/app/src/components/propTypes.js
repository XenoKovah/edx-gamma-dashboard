import PropTypes from 'prop-types';

export const EventPropType = PropTypes.shape({
  count: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
});

export const ProgressPropType = {
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
};

export const StatusPropType = {
  status_uid: PropTypes.string,
  statusUid: PropTypes.string,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  active: PropTypes.bool.isRequired,
  statusPoints: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export const BadgePropType = {
  title: PropTypes.string,
  description: PropTypes.string,
  done: PropTypes.bool,
  progress: PropTypes.shape(ProgressPropType),
  url: PropTypes.string,
};

export const ProfilePropType = {
  user_uid: PropTypes.string,
  signup_source: PropTypes.string,
  points: PropTypes.number,
  url_profile_image: PropTypes.string,
  badges: PropTypes.objectOf(PropTypes.shape(BadgePropType)),
  systemStatuses: PropTypes.arrayOf(PropTypes.shape(StatusPropType)),
  system_events: PropTypes.arrayOf(EventPropType).isRequired,
  position: PropTypes.number,
};
