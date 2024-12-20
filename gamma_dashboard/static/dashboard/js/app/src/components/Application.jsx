import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import LeaderboardPage from './leaderboard/LeaderboardPage';
import DashboardPage from './dashboard/DashboardPage';

import { URLS } from '../settings/routes';

import '../styles/app/app.scss';

const Application = () => (
  <Router>
    <Routes>
      <Route exact path={URLS.dashboardPage} element={<DashboardPage />} />
      <Route exact path={URLS.leaderboardPage} element={<LeaderboardPage />} />
    </Routes>
  </Router>
);

export default Application;
