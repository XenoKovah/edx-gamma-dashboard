import React from 'react';
import PropTypes from 'prop-types';

import LeaderboardTableRow from './LeadeboardTableRow';
import Loader from '../utility/Loader';

import './../../styles/app/leaderboard/table.scss';


function LeaderboardTable(props) {
    const { profiles } = props;

    return (
        <div className="leaderboard-table" data-testid="leaderboard-table">
            <div className="leaderboard-header">
                <div className="leaderboard-header-cell table-cell students-cell" data-testid="students-header">
                    Students
                </div>
                <div className="leaderboard-header-cell table-cell  progress-cell" data-testid="progress-header">
                    Progress
                </div>
                <div className="leaderboard-header-cell table-cell  badges-cell" data-testid="badges-header">
                    Badges
                </div>
            </div>
            <div className="leaderboard-table-body">
                {!profiles ?
                    <Loader />
                :
                    profiles.map((profile, index) => (
                        <LeaderboardTableRow key={index} profile={profile}>
                        </LeaderboardTableRow>
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
