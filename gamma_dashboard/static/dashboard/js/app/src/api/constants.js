export const API_VERSION = 0;

export const BASE_URL = `/gamma_dashboard/api/v${API_VERSION}/`;

export const USER_AVATAR_CONFIG_URL = `${BASE_URL}user-avatar-config/`;

/**
 * Ask a leaderboard endpoint for its instructor-free view.
 *
 * Every board has two: the default one and the same board with instructors removed and
 * the remaining learners re-ranked. The backend decides who is an instructor and refills
 * the list from the learners the instructors were keeping off it.
 *
 * @param {string} url - The leaderboard endpoint URL.
 * @param {boolean} hideInstructors - Whether to request the instructor-free view.
 * @returns {string} the URL, with the filter applied when it is wanted.
 */
const withHideInstructors = (url, hideInstructors) => (hideInstructors ? `${url}?hide_instructors=1` : url);

export const LEADERBOARD_URLS = (courseId = '', hideInstructors = false) => ({
  getInfo: withHideInstructors(`${BASE_URL}leaderboard/${courseId}`, hideInstructors),
});

export const BADGE_LEADERBOARD_URLS = (badgeSlug = '', courseId = '', hideInstructors = false) => ({
  getInfo: withHideInstructors(
    `${BASE_URL}leaderboard/badge/${badgeSlug}${courseId ? `/${courseId}` : ''}`,
    hideInstructors,
  ),
});

export const COUNTRY_LEADERBOARD_URLS = (country = '', hideInstructors = false) => ({
  getInfo: withHideInstructors(`${BASE_URL}leaderboard/country/${country}`, hideInstructors),
});

export const COURSE_LEADERBOARD_URLS = (courseId = '', hideInstructors = false) => ({
  getInfo: withHideInstructors(`${BASE_URL}leaderboard/course/${courseId}`, hideInstructors),
});

export const DASHBOARD_URLS = {
  getGameProfile: `${BASE_URL}game-profile/`,
  selectUserAvatarSet: () => USER_AVATAR_CONFIG_URL,
  updateUserAvatarSet: (userConfigurationId) => `${USER_AVATAR_CONFIG_URL}?config_id=${userConfigurationId}`,
};
