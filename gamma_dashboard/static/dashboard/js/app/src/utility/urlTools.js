function trimStartSlash(str) {
  return str.startsWith('/') ? str.substring(1, str.length) : str;
}
function trimTrailingSlash(str) {
  return str.endsWith('/') ? str.substring(0, str.length - 1) : str;
}

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
