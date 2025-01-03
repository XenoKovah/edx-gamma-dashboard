import { isRtl } from '../../../../constants';
import {
  CHART_SIDE_INDENT,
  CHART_COLOR_SCHEME,
  CHART_ICON_STYLES,
  CHART_SERIES_ITEM_STYLES,
  CHART_SUBTITLE_STYLES,
  CHART_TITLE_STYLES,
} from '../constants';

export const getConfig = (events, messages, containerWidth, isSmall) => ({
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
  tooltip: {
    trigger: 'item',
    formatter: '{b} <br/> {a}: <strong>{d}%</strong>',
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
