import { mapStatusTitles, mapEventTitles } from './mappers';
import { mergeBadges, convertKeysToCamelCase } from './badges';

/**
 * Parses input data to prepare a unified structure for UI components.
 *
 * @param {Object} [data={}] - Input data containing user and system-defined structures.
 * @param {Object<string, Object>} [data.badges] - User-specific badges keyed by slug.
 * @param {Array<{ slug: string, title: string, status_points: number }>} [data.system_statuses=[]] -
 * System-defined statuses.
 * @param {Array<{ slug: string, title: string, rules: Object }>} [data.system_badges=[]] - System-defined badges.
 * @param {Array<{ event_type: string, title: string }>} [data.system_events=[]] - System-defined events.
 * @param {number} [data.points=0] - User's current points.
 * @param {Object} [data.progress={}] - Progress data for the user.
 * @param {Object} [data.chart={}] - Chart data for visualizations.
 * @param {Array<Object>} [data.avatar_sets=[]] - Raw avatar sets data.
 * @param {Object} [data.gamma_user_info={}] - Raw user info data.
 */
export const prepareDashboardData = (data = {}) => {
  const {
    badges = {},
    system_statuses: systemStatuses = [],
    system_badges: systemBadges = [],
    system_events: systemEvents = [],
    points = 0,
    progress = {},
    chart = {},
    avatar_sets: avatarSets = [],
    gamma_user_info: gammaUserInfo = {},
  } = data;

  const statusTitles = mapStatusTitles(systemStatuses);
  const eventTitles = mapEventTitles(systemEvents);

  const mergedBadges = mergeBadges(statusTitles, eventTitles, badges, systemBadges);

  const statusItems = systemStatuses.map(({ status_points, ...rest }) => ({ // eslint-disable-line camelcase
    ...rest,
    statusPoints: status_points, // eslint-disable-line camelcase
    points,
  }));

  // Prep for React Query migration: normalize GammaUserInfo and AvatarSets
  const convertedToCamelCaseGammaUserInfo = convertKeysToCamelCase(gammaUserInfo);
  const convertedToCamelCaseAvatarSets = convertKeysToCamelCase(avatarSets);

  return {
    statusItems,
    badgeItems: Object.entries(mergedBadges),
    statusRoadmap: {
      points,
      statuses: systemStatuses,
    },
    progress,
    chart,
    avatarSets: convertedToCamelCaseAvatarSets,
    gammaUserInfo: convertedToCamelCaseGammaUserInfo,
  };
};

/**
 * Extracts the CSRF token from the browser's cookies.
 *
 * @returns {string|undefined} The CSRF token if found, otherwise undefined.
 */
export const getCsrfToken = () => document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)')?.pop();

/**
 * Returns the default headers for HTTP requests, including the CSRF token.
 *
 * @returns {Object} An object containing HTTP headers.
 * @returns {string} return['Content-Type'] - The MIME type of the request body.
 * @returns {string|undefined} return['X-CSRFToken'] - The CSRF token, if available.
 */
export const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  'X-CSRFToken': getCsrfToken(),
});
