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
 * Extract the numeric goal from a rule action value. Gamma stores it as
 * `{ count: N }` (or occasionally `{ points: N }`); tolerate a bare number too.
 *
 * @param {number|{count?: number, points?: number}} goal - The action goal value.
 * @returns {number} The numeric goal (0 when it can't be read).
 */
const getGoalCount = (goal) => {
  if (goal && typeof goal === 'object') {
    return goal.count || goal.points || 0;
  }
  return Number(goal) || 0;
};

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
      // A badge can carry several rules that share one event slug (e.g. a
      // multi-course certificate badge with one rule per course). Sum their
      // counts so the numerator reflects total progress across all of them
      // rather than overwriting with just the last rule's count.
      if (!acc[slug]) {
        acc[slug] = { ...data };
      } else {
        acc[slug] = { ...acc[slug], count: (acc[slug].count || 0) + (data.count || 0) };
      }
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

  // Earned badges come from the user's achievements, which don't carry the badge's
  // free-text `category`. Backfill it from the matching system badge so the
  // "All Accomplishments" page can group earned and un-earned badges alike.
  Object.entries(mergedBadges).forEach(([badgeSlug, badge]) => {
    mergedBadges[badgeSlug] = {
      ...badge,
      category: badge.category || badgeMap.get(badgeSlug)?.category || '',
    };
  });

  badgeMap.forEach((systemBadge, badgeSlug) => {
    if (!(badgeSlug in completedUserBadges)) {
      const {
        image, title, isActive, rules = [], description = '', manualCriteria = '', category = '',
      } = systemBadge;

      const allActions = {};
      const allDependencies = new Set();
      const allStatusDependencies = new Set();
      const eventTitlesMap = extractEventTitles(rules);

      // Each rule is a distinct requirement. Rules that share an event slug —
      // e.g. a multi-course certificate badge with one "Get a Course Certificate"
      // rule per course (OR-variants collapsed into a single list-filter rule) —
      // accumulate, so the goal reflects the total number of requirements
      // (3 certificates shows 0/3, not 0/1). The goal is kept as a `{ count }`
      // object because the popover/ring read `goal.count`.
      for (const { action = {} } of rules) {
        for (const [slug, goal] of Object.entries(action)) {
          const goalCount = getGoalCount(goal);
          if (!allActions[slug]) {
            allActions[slug] = { count: goalCount };
          } else {
            allActions[slug].count += goalCount;
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
        category,
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
