import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _Highcharts from 'highcharts';
import ReactHighCharts from 'highcharts-react-official';
import applyDebugger from 'highcharts/modules/debugger';

import { applyColorScheme, useTranslations, initializeModules } from './highchartsSetup';

initializeModules(_Highcharts);
applyColorScheme(_Highcharts);

const ChartWithExport = ({ debug, ...props }) => {
  useTranslations(_Highcharts);

  useEffect(() => {
    if (debug) {
      applyDebugger(_Highcharts);
    }
  }, [debug]);

  return (
    <ReactHighCharts
      highcharts={_Highcharts}
      {...props}
    />
  );
};

ChartWithExport.propTypes = {
  debug: PropTypes.bool,
};

ChartWithExport.defaultProps = {
  debug: false,
};

export default ChartWithExport;

export const Highcharts = _Highcharts;
