import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { screen, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderWithProviders } from '../../../setupTests';
import { gameProfileData } from '../../../__mocks__/dashboard';
import { buildAccomplishmentsCategoryUrl } from '../../../routes/constants';
import AccomplishmentsPage from '../AccomplishmentsPage';

jest.mock('axios');

// The stock fixture has no categories, so every badge would land in one "Other"
// bucket. Spread them over two named categories to exercise per-group toggling.
const CATEGORIES = { 'badge-1': 'Architecture', 'badge-2': 'Architecture', 'badge-3': 'Exploitation' };

const withCategories = (categories) => ({
  ...gameProfileData,
  system_badges: gameProfileData.system_badges.map((badge) => ({
    ...badge,
    category: categories[badge.slug] || '',
  })),
});

const categorizedProfileData = withCategories(CATEGORIES);

const renderPage = async (data = categorizedProfileData, options) => {
  axios.get.mockResolvedValue({ data });

  await act(async () => {
    renderWithProviders(<AccomplishmentsPage />, options);
  });
};

/** The collapsible wrapper for a category, found via its header title. */
const categorySection = (label) => screen.getByText(label).closest('.pgn_collapsible');

const isOpen = (label) => categorySection(label).classList.contains('is-open');

const clickHeader = (label) => userEvent.click(screen.getByText(label));

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('<AccomplishmentsPage>', () => {
  it('opens only the categories with an earned badge by default', async () => {
    await renderPage();

    expect(screen.getByTestId('accomplishments-page')).toBeInTheDocument();
    // Architecture holds the earned badge; Exploitation has none.
    expect(screen.getAllByTestId('accomplishments-badges-list')).toHaveLength(1);
    expect(isOpen('Architecture')).toBe(true);
    expect(isOpen('Exploitation')).toBe(false);
    expect(screen.getByTestId('accomplishments-toggle-all-btn')).toHaveTextContent('Collapse All');
  });

  it('lets the learner open a category they have nothing in yet', async () => {
    await renderPage();

    clickHeader('Exploitation');

    expect(isOpen('Exploitation')).toBe(true);
  });

  it('collapses and re-expands a single category when its header is clicked', async () => {
    await renderPage();

    clickHeader('Architecture');

    expect(isOpen('Architecture')).toBe(false);
    // Toggling one category leaves the others alone.
    expect(isOpen('Exploitation')).toBe(false);

    clickHeader('Architecture');

    expect(isOpen('Architecture')).toBe(true);
  });

  it('collapses every category, then expands them all again, from the one button', async () => {
    await renderPage();

    const button = screen.getByTestId('accomplishments-toggle-all-btn');
    expect(button).toHaveTextContent('Collapse All');

    userEvent.click(button);

    expect(isOpen('Architecture')).toBe(false);
    expect(isOpen('Exploitation')).toBe(false);
    // With everything closed the same button now offers the opposite action.
    expect(button).toHaveTextContent('Expand All');

    userEvent.click(button);

    expect(isOpen('Architecture')).toBe(true);
    expect(isOpen('Exploitation')).toBe(true);
    expect(button).toHaveTextContent('Collapse All');
  });

  it('keeps offering "Collapse All" while any category is still open', async () => {
    await renderPage();

    clickHeader('Exploitation');
    clickHeader('Architecture');

    expect(screen.getByTestId('accomplishments-toggle-all-btn')).toHaveTextContent('Collapse All');

    // Closing the last open one flips the button over.
    clickHeader('Exploitation');

    expect(screen.getByTestId('accomplishments-toggle-all-btn')).toHaveTextContent('Expand All');
  });

  it('shows the earned/total counter on each category header', async () => {
    await renderPage();

    const architecture = categorySection('Architecture');

    // Badge 1 is done, Badge 2 is not.
    expect(within(architecture).getByTestId('dashboard-section-header-status')).toHaveTextContent('1 of 2');
  });

  it('hides the toggle-all button when there are no accomplishments', async () => {
    await renderPage({ ...gameProfileData, badges: [], system_badges: [] });

    expect(screen.queryByTestId('accomplishments-toggle-all-btn')).not.toBeInTheDocument();
  });

  // Arriving from the category link above a per-badge leaderboard's title.
  describe('?category= deep link', () => {
    // jsdom has no layout engine, so window.scrollTo is a stub that warns.
    beforeEach(() => {
      window.scrollTo = jest.fn();
    });

    it('opens only the linked category and collapses the rest', async () => {
      await renderPage(categorizedProfileData, {
        initialEntries: [buildAccomplishmentsCategoryUrl('Exploitation')],
      });

      expect(isOpen('Exploitation')).toBe(true);
      expect(isOpen('Architecture')).toBe(false);
    });

    it('round-trips a category name that needs URL encoding', async () => {
      const category = 'Valiant Volunteerism!';
      await renderPage(
        withCategories({ 'badge-1': category, 'badge-2': category, 'badge-3': 'Architecture' }),
        { initialEntries: [buildAccomplishmentsCategoryUrl(category)] },
      );

      expect(isOpen(category)).toBe(true);
      expect(isOpen('Architecture')).toBe(false);
    });

    it('scrolls to the linked category, leaving headroom for the sticky header', async () => {
      // jsdom reports every rect as 0, so the offset is all that is observable.
      await renderPage(categorizedProfileData, {
        initialEntries: [buildAccomplishmentsCategoryUrl('Exploitation')],
      });

      expect(window.scrollTo).toHaveBeenCalledTimes(1);
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('falls back to the default when the category is not on the page', async () => {
      await renderPage(categorizedProfileData, {
        initialEntries: [buildAccomplishmentsCategoryUrl('Since Renamed')],
      });

      expect(isOpen('Architecture')).toBe(true);
      expect(isOpen('Exploitation')).toBe(false);
      expect(window.scrollTo).not.toHaveBeenCalled();
    });

    it('hands the collapse state back to the learner once it has focused', async () => {
      await renderPage(categorizedProfileData, {
        initialEntries: [buildAccomplishmentsCategoryUrl('Exploitation')],
      });

      clickHeader('Architecture');

      expect(isOpen('Architecture')).toBe(true);
      expect(isOpen('Exploitation')).toBe(true);
    });
  });

  describe('sub-categories', () => {
    const NESTED = {
      'badge-1': 'Course Completion / Gold',
      'badge-2': 'Course Completion / Silver',
      'badge-3': 'Exploitation',
    };
    const nestedData = withCategories(NESTED);

    it('renders sub-categories inside their parent, with a rolled-up counter', async () => {
      await renderPage(nestedData);

      expect(categorySection('Gold').parentElement.closest('.pgn_collapsible'))
        .toBe(categorySection('Course Completion'));
      expect(isOpen('Course Completion')).toBe(true);
      // Badge 1 (Gold) is the earned one.
      expect(isOpen('Gold')).toBe(true);
      expect(isOpen('Silver')).toBe(false);
      expect(isOpen('Exploitation')).toBe(false);
    });

    it('collapses a sub-category without touching its sibling or parent', async () => {
      await renderPage(nestedData);
      await act(async () => { await clickHeader('Gold'); });

      expect(isOpen('Gold')).toBe(false);
      expect(isOpen('Silver')).toBe(false);
      expect(isOpen('Course Completion')).toBe(true);
    });

    it('deep-links to a sub-category, opening it and its parent only', async () => {
      await renderPage(nestedData, {
        initialEntries: [buildAccomplishmentsCategoryUrl('Course Completion / Silver')],
      });

      expect(isOpen('Course Completion')).toBe(true);
      expect(isOpen('Silver')).toBe(true);
      expect(isOpen('Gold')).toBe(false);
      expect(isOpen('Exploitation')).toBe(false);
    });
  });
});
