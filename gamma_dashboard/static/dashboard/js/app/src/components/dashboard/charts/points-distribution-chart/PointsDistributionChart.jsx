import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { ChartWithExport } from '../chart-with-export';
import { getPointsDistributionChartConfig } from './config';
import { prepareEvents } from './utils';

const PointsDistributionChart = ({ data }) => {
  const events = useMemo(() => prepareEvents(data), [data]);

  return (
    <ChartWithExport
      options={getPointsDistributionChartConfig(events)}
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
