import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import { IntlProvider } from 'react-intl';

import { getMessages } from '../i18n/utils';
import { getCookieByName } from '../utils';
import { LeaderboardPage } from '../leaderboard';
import { DashboardPage } from '../dashboard';
import { URLS, EXTERNAL_URLS } from './constants';

const AppRoutes = () => {
  const locale = getCookieByName('openedx-language-preference') || 'en';
  const messages = getMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Router>
        <Routes>
          <Route exact path={URLS.dashboardPage} element={<DashboardPage />} />
          <Route exact path={URLS.leaderboardPage} element={<LeaderboardPage />} />
          <Route path={EXTERNAL_URLS.leaderboardTabPage} element={<LeaderboardPage />} />
        </Routes>
      </Router>
    </IntlProvider>
  );
};

export default AppRoutes;
