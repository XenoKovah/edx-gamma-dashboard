import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { waitFor, cleanup } from '@testing-library/react';

import DataLeaderboardPage from './__mock__/DataLeaderboardPage.json';
import { LEADERBOARD_URLS } from '../../api/constants';
import { renderWithProviders } from '../../setupTests';
import LeaderboardPage from '../LeaderboardPage';

import messages from '../../i18n';

jest.mock('axios');

describe('<LeaderboardPage>', () => {
  beforeEach(cleanup);

  const renderComponent = () => renderWithProviders(<LeaderboardPage />);

  describe('Rendering', () => {
    it('should render the page title correctly', async () => {
      axios.get.mockResolvedValueOnce({ data: DataLeaderboardPage[0].state });

      const { getByTestId } = renderComponent();

      await waitFor(() => {
        const pageTitle = getByTestId('leaderboard-page-title');
        expect(pageTitle).toBeInTheDocument();
        expect(pageTitle).toHaveTextContent('Leaderboard');
      });
    });

    it('should render loading state initially', () => {
      axios.get.mockImplementation(() => new Promise(() => {}));

      const { getByRole } = renderComponent();

      expect(getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Data fetching and display', () => {
    describe('Leaderboard data rendering', () => {
      it('should render leaderboard with top 10 players and user rank', async () => {
        const mockData = {
          top10: [
            { user_uid: 'player1', points: 100 },
            { user_uid: 'player2', points: 90 },
            { user_uid: 'player3', points: 80 },
          ],
          competitors: [],
          rank: 1,
          user_uid: 'player1',
          systemStatuses: [],
        };
        axios.get.mockResolvedValueOnce({ data: mockData });

        const { getByTestId, getByText } = renderComponent();

        await waitFor(() => {
          expect(axios.get).toHaveBeenCalledWith(LEADERBOARD_URLS().getInfo);
          expect(getByTestId('leaderboard-table')).toBeInTheDocument();

          mockData.top10.forEach(player => {
            expect(getByText(player.user_uid)).toBeInTheDocument();
            expect(getByText(player.points.toString())).toBeInTheDocument();
          });
        });
      });

      it('should render leaderboard with empty top 10', async () => {
        const mockData = {
          top10: [],
          competitors: [],
          rank: null,
          user_uid: 'player1',
          systemStatuses: [],
        };
        axios.get.mockResolvedValueOnce({ data: mockData });

        const { getByTestId } = renderComponent();

        await waitFor(() => {
          expect(getByTestId('leaderboard-table')).toBeInTheDocument();
        });
      });

      it('should render user profile image when available', async () => {
        const mockData = {
          top10: [{
            user_uid: 'player1',
            points: 100,
            url_profile_image: '/path/to/image.jpg',
          }],
          competitors: [],
          rank: 1,
          user_uid: 'player1',
          url_profile_image: '/path/to/image.jpg',
          systemStatuses: [],
        };
        axios.get.mockResolvedValueOnce({ data: mockData });

        const { getByAltText } = renderComponent();

        await waitFor(() => {
          const profileImage = getByAltText(`${mockData.user_uid} profile image`);
          expect(profileImage).toBeInTheDocument();
          expect(profileImage).toHaveAttribute('src', mockData.url_profile_image);
        });
      });
    });

    it('should handle API errors gracefully', async () => {
      const errorMessage = 'Failed to fetch leaderboard data';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      const { getByText } = renderComponent();

      await waitFor(() => {
        expect(getByText(messages.genericErrorFallbackTitle.defaultMessage)).toBeInTheDocument();
      });
    });
  });
});
