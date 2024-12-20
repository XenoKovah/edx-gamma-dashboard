import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
import LeaderboardTable from '../LeaderboardTable';
import DataLeaderboardTable from './__mock__/DataLeaderboardTable.json';

afterEach(cleanup);

describe('<LeaderboardTable>', () => {
  it('renders empty with loader', () => {
    const { getByTestId, queryByTestId } = render(<LeaderboardTable />);

    expect(getByTestId('leaderboard-table')).toBeInTheDocument();
    expect(queryByTestId('leaderboard-table-row')).not.toBeInTheDocument();
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it.each(DataLeaderboardTable)('renders with correct number of rows', ({
    profiles, system_statuses, delimiter, rank, // eslint-disable-line camelcase
  }) => {
    const { getAllByTestId, getByTestId } = render(
      <LeaderboardTable
        delimiter={delimiter}
        rank={rank}
        profiles={profiles}
        systemStatuses={system_statuses} // eslint-disable-line camelcase
      />,
    );

    const tableRows = getAllByTestId('leaderboard-table-row');

    expect(tableRows.length).toBe(profiles.length);
    expect(getByTestId('leaderboard-table-separator')).toBeInTheDocument();
  });
});
