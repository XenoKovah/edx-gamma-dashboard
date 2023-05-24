import React from 'react';
import PropTypes from 'prop-types';

import { buildURL } from '../../utility/urlTools';

import "../../styles/app/leaderboard/badge.scss";

const Badge = ({ url }) => (
    <img
        className="BadgeItem"
        data-testid="leaderboard-badge"
        src={buildURL(url)}
    />
);

Badge.propTypes = {
    url: PropTypes.string
};

export default Badge;
