import { isRtl } from '../../../constants';
import {
  CHART_SIDE_INDENT,
  CHART_COLOR_SCHEME,
  CHART_ICON_STYLES,
  CHART_ICON_EMPHASIS_STYLES,
  CHART_SERIES_ITEM_STYLES,
  CHART_SUBTITLE_STYLES,
  CHART_TITLE_STYLES,
  CHART_LABEL_STYLES,
} from '../constants';

// `titleColor` lets the component pass a theme-aware title color (light accent
// in dark mode); falls back to the standard navy so light mode is unchanged.
export const getConfig = (events, messages, containerWidth, isSmall, titleColor) => ({
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
  tooltip: {
    trigger: 'item',
    // {b} = slice name, {a} = series name, {d} = percent, {c} = raw value (points).
    formatter: `{b} <br/> {a}: <strong>{d}%</strong> <br/> ${messages.pointsLabel}: <strong>{c}</strong>`,
    textStyle: CHART_LABEL_STYLES,
  },
  legend: {
    show: false,
  },
  series: [
    {
      clockwise: !isRtl,
      name: messages.seriesPointsName,
      type: 'pie',
      top: 50,
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: CHART_SERIES_ITEM_STYLES,
      label: {
        show: true,
        position: isSmall ? 'inside' : 'outside',
        formatter: '{d}%',
        ...CHART_LABEL_STYLES,
        // ECharts auto-applies a thick white outline (~2px) to "attached" pie
        // labels for legibility; pin a thin 1px white stroke so the percentages
        // stay readable without the heavy halo. Global (both light and dark).
        textBorderColor: '#fff',
        textBorderWidth: 1,
      },
      data: events,
    },
  ],
  toolbox: {
    show: true,
    right: isRtl ? null : 10,
    left: isRtl ? 10 : null,
    feature: {
      saveAsImage: {
        show: true,
        title: messages.controls.saveAsImage,
        iconStyle: CHART_ICON_STYLES,
        emphasis: {
          iconStyle: CHART_ICON_EMPHASIS_STYLES,
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
        width: Math.max(0, (containerWidth || 0) - CHART_SIDE_INDENT),
      },
    },
  ],
});
