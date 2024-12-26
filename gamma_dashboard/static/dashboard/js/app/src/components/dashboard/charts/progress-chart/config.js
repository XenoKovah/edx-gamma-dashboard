import { useTranslate as translate } from '../../../../i18n/utils';
import { isRtl } from '../../../../constants';
import {
  chartSubtitleStyles, chartTitleStyles, COLOR_PALETTE, legendOptions,
} from '../constants';

export const getProgressChartConfig = (customChartTitleOptions, pointsByDay, accumulativeData) => ({
  chart: {
    type: 'spline',
    spacingLeft: 70,
    spacingRight: 20,
    marginTop: 120,
    minHeight: 500,
  },
  title: {
    text: translate('performance.progress.tracker.section.heading.text'),
    align: isRtl ? 'right' : 'left',
    widthAdjust: 0,
    x: isRtl ? 56 : -56,
    y: 14,
    margin: 50,
    style: chartTitleStyles,
  },
  subtitle: {
    text: translate('performance.progress.tracker.section.description.text'),
    align: isRtl ? 'right' : 'left',
    widthAdjust: -7,
    x: isRtl ? 56 : -56,
    y: 70,
    style: chartSubtitleStyles,
  },
  navigation: customChartTitleOptions,
  xAxis: {
    reversed: isRtl,
    type: 'datetime',
    dateTimeLabelFormats: {
      month: '%e. %b',
      year: '%b',
    },
    title: {
      text: null,
    },
    tickWidth: 0,
    lineColor: COLOR_PALETTE.mutedGray,
    labels: {
      style: {
        color: COLOR_PALETTE.neutralGray,
        textTransform: 'uppercase',
      },
    },
  },
  yAxis: [{
    opposite: isRtl,
    title: {
      text: null,
    },
    labels: {
      align: isRtl ? 'right' : 'left',
      x: isRtl ? 40 : -40,
      y: 5,
      format: '{value:.,0f}',
      style: {
        color: COLOR_PALETTE.neutralGray,
      },
    },
    showFirstLabel: false,
    gridLineColor: COLOR_PALETTE.mediumGray,
    gridLineDashStyle: 'dash',
    lineColor: COLOR_PALETTE.mutedGray,
    lineWidth: 1,
  }, {
    gridLineWidth: 0,
    opposite: isRtl,
    title: {
      text: null,
    },
    labels: {
      align: isRtl ? 'left' : 'right',
      x: isRtl ? -40 : 40,
      y: 5,
      format: '{value:.,0f}',
      style: {
        color: COLOR_PALETTE.neutralGray,
      },
    },
    showFirstLabel: false,
  }],
  tooltip: {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.x:%e. %b}: {point.y:.2f}',
    useHTML: isRtl,
    style: {
      textAlign: isRtl ? 'right' : 'left',
      direction: isRtl ? 'rtl' : 'ltr',
    },
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    spline: {
      marker: {
        enabled: true,
      },
    },
  },
  legend: legendOptions,
  series: [{
    name: translate('performance.progress.tracker.chart.points.label'),
    type: 'column',
    data: pointsByDay,
    borderColor: COLOR_PALETTE.mutedGray,
    borderRadius: 3,
    dataLabels: {
      enabled: false,
      color: COLOR_PALETTE.light,
      style: {
        fontWeight: 'bold',
        textOutline: 'none',
        fontFamily: 'Open Sans',
      },
    },
  },
  {
    name: translate('performance.progress.tracker.chart.progress.label'),
    type: 'area',
    yAxis: 1,
    data: accumulativeData,
    borderColor: COLOR_PALETTE.mutedGray,
    borderRadius: 3,
    dataLabels: {
      enabled: false,
      color: COLOR_PALETTE.light,
      style: {
        fontWeight: 'bold',
        textOutline: 'none',
        fontFamily: 'Open Sans',
      },
    },
  }],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500,
      },
      chartOptions: {
        navigation: {
          buttonOptions: {
            x: isRtl ? -8 : 8,
          },
        },
        title: {
          x: isRtl ? 53 : -53,
        },
        subtitle: {
          x: isRtl ? 53 : -53,
          widthAdjust: 50,
        },
      },
    }],
  },
});
