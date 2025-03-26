import { mapStatusTitles, mapEventTitles } from './mappers';
import { mergeBadges } from './badges';

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
 * @returns {Object} - Parsed data ready for UI consumption.
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

  return {
    statusItems,
    badgeItems: Object.entries(mergedBadges),
    statusRoadmap: {
      points,
      statuses: systemStatuses,
    },
    progress,
    chart,
    avatarSets,
    gammaUserInfo,
  };
};
