import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReactECharts from 'echarts-for-react';
import { breakpoints, useMediaQuery } from '@openedx/paragon';

import { useTranslate } from '../../../../i18n/utils';
import { useElementWidth } from '../hooks';
import { getConfig } from './config';
import { prepareEvents } from './utils';

const PointsDistributionChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartWidth = useElementWidth(chartRef);
  const events = prepareEvents(data);
  const isSmall = useMediaQuery({ maxWidth: breakpoints.extraSmall.maxWidth });

  const messages = {
    headingText: useTranslate('performance.points.distribution.section.heading.text'),
    descriptionText: useTranslate('performance.points.distribution.section.description.text'),
    seriesPointsName: useTranslate('performance.points.series.name'),
    controls: {
      saveAsImage: useTranslate('performance.points.controls.saveAsImage.label'),
    },
  };

  return (
    <div ref={chartRef}>
      <ReactECharts
        option={getConfig(events, messages, chartWidth, isSmall)}
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
