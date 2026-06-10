export const API_VERSION = 0;

export const BASE_URL = `/gamma_dashboard/api/v${API_VERSION}/`;

export const USER_AVATAR_CONFIG_URL = `${BASE_URL}user-avatar-config/`;

export const LEADERBOARD_URLS = (courseId = '') => ({
  getInfo: `${BASE_URL}leaderboard/${courseId}`,
});

export const BADGE_LEADERBOARD_URLS = (badgeSlug = '', courseId = '') => ({
  getInfo: `${BASE_URL}leaderboard/badge/${badgeSlug}${courseId ? `/${courseId}` : ''}`,
});

export const COUNTRY_LEADERBOARD_URLS = (country = '') => ({
  getInfo: `${BASE_URL}leaderboard/country/${country}`,
});

export const COURSE_LEADERBOARD_URLS = (courseId = '') => ({
  getInfo: `${BASE_URL}leaderboard/course/${courseId}`,
});

export const DASHBOARD_URLS = {
  getGameProfile: `${BASE_URL}game-profile/`,
  selectUserAvatarSet: () => USER_AVATAR_CONFIG_URL,
  updateUserAvatarSet: (userConfigurationId) => `${USER_AVATAR_CONFIG_URL}?config_id=${userConfigurationId}`,
};
