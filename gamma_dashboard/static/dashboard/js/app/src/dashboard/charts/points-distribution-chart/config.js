import { isRtl } from '../../../constants';
import {
  CHART_SIDE_INDENT,
  CHART_COLOR_SCHEME,
  CHART_ICON_STYLES,
  CHART_SERIES_ITEM_STYLES,
  CHART_SUBTITLE_STYLES,
  CHART_TITLE_STYLES,
  CHART_LABEL_STYLES,
  getChartIconEmphasisColor,
  getChartSubtitleColor,
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
        // OST2: solid, theme-aware percentage labels (no outline). Colour matches the
        // title resolver -- navy in light, light accent in dark, like other text.
        // textBorderWidth:0 overrides ECharts' auto white halo on attached pie labels.
        color: titleColor || CHART_TITLE_STYLES.color,
        textBorderWidth: 0,
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
});
