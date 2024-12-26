/**
 * Processes raw chart data to generate two datasets:
 * 1. `pointsByDay`: Array of daily points.
 * 2. `accumulativeData`: Array of accumulated points over time.
 *
 * @function processChartData
 * @param {Object} data - The raw input data, where each key represents a year
 *                        and its value is an array of data points for that year.
 * @param {Array} data[].date - The date of the data point in string format.
 * @param {Array} data[].points - The numeric value of points for the data point.
 *
 * @returns {Object} An object containing two datasets for the chart.
 * @returns {Array<Array<number>>} return.pointsByDay - Array of [timestamp, points] pairs.
 * @returns {Array<Array<number>>} return.accumulativeData - Array of [timestamp, accumulatedPoints] pairs.
 */
export const processChartData = (data) => Object.entries(data).reduce(
  (acc, [, yearData]) => {
    let accumulated = acc.accumulativeData.length > 0
      ? acc.accumulativeData[acc.accumulativeData.length - 1][1]
      : 0;

    yearData.forEach(({ date, points }) => {
      const parsedDate = Date.parse(date);
      accumulated += points;
      acc.pointsByDay.push([parsedDate, points]);
      acc.accumulativeData.push([parsedDate, accumulated]);
    });

    return acc;
  },
  { pointsByDay: [], accumulativeData: [] },
);
