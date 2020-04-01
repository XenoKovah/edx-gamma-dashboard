import React from 'react';
import PropTypes from 'prop-types';

import "../../styles/app/leaderboard/badge.scss";

function Badge(props) {
    const { url } = props;

    return (
        <div
            className="leaderboard-badge"
            style={{backgroundImage: `url("${url}")`}}
        >
        </div>
    );
}

Badge.propTypes = {
    url: PropTypes.string
};

export default Badge;
