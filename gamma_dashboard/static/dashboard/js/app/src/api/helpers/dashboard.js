import {
  mapStatusTitles, mapEventTitles, mapStatusItems, mapKeysToCamelCase,
} from './mappers';
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
 * @param {Array<Object>} [data.avatar_sets=[]] - Raw avatar sets data.
 * @param {Object} [data.user_avatar_config={}] - Raw user info data.
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
    user_avatar_config: userAvatarConfig = {},
  } = data;

  const {
    userAvatarConfig: convertedToCamelCaseUserAvatarConfig,
    avatarSets: convertedToCamelCaseAvatarSets,
    systemBadges: convertedSystemBadges,
    badges: convertedBadges,
  } = mapKeysToCamelCase({
    userAvatarConfig, avatarSets, systemBadges, badges,
  });

  const statusTitles = mapStatusTitles(systemStatuses);
  const eventTitles = mapEventTitles(systemEvents);
  const statusItems = mapStatusItems(systemStatuses, points);
  const mergedBadges = mergeBadges(statusTitles, eventTitles, convertedBadges, convertedSystemBadges);

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
    gammaUserInfo: convertedToCamelCaseUserAvatarConfig,
  };
};
