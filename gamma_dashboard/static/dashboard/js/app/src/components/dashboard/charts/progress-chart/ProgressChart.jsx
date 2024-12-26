import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { isRtl } from '../../../../constants';
import { ChartWithExport } from '../chart-with-export';
import { chartTitleOptions } from '../constants';
import { getProgressChartConfig } from './config';
import { processChartData } from './utils';

const ProgressChart = ({ data }) => {
  const { pointsByDay, accumulativeData } = useMemo(() => processChartData(data), [data]);

  const customChartTitleOptions = {
    ...chartTitleOptions,
    buttonOptions: {
      ...chartTitleOptions.buttonOptions,
      x: isRtl ? -6 : 6,
      align: isRtl ? 'left' : 'right',
    },
  };

  return (
    <ChartWithExport
      options={getProgressChartConfig(customChartTitleOptions, pointsByDay, accumulativeData)}
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
