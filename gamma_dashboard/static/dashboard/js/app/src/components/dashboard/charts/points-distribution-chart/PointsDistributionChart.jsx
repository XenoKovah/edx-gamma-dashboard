import React from 'react';
import PropTypes from 'prop-types';

import { useTranslate } from '../../../../i18n/utils';
import { ChartWithExport } from '../chart-with-export';
import { getPointsDistributionChartConfig } from './config';
import { prepareEvents } from './utils';

const PointsDistributionChart = ({ data }) => {
  const events = prepareEvents(data);

  const messages = {
    distributionSection: {
      headingText: useTranslate('performance.points.distribution.section.heading.text'),
      descriptionText: useTranslate('performance.points.distribution.section.description.text'),
    },
    performancePointsSeriesName: useTranslate('performance.points.series.name'),
  };

  return (
    <ChartWithExport
      options={getPointsDistributionChartConfig(events, messages)}
    />
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
