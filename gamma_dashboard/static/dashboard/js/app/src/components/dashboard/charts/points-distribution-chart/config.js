import { isRtl } from '../../../../constants';
import {
  chartSubtitleStyles, chartTitleOptions, chartTitleStyles, COLOR_PALETTE,
} from '../constants';
import { dataLabelFormatter } from './utils';

export const getPointsDistributionChartConfig = (events, messages) => {
  const alignment = isRtl ? { align: 'right', x: 0 } : { align: 'left', x: 7 };

  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: 470,
      marginTop: 135,
      marginBottom: 35,
    },
    title: {
      text: messages.distributionSection.headingText,
      ...alignment,
      widthAdjust: 0,
      x: isRtl ? 0 : 7,
      y: 14,
      margin: 50,
      style: chartTitleStyles,
    },
    subtitle: {
      text: messages.distributionSection.descriptionText,
      ...alignment,
      widthAdjust: 7,
      x: isRtl ? 0 : 7,
      y: 69,
      style: chartSubtitleStyles,
    },
    navigation: chartTitleOptions,
    tooltip: {
      pointFormat: isRtl
        ? '<b>{point.percentage:.1f}%</b>: {series.name}'
        : '{series.name}: <b>{point.percentage:.1f}%</b>',
      useHTML: isRtl,
      style: {
        textAlign: alignment.align,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: 30,
          style: {
            fontWeight: 'bold',
            color: 'white',
            textShadow: 'unset',
          },
        },
        center: ['50%', '50%'],
        showInLegend: true,
      },
      series: {
        dataLabels: {
          enabled: true,
          color: COLOR_PALETTE.neutralGray,
          borderWidth: 0,
          shadow: false,
          style: {
            fontWeight: '700',
            fontSize: '12px',
            textShadow: false,
            textOutline: 0,
          },
          formatter: dataLabelFormatter,
        },
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: events.length > 0 ? [{
      type: 'pie',
      name: messages.performancePointsSeriesName,
      innerSize: '30%',
      data: events,
    }] : null,
  };
};
