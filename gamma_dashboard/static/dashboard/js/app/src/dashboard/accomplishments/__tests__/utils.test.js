import { groupBadgesByCategory, splitCategory, OTHER_CATEGORY_KEY } from '../utils';

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

  it('nests "Parent / Child" categories under a top-level group', () => {
    const groups = groupBadgesByCategory([
      badge('Gold badge', { category: 'Course Completion / Gold (2 weeks)', done: true }),
      badge('Bronze badge', { category: 'Course Completion / Bronze (12 weeks)' }),
      badge('Plain', { category: 'Sharing' }),
    ], 'Other');

    expect(groups.map((g) => g.key)).toEqual(['Course Completion', 'Sharing']);
    const parent = groups[0];
    expect(parent.items).toEqual([]);
    expect(parent.children.map((c) => c.label)).toEqual(['Bronze (12 weeks)', 'Gold (2 weeks)']);
    // Child keys are the full raw category, so ?category= links keep working.
    expect(parent.children.map((c) => c.key)).toEqual([
      'Course Completion / Bronze (12 weeks)',
      'Course Completion / Gold (2 weeks)',
    ]);
    expect(parent.doneCount).toBe(1);
    expect(parent.totalCount).toBe(2);
    expect(groups[1].children).toEqual([]);
  });

  it('lets a parent hold its own badges alongside sub-categories', () => {
    const groups = groupBadgesByCategory([
      badge('Own', { category: 'Fine' }),
      badge('Sub', { category: 'Fine / Arch1001', done: true }),
    ], 'Other');

    expect(groups).toHaveLength(1);
    expect(groups[0].items.map(([, b]) => b.title)).toEqual(['Own']);
    expect(groups[0].children).toHaveLength(1);
    expect(groups[0].totalCount).toBe(2);
    expect(groups[0].doneCount).toBe(1);
  });

  it('does not split on a bare slash or an empty side', () => {
    expect(splitCategory('Read/Write')).toEqual({ parent: 'Read/Write', child: '' });
    expect(splitCategory(' / Child')).toEqual({ parent: ' / Child', child: '' });
  });
});
