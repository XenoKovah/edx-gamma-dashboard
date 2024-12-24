import React from 'react';
import PropTypes from 'prop-types';

import { buildURL } from '../../utils';

const Badge = ({ url }) => (
  <img
    className="BadgeItem"
    data-testid="leaderboard-badge"
    src={buildURL(url)}
    alt="leaderboard badge"
  />
);

Badge.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Badge;
