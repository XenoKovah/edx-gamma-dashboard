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

export const CHART_COLOR_SCHEME = [
  COLOR_PALETTE.successGreen,
  COLOR_PALETTE.skyBlue,
  COLOR_PALETTE.warningYellow,
  COLOR_PALETTE.orangeAccent,
  COLOR_PALETTE.aquaBlue,
  COLOR_PALETTE.purpleAccent,
  COLOR_PALETTE.darkGray,
  COLOR_PALETTE.errorRed,
];

export const FONT_FAMILIES = {
  primary: getCssVariableValue('--rgg-primary-font-family', '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif'),
};

export const CHART_TITLE_STYLES = {
  color: COLOR_PALETTE.primary,
  fontFamily: FONT_FAMILIES.primary,
  fontSize: 17,
  fontWeight: 700,
  padding: [4, 10, 6],
};

export const CHART_SUBTITLE_STYLES = {
  color: COLOR_PALETTE.neutralGray,
  fill: COLOR_PALETTE.neutralGray,
  fontFamily: FONT_FAMILIES.primary,
  fontSize: 16,
  lineHeight: 20,
  padding: [50, 10, 6],
  overflow: 'break',
};

export const CHART_ICON_STYLES = {
  borderColor: COLOR_PALETTE.primary,
};

export const CHART_SERIES_ITEM_STYLES = {
  borderRadius: 10,
  borderColor: 'white',
  borderWidth: 2,
};

export const CHART_SIDE_INDENT = 20;
