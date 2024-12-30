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
  status_uid: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  active: PropTypes.bool.isRequired,
  statusPoints: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
