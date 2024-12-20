import React, { useState, useEffect } from 'react';

import { gammaApi } from '../../api/ApiRequests';
import DashboardTable from './DashboardTable';
import { parseData } from './utils';

const DashboardPage = () => {
  const [tableDataProps, setTableDataProps] = useState({});

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
