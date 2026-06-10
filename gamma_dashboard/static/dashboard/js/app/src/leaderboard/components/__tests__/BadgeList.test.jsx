import React from 'react';

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../setupTests';
import BadgeList from '../BadgeList';

afterEach(cleanup);

describe('<BadgeList>', () => {
  it('renders with badges', () => {
    const badges = {
      1: { url: 'https://localhost/static/images/link1.png' },
      2: { url: 'https://localhost/static/images/link2.png' },
      3: { url: 'https://localhost/static/images/link3.png' },
    };

    const { getAllByTestId } = renderWithProviders(<BadgeList badges={badges} />);
    const badgesElements = getAllByTestId('leaderboard-badge');

    badgesElements.forEach((badge, index) => {
      const badgeUrl = badges[index + 1]?.url;
      expect(badge).toHaveAttribute('src', badgeUrl);
    });
  });

  it('renders without badges', () => {
    const { queryAllByTestId, getByText } = renderWithProviders(<BadgeList badges={{}} />);

    expect(queryAllByTestId('leaderboard-badge')).toHaveLength(0);
    expect(getByText('No accomplishments yet...')).toBeInTheDocument();
  });
});
