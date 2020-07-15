import React from 'react';
import PropTypes from 'prop-types';

import ChartWithExport, {
    chartTitleStyles,
    chartSubtitleStyles,
    chartTitleOptions,
    legendOptions,
    Highcharts,
} from './ChartWithExport';


const PointsDistributionChart = ({ data }) => {
    const events = [];
    for (const key in data) {
        let points = data[key]
        if (typeof points !== "number") {
            // assume API returns Object for chart points
            points = points["points"];
        }
        events.splice(
            data[key][0],
            0,
            {
                name: key,
                y : points
            }
        );
    };

    return (
        <ChartWithExport
            options={{
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    height: 470,
                    marginTop: 135,
                    marginBottom: 35
                },
                title: {
                    text: 'Points Distribution',
                    align: 'left',
                    widthAdjust: 0,
                    x: 7,
                    y: 14,
                    margin: 50,
                    style: chartTitleStyles,
                },
                subtitle: {
                    text: 'Here you can see what actions caused your current points portfolio',
                    align: 'left',
                    widthAdjust: 7,
                    x: 7,
                    y: 69,
                    style: chartSubtitleStyles,
                },
                navigation: chartTitleOptions,
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: 30,
                            style: {
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: 'unset'
                            }
                        },
                        center: ['50%', '50%'],
                        showInLegend: true,
                    },
                    series: {
                        dataLabels: {
                            enabled: true,
                            color: '#bcbcbc',
                            borderWidth: 0,
                            shadow: false,
                            style: {
                                fontWeight: '700',
                                fontSize: '12px',
                                textShadow: false,
                                textOutline: 0
                            },
                            formatter: function(){
                                // arrow functions are changed to regular ones for support IE 11
                                // could be changed back when dashboard will be rewritten with React.js
                                const percent = (this.y / this.series.data.map((p) => p.y).reduce((a, b) => a + b, 0)) * 100;
                                return `${Highcharts.numberFormat(percent, 1)}%`;
                            }
                        }
                    }
                },
                legend: {
                    enabled: false,
                },
                series: events.length > 0 ? [{
                    type: 'pie',
                    name: 'Points share',
                    innerSize: '30%',
                    data: events
                }] : null
            }}
        >
        </ChartWithExport>
    );
};

PointsDistributionChart.propTypes = {
    data: PropTypes.object
};

PointsDistributionChart.defaultProps = {
    data: {}
};

export default PointsDistributionChart;
