import React from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';
import Badge from './Badge';
import Loader from '../utility/Loader';

import './../../styles/app/leaderboard/table.scss';


function LeaderboardTable(props) {
    const { profiles } = props;

    return (
        <div className="leaderboard-table">
            <div className="leaderboard-header">
                <div className="leaderboard-header-cell table-cell students-cell">
                    Students
                </div>
                <div className="leaderboard-header-cell table-cell  progress-cell">
                    Progress
                </div>
                <div className="leaderboard-header-cell table-cell  badges-cell">
                    Badges
                </div>
            </div>
            <div className="leaderboard-table-body">
                {profiles.length === 0 ?
                    <Loader />
                :
                    profiles.map(profile => (
                        <div className="leaderboard-row">
                            <div className="leaderboard-table-cell table-cell  students-cell">
                                <Avatar username={profile.user.username} />{profile.user.username}
                            </div>
                            <div className="leaderboard-table-cell table-cell  progress-cell">
                                <div>{profile.points}/{profile.goal}</div>
                            </div>
                            <div className="leaderboard-table-cell table-cell  badges-cell">
                                {profile.badges.map(badge => (
                                    <Badge url={badge}>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

LeaderboardTable.propTypes = {
    profiles: PropTypes.array
};

export default LeaderboardTable;
