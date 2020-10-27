import React from 'react';
import PropTypes from 'prop-types';

import ChartWithExport, {
    chartTitleStyles,
    chartSubtitleStyles,
    chartTitleOptions,
    legendOptions,
    isRtl,
} from './ChartWithExport';


function StatusRoadmapChart({ data, points }) {
    const status_lines = [];
    const left = [];
    const right = [];

    for (const i in data) {
        if (data[i].status_points <= points) {
            left.push(data[i].status_points);
        }
        else if (data[i].status_points > points) {
            right.push(data[i].status_points);
        }
        status_lines.push({
            color: data[i].status_color,
            dashStyle: 'longdashdot',
            value: data[i].status_points,
            width: 1,
            label: {
                text: data[i].title,
                rotation: 0,
                x: -15,
                y: -10,
                style: {
                    color: '#bcbcbc',
                    fontFamily: 'Exo2'
                }
            }
        });
    }

    let min_value;
    let max_value;
    let points_to_status = 0;

    if (left.length == 0) {
        min_value = points - 40;
    }
    else {
        min_value = Math.max(...left) - 40;
    }

    if (right.length == 0) {
        max_value = points + 20;
    }
    else {
        max_value = Math.min(...right) + 20;
        points_to_status = max_value - points - 20;
    }

    if (min_value < 0) {
        min_value = 0;
    }

    return (
        <ChartWithExport
            options={{
                chart: {
                    type: 'bar',
                    marginTop: 160,
                    plotBorderWidth: 1,
                    height: 470,
                    maxWidth: 535,
                    marginBottom: 70,
                },
                title: {
                    text: 'Status Roadmap',
                    align: isRtl ? 'right' : 'left',
                    widthAdjust: 0,
                    x: isRtl ? 0 : 7,
                    y: 14,
                    margin: 50,
                    style: chartTitleStyles,
                },
                subtitle: {
                    text: 'Here you can track your status progress: see how many points you have so far and how much is left for each status',
                    align: isRtl ? 'right' : 'left',
                    widthAdjust: -35,
                    x: isRtl ? 0 : 7,
                    y: 70,
                    style: chartSubtitleStyles,
                },
                navigation: chartTitleOptions,
                credits: {
                    enabled: false
                },        
                xAxis: {
                    categories: [''],
                    title: {
                        text: null
                    },
                    tickWidth: 0,
                    lineColor: '#aaa',
                },
                yAxis: {
                    reversed: isRtl,
                    min: min_value,
                    max: max_value,
                    title: {
                        text: null,
                    },
                    labels: {
                        overflow: 'justify',
                        style: {
                            color: '#bcbcbc'
                        }
                    },
                    plotLines: status_lines,
                    gridLineColor: '#6c6d6e',
                    gridLineDashStyle: 'dash',
                    lineColor: '#aaa',
                    lineWidth: 1,
                },
                tooltip: {
                    shared: true,
                    useHTML: true,
                    formatter: function() {
                        let tooltip_html = points_to_status ? 'Points to next status: '+'<b>'+points_to_status+'</b>' : '';
                        tooltip_html += "<table>";

                        this.points.forEach(function(entry) {
                            tooltip_html += '<tr><td style="font-weight:bold; color:'+ entry.series.color +'">'+ entry.series.name +':</td><td style="text-align: right"> '+entry.y+'</td></tr>';
                        });

                        tooltip_html += "</table>";

                        return tooltip_html;
                    },
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            style: {
                                fill: 'transparent'
                            }
                        }
                    },
                    series: {
                    borderColor: '#aaa',
                    borderRadius: 3,
                    dataLabels: {
                        enabled: true,
                        color: '#fafafa',
                        style: {
                        fontWeight: 'bold',
                        textOutline: 'none',
                        fontFamily: 'Exo2',
                        }
                    }
                    }
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false,
                },
                series: [{
                    name: 'Progress',
                    data: [points],
                    borderColor: '#aaa',
                    borderRadius: 3,
                    dataLabels: {
                        enabled: true,
                        color: '#bcbcbc',
                        style: {
                            fontWeight: 'bold',
                            textOutline: 'none',
                            fontFamily: 'Exo2',
                            textShadow: '-1px 0px 2.75px rgba(255, 255, 255, 0.6)',
                        }
                    }
                }],
                responsive: {  
                    rules: [{  
                        condition: {  
                            maxWidth: 500 
                        },  
                        chartOptions: {
                            subtitle: {
                                y: 50,
                                style: {
                                    fontSize: "14px"
                                }
                            }
                        }  
                    }]  
                }
            }}
        >
        </ChartWithExport>
    );
};

StatusRoadmapChart.propTypes = {
    data: PropTypes.array,
    points: PropTypes.number
};

StatusRoadmapChart.defaultProps = {
    data: [],
    points: 0
};

export default StatusRoadmapChart;
