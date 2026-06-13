import { isRtl } from '../../../constants';
import {
  CHART_SIDE_INDENT,
  CHART_COLOR_SCHEME,
  CHART_ICON_STYLES,
  CHART_SUBTITLE_STYLES,
  CHART_TITLE_STYLES,
  CHART_LABEL_STYLES,
  getChartIconEmphasisColor,
  getChartSubtitleColor,
} from '../constants';

// `titleColor` lets the component pass a theme-aware title color (light accent
// in dark mode); falls back to the standard navy so light mode is unchanged.
export const getConfig = (dates, points, progress, messages, containerWidth, isSmall, years, titleColor) => {
  const labels = dates.map((date, index) => `${date} (${years[index]})`);

  return {
    color: CHART_COLOR_SCHEME,
    title: {
      left: isRtl ? 'right' : 'left',
      text: `{header|${messages.headingText}}`,
      textStyle: {
        rich: {
          header: { ...CHART_TITLE_STYLES, color: titleColor || CHART_TITLE_STYLES.color },
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
      // OST2: theme-aware legend text (navy in light, light accent in dark) -- the
      // default was a fixed dark colour, invisible on the dark canvas.
      textStyle: { ...CHART_LABEL_STYLES, color: titleColor || CHART_TITLE_STYLES.color },
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisLabel: CHART_LABEL_STYLES,
      nameTextStyle: CHART_LABEL_STYLES,
    },
    yAxis: {
      type: 'value',
      axisLabel: CHART_LABEL_STYLES,
      nameTextStyle: CHART_LABEL_STYLES,
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
        label: CHART_LABEL_STYLES,
      },
      {
        clockwise: !isRtl,
        name: messages.legend.points,
        type: 'line',
        data: points,
        label: CHART_LABEL_STYLES,
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
          iconStyle: { borderColor: titleColor || CHART_ICON_STYLES.borderColor },
          emphasis: {
            iconStyle: { borderColor: getChartIconEmphasisColor() },
          },
        },
        dataZoom: {
          title: {
            zoom: messages.controls.zoomIn,
            back: messages.controls.zoomOut,
          },
          iconStyle: { borderColor: titleColor || CHART_ICON_STYLES.borderColor },
          emphasis: {
            iconStyle: { borderColor: getChartIconEmphasisColor() },
          },
        },
        magicType: {
          type: ['line', 'bar'],
          title: {
            line: messages.controls.lineChart,
            bar: messages.controls.barChart,
          },
          iconStyle: { borderColor: titleColor || CHART_ICON_STYLES.borderColor },
          emphasis: {
            iconStyle: { borderColor: getChartIconEmphasisColor() },
          },
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
          color: getChartSubtitleColor(),
          fill: getChartSubtitleColor(),
          width: Math.max(0, (containerWidth || 0) - CHART_SIDE_INDENT),
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      textStyle: CHART_LABEL_STYLES,
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
