import React from 'react';

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import Badge from '../Badge';
import { renderWithProviders } from '../../../setupTests';

afterEach(cleanup);

describe('<Badge>', () => {
  it('has correct src attribute', () => {
    const testUrl = 'https://localhost/static/images/link.png';

    const { getByTestId } = renderWithProviders(<Badge url={testUrl} />);
    const badgeImage = getByTestId('leaderboard-badge');

    expect(badgeImage).toHaveAttribute('src', testUrl);
  });
});
