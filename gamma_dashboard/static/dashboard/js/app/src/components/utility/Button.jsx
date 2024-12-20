import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/app/utility/button.scss';

const Button = ({ title, onClick }) => (
  <button
    className="btn"
    data-testid="button"
    type="button"
    onClick={onClick}
  >
    {title}
  </button>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
