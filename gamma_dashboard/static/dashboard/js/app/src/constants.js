import { getCssVariableValue } from './utils/other';

export const BASE_ROOT = '/gamma_dashboard';

export const GAMMA_ADMIN_BASE_URL = process.env.REACT_APP_API_HOST || '';

export const isRtl = document.querySelector('body').classList.contains('rtl');

export const COLOR_PALETTE = {
  primary: getCssVariableValue('--pgn-rgg-primary-color', '#006a00'),
  primaryTransparent: getCssVariableValue('--pgn-rgg-accent-transparent-bg-color', '#006a008c'),
  quaternary: getCssVariableValue('--pgn-rgg-quaternary-color', '#00abd9'),
  neutralGray: getCssVariableValue('--pgn-rgg-neutral-gray-color', '#bcbcbc'),
  mutedGray: getCssVariableValue('--pgn-rgg-muted-gray-color', '#aaa'),
  mediumGray: getCssVariableValue('--pgn-rgg-medium-gray-color', '#6c6d6e'),
  successGreen: getCssVariableValue('--pgn-rgg-success-green-color', '#419e4d'),
  skyBlue: getCssVariableValue('--pgn-rgg-sky-blue-color', '#4599c3'),
  warningYellow: getCssVariableValue('--pgn-rgg-warning-yellow-color', '#ffcd00'),
  orangeAccent: getCssVariableValue('--pgn-rgg-orange-accent-color', '#e87722'),
  aquaBlue: getCssVariableValue('--pgn-rgg-aqua-blue-color', '#00b5e2'),
  purpleAccent: getCssVariableValue('--pgn-rgg-purple-accent-color', '#6244bb'),
  darkGray: getCssVariableValue('--pgn-rgg-dark-gray-color', '#888b8d'),
  errorRed: getCssVariableValue('--pgn-rgg-error-red-color', '#ff0000'),
  light: getCssVariableValue('--pgn-rgg-light-color', '#fafafa'),
  oliveGreen: getCssVariableValue('--pgn-rgg-olive-green-color', '#556b2f'),
  lightGray: getCssVariableValue('--pgn-rgg-light-gray-color', '#dfe0e8'),
  gold: getCssVariableValue('--pgn-rgg-gold-color', '#f8b805'),
  silver: getCssVariableValue('--pgn-rgg-silver-color', '#afbac7'),
  bronze: getCssVariableValue('--pgn-rgg-bronze-color', '#e6814d'),
  avatarImageBgGray: getCssVariableValue('--pgn-rgg-avatar-image-bg-gray-color', '#cde4fc'),
  avatarLetterBgGray: getCssVariableValue('--pgn-rgg-avatar-letter-bg-gray-color', '#303030'),
};
