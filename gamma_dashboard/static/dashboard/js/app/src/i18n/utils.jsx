import { useIntl } from 'react-intl';

import en from './en';

/**
 * Prepares messages by extracting `defaultMessage` values from the provided locale messages.
 *
 * @param {Object} localeMessages - An object containing locale messages.
 * @returns {Object} An object mapping message keys to their `defaultMessage` values.
 */
const prepareMessages = (localeMessages) => Object.keys(localeMessages).reduce((acc, key) => {
  acc[key] = localeMessages[key].defaultMessage;
  return acc;
}, {});

/**
 * A dictionary of prepared messages for supported locales.
 * Each locale maps to its corresponding default messages.
 */
const messages = {
  en: prepareMessages(en),
};

/**
 * Retrieves the messages for a specified locale.
 *
 * @param {string} locale - The locale for which messages are requested.
 * @returns {Object} The messages for the given locale or default messages if the locale is unsupported.
 */
export const getMessages = (locale) => messages[locale] || messages.en;

/**
 * A React Hook for translating messages using the `react-intl` library.
 *
 * @param {string} id - The ID of the message to translate.
 * @param {Object} [values={}] - An object of values to interpolate in the message.
 * @returns {string} The translated message.
 */
export const useTranslate = (id, values = {}) => {
  const intl = useIntl();
  const defaultMessage = en[id]?.defaultMessage || '';
  return intl.formatMessage(
    { id, defaultMessage },
    values,
  );
};

/**
 * A React Hook that provides localized strings for Highcharts configuration.
 *
 * @returns {Object} An object containing localized Highcharts language options.
 * Each key corresponds to a Highcharts language property (e.g., "downloadPNG").
 */
export const useHighchartsLang = () => {
  const intl = useIntl();

  const keys = [
    'chart.downloadJPEG',
    'chart.downloadPDF',
    'chart.downloadPNG',
    'chart.downloadSVG',
    'chart.printChart',
    'chart.viewFullscreen',
  ];

  const langOptions = {};
  keys.forEach((key) => {
    const defaultMessage = en[key]?.defaultMessage || '';
    langOptions[key.split('.')[1]] = intl.formatMessage(
      { id: key, defaultMessage },
    );
  });

  return langOptions;
};
