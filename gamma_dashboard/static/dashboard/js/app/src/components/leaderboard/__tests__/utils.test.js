import { getLeaderboardTableProps } from '../utils';
import DataLeaderboardPage from './__mock__/DataLeaderboardPage.json';

describe('getLeaderboardTableProps', () => {
  it.each(DataLeaderboardPage)('should return the correct props for given parameters', ({ state, expectedProps }) => {
    const result = getLeaderboardTableProps(state);

    expect(result).toEqual(expectedProps);
  });
});
