import { isRtl } from '../../../constants';

export const chartTitleStyles = {
  color: '#3caada',
  fontFamily: 'Open Sans',
  fontSize: '17px',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginBottom: '6px',
  x: -100,
  y: -100,
};

export const chartSubtitleStyles = {
  color: '#bcbcbc',
  fontFamily: 'Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
  fontSize: '16px',
  lineHeight: '20px',
  transform: 'translateY(-9px)',
};

export const chartTitleOptions = {
  buttonOptions: {
    symbolStroke: '#00abd9',
    theme: {
      fill: 'transparent',
      states: {
        hover: {
          fill: 'transparent',

        },
        select: {
          fill: 'transparent',
        },
      },
    },
    x: -2,
    y: -5,
    align: isRtl ? 'left' : 'right',
  },
  menuStyle: {
    transform: 'translateY(10px)',
  },
};

export const legendOptions = {
  rtl: isRtl,
  itemHoverStyle: {
    color: '#aaa',
  },
  itemStyle: {
    color: '#bcbcbc',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
};
