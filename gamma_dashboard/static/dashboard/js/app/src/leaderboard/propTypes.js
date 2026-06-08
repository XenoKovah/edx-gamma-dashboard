import PropTypes from 'prop-types';

import { EventPropType, ProgressPropType, StatusPropType } from '../generic/propTypes';

const BadgePropType = {
  title: PropTypes.string,
  description: PropTypes.string,
  done: PropTypes.bool,
  progress: PropTypes.shape(ProgressPropType),
  url: PropTypes.string,
};

const ProfilePropType = {
  user_uid: PropTypes.string,
  signup_source: PropTypes.string,
  points: PropTypes.number,
  url_profile_image: PropTypes.string,
  profileUrl: PropTypes.string,
  badges: PropTypes.objectOf(PropTypes.shape(BadgePropType)),
  systemStatuses: PropTypes.arrayOf(PropTypes.shape(StatusPropType)),
  system_events: PropTypes.arrayOf(EventPropType).isRequired,
  position: PropTypes.number,
};

export {
  BadgePropType,
  ProfilePropType,
  StatusPropType,
};
