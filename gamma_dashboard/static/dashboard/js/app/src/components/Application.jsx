import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import LeaderboardPage from './leaderboard/LeaderboardPage';
import DashboardPage from './dashboard/DashboardPage';

import { URLS } from '../settings/routes';

import '../styles/app/app.scss';


const Application = () => (
    <Router>
        <Switch>
            <Route exact path={URLS.dashboardPage}>
                <DashboardPage />
            </Route>
            <Route exact path={URLS.leaderboardPage}>
                <LeaderboardPage />
            </Route>
        </Switch>
    </Router>
);

export default Application;
