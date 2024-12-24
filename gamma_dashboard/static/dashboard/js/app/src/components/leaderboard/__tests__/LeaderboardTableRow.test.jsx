import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import LeaderboardTableRow from '../LeadeboardTableRow';
import DataLeaderboardTableRow from './__mock__/DataLeaderboardTableRow.json';

afterEach(cleanup);

const BADGES_IN_FULL_LINE = 17;
const { profile, status, rank } = DataLeaderboardTableRow;

describe('<LeaderboardTableRow>', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <LeaderboardTableRow
        profile={profile}
        status={status}
        rank={rank}
      />,
    );

    expect(getByTestId('leaderboard-table-row')).toBeInTheDocument();
  });

  it('renders with an avatar and correct name', () => {
    const { getAllByTestId } = render(
      <LeaderboardTableRow
        profile={profile}
        status={status}
        rank={rank}
      />,
    );

    const avatars = getAllByTestId('avatar');
    const usernames = getAllByTestId('username');

    expect(avatars.length).toBe(1);
    expect(usernames.length).toBe(1);
    expect(usernames[0].textContent).toBe(profile.user_uid);
  });

  it('renders with correct `points` value', () => {
    const { getByTestId } = render(
      <LeaderboardTableRow
        profile={profile}
        status={status}
        rank={rank}
      />,
    );

    const progressCell = getByTestId('progress-cell');
    const expectedProgressText = `${profile.points}`;

    expect(progressCell.textContent).toBe(expectedProgressText);
  });

  it(`renders ${BADGES_IN_FULL_LINE} badges`, () => {
    const { getAllByTestId } = render(
      <LeaderboardTableRow
        profile={profile}
        status={status}
        rank={rank}
      />,
    );

    const badges = getAllByTestId('leaderboard-badge');

    expect(badges.length).toBe(BADGES_IN_FULL_LINE);
  });

  it('renders with status', () => {
    const testStatus = 'Test Status';
    const { getByTestId } = render(
      <LeaderboardTableRow
        profile={profile}
        status={testStatus}
        rank={rank}
      />,
    );

    const userStatus = getByTestId('userstatus');

    expect(userStatus).toBeInTheDocument();
    expect(userStatus).toHaveTextContent(testStatus);
  });

  it('renders without `user_uid` data', () => {
    const profileWithoutUserUID = { ...profile };

    delete profileWithoutUserUID.user_uid;

    const { getByTestId } = render(
      <LeaderboardTableRow
        profile={profileWithoutUserUID}
        status={status}
        rank={rank}
      />,
    );
    const username = getByTestId('username');

    expect(username.textContent).toBe('');
  });

  it('renders without `points` data', () => {
    const profileWithoutPointsData = { ...profile };

    delete profileWithoutPointsData.points;

    const { getByTestId } = render(
      <LeaderboardTableRow
        profile={profileWithoutPointsData}
        status={status}
        rank={rank}
      />,
    );
    const progress = getByTestId('progress-cell');

    const expectedProgress = '0';

    expect(progress.textContent).toBe(expectedProgress);
  });

  it('renders without `badges` data', () => {
    const profileWithoutBadgesData = { ...profile };

    delete profileWithoutBadgesData.badges;

    const { queryAllByTestId } = render(
      <LeaderboardTableRow
        profile={profileWithoutBadgesData}
        status={status}
        rank={rank}
      />,
    );
    const badges = queryAllByTestId('leaderboard-badge');

    expect(badges.length).toBe(0);
  });
});
