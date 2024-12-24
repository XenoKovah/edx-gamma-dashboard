import React from 'react';
import PropTypes from 'prop-types';

import ChartWithExport from './ChartWithExport';
import {
  chartSubtitleStyles, chartTitleOptions, chartTitleStyles, legendOptions,
} from './constants';
import { useTranslate } from '../../../i18n/utils';
import { isRtl } from '../../../constants';

const ProgressChart = ({ data }) => {
  const pointsByDay = [];
  const accumulativeData = [];

  for (const year in data) {
    if (Object.hasOwn(data, year)) {
      for (const yearData of data[year]) {
        pointsByDay.push([Date.parse(yearData.date), yearData.points]);
        let accumulated = 0;
        if (accumulativeData.length !== 0) {
          accumulated = accumulativeData[accumulativeData.length - 1][1] + yearData.points;
        } else {
          accumulated = yearData.points;
        }
        accumulativeData.push([Date.parse(yearData.date), accumulated]);
      }
    }
  }

  const customChartTitleOptions = { ...chartTitleOptions };
  customChartTitleOptions.buttonOptions = { ...customChartTitleOptions.buttonOptions };
  customChartTitleOptions.buttonOptions.x = isRtl ? -6 : 6;
  customChartTitleOptions.buttonOptions.align = isRtl ? 'left' : 'right';

  return (
    <ChartWithExport
      options={{
        chart: {
          type: 'spline',
          spacingLeft: 70,
          spacingRight: 20,
          marginTop: 120,
          minHeight: 500,
        },
        title: {
          text: useTranslate('performance.progress.tracker.section.heading.text'),
          align: isRtl ? 'right' : 'left',
          widthAdjust: 0,
          x: isRtl ? 56 : -56,
          y: 14,
          margin: 50,
          style: chartTitleStyles,
        },
        subtitle: {
          text: useTranslate('performance.progress.tracker.section.description.text'),
          align: isRtl ? 'right' : 'left',
          widthAdjust: -7,
          x: isRtl ? 56 : -56,
          y: 70,
          style: chartSubtitleStyles,
        },
        navigation: customChartTitleOptions,
        xAxis: {
          reversed: isRtl,
          type: 'datetime',
          dateTimeLabelFormats: {
            month: '%e. %b',
            year: '%b',
          },
          title: {
            text: null,
          },
          tickWidth: 0,
          lineColor: '#aaa',
          labels: {
            style: {
              color: '#bcbcbc',
              textTransform: 'uppercase',
            },
          },
        },
        yAxis: [{
          opposite: isRtl,
          title: {
            text: null,
          },
          labels: {
            align: isRtl ? 'right' : 'left',
            x: isRtl ? 40 : -40,
            y: 5,
            format: '{value:.,0f}',
            style: {
              color: '#bcbcbc',
            },
          },
          showFirstLabel: false,
          gridLineColor: '#6c6d6e',
          gridLineDashStyle: 'dash',
          lineColor: '#aaa',
          lineWidth: 1,
        }, {
          gridLineWidth: 0,
          opposite: isRtl,
          title: {
            text: null,
          },
          labels: {
            align: isRtl ? 'left' : 'right',
            x: isRtl ? -40 : 40,
            y: 5,
            format: '{value:.,0f}',
            style: {
              color: '#bcbcbc',
            },
          },
          showFirstLabel: false,
        }],
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x:%e. %b}: {point.y:.2f}',
          useHTML: isRtl,
          style: {
            textAlign: isRtl ? 'right' : 'left',
            direction: isRtl ? 'rtl' : 'ltr',
          },
        },
        credits: {
          enabled: false,
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: true,
            },
          },
        },
        legend: legendOptions,
        series: [{
          name: useTranslate('performance.progress.tracker.chart.points.label'),
          type: 'column',
          data: pointsByDay,
          borderColor: '#aaa',
          borderRadius: 3,
          dataLabels: {
            enabled: false,
            color: '#fafafa',
            style: {
              fontWeight: 'bold',
              textOutline: 'none',
              fontFamily: 'Open Sans',
            },
          },
        },
        {
          name: useTranslate('performance.progress.tracker.chart.progress.label'),
          type: 'area',
          yAxis: 1,
          data: accumulativeData,
          borderColor: '#aaa',
          borderRadius: 3,
          dataLabels: {
            enabled: false,
            color: '#fafafa',
            style: {
              fontWeight: 'bold',
              textOutline: 'none',
              fontFamily: 'Open Sans',
            },
          },
        }],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              navigation: {
                buttonOptions: {
                  x: isRtl ? -8 : 8,
                },
              },
              title: {
                x: isRtl ? 53 : -53,
              },
              subtitle: {
                x: isRtl ? 53 : -53,
                widthAdjust: 50,
              },
            },
          }],
        },
      }}
    />

  );
};

ProgressChart.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
      }),
    ),
  ),
};

ProgressChart.defaultProps = {
  data: {},
};

export default ProgressChart;
