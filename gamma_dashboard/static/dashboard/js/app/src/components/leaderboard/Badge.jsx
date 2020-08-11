import React from 'react';
import PropTypes from 'prop-types';
import { buildURL } from '../../utility/urlTools';

import "../../styles/app/leaderboard/badge.scss";

const Badge = ({ url }) => (
    <div
        className="leaderboard-badge"
        data-testid="leaderboard-badge"
        style={{backgroundImage: `url("${buildURL(url)}")`}}
    >
    </div>
);

Badge.propTypes = {
    url: PropTypes.string
};

export default Badge;
