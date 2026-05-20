import { getCssVariableValue } from '../../utils/other';
import { COLOR_PALETTE } from '../../constants';

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
  primary: getCssVariableValue('--pgn-rgg-primary-font-family-base', '"Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif'),
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

export const CHART_ICON_EMPHASIS_STYLES = {
  borderColor: COLOR_PALETTE.primaryTransparent,
};

export const CHART_SERIES_ITEM_STYLES = {
  borderRadius: 10,
  borderColor: 'white',
  borderWidth: 2,
};

export const CHART_SIDE_INDENT = 20;

export const CHART_LABEL_STYLES = {
  fontFamily: FONT_FAMILIES.primary,
};
