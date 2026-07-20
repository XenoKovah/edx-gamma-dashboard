import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../setupTests';
import DataLeaderboardCard from '../../__tests__/__mock__/DataLeaderboardCard.json';
import LeaderboardCard from '../LeaderboardCard';

import { convertKeysToCamelCase } from '../../../api/helpers/utils';

const BADGES_IN_FULL_LINE = 17;
const { profile } = convertKeysToCamelCase(DataLeaderboardCard);

afterEach(cleanup);

describe('<LeaderboardCard>', () => {
  it('renders', () => {
    const { getByTestId } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
      />,
    );

    expect(getByTestId('leaderboard-card')).toBeInTheDocument();
  });

  it('renders with an avatar and correct name', () => {
    const { getAllByTestId, getAllByText } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
      />,
    );

    const avatars = getAllByTestId('avatar');
    const usernames = getAllByText(profile.userUid);

    expect(avatars.length).toBe(1);
    expect(usernames.length).toBe(1);
    expect(usernames[0].textContent).toBe(profile.userUid);
  });

  it('renders the `points` value digit-grouped for the locale', () => {
    const { getByTestId } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
      />,
    );

    const progressCell = getByTestId('progress-cell');
    // The mock profile scores 10000; under the test locale (en) the thousands
    // separator is what distinguishes this from a raw stringified number.
    const expectedProgressText = '10,000';

    expect(progressCell.textContent).toBe(expectedProgressText);
  });

  it(`renders ${BADGES_IN_FULL_LINE} badges`, () => {
    const { getAllByTestId } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
      />,
    );

    const badges = getAllByTestId('leaderboard-badge');

    expect(badges.length).toBe(BADGES_IN_FULL_LINE);
  });

  it('renders with status', () => {
    const { getByText } = renderWithProviders(
      <LeaderboardCard
        profile={profile}
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
      />,
    );

    expect(queryByTestId('leaderboard-card-username-link')).not.toBeInTheDocument();
    expect(getByText(profile.userUid)).toBeInTheDocument();
  });

  it('renders a country flag linking to the per-country leaderboard when `country` is set', () => {
    const { getByTestId } = renderWithProviders(
      <LeaderboardCard
        profile={{ ...profile, country: 'US' }}
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
      />,
    );

    expect(queryByTestId('leaderboard-card-country-link')).not.toBeInTheDocument();
  });

  it('highlights the row when it belongs to the current user', () => {
    const { getByTestId } = renderWithProviders(
      <LeaderboardCard profile={profile} currentUserUid={profile.userUid} />,
    );

    expect(getByTestId('leaderboard-card')).toHaveClass('highlighted');
  });

  it('does not highlight a row that belongs to another user', () => {
    const { getByTestId } = renderWithProviders(
      <LeaderboardCard profile={profile} currentUserUid="someone-else" />,
    );

    expect(getByTestId('leaderboard-card')).not.toHaveClass('highlighted');
  });

  it('does not highlight any row when there is no current user', () => {
    const { getByTestId } = renderWithProviders(
      <LeaderboardCard profile={profile} />,
    );

    expect(getByTestId('leaderboard-card')).not.toHaveClass('highlighted');
  });
});
