import { convertKeysToCamelCase } from './utils';

/**
 * Maps system statuses to a dictionary of status slugs to titles.
 * @param {Array<{ slug: string, title: string }>} systemStatuses - Array of system status objects.
 * @returns {Object<string, string>} - Dictionary mapping status slugs to titles.
 */
export const mapStatusTitles = (systemStatuses) => {
  if (!systemStatuses) {
    return {};
  }

  return Object.fromEntries(
    systemStatuses.map(({ slug, title }) => [slug, title]),
  );
};

/**
 * Maps system events to a dictionary of event types to titles.
 * @param {Array<{ event_type: string, title: string }>} systemEvents - Array of system event objects.
 * @returns {Object<string, string>} - Dictionary mapping event types to titles.
 */
export const mapEventTitles = (systemEvents) => {
  if (!systemEvents) {
    return {};
  }

  return Object.fromEntries(
    systemEvents.map(({ event_type, title }) => [event_type, title]), // eslint-disable-line camelcase
  );
};

/**
 * Maps status items to a new structure with camelCase keys.
 * @param {Array<{ status_points: number, title: string, [key: string]: any }>} statuses - Array of status objects.
 * @param {number} points - Points to add to each status object.
 * @returns {Array<{ statusPoints: number, points: number, [key: string]: any }>} - Array of mapped status objects.
 */
export const mapStatusItems = (statuses, points) => {
  if (!statuses) {
    return [];
  }

  return statuses.map(({
    status_points, ...rest // eslint-disable-line camelcase
  }) => ({
    ...rest,
    statusPoints: status_points, // eslint-disable-line camelcase
    points,
  }));
};

/**
 * Converts keys of multiple objects to camelCase.
 * @param {Object<string, Object>} dataObjects - Dictionary of objects to convert.
 * @returns {Object<string, Object>} - Dictionary with converted objects.
 */
export const mapKeysToCamelCase = (dataObjects) => {
  if (!dataObjects) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(dataObjects).map(([key, value]) => [key, convertKeysToCamelCase(value)]),
  );
};

/**
 * Creates a map of system badges keyed by their slugs.
 * @param {Array<{ slug: string, [key: string]: any }>} badges - Array of badge objects.
 * @returns {Map<string, Object>} - A map where the key is the badge slug and the value is the badge object.
 */
export const createBadgeMap = (badges) => {
  if (!Array.isArray(badges)) {
    return new Map();
  }

  return new Map(badges.map((badge) => [badge.slug, badge]));
};
