import { isRtl } from '../../../constants';
import { getCssVariableValue } from '../../../utils/other';

export const COLOR_PALETTE = {
  primary: getCssVariableValue('--rgg-accent-color', '#3caada'),
  quaternary: getCssVariableValue('--rgg-quaternary-color', '#00abd9'),
  neutralGray: getCssVariableValue('--rgg-main-text-color', '#bcbcbc'),
  mutedGray: getCssVariableValue('--rgg-muted-gray-color', '#aaa'),
  mediumGray: getCssVariableValue('--rgg-medium-gray-color', '#6c6d6e'),
  successGreen: getCssVariableValue('--rgg-success-green-color', '#419e4d'),
  skyBlue: getCssVariableValue('--rgg-sky-blue-color', '#4599c3'),
  warningYellow: getCssVariableValue('--rgg-warning-yellow-color', '#ffcd00'),
  orangeAccent: getCssVariableValue('--rgg-orange-accent-color', '#e87722'),
  aquaBlue: getCssVariableValue('--rgg-aqua-blue-color', '#00b5e2'),
  purpleAccent: getCssVariableValue('--rgg-purple-accent-color', '#6244bb'),
  darkGray: getCssVariableValue('--rgg-dark-gray-color', '#888b8d'),
  errorRed: getCssVariableValue('--rgg-error-red-color', '#ff0000'),
  light: getCssVariableValue('--rgg-light-color', '#fafafa'),
  oliveGreen: getCssVariableValue('--rgg-olive-green-color', '#556b2f'),
  lightGray: getCssVariableValue('--rgg-light-gray-color', '#dfe0e8'),
  gold: getCssVariableValue('--rgg-gold-color', '#f8b805'),
  silver: getCssVariableValue('--rgg-silver-color', '#afbac7'),
  bronze: getCssVariableValue('--rgg-bronze-color', '#e6814d'),
  avatarImageBgGray: getCssVariableValue('--rgg-avatar-image-bg-gray-color', '#cde4fc'),
  avatarLetterBgGray: getCssVariableValue('--rgg-avatar-letter-bg-gray-color', '#303030'),
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
