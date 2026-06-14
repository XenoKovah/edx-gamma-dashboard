import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../setupTests';
import DataLeaderboardCard from '../../__tests__/__mock__/DataLeaderboardCard.json';
import LeaderboardCard from '../LeaderboardCard';

import { convertKeysToCamelCase } from '../../../api/helpers/utils';

const BADGES_IN_FULL_LINE = 17;
const { profile, rank } = convertKeysToCamelCase(DataLeaderboardCard);

afterEach(cleanup);

describe('<LeaderboardCard>', () => {
  it('renders', () => {
    const { getByTestId } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
        rank={rank}
      />,
    );

    expect(getByTestId('leaderboard-card')).toBeInTheDocument();
  });

  it('renders with an avatar and correct name', () => {
    const { getAllByTestId, getAllByText } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
        rank={rank}
      />,
    );

    const avatars = getAllByTestId('avatar');
    const usernames = getAllByText(profile.userUid);

    expect(avatars.length).toBe(1);
    expect(usernames.length).toBe(1);
    expect(usernames[0].textContent).toBe(profile.userUid);
  });

  it('renders with correct `points` value', () => {
    const { getByTestId } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
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
        rank={rank}
      />,
    );

    const badges = getAllByTestId('leaderboard-badge');

    expect(badges.length).toBe(BADGES_IN_FULL_LINE);
  });

  it('renders with status', () => {
    const { getByText } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
        rank={rank}
      />,
    );

    expect(getByText(profile.position)).toBeInTheDocument();
  });

  it('renders without `points` data', () => {
    const profileWithoutPointsData = { ...profile };

    delete profileWithoutPointsData.points;

    const { getByTestId } = renderWithProviders(
      <LeaderboardCard
        profile={profileWithoutPointsData}
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
        rank={rank}
      />,
    );
    const badges = queryAllByTestId('leaderboard-badge');

    expect(badges.length).toBe(0);
  });

  it('renders the username as a link to the profile page when `profileUrl` is provided', () => {
    const profileUrl = 'https://apps.example.com/profile/u/username';
    const { getByTestId } = renderWithProviders(
      <LeaderboardCard
        profile={{ ...profile, profileUrl }}
        rank={rank}
      />,
    );

    const usernameLink = getByTestId('leaderboard-card-username-link');

    expect(usernameLink).toHaveAttribute('href', profileUrl);
    expect(usernameLink.textContent).toBe(profile.userUid);
  });

  it('renders the username as plain text when no `profileUrl` is provided', () => {
    const { queryByTestId, getByText } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
        rank={rank}
      />,
    );

    expect(queryByTestId('leaderboard-card-username-link')).not.toBeInTheDocument();
    expect(getByText(profile.userUid)).toBeInTheDocument();
  });

  it('renders a country flag linking to the per-country leaderboard when `country` is set', () => {
    const { getByTestId } = renderWithProviders(
      <LeaderboardCard
        profile={{ ...profile, country: 'US' }}
        rank={rank}
      />,
    );

    const flagLink = getByTestId('leaderboard-card-country-link');

    expect(flagLink).toBeInTheDocument();
    expect(flagLink).toHaveAttribute('href', expect.stringContaining('/leaderboard/country/US'));
    expect(flagLink.textContent).toBe('🇺🇸');
  });

  it('renders no country flag when `country` is absent', () => {
    const { queryByTestId } = renderWithProviders(
      <LeaderboardCard
        profile={{ ...profile, country: '' }}
        rank={rank}
      />,
    );

    expect(queryByTestId('leaderboard-card-country-link')).not.toBeInTheDocument();
  });
});
