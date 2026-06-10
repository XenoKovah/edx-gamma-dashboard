import React, { useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ReactECharts from 'echarts-for-react';
import { breakpoints, useMediaQuery } from '@openedx/paragon';

import { useElementWidth } from '../hooks';
import { getConfig } from './config';
import { processChartData, transformData } from './utils';
import { getChartTitleColor } from '../constants';

import messages from '../../../i18n';

const ProgressChart = ({ data }) => {
  const intl = useIntl();
  const chartRef = useRef(null);
  const chartWidth = useElementWidth(chartRef);
  const isSmall = useMediaQuery({ maxWidth: breakpoints.extraSmall.maxWidth });
  const { pointsByDay, accumulativeData } = useMemo(() => processChartData(data), [data]);
  const { dates, values: points, years } = transformData(pointsByDay);
  const { values: progress } = transformData(accumulativeData);
  // ECharts paints the title on a <canvas>, so CSS can't recolor it; pick a
  // light title color in dark mode. The legacy page's dark-theme.js sets the
  // `indigo-dark-theme` body class before this app mounts, so reading it now
  // reflects the active theme.
  const titleColor = getChartTitleColor();

  const translations = {
    headingText: intl.formatMessage(messages.performanceProgressTrackerSectionHeadingText),
    descriptionText: intl.formatMessage(messages.performanceProgressTrackerSectionDescriptionText),
    legend: {
      progress: intl.formatMessage(messages.performancePointsItemProgressLabel),
      points: intl.formatMessage(messages.performancePointsItemPointsLabel),
    },
    controls: {
      saveAsImage: intl.formatMessage(messages.performancePointsControlsSaveAsImageLabel),
      zoomIn: intl.formatMessage(messages.performancePointsControlsZoomInLabel),
      zoomOut: intl.formatMessage(messages.performancePointsControlsZoomOutLabel),
      lineChart: intl.formatMessage(messages.performancePointsControlsLineChartLabel),
      barChart: intl.formatMessage(messages.performancePointsControlsBarChartLabel),
    },
  };

  return (
    <div ref={chartRef}>
      <ReactECharts
        option={getConfig(dates, points, progress, translations, chartWidth, isSmall, years, titleColor)}
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
