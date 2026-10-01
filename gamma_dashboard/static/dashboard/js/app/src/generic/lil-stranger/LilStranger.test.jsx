import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../setupTests';
import LeaderboardMascot from './LeaderboardMascot';
import SubHeader from '../sub-header/SubHeader';

afterEach(cleanup);

describe('LeaderboardMascot', () => {
  it('shows the podium image, linked to the Li\'l Stranger page', () => {
    const { getByAltText, getByTestId } = renderWithProviders(<LeaderboardMascot />);
    expect(getByAltText('WE are the champions, my friend!')).toBeInTheDocument();
    expect(getByTestId('lil-stranger-link')).toHaveAttribute('href', '/lil-stranger/');
  });
});

describe('SubHeader centered', () => {
  it('adds the centered class', () => {
    const { container } = renderWithProviders(<SubHeader title="Leaderboard" centered />);
    expect(container.firstChild).toHaveClass('gamification-title-centered');
  });
});
