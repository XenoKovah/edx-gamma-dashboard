import React, { useState, useEffect } from 'react';

import { gammaApi } from '../api';
import DashboardWrapper from './DashboardWrapper';
import { useScrollToContent } from '../generic/hooks';

const MAIN_CONTENT_ID = 'dashboard-page-title';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({});

  useScrollToContent(MAIN_CONTENT_ID, 'a[href="#main"]');

  useEffect(() => {
    gammaApi.dashboard.getGameProfile(
      (data) => setDashboardData(data),
    );
  }, []);

  return (
    <DashboardWrapper {...dashboardData} />
  );
};

export default DashboardPage;
