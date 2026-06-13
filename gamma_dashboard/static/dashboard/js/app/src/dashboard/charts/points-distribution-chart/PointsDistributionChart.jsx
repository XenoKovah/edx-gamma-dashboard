import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ReactECharts from 'echarts-for-react';
import { breakpoints, useMediaQuery } from '@openedx/paragon';

import { useElementWidth, useIsDarkTheme } from '../hooks';
import { getConfig } from './config';
import { prepareEvents } from './utils';
import { getChartTitleColor } from '../constants';

import messages from '../../../i18n';

const PointsDistributionChart = ({ data }) => {
  const intl = useIntl();
  const chartRef = useRef(null);
  const chartWidth = useElementWidth(chartRef);
  const events = prepareEvents(data);
  const isSmall = useMediaQuery({ maxWidth: breakpoints.extraSmall.maxWidth });
  // ECharts paints the title on a <canvas>, so CSS can't recolor it; pick a
  // light title color in dark mode. The legacy page's dark-theme.js sets the
  // `indigo-dark-theme` body class before this app mounts, so reading it now
  // reflects the active theme.
  // Re-render when the theme toggles so the canvas re-colors live (ECharts can't
  // recolor its own canvas on a CSS class change; without this it only updates on
  // a resize, e.g. after an app-switch).
  useIsDarkTheme();
  const titleColor = getChartTitleColor();

  const translations = {
    headingText: intl.formatMessage(messages.performancePointsDistributionSectionHeadingText),
    descriptionText: intl.formatMessage(messages.performancePointsDistributionSectionDescriptionText),
    seriesPointsName: intl.formatMessage(messages.performancePointsSeriesName),
    pointsLabel: intl.formatMessage(messages.performancePointsItemPointsLabel),
    controls: {
      saveAsImage: intl.formatMessage(messages.performancePointsControlsSaveAsImageLabel),
    },
  };

  return (
    <div ref={chartRef}>
      <ReactECharts
        option={getConfig(events, translations, chartWidth, isSmall, titleColor)}
        style={{ height: '470px' }}
      />
    </div>
  );
};

const DataPropType = PropTypes.shape({
  points: PropTypes.number.isRequired,
  title: PropTypes.string,
});

PointsDistributionChart.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      DataPropType,
    ]),
  ),
};

PointsDistributionChart.defaultProps = {
  data: {},
};

export default PointsDistributionChart;
