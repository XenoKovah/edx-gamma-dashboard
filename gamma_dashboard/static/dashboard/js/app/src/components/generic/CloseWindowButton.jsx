import React from 'react';
import PropTypes from 'prop-types';

const CloseWindowButton = ({ onClick }) => (
  <button
    className="close-window-button"
    data-testid="close-window-button"
    type="button"
    onClick={onClick}
    aria-label="Close window"
  />
);

CloseWindowButton.propTypes = {
  onClick: PropTypes.func,
};

CloseWindowButton.defaultProps = {
  onClick: () => {},
};

export default CloseWindowButton;
