import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { screen, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderWithProviders } from '../../../setupTests';
import { gameProfileData } from '../../../__mocks__/dashboard';
import AccomplishmentsPage from '../AccomplishmentsPage';

jest.mock('axios');

// The stock fixture has no categories, so every badge would land in one "Other"
// bucket. Spread them over two named categories to exercise per-group toggling.
const CATEGORIES = { 'badge-1': 'Architecture', 'badge-2': 'Architecture', 'badge-3': 'Exploitation' };

const categorizedProfileData = {
  ...gameProfileData,
  system_badges: gameProfileData.system_badges.map((badge) => ({
    ...badge,
    category: CATEGORIES[badge.slug] || '',
  })),
};

const renderPage = async (data = categorizedProfileData) => {
  axios.get.mockResolvedValue({ data });

  await act(async () => {
    renderWithProviders(<AccomplishmentsPage />);
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
  it('renders one collapsible section per category, all open by default', async () => {
    await renderPage();

    expect(screen.getByTestId('accomplishments-page')).toBeInTheDocument();
    expect(screen.getAllByTestId('accomplishments-badges-list')).toHaveLength(2);

    expect(isOpen('Architecture')).toBe(true);
    expect(isOpen('Exploitation')).toBe(true);
  });

  it('collapses and re-expands a single category when its header is clicked', async () => {
    await renderPage();

    clickHeader('Architecture');

    expect(isOpen('Architecture')).toBe(false);
    // Toggling one category leaves the others alone.
    expect(isOpen('Exploitation')).toBe(true);

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
});
