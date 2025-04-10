import { isRtl } from '../../../constants';
import {
  CHART_SIDE_INDENT,
  CHART_COLOR_SCHEME,
  CHART_ICON_STYLES,
  CHART_SUBTITLE_STYLES,
  CHART_TITLE_STYLES,
} from '../constants';

export const getConfig = (dates, points, progress, messages, containerWidth, isSmall, years) => {
  const labels = dates.map((date, index) => `${date} (${years[index]})`);

  return {
    color: CHART_COLOR_SCHEME,
    title: {
      left: isRtl ? 'right' : 'left',
      text: `{header|${messages.headingText}}`,
      textStyle: {
        rich: {
          header: CHART_TITLE_STYLES,
        },
      },
    },
    legend: {
      data: [messages.legend.progress, messages.legend.points],
      bottom: 10,
      selected: {
        Progress: true,
        Points: true,
      },
    },
    xAxis: {
      type: 'category',
      data: labels,
    },
    yAxis: {
      type: 'value',
    },
    grid: {
      top: isSmall ? 120 : 100,
      left: isSmall ? '20%' : '10%',
      right: '10%',
    },
    series: [
      {
        clockwise: !isRtl,
        name: messages.legend.progress,
        type: 'line',
        data: progress,
        areaStyle: {},
      },
      {
        clockwise: !isRtl,
        name: messages.legend.points,
        type: 'line',
        data: points,
      },
    ],
    toolbox: {
      show: true,
      right: isRtl ? null : 10,
      left: isRtl ? 10 : null,
      feature: {
        saveAsImage: {
          type: 'png',
          title: messages.controls.saveAsImage,
          iconStyle: CHART_ICON_STYLES,
        },
        dataZoom: {
          title: {
            zoom: messages.controls.zoomIn,
            back: messages.controls.zoomOut,
          },
          iconStyle: CHART_ICON_STYLES,
        },
        magicType: {
          type: ['line', 'bar'],
          title: {
            line: messages.controls.lineChart,
            bar: messages.controls.barChart,
          },
          iconStyle: CHART_ICON_STYLES,
        },
      },
    },
    graphic: [
      {
        type: 'text',
        top: 5,
        left: isRtl ? 'auto' : 5,
        right: isRtl ? 5 : 'auto',
        align: isRtl ? 'right' : 'left',
        style: {
          text: messages.descriptionText,
          ...CHART_SUBTITLE_STYLES,
          width: Math.max(0, (containerWidth || 0) - CHART_SIDE_INDENT),
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        let tooltipContent = '<div>';
        tooltipContent += `${params[0].axisValue}<br/>`;
        params.forEach((item) => {
          tooltipContent += `
              <span style="display: inline-block; width: 10px; height: 10px; background-color: ${item.color}; border-radius: 50%;"></span>
              ${item.seriesName}: <strong>${item.value}</strong><br/>
          `;
        });
        tooltipContent += '</div>';
        return tooltipContent;
      },
    },
  };
};
