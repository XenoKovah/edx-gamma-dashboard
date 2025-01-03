import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../setupTests';
import DataLeaderboardCard from '../../__tests__/__mock__/DataLeaderboardCard.json';
import LeaderboardCard from '../LeaderboardCard';

const BADGES_IN_FULL_LINE = 17;
const { profile, status, rank } = DataLeaderboardCard;

afterEach(cleanup);

describe('<LeaderboardCard>', () => {
  it('renders', () => {
    const { getByTestId } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
        status={status}
        rank={rank}
      />,
    );

    expect(getByTestId('leaderboard-card')).toBeInTheDocument();
  });

  it('renders with an avatar and correct name', () => {
    const { getAllByTestId, getAllByText } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
        status={status}
        rank={rank}
      />,
    );

    const avatars = getAllByTestId('avatar');
    const usernames = getAllByText(profile.user_uid);

    expect(avatars.length).toBe(1);
    expect(usernames.length).toBe(1);
    expect(usernames[0].textContent).toBe(profile.user_uid);
  });

  it('renders with correct `points` value', () => {
    const { getByTestId } = renderWithProviders(
      <LeaderboardCard
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
    const { getAllByTestId } = renderWithProviders(
      <LeaderboardCard
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
    const { getByText } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
        status={testStatus}
        rank={rank}
      />,
    );

    expect(getByText(profile.position)).toBeInTheDocument();
    expect(getByText(testStatus)).toBeInTheDocument();
  });

  it('renders without `points` data', () => {
    const profileWithoutPointsData = { ...profile };

    delete profileWithoutPointsData.points;

    const { getByTestId } = renderWithProviders(
      <LeaderboardCard
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

    const { queryAllByTestId } = renderWithProviders(
      <LeaderboardCard
        profile={profileWithoutBadgesData}
        status={status}
        rank={rank}
      />,
    );
    const badges = queryAllByTestId('leaderboard-badge');

    expect(badges.length).toBe(0);
  });
});
