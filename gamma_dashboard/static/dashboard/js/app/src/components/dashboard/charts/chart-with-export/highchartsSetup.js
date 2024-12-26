import applyExporting from 'highcharts/modules/exporting';

import { useHighchartsLang } from '../../../../i18n/utils';
import { COLOR_PALETTE } from '../constants';

/**
 * Applies the custom color scheme to Highcharts.
 * @param {Object} H - The Highcharts instance.
 */
export const applyColorScheme = (H) => {
  H.setOptions({
    colors: [
      COLOR_PALETTE.successGreen,
      COLOR_PALETTE.skyBlue,
      COLOR_PALETTE.warningYellow,
      COLOR_PALETTE.orangeAccent,
      COLOR_PALETTE.aquaBlue,
      COLOR_PALETTE.purpleAccent,
      COLOR_PALETTE.darkGray,
      COLOR_PALETTE.errorRed,
    ],
    chart: {
      style: {
        fontFamily: 'Open Sans, sans-serif',
      },
    },
  });
};

/**
 * Applies translations to Highcharts based on the current language.
 * @param {Object} H - The Highcharts instance.
 */
export const useTranslations = (H) => {
  const langOptions = useHighchartsLang();
  H.setOptions({
    lang: {
      ...langOptions,
    },
  });
};

/**
 * Initializes Highcharts modules.
 * @param {Object} H - The Highcharts instance.
 */
export const initializeModules = (H) => {
  applyExporting(H);
};
