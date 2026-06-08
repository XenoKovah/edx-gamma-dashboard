import { getBadgeLeaderboardTableProps, getLeaderboardTableProps } from '../utils';
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

  it('handles an empty / missing payload without throwing', () => {
    expect(getBadgeLeaderboardTableProps()).toEqual({ rank: 0, delimiter: null, profiles: [] });
    expect(getBadgeLeaderboardTableProps({ top10: [], rank: null })).toEqual({
      rank: 0,
      delimiter: null,
      profiles: [],
    });
  });
});
