/**
 * Removes the leading slash from a string, if it exists.
 *
 * @param {string} str - The input string.
 * @returns {string} The string without a leading slash.
 */
export const trimStartSlash = (str) => (str.startsWith('/') ? str.substring(1, str.length) : str);

/**
 * Removes the trailing slash from a string, if it exists.
 *
 * @param {string} str - The input string.
 * @returns {string} The string without a trailing slash.
 */
export const trimTrailingSlash = (str) => (str.endsWith('/') ? str.substring(0, str.length - 1) : str);

/**
 * Builds a complete URL by appending the provided URL to the base URL if necessary.
 *
 * - If the URL is already absolute (starts with `http://` or `https://`), it is returned as-is.
 * - If the base URL (`window.GAMIFICATION_BASE_URL`) is not set, a warning is logged to the console,
 *   and the original URL is returned.
 * - Otherwise, the base URL and the provided URL are combined,
 * ensuring no leading or trailing slashes cause duplication.
 *
 * @param {string} url - The URL to process. This can be a relative or absolute URL.
 * @returns {string} The complete URL.
 */
export const buildURL = (url) => {
  // check if provided URL is not absolute and complete it with base URL if needed
  // windows.GAMIFICATION_BASE_URL should be passed from server at template page

  if (/^(http(s?)):\/\//i.test(url)) {
    return url;
  }

  if (!window.GAMIFICATION_BASE_URL) {
    /* eslint-disable-next-line no-console */
    console.log('window.GAMIFICATION_BASE_URL is not set');
    return url;
  }
  return `${trimTrailingSlash(window.GAMIFICATION_BASE_URL)}/${trimStartSlash(url)}`;
};

/**
 * Resolves a URL to an absolute URL if it's relative.
 *
 * @param {string} url - The URL to check.
 * @param {string} baseUrl - The base URL to prepend if the URL is relative.
 * @returns {string} The absolute URL.
 */
export const resolveUrl = (url, baseUrl) => {
  const isAbsoluteUrl = /^https?:\/\//i.test(url);
  return isAbsoluteUrl ? url : `${baseUrl}${url}`;
};
