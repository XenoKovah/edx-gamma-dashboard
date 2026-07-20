import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { waitFor, cleanup, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../setupTests';
import { HIDE_INSTRUCTORS_STORAGE_KEY } from '../hooks';
import { getLeaderboardTableProps } from '../utils';
import LeaderboardPage from '../LeaderboardPage';
import BadgeLeaderboardPage from '../BadgeLeaderboardPage';

jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ badgeSlug: 'some-badge' }),
}));

/**
 * The board as everyone sees it: two instructors between the learners.
 */
const fullBoard = {
  top10: [
    { user_uid: 'instructor_one', points: 900 },
    { user_uid: 'learner_a', points: 800 },
    { user_uid: 'instructor_two', points: 700 },
    { user_uid: 'learner_b', points: 600 },
  ],
  competitors: [],
  rank: 4,
  user_uid: 'learner_b',
  viewer_hidden: false,
};

/**
 * The same board without instructors — note ``learner_c``, who the instructors were
 * keeping off the bottom of the list, and the viewer's rank closing up from 4 to 2.
 */
const learnersOnlyBoard = {
  top10: [
    { user_uid: 'learner_a', points: 800 },
    { user_uid: 'learner_b', points: 600 },
    { user_uid: 'learner_c', points: 500 },
  ],
  competitors: [],
  rank: 2,
  user_uid: 'learner_b',
  viewer_hidden: false,
};

describe('Hiding instructors from a leaderboard', () => {
  beforeEach(() => {
    cleanup();
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  describe('the toggle', () => {
    it('offers to hide instructors, and to show them again once hidden', async () => {
      axios.get.mockResolvedValue({ data: fullBoard });

      const { getByTestId } = renderWithProviders(<LeaderboardPage />);

      await waitFor(() => expect(getByTestId('leaderboard-hide-instructors-btn')).toHaveTextContent(
        'Hide Instructors',
      ));

      axios.get.mockResolvedValue({ data: learnersOnlyBoard });
      fireEvent.click(getByTestId('leaderboard-hide-instructors-btn'));

      await waitFor(() => expect(getByTestId('leaderboard-hide-instructors-btn')).toHaveTextContent(
        'Show Instructors',
      ));
    });

    it('asks the backend for the instructor-free board and renders what comes back', async () => {
      axios.get.mockResolvedValue({ data: fullBoard });

      const { getByTestId, getByText, queryByText } = renderWithProviders(<LeaderboardPage />);

      await waitFor(() => expect(getByText('instructor_one')).toBeInTheDocument());

      axios.get.mockResolvedValue({ data: learnersOnlyBoard });
      fireEvent.click(getByTestId('leaderboard-hide-instructors-btn'));

      await waitFor(() => {
        expect(axios.get).toHaveBeenLastCalledWith(
          expect.stringContaining('hide_instructors=1'),
        );
        expect(queryByText('instructor_one')).not.toBeInTheDocument();
        expect(queryByText('instructor_two')).not.toBeInTheDocument();
        // The learner the instructors were pushing off the bottom of the list.
        expect(getByText('learner_c')).toBeInTheDocument();
      });
    });

    it('renumbers the learners left on the board', async () => {
      axios.get.mockResolvedValue({ data: fullBoard });

      const { getByTestId, getAllByTestId } = renderWithProviders(<LeaderboardPage />);

      // The top three positions render a medal icon carrying the number as its label
      // rather than the number as text, so read whichever of the two is there.
      const positions = () => getAllByTestId('leaderboard-card').map((card) => {
        const cell = card.querySelector('.avatar-position');
        return cell?.textContent || cell?.querySelector('[aria-label]')?.getAttribute('aria-label');
      });

      // learner_a is 2nd of everyone...
      await waitFor(() => expect(positions()).toEqual(['1', '2', '3', '4']));

      axios.get.mockResolvedValue({ data: learnersOnlyBoard });
      fireEvent.click(getByTestId('leaderboard-hide-instructors-btn'));

      // ...and 1st once the instructor above them is gone.
      await waitFor(() => expect(positions()).toEqual(['1', '2', '3']));
    });

    it('says so while instructors are hidden', async () => {
      axios.get.mockResolvedValue({ data: fullBoard });

      const { getByTestId, queryByTestId } = renderWithProviders(<LeaderboardPage />);

      await waitFor(() => expect(queryByTestId('leaderboard-instructors-hidden-note')).not.toBeInTheDocument());

      axios.get.mockResolvedValue({ data: learnersOnlyBoard });
      fireEvent.click(getByTestId('leaderboard-hide-instructors-btn'));

      await waitFor(() => expect(getByTestId('leaderboard-instructors-hidden-note')).toBeInTheDocument());
    });
  });

  describe('the stored preference', () => {
    it('is remembered, so the next board opens filtered', async () => {
      window.localStorage.setItem(HIDE_INSTRUCTORS_STORAGE_KEY, 'true');
      axios.get.mockResolvedValue({ data: learnersOnlyBoard });

      const { getByTestId } = renderWithProviders(<LeaderboardPage />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('hide_instructors=1'));
        expect(getByTestId('leaderboard-hide-instructors-btn')).toHaveTextContent('Show Instructors');
      });
    });

    it('is written when the learner flips the toggle', async () => {
      axios.get.mockResolvedValue({ data: fullBoard });

      const { getByTestId } = renderWithProviders(<LeaderboardPage />);

      await waitFor(() => expect(getByTestId('leaderboard-hide-instructors-btn')).toBeInTheDocument());
      fireEvent.click(getByTestId('leaderboard-hide-instructors-btn'));

      expect(window.localStorage.getItem(HIDE_INSTRUCTORS_STORAGE_KEY)).toBe('true');
    });

    it('defaults to showing everyone', async () => {
      axios.get.mockResolvedValue({ data: fullBoard });

      const { getByTestId } = renderWithProviders(<LeaderboardPage />);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith(expect.not.stringContaining('hide_instructors'));
        expect(getByTestId('leaderboard-hide-instructors-btn')).toHaveTextContent('Hide Instructors');
      });
    });
  });

  describe("on an instructor badge's own board", () => {
    it('drops the toggle, because filtering it would empty the page', async () => {
      window.localStorage.setItem(HIDE_INSTRUCTORS_STORAGE_KEY, 'true');
      axios.get.mockResolvedValue({
        data: {
          badge: {
            slug: '154h-instructor',
            title: 'Instructor (154 hours of class material)',
            description: '',
            url: null,
            is_instructor_badge: true,
          },
          top10: [{ user_uid: 'instructor_one', points: 900 }],
          competitors: [],
          rank: null,
          in_progress: [],
          in_progress_rank: null,
          user_uid: 'learner_b',
        },
      });

      const { getByText, queryByTestId } = renderWithProviders(<BadgeLeaderboardPage />);

      await waitFor(() => expect(getByText('instructor_one')).toBeInTheDocument());
      expect(queryByTestId('leaderboard-hide-instructors-btn')).not.toBeInTheDocument();
      expect(queryByTestId('leaderboard-instructors-hidden-note')).not.toBeInTheDocument();
    });

    it('keeps the toggle on an ordinary badge', async () => {
      axios.get.mockResolvedValue({
        data: {
          badge: {
            slug: 'some-badge', title: 'Some badge', description: '', url: null, is_instructor_badge: false,
          },
          top10: [{ user_uid: 'learner_a', points: 800 }],
          competitors: [],
          rank: null,
          in_progress: [],
          in_progress_rank: null,
          user_uid: 'learner_b',
        },
      });

      const { getByTestId, getByText } = renderWithProviders(<BadgeLeaderboardPage />);

      await waitFor(() => expect(getByText('learner_a')).toBeInTheDocument());
      expect(getByTestId('leaderboard-hide-instructors-btn')).toBeInTheDocument();
    });
  });
});

describe('getLeaderboardTableProps with a filtered-out viewer', () => {
  const board = {
    top10: [
      { userUid: 'learner_a', points: 800 },
      { userUid: 'learner_b', points: 600 },
    ],
    competitors: [],
    systemStatuses: [],
    userUid: 'instructor_one',
    urlProfileImage: null,
    profileUrl: null,
  };

  it('adds a "not ranked yet" row for a learner who has yet to score', () => {
    const { profiles } = getLeaderboardTableProps({ ...board, rank: null, viewerHidden: false });

    expect(profiles.map((profile) => profile.userUid)).toEqual(['learner_a', 'learner_b', 'instructor_one']);
  });

  it('adds no such row for a viewer the current view hides', () => {
    // An instructor looking at the instructor-free board is unranked, but not in the
    // "yet to score" sense — they have plenty of points, they are just not on this board.
    const { profiles } = getLeaderboardTableProps({ ...board, rank: null, viewerHidden: true });

    expect(profiles.map((profile) => profile.userUid)).toEqual(['learner_a', 'learner_b']);
  });
});
