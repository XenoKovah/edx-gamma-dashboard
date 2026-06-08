import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../setupTests';
import { useBadgeLeaderboard } from '../../api/hooks/useBadgeLeaderboard';
import BadgeLeaderboardPage from '../BadgeLeaderboardPage';

import messages from '../../i18n';

jest.mock('../../api/hooks/useBadgeLeaderboard');

afterEach(cleanup);

const badge = {
  slug: 'firmware-master-level-1',
  title: 'Firmware Master Level 1',
  description: 'Complete Arch4001',
  url: '/media/uploads/badges/firmware.png',
};

describe('<BadgeLeaderboardPage>', () => {
  it('renders the badge header (title, image, description) and the ranked earners', () => {
    useBadgeLeaderboard.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        badge,
        top10: [
          {
            userUid: 'alice', points: 500, badges: {}, systemEvents: [],
          },
          {
            userUid: 'bob', points: 300, badges: {}, systemEvents: [],
          },
        ],
        competitors: [],
        rank: 1,
      },
    });

    const { getByTestId, getAllByTestId, getByText } = renderWithProviders(<BadgeLeaderboardPage />);

    expect(getByTestId('badge-leaderboard-header-title')).toHaveTextContent(badge.title);
    expect(getByTestId('badge-leaderboard-header-description')).toHaveTextContent(badge.description);
    expect(getByTestId('badge-leaderboard-header-image')).toBeInTheDocument();

    expect(getByTestId('leaderboard-table')).toBeInTheDocument();
    expect(getAllByTestId('leaderboard-card')).toHaveLength(2);
    expect(getByText('alice')).toBeInTheDocument();
    expect(getByText('bob')).toBeInTheDocument();
  });

  it('renders the loading state', () => {
    useBadgeLeaderboard.mockReturnValue({ isLoading: true });

    const { getByRole } = renderWithProviders(<BadgeLeaderboardPage />);

    expect(getByRole('status')).toBeInTheDocument();
  });

  it('renders a 404 alert when the badge is not found', () => {
    useBadgeLeaderboard.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { status: 404, message: 'Badge not found.' },
    });

    const { getByText } = renderWithProviders(<BadgeLeaderboardPage />);

    expect(getByText('Badge not found.')).toBeInTheDocument();
  });

  it('renders a generic error alert on other failures', () => {
    useBadgeLeaderboard.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { status: 500 },
    });

    const { getByText } = renderWithProviders(<BadgeLeaderboardPage />);

    expect(getByText(messages.genericErrorFallbackTitle.defaultMessage)).toBeInTheDocument();
  });
});
