import React, { useState } from 'react';

import LeaderboardTable from './LeaderboardTable';

import gammaApi from '../../api/ApiRequests';

import '../../styles/app/leaderboard/page.scss';


class LeaderboardPage extends React.Component {
    constructor() {
        super();

        this.state = {
            profiles: []
        };
    }

    componentDidMount() {
        gammaApi.leaderboard.getInfo((data) => {
            const { gameprofiles } = data;

            console.log('gameprofiles: ', gameprofiles);

            if (gameprofiles) {
                this.setState({
                    profiles: gameprofiles
                });
            }
        });
    }

    render() {
        const { profiles } = this.state;

        return (
            <React.Fragment>
                <div className="leaderboard-page-title">
                    Leaderboard
                </div>
                <div className="leaderboard-table-container">
                    <LeaderboardTable profiles={profiles} />
                </div>
            </React.Fragment>
        )
    }
}

export default LeaderboardPage;
