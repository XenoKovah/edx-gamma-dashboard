import React from 'react';
import PropTypes from 'prop-types';

import ChartWithExport, {
    chartTitleStyles,
    chartSubtitleStyles,
    chartTitleOptions,
    legendOptions,
} from './ChartWithExport';


const ProgressChart = ({ data }) => {
    const points_by_day = [];
    const accumulative_data = [];

    for (const year in data) {
        for (const year_data of data[year]) {

            points_by_day.push([Date.parse(year_data.date), year_data.points]);
            let accumulated = 0;
            if (accumulative_data.length != 0) {
                accumulated = accumulative_data[accumulative_data.length-1][1] + year_data.points;
            }
            else {
                accumulated = year_data.points;
            }
            accumulative_data.push([Date.parse(year_data.date), accumulated]);
        }
    }

    const customChartTitleOptions = {...chartTitleOptions};
    customChartTitleOptions.buttonOptions = {...customChartTitleOptions.buttonOptions};
    customChartTitleOptions.buttonOptions.x = 86;

    return (
        <ChartWithExport
            options={{
                chart: {
                    type: 'spline',
                    spacingLeft: 100,
                    spacingRight: 100,
                    marginTop: 120,
                    height: 500,
                },
                title: {
                    text: 'Progress Tracker',
                    align: 'left',
                    widthAdjust: 0,
                    x: -86,
                    y: 14,
                    margin: 50,
                    style: chartTitleStyles,
                },
                subtitle: {
                    text: 'See the dynamics of your activities and points acquisition through time  ',
                    align: 'left',
                    widthAdjust: -7,
                    x: -86,
                    y: 70,
                    style: chartSubtitleStyles,
                },
                navigation: customChartTitleOptions,
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        month: '%e. %b',
                        year: '%b'
                    },
                    title: {
                        text: null
                    },
                    tickWidth: 0,
                    lineColor: '#aaa',
                    labels: {
                        style: {
                            color: '#bcbcbc',
                            textTransform: 'uppercase'
                        }
                    }
                },
                yAxis: [{
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'left',
                        x: -40,
                        y: 5,
                        format: '{value:.,0f}',
                        style: {
                            color: '#bcbcbc'
                        }
                    },
                    showFirstLabel: false,
                    gridLineColor: '#6c6d6e',
                    gridLineDashStyle: 'dash',
                    lineColor: '#aaa',
                    lineWidth: 1,
                }, {
                    gridLineWidth: 0,
                    opposite: true,
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'right',
                        x: 40,
                        y: 5,
                        format: '{value:.,0f}',
                        style: {
                            color: '#bcbcbc'
                        }
                    },
                    showFirstLabel: false
                }],
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%e. %b}: {point.y:.2f}'
                },

                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                legend: legendOptions,
                series: [{
                    name: 'Points',
                    type: 'column',
                    data: points_by_day,
                    borderColor: '#aaa',
                    borderRadius: 3,
                    dataLabels: {
                        enabled: false,
                        color: '#fafafa',
                        style: {
                            fontWeight: 'bold',
                            textOutline: 'none',
                            fontFamily: 'Exo2',
                        }
                    }
                },
                {
                    name: 'Progress',
                    type: 'area',
                    yAxis: 1,
                    data: accumulative_data,
                    borderColor: '#aaa',
                    borderRadius: 3,
                    dataLabels: {
                        enabled: false,
                        color: '#fafafa',
                        style: {
                            fontWeight: 'bold',
                            textOutline: 'none',
                            fontFamily: 'Exo2',
                        }
                    }
                }]
            }}
        >
        </ChartWithExport>
    );
};

ProgressChart.propTypes = {
    data: PropTypes.object,
};

ProgressChart.defaultProps = {
    data: {},
};

export default ProgressChart;
