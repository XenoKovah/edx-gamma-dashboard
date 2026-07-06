// Group key used to bucket badges that have no `category` assigned.
export const OTHER_CATEGORY_KEY = '__other__';

/**
 * Sort badge entries so earned (done) badges come first, then alphabetically by
 * title within each group. Mirrors the ordering the dashboard uses elsewhere.
 *
 * @param {Array<[string, Object]>} badges - Array of [slug, badge] entries.
 * @returns {Array<[string, Object]>} - A new, sorted array.
 */
export const sortBadgesEarnedFirst = (badges) => [...badges].sort(([, a], [, b]) => {
  if (Boolean(a.done) !== Boolean(b.done)) {
    return a.done ? -1 : 1;
  }
  return (a.title || '').localeCompare(b.title || '', undefined, { sensitivity: 'base' });
});

/**
 * Group active badges by their free-text `category` for the All Accomplishments page.
 *
 * Only active badges are included. Badges without a category fall into a single
 * "Other" bucket, which is always sorted last; the remaining categories are sorted
 * alphabetically. Badges within each group are sorted earned-first.
 *
 * @param {Array<[string, Object]>} badgeItems - Array of [slug, badge] entries.
 * @param {string} otherLabel - Localized label for the uncategorized bucket.
 * @returns {Array<{ key: string, label: string, items: Array<[string, Object]> }>}
 *   Ordered groups ready to render.
 */
export const groupBadgesByCategory = (badgeItems = [], otherLabel = 'Other') => {
  const groups = new Map();

  badgeItems
    .filter(([, badge]) => badge && badge.isActive)
    .forEach((item) => {
      const category = (item[1].category || '').trim();
      const key = category || OTHER_CATEGORY_KEY;

      if (!groups.has(key)) {
        groups.set(key, { key, label: category || otherLabel, items: [] });
      }
      groups.get(key).items.push(item);
    });

  const result = Array.from(groups.values()).map((group) => ({
    ...group,
    items: sortBadgesEarnedFirst(group.items),
    doneCount: group.items.filter(([, badge]) => badge.done).length,
  }));

  result.sort((a, b) => {
    if (a.key === OTHER_CATEGORY_KEY) { return 1; }
    if (b.key === OTHER_CATEGORY_KEY) { return -1; }
    return a.label.localeCompare(b.label, undefined, { sensitivity: 'base' });
  });

  return result;
};
