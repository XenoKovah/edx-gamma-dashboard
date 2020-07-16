import React from 'react';

import PropTypes from 'prop-types';

import Avatar from './Avatar';
import Badge from './Badge';

import './../../styles/app/leaderboard/table-row.scss';


// 13 is number of badges which can be placed in one row in cell with margin
const BADGES_IN_LINE_COUNT = 13;
// 16 is number of badges which can be placed in one row in cell with negative margin
const BADGES_IN_FULL_LINE_COUNT = 16;


const LeaderboardTableRow = ({ profile, status }) => {
    const username = profile.username || profile.user_uid || '';
    const points = profile.points || '0';
    const badges = profile.badges || {};
    const badgesCount = Object.keys(badges).length;

    const visibleBadgesList = Object.keys(badges).filter(
        (badgeId, index) => index < BADGES_IN_FULL_LINE_COUNT
    );

    const isBadgesRowFull = badgesCount >= BADGES_IN_LINE_COUNT;
    const unshowedBadgesCount = badgesCount - BADGES_IN_FULL_LINE_COUNT;

    return (
        <div className="leaderboard-table-row" data-testid="leaderboard-table-row">
            <div className="leaderboard-table-cell table-cell students-cell">
                <Avatar username={username} />
                <span className="Avatar-Holder">
                    <span data-testid="username" className="Avatar-Username">{username}</span>
                    <div data-testid="userstatus" className="Avatar-Status">{status}</div>
                </span>
            </div>
            <div className="leaderboard-table-cell table-cell progress-cell " data-testid="progress-cell">
                <div>{points}</div>
            </div>
            <div
                className={`leaderboard-table-cell table-cell badges-cell ${isBadgesRowFull ? "badges-full" : ""}`}
                data-testid="badges-cell"
            >
                {visibleBadgesList.map((badgeId, index) => {
                    const badge = badges[badgeId];

                    return (
                    <Badge
                        key={index}
                        url={badge.url}
                    >
                    </Badge>
                )})}
                { unshowedBadgesCount > 0 ?
                    <div
                        className='badge-counter'
                        data-testid="badge-counter"
                    >
                        <span className="badge-counter__number">+{unshowedBadgesCount}</span>
                    </div>
                :
                    null
                }

            </div>
        </div>
    );
};

LeaderboardTableRow.propTypes = {
    profile: PropTypes.object,
    status: PropTypes.any,
};

LeaderboardTableRow.defaultProps = {
    profile: {}
};

export default LeaderboardTableRow;
