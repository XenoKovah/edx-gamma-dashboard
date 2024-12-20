import React from 'react';
import PropTypes from 'prop-types';

import _Highcharts from 'highcharts';
import ReactHighCharts from 'highcharts-react-official';
import applyExporting from 'highcharts/modules/exporting';
import applyDebugger from 'highcharts/modules/debugger';

import '../../../styles/app/dashboard/charts/chart.scss';

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

applyExporting(_Highcharts);
applyColorScheme(_Highcharts);

const ChartWithExport = ({ debug, ...props }) => {
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

export const isRtl = document.querySelector('body').classList.contains('rtl');

export const chartTitleStyles = {
  color: '#3caada',
  fontFamily: 'Open Sans',
  fontSize: '17px',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginBottom: '6px',
  x: -100,
  y: -100,

};

export const chartSubtitleStyles = {
  color: '#bcbcbc',
  fontFamily: 'Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
  fontSize: '16px',
  lineHeight: '20px',
  transform: 'translateY(-9px)',
};

export const chartTitleOptions = {
  buttonOptions: {
    symbolStroke: '#00abd9',
    theme: {
      fill: 'transparent',
      states: {
        hover: {
          fill: 'transparent',

        },
        select: {
          fill: 'transparent',
        },
      },
    },
    x: -2,
    y: -5,
    align: isRtl ? 'left' : 'right',
  },
  menuStyle: {
    transform: 'translateY(10px)',
  },
};

export const legendOptions = {
  rtl: isRtl,
  itemHoverStyle: {
    color: '#aaa',
  },
  itemStyle: {
    color: '#bcbcbc',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
};
