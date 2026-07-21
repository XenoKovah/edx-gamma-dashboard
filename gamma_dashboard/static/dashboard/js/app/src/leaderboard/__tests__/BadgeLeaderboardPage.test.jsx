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

  it('shows an Earned section and a ranked In-progress section (with %) when both exist', () => {
    useBadgeLeaderboard.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        badge: {
          slug: '1000-points', title: '1000 Points', description: 'Points Distribution', url: '/media/p.png',
        },
        top10: [
          {
            userUid: 'champion', points: 1200, badges: {}, systemEvents: [],
          },
        ],
        competitors: [],
        rank: null,
        inProgress: [
          {
            userUid: 'mariia', points: 151, badges: {}, systemEvents: [], progressPercent: 15,
          },
          {
            userUid: 'xeno', points: 30, badges: {}, systemEvents: [], progressPercent: 3,
          },
        ],
        inProgressRank: 2,
      },
    });

    const { getByTestId, getAllByTestId, getByText } = renderWithProviders(<BadgeLeaderboardPage />);

    expect(getByTestId('badge-leaderboard-earned-title')).toBeInTheDocument();
    expect(getByTestId('badge-leaderboard-in-progress-title')).toHaveTextContent(
      messages.badgeLeaderboardInProgressSectionTitle.defaultMessage,
    );
    // Two tables: earned + in-progress.
    expect(getAllByTestId('leaderboard-table')).toHaveLength(2);
    // In-progress rows are labelled by their percentage; the earner keeps points,
    // digit-grouped for the locale.
    expect(getByText('15%')).toBeInTheDocument();
    expect(getByText('3%')).toBeInTheDocument();
    expect(getByText('1,200')).toBeInTheDocument();
    expect(getByText('mariia')).toBeInTheDocument();
  });

  it('shows only the In-progress section (no empty alert) when nobody has earned it yet', () => {
    useBadgeLeaderboard.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        badge: {
          slug: '1000-points', title: '1000 Points', description: 'Points Distribution', url: '/media/p.png',
        },
        top10: [],
        competitors: [],
        rank: null,
        inProgress: [
          {
            userUid: 'mariia', points: 151, badges: {}, systemEvents: [], progressPercent: 15,
          },
        ],
        inProgressRank: null,
      },
    });

    const {
      getByTestId, getByText, queryByText, queryByTestId,
    } = renderWithProviders(<BadgeLeaderboardPage />);

    expect(getByTestId('badge-leaderboard-in-progress-title')).toBeInTheDocument();
    expect(queryByTestId('badge-leaderboard-earned-title')).not.toBeInTheDocument();
    expect(getByText('15%')).toBeInTheDocument();
    expect(queryByText(messages.leaderboardEmptyTitle.defaultMessage)).not.toBeInTheDocument();
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

  describe('category link above the badge title', () => {
    const renderWithCategory = (category) => {
      useBadgeLeaderboard.mockReturnValue({
        isLoading: false,
        isError: false,
        data: {
          badge: { ...badge, category }, top10: [], competitors: [], rank: null,
        },
      });

      return renderWithProviders(<BadgeLeaderboardPage />);
    };

    it("links the badge's category to that category on the All Accomplishments page", () => {
      const { getByTestId } = renderWithCategory('Valiant Volunteerism!');

      const link = getByTestId('badge-leaderboard-header-category');
      expect(link).toHaveTextContent('Valiant Volunteerism!');
      // Trailing slash: following this is a full page load, and Django's route
      // is `^accomplishments/` — without it the link only works via a 301.
      expect(link).toHaveAttribute(
        'href',
        '/gamma_dashboard/accomplishments/?category=Valiant%20Volunteerism!',
      );
    });

    it('renders no link for an uncategorised badge', () => {
      const { queryByTestId } = renderWithCategory('');

      expect(queryByTestId('badge-leaderboard-header-category')).not.toBeInTheDocument();
    });

    it('renders no link when Gamma is too old to send the field', () => {
      const { queryByTestId, getByTestId } = renderWithCategory(undefined);

      expect(queryByTestId('badge-leaderboard-header-category')).not.toBeInTheDocument();
      expect(getByTestId('badge-leaderboard-header-title')).toBeInTheDocument();
    });
  });
});
