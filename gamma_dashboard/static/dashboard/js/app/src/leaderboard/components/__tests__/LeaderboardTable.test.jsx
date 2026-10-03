import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../setupTests';
import DataLeaderboardTable from '../../__tests__/__mock__/DataLeaderboardTable.json';
import { LeaderboardTable } from '..';

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
    expect(getByRole('alert')).toBeInTheDocument();
  });

  it.each(DataLeaderboardTable)('renders with correct number of rows', ({
    profiles, system_statuses: systemStatuses, delimiter,
  }) => {
    const { getAllByTestId, getByTestId } = renderWithProviders(
      <LeaderboardTable
        delimiter={delimiter}
        profiles={profiles}
        systemStatuses={systemStatuses}
      />,
    );

    const tableRows = getAllByTestId('leaderboard-card');

    expect(tableRows.length).toBe(profiles.length);
    expect(getByTestId('leaderboard-table-separator')).toBeInTheDocument();
  });

  it('shows "Total Points" by default and a custom header when the board names its own score', () => {
    const [{ profiles }] = DataLeaderboardTable;
    const { getByTestId } = renderWithProviders(<LeaderboardTable profiles={profiles} />);
    expect(getByTestId('leaderboard-table-header')).toHaveTextContent('Total Points');

    cleanup();
    const custom = renderWithProviders(<LeaderboardTable profiles={profiles} pointsHeader="Subtitle Lines Changed" />);
    expect(custom.getByTestId('leaderboard-table-header')).toHaveTextContent('Subtitle Lines Changed');
    expect(custom.getByTestId('leaderboard-table-header')).not.toHaveTextContent('Total Points');
  });
});
