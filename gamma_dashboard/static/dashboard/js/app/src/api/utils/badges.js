/**
 * Recursively transforms the keys of an object or array using a given transformation function.
 *
 * @param {any} data - The input data to transform (can be an object, array, or primitive).
 * @param {function(string): string} transformFn - The function to apply to each key.
 * @returns {any} - The transformed object or array with updated keys.
 */
const transformObjectKeys = (data, transformFn) => {
  if (Array.isArray(data)) {
    return data.map(item => transformObjectKeys(item, transformFn));
  }
  if (data && typeof data === 'object') {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (key === 'action') {
        acc[key] = value;
      } else {
        const transformedKey = transformFn(key);
        acc[transformedKey] = transformObjectKeys(value, transformFn);
      }
      return acc;
    }, {});
  }
  return data;
};

/**
 * Converts a snake_case string to camelCase.
 *
 * @param {string} str - The snake_case string to convert.
 * @returns {string} - The converted camelCase string.
 */
export const toCamelCase = (str) => str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

/**
 * Converts a camelCase string to snake_case.
 *
 * @param {string} str - The camelCase string to convert.
 * @returns {string} - The converted snake_case string.
 */
export const toSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

/**
 * Converts all object keys to camelCase recursively.
 *
 * @param {any} data - The input data (can be an object, array, or primitive).
 * @returns {any} - The transformed object or array with camelCase keys.
 */
export const convertKeysToCamelCase = (data) => transformObjectKeys(data, toCamelCase);

/**
 * Converts all object keys to snake_case recursively.
 *
 * @param {any} data - The input data (can be an object, array, or primitive).
 * @returns {any} - The transformed object or array with snake_case keys.
 */
export const convertKeysToSnakeCase = (data) => transformObjectKeys(data, toSnakeCase);

/**
 * Creates a map of system badges keyed by their slugs.
 *
 * @param {Array<{ slug: string, [key: string]: any }>} badges - List of system badges.
 * @returns {Map<string, Object>} - A map where the key is the badge slug and the value is the badge object.
 */
export const createBadgeMap = (badges) => new Map(badges.map((badge) => [badge.slug, badge]));

/**
 * Merges user and system badges into a unified structure.
 *
 * @param {Object<string, string>} statusTitles - Mapping of status slugs to their titles.
 * @param {Object<string, string>} eventTitles - Mapping of event types to their titles.
 * @param {Object<string, Object>} userBadges - User-specific badges keyed by slug.
 * @param {Array<Object>} systemBadges - List of system-defined badges.
 * @returns {Object<string, Object>} - Merged badge data keyed by slug.
 */
export const mergeBadges = (
  statusTitles,
  eventTitles,
  userBadges = {},
  systemBadges = [],
) => {
  const completedUserBadges = Object.fromEntries(
    Object.entries(userBadges).filter(([, badge]) => badge.done),
  );

  const badgeMap = createBadgeMap(systemBadges);
  const mergedBadges = { ...completedUserBadges };

  badgeMap.forEach((systemBadge, badgeSlug) => {
    if (!(badgeSlug in completedUserBadges)) {
      const { url, title, rules = {} } = systemBadge;
      const { actions = {}, badges: dependencyBadges = [], status_badge: statusDependencySlug = '' } = rules;

      const progressDetails = Object.fromEntries(
        Object.entries(actions).map(([actionSlug, goal]) => [
          actionSlug,
          {
            count: 0,
            goal,
            title: eventTitles[actionSlug] || actionSlug,
          },
        ]),
      );

      const resolvedDependencies = dependencyBadges.map(
        (dependencySlug) => badgeMap.get(dependencySlug)?.title || dependencySlug,
      );

      const badgeDetails = {
        id: badgeSlug,
        url,
        title,
        progress: progressDetails,
        dependencies: resolvedDependencies,
        statusDependency: statusTitles[statusDependencySlug] || statusDependencySlug,
        done: false,
      };

      if (badgeSlug in userBadges) {
        const userBadgeProgress = userBadges[badgeSlug].progress;
        Object.keys(progressDetails).forEach((actionSlug) => {
          if (actionSlug in userBadgeProgress) {
            badgeDetails.progress[actionSlug].count = userBadgeProgress[actionSlug].count;
          }
        });
      }

      mergedBadges[badgeSlug] = badgeDetails;
    }
  });

  return mergedBadges;
};
