import { BASE_ROOT } from '../constants';

export const URLS = {
  dashboardPage: `${BASE_ROOT}/dashboard`, // Dashboard page
  leaderboardPage: `${BASE_ROOT}/leaderboard`, // Leaderboard page
  badgeLeaderboardPage: `${BASE_ROOT}/leaderboard/badge/:badgeSlug`, // Per-badge (filtered) leaderboard page
};

export const EXTERNAL_URLS = {
  leaderboardTabPage: '/courses/:courseId/course_leaderboard', // Course Leaderboard tab
};

/**
 * Build the URL of the per-badge leaderboard page for a given badge slug.
 *
 * @param {string} badgeSlug - The badge slug.
 * @returns {string} The per-badge leaderboard page URL.
 */
export const buildBadgeLeaderboardUrl = (badgeSlug) => `${BASE_ROOT}/leaderboard/badge/${badgeSlug}`;
