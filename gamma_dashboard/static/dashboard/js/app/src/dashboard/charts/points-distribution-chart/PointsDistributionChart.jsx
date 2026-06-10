import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ReactECharts from 'echarts-for-react';
import { breakpoints, useMediaQuery } from '@openedx/paragon';

import { useElementWidth } from '../hooks';
import { getConfig } from './config';
import { prepareEvents } from './utils';

import messages from '../../../i18n';

const PointsDistributionChart = ({ data }) => {
  const intl = useIntl();
  const chartRef = useRef(null);
  const chartWidth = useElementWidth(chartRef);
  const events = prepareEvents(data);
  const isSmall = useMediaQuery({ maxWidth: breakpoints.extraSmall.maxWidth });

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
        option={getConfig(events, translations, chartWidth, isSmall)}
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
