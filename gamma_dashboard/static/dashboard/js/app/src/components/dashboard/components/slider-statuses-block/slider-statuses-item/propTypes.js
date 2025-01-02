import PropTypes from 'prop-types';

export const badgeStylesTypes = {
  filter: PropTypes.string.isRequired,
  opacity: PropTypes.string.isRequired,
};

export const progressTrackStylesTypes = {
  display: PropTypes.string.isRequired,
};

export const progressEndStylesTypes = {
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
  zIndex: PropTypes.string,
};
