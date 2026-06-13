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

// Light accent used for chart titles in dark mode. The CSS section headers flip
// to this via the --pgn-rgg-accent-color custom prop, but ECharts paints titles
// on a <canvas> with the value baked into CHART_TITLE_STYLES.color (the navy
// fallback #0a3055, since --pgn-rgg-accent-color is never set at :root). CSS
// can't reach canvas text, so the chart components override the color to this
// when dark mode is active. Matches the dark palette accent in _dark-theme.scss.
export const CHART_TITLE_DARK_COLOR = '#aec7f6';

/**
 * Resolves the chart title color for the current theme.
 *
 * On the legacy LMS page the Indigo dark-theme.js adds `indigo-dark-theme` to
 * <body> before the React app mounts, so reading the class at render time is
 * reliable. Returns the light accent in dark mode and the default navy title
 * color (CHART_TITLE_STYLES.color) otherwise.
 *
 * @returns {string} The title color to feed into the ECharts `title` text style.
 */
export const getChartTitleColor = () => (
  document.body.classList.contains('indigo-dark-theme')
    ? CHART_TITLE_DARK_COLOR
    : CHART_TITLE_STYLES.color
);

export const CHART_SUBTITLE_STYLES = {
  color: COLOR_PALETTE.neutralGray,
  fill: COLOR_PALETTE.neutralGray,
  fontFamily: FONT_FAMILIES.primary,
  fontSize: 16,
  lineHeight: 20,
  padding: [50, 10, 6],
  overflow: 'break',
};

// Theme-aware chart subtitle/description color. The static neutralGray (#bcbcbc)
// is too light on the white canvas in light mode; switch to near-black/near-white
// per theme (read at render; the chart components re-render on toggle).
export const getChartSubtitleColor = () => (
  document.body.classList.contains('indigo-dark-theme') ? '#f8f8f8' : '#1a1a1a'
);

export const CHART_ICON_STYLES = {
  borderColor: COLOR_PALETTE.primary,
};

export const CHART_ICON_EMPHASIS_STYLES = {
  borderColor: COLOR_PALETTE.primaryTransparent,
};

// Theme-aware toolbox-icon hover (emphasis) colour. Light keeps the existing faded
// navy; dark uses a lighter accent so the icon brightens on hover instead of fading
// into the dark canvas. (The base icon colour reuses the theme-aware title colour.)
export const getChartIconEmphasisColor = () => (
  document.body.classList.contains('indigo-dark-theme')
    ? '#d6e4ff'
    : CHART_ICON_EMPHASIS_STYLES.borderColor
);

export const CHART_SERIES_ITEM_STYLES = {
  borderRadius: 10,
  borderColor: 'white',
  borderWidth: 2,
};

export const CHART_SIDE_INDENT = 20;

export const CHART_LABEL_STYLES = {
  fontFamily: FONT_FAMILIES.primary,
};
