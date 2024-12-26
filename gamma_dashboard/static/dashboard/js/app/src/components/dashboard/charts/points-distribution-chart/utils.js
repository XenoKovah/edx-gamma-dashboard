import { Highcharts } from '../chart-with-export/ChartWithExport';

/**
 * Formatter function for data labels in a Highcharts chart.
 * Calculates the percentage contribution of a data point to the total series sum
 * and formats it as a percentage string with one decimal point.
 */
export const dataLabelFormatter = function () { /* eslint-disable-line func-names */
  const percent = (this.y / this.series.data.map((p) => p.y).reduce((a, b) => a + b, 0)) * 100;
  return `${Highcharts.numberFormat(percent, 1)}%`;
};

/**
 * Prepares an array of events for charting from the given data object.
 */
export const prepareEvents = (data) => {
  const events = [];
  Object.entries(data).forEach(([key, value]) => {
    const points = typeof value.points === 'number' ? value.points : value;
    events.splice(value[0], 0, {
      name: value.title ?? key,
      y: points,
    });
  });
  return events;
};
