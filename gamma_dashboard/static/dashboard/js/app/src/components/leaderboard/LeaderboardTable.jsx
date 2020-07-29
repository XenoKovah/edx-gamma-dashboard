import React from 'react';
import PropTypes from 'prop-types';

import LeaderboardTableRow from './LeadeboardTableRow';
import Loader from '../utility/Loader';

import { getUserStatus } from '../../utility/statusTools';

import './../../styles/app/leaderboard/table.scss';


const LeaderboardTable = ({ profiles, system_statuses }) => (
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
                    <LeaderboardTableRow
                        key={index}
                        profile={profile}
                        status={getUserStatus(system_statuses, profile.points)}
                    >
                    </LeaderboardTableRow>
                ))
            }
        </div>
    </div>
);

LeaderboardTable.propTypes = {
    profiles: PropTypes.array,
    systemStatuses: PropTypes.array
};

export default LeaderboardTable;
