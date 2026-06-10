import { createBadgeMap } from './mappers';
import { convertKeysToSnakeCase } from './utils';

/**
 * Normalizes user badges into a map keyed by their slug.
 *
 * @param {Array<{ slug: string, [key: string]: any }>} userBadges - Array of user badges.
 * @returns {Object<string, Object>} - A map of user badges keyed by their slug.
 */
const normalizeUserBadges = (userBadges) => Object.fromEntries(userBadges.map((badge) => [badge.slug, badge]));

/**
 * Creates progress details for actions based on their goals and event titles.
 *
 * @param {Object<string, number>} allActions - A map of action slugs to their goal counts.
 * @param {Object<string, string>} eventTitles - A map of action slugs to their titles.
 * @returns {Object<string, {
 *   count: number,
 *   goal: number,
 *   title: string
 * }>} - A map of action slugs to progress details.
 */
const createProgressDetails = (allActions, eventTitles) => Object.fromEntries(
  Object.entries(allActions).map(([actionSlug, goal]) => [
    actionSlug,
    {
      count: 0,
      goal,
      title: eventTitles[actionSlug] || actionSlug,
    },
  ]),
);

/**
 * Merges user progress data into a single object with snake_case keys.
 *
 * @param {Array<{
 *   events: Object<string, {
 *     count: number
 *   }>
 * }>} userProgress - Array of user progress entries.
 * @returns {Object<string, {
 *   count: number
 * }>} - A map of action slugs to progress data with snake_case keys.
 */
const mergeUserProgress = (userProgress) => convertKeysToSnakeCase(
  userProgress.reduce((acc, entry) => {
    Object.entries(entry.events).forEach(([slug, data]) => {
      acc[slug] = data;
    });
    return acc;
  }, {}),
);

/**
 * Extracts event titles from rules configuration.
 *
 * @param {Array<{
 *   eventConfiguration?: {
 *     title: string,
 *     eventType: string
 *   }
 * }>} rules - Array of badge rules
 * @returns {Object<string, string>} Map of event slugs to their titles
 */
const extractEventTitles = (rules) => rules.reduce((titles, { eventConfiguration }) => {
  if (eventConfiguration?.title && eventConfiguration?.eventType) {
    return { ...titles, [eventConfiguration.eventType]: eventConfiguration.title };
  }
  return titles;
}, {});

/**
 * Merges user and system badges into a single structure.
 *
 * @param {Object<string, string>} statusTitles - A map of status slugs to their titles.
 * @param {Object<string, string>} eventTitles - A map of event slugs to their titles.
 * @param {Array<{
 *   slug: string, done: boolean,
 *   progress?: Array<{
 *     events: Object<string, {
 *       count: number
 *     }>
 *   }>
 * }>} userBadges - Array of user badges.
 * @param {Array<{
 *   slug: string,
 *   image: string,
 *   title: string,
 *   isActive: boolean,
 *   rules: Array<{
 *     action: Object<string, number>
 *   }>
 * }>} systemBadges - Array of system badges.
 * @returns {Object<string, {
 *   id: string,
 *   image: string,
 *   title: string,
 *   progress: Object<string, {
 *     count: number,
 *     goal: number,
 *     title: string
 *   }>,
 *   dependencies: Array<string>,
 *   statusDependency: Array<string> | null,
 *   done: boolean,
 *   isActive: boolean
 * }>} - A map of merged badges keyed by their slug.
 */
export const mergeBadges = (
  statusTitles,
  eventTitles,
  userBadges = [],
  systemBadges = [],
) => {
  const normalizedUserBadges = normalizeUserBadges(userBadges);
  const completedUserBadges = Object.fromEntries(
    Object.entries(normalizedUserBadges).filter(([, badge]) => badge.done),
  );

  const badgeMap = createBadgeMap(systemBadges);
  const mergedBadges = { ...completedUserBadges };

  badgeMap.forEach((systemBadge, badgeSlug) => {
    if (!(badgeSlug in completedUserBadges)) {
      const {
        image, title, isActive, rules = [], description = '', manualCriteria = '',
      } = systemBadge;

      const allActions = {};
      const allDependencies = new Set();
      const allStatusDependencies = new Set();
      const eventTitlesMap = extractEventTitles(rules);

      for (const { action = {} } of rules) {
        for (const [slug, goal] of Object.entries(action)) {
          if (!allActions[slug] || allActions[slug] < goal) {
            allActions[slug] = goal;
          }
        }
      }

      const progressDetails = createProgressDetails(allActions, eventTitlesMap);
      const allDependenciesArray = Array.from(allDependencies);
      const allStatusDependenciesArray = Array.from(allStatusDependencies);

      const resolvedDependencies = allDependenciesArray.map((slug) => badgeMap.get(slug)?.title || slug);
      const resolvedStatusDependencies = allStatusDependenciesArray.map((slug) => statusTitles[slug] || slug);

      const badgeDetails = {
        id: badgeSlug,
        image,
        title,
        description,
        manualCriteria,
        progress: progressDetails,
        dependencies: resolvedDependencies,
        statusDependency: resolvedStatusDependencies.length ? resolvedStatusDependencies : null,
        done: false,
        isActive,
      };

      if (badgeSlug in normalizedUserBadges) {
        const userProgress = normalizedUserBadges[badgeSlug].progress;
        const mergedProgress = mergeUserProgress(userProgress);

        for (const slug in progressDetails) {
          if (slug in mergedProgress) {
            badgeDetails.progress[slug].count = mergedProgress[slug].count;
          }
        }
      }

      mergedBadges[badgeSlug] = badgeDetails;
    }
  });

  return mergedBadges;
};
