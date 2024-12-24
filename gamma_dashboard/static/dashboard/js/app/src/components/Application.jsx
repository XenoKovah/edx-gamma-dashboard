import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { URLS } from '../settings/routes';
import { getMessages } from '../i18n/utils';
import { getCookieByName } from '../utils';
import LeaderboardPage from './leaderboard/LeaderboardPage';
import DashboardPage from './dashboard/DashboardPage';

const Application = () => {
  const locale = getCookieByName('openedx-language-preference') || 'en';
  const messages = getMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Router>
        <Routes>
          <Route exact path={URLS.dashboardPage} element={<DashboardPage />} />
          <Route exact path={URLS.leaderboardPage} element={<LeaderboardPage />} />
        </Routes>
      </Router>
    </IntlProvider>
  );
};

export default Application;
