import { isRtl } from '../../../constants';

export const COLOR_PALETTE = {
  primary: '#3caada',
  quaternary: '#00abd9',
  neutralGray: '#bcbcbc',
  mutedGray: '#aaa',
  mediumGray: '#6c6d6e',
  successGreen: '#419e4d',
  skyBlue: '#4599c3',
  warningYellow: '#ffcd00',
  orangeAccent: '#e87722',
  aquaBlue: '#00b5e2',
  purpleAccent: '#6244bb',
  darkGray: '#888b8d',
  errorRed: '#ff0000',
  light: '#fafafa',
  oliveGreen: '#556b2f',
  lightGray: '#dfe0e8',
  gold: '#f8b805',
  silver: '#afbac7',
  bronze: '#e6814d',
  avatarImageBgGray: '#cde4fc',
  avatarLetterBgGray: '#303030',
};

export const chartTitleStyles = {
  color: COLOR_PALETTE.primary,
  fontFamily: 'Open Sans',
  fontSize: '17px',
  fontWeight: 600,
  textTransform: 'uppercase',
  marginBottom: '6px',
  x: -100,
  y: -100,
};

export const chartSubtitleStyles = {
  color: COLOR_PALETTE.neutralGray,
  fontFamily: 'Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
  fontSize: '16px',
  lineHeight: '20px',
  transform: 'translateY(-9px)',
};

export const chartTitleOptions = {
  buttonOptions: {
    symbolStroke: COLOR_PALETTE.quaternary,
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
    color: COLOR_PALETTE.mutedGray,
  },
  itemStyle: {
    color: COLOR_PALETTE.neutralGray,
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
};
