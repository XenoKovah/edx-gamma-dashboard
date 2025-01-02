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
