import { groupBadgesByCategory, OTHER_CATEGORY_KEY } from '../utils';

const badge = (title, { category = '', done = false, isActive = true } = {}) => [
  title.toLowerCase().replace(/\s+/g, '-'),
  {
    title, category, done, isActive,
  },
];

describe('groupBadgesByCategory', () => {
  it('returns an empty array when there are no badges', () => {
    expect(groupBadgesByCategory([], 'Other')).toEqual([]);
    expect(groupBadgesByCategory(undefined, 'Other')).toEqual([]);
  });

  it('excludes inactive badges', () => {
    const groups = groupBadgesByCategory([
      badge('Active', { category: 'Learning' }),
      badge('Inactive', { category: 'Learning', isActive: false }),
    ], 'Other');

    expect(groups).toHaveLength(1);
    expect(groups[0].items).toHaveLength(1);
    expect(groups[0].items[0][1].title).toBe('Active');
  });

  it('buckets uncategorized badges under the "Other" label and sorts it last', () => {
    const groups = groupBadgesByCategory([
      badge('No category one'),
      badge('Sharing badge', { category: 'Sharing' }),
      badge('No category two', { category: '   ' }),
    ], 'Other');

    expect(groups.map((g) => g.key)).toEqual(['Sharing', OTHER_CATEGORY_KEY]);
    const other = groups[groups.length - 1];
    expect(other.label).toBe('Other');
    expect(other.items).toHaveLength(2);
  });

  it('sorts categories alphabetically and badges earned-first within a category', () => {
    const groups = groupBadgesByCategory([
      badge('Zeta', { category: 'Volunteering', done: false }),
      badge('Alpha', { category: 'Learning', done: false }),
      badge('Omega', { category: 'Learning', done: true }),
    ], 'Other');

    expect(groups.map((g) => g.label)).toEqual(['Learning', 'Volunteering']);

    const learning = groups[0];
    // Earned "Omega" comes before un-earned "Alpha".
    expect(learning.items.map(([, b]) => b.title)).toEqual(['Omega', 'Alpha']);
    expect(learning.doneCount).toBe(1);
  });
});
