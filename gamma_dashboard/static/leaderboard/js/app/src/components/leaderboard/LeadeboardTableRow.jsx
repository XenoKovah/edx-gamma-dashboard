import React from 'react';

import PropTypes from 'prop-types';

import Avatar from './Avatar';
import Badge from './Badge';

import './../../styles/app/leaderboard/table-row.scss';


function LeaderboardTableRow(props) {
    const profile = props.profile || {};

    const username = profile.username || profile.user_uid || '';
    const points = profile.points || '0';
    const badges = profile.badges || {};
    const badgeInLine = 13; // 13 is number of badges which can be placed in one row in cell with margin
    const badgeFullLine = 17; // 17 is number of badges which can be placed in one row in cell with negative margin
    const badgesNumb = Object.keys(badges).length;
    let isShowBadgeCounter = false;
    let isBadgesFull = false;

    // Probably can be rewrited as an Array comprehensions
    let badges_list = [];

    for (let slug in badges) {
        badges_list.push(badges[slug].url);

        if (badges_list.length == badgeFullLine) { // we show first 17 bages 
            break;
        }
    }

    if (badges_list.length >= badgeInLine) { 
        isBadgesFull = true;
    }
    
    if (badgesNumb > badgeFullLine) {
        isShowBadgeCounter = true;
    }
    
    return (
        <div className="leaderboard-table-row" data-testid="leaderboard-table-row">
            <div className="leaderboard-table-cell table-cell students-cell">
                <Avatar username={username} />
                <span>
                    <span data-testid="username">{username}</span>
                    <div className="break-flex"></div>
                    <div data-testid="userstatus">{props.status}</div>
                </span>
            </div>
            <div className="leaderboard-table-cell table-cell progress-cell " data-testid="progress-cell">
                <div>{points}</div>
            </div>
            <div className={`leaderboard-table-cell table-cell badges-cell ${isBadgesFull ? "badges-full" : ""}`}>
                {badges_list.map((badge, index) => (
                    <Badge key={index} url={badge}>
                    </Badge>
                ))}
                <div className={`badge-counter ${isShowBadgeCounter ? "" : "badge-counter__hide"}`} data-testid="badge-counter">
                    <span className="badge-counter__number">+{badgesNumb - badgeFullLine}</span>
                </div>
            </div>
        </div>
    );
};

LeaderboardTableRow.propTypes = {
    profile: PropTypes.object
};

export default LeaderboardTableRow;
