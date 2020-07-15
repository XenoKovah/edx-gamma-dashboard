import React from 'react';
import PropTypes from 'prop-types';

import "../../styles/app/leaderboard/badge.scss";

const Badge = ({ url }) => (
    <div
        className="leaderboard-badge"
        data-testid="leaderboard-badge"
        style={{backgroundImage: `url("${url}")`}}
    >
    </div>
);

Badge.propTypes = {
    url: PropTypes.string
};

export default Badge;
