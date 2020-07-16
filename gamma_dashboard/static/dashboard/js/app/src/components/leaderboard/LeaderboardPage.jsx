import React, { useState } from 'react';

import LeaderboardTable from './LeaderboardTable';

import gammaApi from '../../api/ApiRequests';

import '../../styles/app/leaderboard/page.scss';


class LeaderboardPage extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            profiles: []
        };
    }

    componentDidMount() {
        gammaApi.leaderboard.getInfo((data) => {
            const { gameprofiles, system_statuses } = data;
            if (gameprofiles) {
                this.setState({
                    profiles: gameprofiles,
                    system_statuses: system_statuses || []
                });
            }
        });
    }

    render() {
        const { profiles,  system_statuses } = this.state;

        return (
            <div className="leaderboard-page-wrapper">
                <div className="leaderboard-page-title" data-testid="leaderboard-page-title">
                    Leaderboard
                </div>
                <div className="leaderboard-table-container" data-testid="leaderboard-table-container">
                    <LeaderboardTable profiles={profiles} system_statuses={system_statuses}/>
                </div>
            </div>
        )
    }
}

export default LeaderboardPage;
