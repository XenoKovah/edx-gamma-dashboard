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

// Separator that nests a category under a parent: "Course Completion / Gold (2 weeks)"
// is the "Gold (2 weeks)" sub-category of "Course Completion". Only one level deep;
// anything after a second separator stays in the sub-category's label.
export const CATEGORY_SEPARATOR = ' / ';

/**
 * Split a raw `Badge.category` into its parent and sub-category names.
 * A category with no separator (or an empty side) has no parent.
 *
 * @param {string} category - Raw, trimmed category.
 * @returns {{ parent: string, child: string }} child is '' for a top-level category.
 */
export const splitCategory = (category) => {
  const at = category.indexOf(CATEGORY_SEPARATOR);
  const parent = at > 0 ? category.slice(0, at).trim() : '';
  const child = at > 0 ? category.slice(at + CATEGORY_SEPARATOR.length).trim() : '';
  return parent && child ? { parent, child } : { parent: category, child: '' };
};

const byLabel = (a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' });

/**
 * Group active badges by their free-text `category` for the All Accomplishments page.
 *
 * Only active badges are included. A category written "Parent / Child" becomes a
 * sub-category (`children`) of the top-level group "Parent"; a top-level group can
 * hold badges of its own (`items`) as well as sub-categories. Sub-category keys are
 * the full raw category, so they round-trip through the ?category= deep link.
 * Badges without a category fall into a single "Other" bucket, always sorted last;
 * everything else is sorted alphabetically. Badges are sorted earned-first.
 * `doneCount`/`totalCount` on a group include its sub-categories.
 *
 * @param {Array<[string, Object]>} badgeItems - Array of [slug, badge] entries.
 * @param {string} otherLabel - Localized label for the uncategorized bucket.
 * @returns {Array<{ key: string, label: string, items: Array, children: Array,
 *   doneCount: number, totalCount: number }>} Ordered groups ready to render.
 */
export const groupBadgesByCategory = (badgeItems = [], otherLabel = 'Other') => {
  const groups = new Map();

  const groupFor = (map, key, label) => {
    if (!map.has(key)) {
      map.set(key, {
        key, label, items: [], children: new Map(),
      });
    }
    return map.get(key);
  };

  badgeItems
    .filter(([, badge]) => badge && badge.isActive)
    .forEach((item) => {
      const category = (item[1].category || '').trim();
      if (!category) {
        groupFor(groups, OTHER_CATEGORY_KEY, otherLabel).items.push(item);
        return;
      }
      const { parent, child } = splitCategory(category);
      const top = groupFor(groups, parent, parent);
      (child ? groupFor(top.children, category, child) : top).items.push(item);
    });

  const finish = (group) => {
    const items = sortBadgesEarnedFirst(group.items);
    const children = Array.from(group.children.values()).map(finish).sort(byLabel);
    const all = [...items, ...children.flatMap((c) => c.items)];
    return {
      key: group.key,
      label: group.label,
      items,
      children,
      doneCount: all.filter(([, badge]) => badge.done).length,
      totalCount: all.length,
    };
  };

  const result = Array.from(groups.values()).map(finish);

  result.sort((a, b) => {
    if (a.key === OTHER_CATEGORY_KEY) { return 1; }
    if (b.key === OTHER_CATEGORY_KEY) { return -1; }
    return byLabel(a, b);
  });

  return result;
};
