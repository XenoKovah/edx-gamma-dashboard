import React, { useState, useEffect } from 'react';

import { gammaApi } from '../../api';
import DashboardTable from './DashboardTable';
import { parseData } from './utils';
import { useScrollToContent } from '../generic/hooks';

const MAIN_CONTENT_ID = 'dashboard-page-title';

const DashboardPage = () => {
  const [tableDataProps, setTableDataProps] = useState({});

  useScrollToContent(MAIN_CONTENT_ID, 'a[href="#main"]');

  useEffect(() => {
    gammaApi.dashboard.getGameProfile(
      (data) => setTableDataProps(parseData(data)),
    );
  }, []);

  return (
    <DashboardTable {...tableDataProps} />
  );
};

export default DashboardPage;
