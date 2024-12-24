import React from 'react';
import PropTypes from 'prop-types';
import _Highcharts from 'highcharts';
import ReactHighCharts from 'highcharts-react-official';
import applyExporting from 'highcharts/modules/exporting';
import applyDebugger from 'highcharts/modules/debugger';

import { useHighchartsLang } from '../../../i18n/utils';

const applyColorScheme = (H) => {
  H.setOptions({
    colors: [
      '#419e4d',
      '#4599C3',
      '#FFCD00',
      '#E87722',
      '#00B5E2',
      '#6244BB',
      '#888B8D',
      '#FF0000',
    ],
    chart: {
      style: {
        fontFamily: 'Open Sans, sans-serif',
      },
    },
  });
};

const useTranslations = (H) => {
  const langOptions = useHighchartsLang();
  H.setOptions({
    lang: {
      ...langOptions,
    },
  });
};

applyExporting(_Highcharts);
applyColorScheme(_Highcharts);

const ChartWithExport = ({ debug, ...props }) => {
  useTranslations(_Highcharts);

  if (debug) {
    applyDebugger(_Highcharts);
  }

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
