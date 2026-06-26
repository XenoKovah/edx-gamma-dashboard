import {
  countryCodeToFlag,
  getBadgeInProgressProps,
  getBadgeLeaderboardTableProps,
  getLeaderboardTableProps,
} from '../utils';
import DataLeaderboardPage from './__mock__/DataLeaderboardPage.json';

describe('getLeaderboardTableProps', () => {
  it.each(DataLeaderboardPage)('should return the correct props for given parameters', ({ state, expectedProps }) => {
    const result = getLeaderboardTableProps(state);

    expect(result).toEqual(expectedProps);
  });
});

describe('getBadgeLeaderboardTableProps', () => {
  it('assigns sequential positions to the earners and keeps the user rank for highlighting', () => {
    const result = getBadgeLeaderboardTableProps({
      top10: [
        { userUid: 'alice', points: 500 },
        { userUid: 'bob', points: 300 },
        { userUid: 'carol', points: 100 },
      ],
      competitors: [],
      rank: 2,
    });

    expect(result).toEqual({
      rank: 2,
      delimiter: null,
      profiles: [
        { userUid: 'alice', points: 500, position: 1 },
        { userUid: 'bob', points: 300, position: 2 },
        { userUid: 'carol', points: 100, position: 3 },
      ],
    });
  });

  it('gives earners tied on points the same position with no gaps (dense)', () => {
    const result = getBadgeLeaderboardTableProps({
      top10: [
        { userUid: 'alice', points: 500 },
        { userUid: 'bob', points: 500 },
        { userUid: 'carol', points: 100 },
      ],
      competitors: [],
      rank: 1,
    });

    expect(result.profiles.map((profile) => profile.position)).toEqual([1, 1, 2]);
  });

  it('handles an empty / missing payload without throwing', () => {
    expect(getBadgeLeaderboardTableProps()).toEqual({ rank: 0, delimiter: null, profiles: [] });
    expect(getBadgeLeaderboardTableProps({ top10: [], rank: null })).toEqual({
      rank: 0,
      delimiter: null,
      profiles: [],
    });
  });
});

describe('getBadgeInProgressProps', () => {
  it('assigns positions to in-progress members and keeps their rank/percentages', () => {
    const result = getBadgeInProgressProps({
      inProgress: [
        { userUid: 'mariia', points: 151, progressPercent: 15 },
        { userUid: 'xeno', points: 30, progressPercent: 3 },
      ],
      inProgressRank: 2,
    });

    expect(result).toEqual({
      rank: 2,
      delimiter: null,
      profiles: [
        {
          userUid: 'mariia', points: 151, progressPercent: 15, position: 1,
        },
        {
          userUid: 'xeno', points: 30, progressPercent: 3, position: 2,
        },
      ],
    });
  });

  it('gives in-progress members tied on percentage the same position, ignoring points', () => {
    const result = getBadgeInProgressProps({
      inProgress: [
        { userUid: 'mariia', points: 999, progressPercent: 15 },
        { userUid: 'xeno', points: 1, progressPercent: 15 },
        { userUid: 'sam', points: 500, progressPercent: 3 },
      ],
      inProgressRank: 1,
    });

    // Same percentage -> same position even though points differ; next value is +1 (dense).
    expect(result.profiles.map((profile) => profile.position)).toEqual([1, 1, 2]);
  });

  it('handles an empty / missing payload without throwing', () => {
    expect(getBadgeInProgressProps()).toEqual({ rank: 0, delimiter: null, profiles: [] });
    expect(getBadgeInProgressProps({ inProgress: [], inProgressRank: null })).toEqual({
      rank: 0,
      delimiter: null,
      profiles: [],
    });
  });
});

describe('countryCodeToFlag', () => {
  it('converts a 2-letter ISO code to its flag emoji', () => {
    expect(countryCodeToFlag('US')).toBe('🇺🇸');
    expect(countryCodeToFlag('JP')).toBe('🇯🇵');
  });

  it('is case-insensitive and trims surrounding whitespace', () => {
    expect(countryCodeToFlag('us')).toBe('🇺🇸');
    expect(countryCodeToFlag(' jp ')).toBe('🇯🇵');
  });

  it('returns an empty string for missing or invalid codes', () => {
    expect(countryCodeToFlag('')).toBe('');
    expect(countryCodeToFlag(null)).toBe('');
    expect(countryCodeToFlag(undefined)).toBe('');
    expect(countryCodeToFlag('U')).toBe('');
    expect(countryCodeToFlag('USA')).toBe('');
    expect(countryCodeToFlag('1!')).toBe('');
  });
});
