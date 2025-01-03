import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactECharts from 'echarts-for-react';
import { breakpoints, useMediaQuery } from '@openedx/paragon';

import { useTranslate } from '../../../../i18n/utils';
import { useElementWidth } from '../hooks';
import { getConfig } from './config';
import { processChartData, transformData } from './utils';

const ProgressChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartWidth = useElementWidth(chartRef);
  const isSmall = useMediaQuery({ maxWidth: breakpoints.extraSmall.maxWidth });
  const { pointsByDay, accumulativeData } = useMemo(() => processChartData(data), [data]);
  const { dates, values: points } = transformData(pointsByDay);
  const { values: progress } = transformData(accumulativeData);

  const messages = {
    headingText: useTranslate('performance.progress.tracker.section.heading.text'),
    descriptionText: useTranslate('performance.progress.tracker.section.description.text'),
    legend: {
      progress: useTranslate('performance.points.item.progress.label'),
      points: useTranslate('performance.points.item.points.label'),
    },
    controls: {
      saveAsImage: useTranslate('performance.points.controls.saveAsImage.label'),
      zoomIn: useTranslate('performance.points.controls.zoomIn.label'),
      zoomOut: useTranslate('performance.points.controls.zoomOut.label'),
      lineChart: useTranslate('performance.points.controls.lineChart.label'),
      barChart: useTranslate('performance.points.controls.barChart.label'),
    },
  };

  return (
    <div ref={chartRef}>
      <ReactECharts
        option={getConfig(dates, points, progress, messages, chartWidth, isSmall)}
        style={{ height: '400px' }}
      />
    </div>
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
