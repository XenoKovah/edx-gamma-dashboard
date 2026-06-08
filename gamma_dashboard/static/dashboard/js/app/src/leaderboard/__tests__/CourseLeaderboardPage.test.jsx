import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../setupTests';
import { useCourseLeaderboard } from '../../api/hooks/useCourseLeaderboard';
import CourseLeaderboardPage from '../CourseLeaderboardPage';

import messages from '../../i18n';

jest.mock('../../api/hooks/useCourseLeaderboard');

afterEach(cleanup);

describe('<CourseLeaderboardPage>', () => {
  it('renders a Completed section (by points) and an In-progress section (by grade %)', () => {
    useCourseLeaderboard.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        top10: [
          {
            userUid: 'finisher', points: 900, badges: {}, systemEvents: [],
          },
        ],
        competitors: [],
        rank: null,
        inProgress: [
          {
            userUid: 'midway', points: 0, badges: {}, systemEvents: [], progressPercent: 42,
          },
          {
            userUid: 'starter', points: 0, badges: {}, systemEvents: [], progressPercent: 9,
          },
        ],
        inProgressRank: null,
      },
    });

    const { getByTestId, getAllByTestId, getByText } = renderWithProviders(<CourseLeaderboardPage />);

    expect(getByTestId('course-leaderboard-completed-title')).toHaveTextContent(
      messages.courseLeaderboardCompletedSectionTitle.defaultMessage,
    );
    expect(getByTestId('course-leaderboard-in-progress-title')).toHaveTextContent(
      messages.badgeLeaderboardInProgressSectionTitle.defaultMessage,
    );
    expect(getAllByTestId('leaderboard-table')).toHaveLength(2);
    // Completed shows points; in-progress shows the grade percentage.
    expect(getByText('900')).toBeInTheDocument();
    expect(getByText('42%')).toBeInTheDocument();
    expect(getByText('9%')).toBeInTheDocument();
    expect(getByText('finisher')).toBeInTheDocument();
  });

  it('renders the loading state', () => {
    useCourseLeaderboard.mockReturnValue({ isLoading: true });

    const { getByRole } = renderWithProviders(<CourseLeaderboardPage />);

    expect(getByRole('status')).toBeInTheDocument();
  });

  it('shows the empty state when there are no learners', () => {
    useCourseLeaderboard.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        top10: [], competitors: [], rank: null, inProgress: [], inProgressRank: null,
      },
    });

    const { getByText } = renderWithProviders(<CourseLeaderboardPage />);

    expect(getByText(messages.leaderboardEmptyTitle.defaultMessage)).toBeInTheDocument();
  });
});
