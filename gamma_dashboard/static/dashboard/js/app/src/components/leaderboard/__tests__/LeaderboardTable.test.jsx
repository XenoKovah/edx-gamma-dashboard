import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../setupTests';
import LeaderboardTable from '../LeaderboardTable';
import DataLeaderboardTable from './__mock__/DataLeaderboardTable.json';

afterEach(cleanup);

describe('<LeaderboardTable>', () => {
  it('renders empty with loader', () => {
    const {
      getByTestId,
      queryByTestId,
      getByRole,
    } = renderWithProviders(<LeaderboardTable />);

    expect(getByTestId('leaderboard-table')).toBeInTheDocument();
    expect(queryByTestId('leaderboard-card')).not.toBeInTheDocument();
    expect(getByRole('status')).toBeInTheDocument();
  });

  it.each(DataLeaderboardTable)('renders with correct number of rows', ({
    profiles, system_statuses: systemStatuses, delimiter, rank,
  }) => {
    const { getAllByTestId, getByTestId } = renderWithProviders(
      <LeaderboardTable
        delimiter={delimiter}
        rank={rank}
        profiles={profiles}
        systemStatuses={systemStatuses}
      />,
    );

    const tableRows = getAllByTestId('leaderboard-card');

    expect(tableRows.length).toBe(profiles.length);
    expect(getByTestId('leaderboard-table-separator')).toBeInTheDocument();
  });
});
