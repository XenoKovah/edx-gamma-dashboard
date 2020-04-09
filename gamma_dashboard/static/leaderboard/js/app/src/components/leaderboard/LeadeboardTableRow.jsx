import React from 'react';

import PropTypes from 'prop-types';

import Avatar from './Avatar';
import Badge from './Badge';

import './../../styles/app/leaderboard/table-row.scss';


function LeaderboardTableRow(props) {
    const profile = props.profile || {};

    const username = profile.user && profile.user.username || '';
    const points = profile.points || '0';
    const goal = profile.goal || '0';
    const badges = profile.badges || [];

    return (
        <div className="leaderboard-table-row" data-testid="leaderboard-table-row">
            <div className="leaderboard-table-cell table-cell students-cell">
                <Avatar username={username} />
                <span data-testid="username">{username}</span>
            </div>
            <div className="leaderboard-table-cell table-cell progress-cell" data-testid="progress-cell">
                <div>{points}/{goal}</div>
            </div>
            <div className="leaderboard-table-cell table-cell badges-cell">
                {badges.map((badge, index) => (
                    <Badge key={index} url={badge}>
                    </Badge>
                ))}
            </div>
        </div>
    );
};

LeaderboardTableRow.propTypes = {
    profile: PropTypes.object
};

export default LeaderboardTableRow;
