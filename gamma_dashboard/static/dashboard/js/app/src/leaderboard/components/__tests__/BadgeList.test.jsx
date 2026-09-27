import React from 'react';

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../setupTests';
import BadgeList, { MAX_VISIBLE_BADGES } from '../BadgeList';

const manyBadges = (count) => Object.fromEntries(
  Array.from({ length: count }, (_, i) => [i + 1, { url: `https://localhost/static/images/link${i + 1}.png` }]),
);

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

  it('lazy-loads the badge images', () => {
    const { getAllByTestId } = renderWithProviders(<BadgeList badges={manyBadges(3)} />);

    getAllByTestId('leaderboard-badge').forEach((badge) => {
      expect(badge).toHaveAttribute('loading', 'lazy');
    });
  });

  it('renders every badge when the learner is under the cap', () => {
    const { getAllByTestId, queryByTestId } = renderWithProviders(
      <BadgeList badges={manyBadges(MAX_VISIBLE_BADGES)} />,
    );

    expect(getAllByTestId('leaderboard-badge')).toHaveLength(MAX_VISIBLE_BADGES);
    expect(queryByTestId('leaderboard-badge-overflow')).not.toBeInTheDocument();
  });

  it('caps the icons and counts the remainder', () => {
    const { getAllByTestId, getByTestId } = renderWithProviders(
      <BadgeList badges={manyBadges(MAX_VISIBLE_BADGES + 7)} />,
    );

    expect(getAllByTestId('leaderboard-badge')).toHaveLength(MAX_VISIBLE_BADGES);
    expect(getByTestId('leaderboard-badge-overflow')).toHaveTextContent('+7');
  });

  it('links the remainder to the learner profile when there is one', () => {
    const { getByTestId } = renderWithProviders(
      <BadgeList badges={manyBadges(MAX_VISIBLE_BADGES + 2)} profileUrl="/u/someone" />,
    );

    expect(getByTestId('leaderboard-badge-overflow')).toHaveAttribute('href', '/u/someone');
  });

  it('renders the remainder as plain text without a profile link', () => {
    const { getByTestId } = renderWithProviders(
      <BadgeList badges={manyBadges(MAX_VISIBLE_BADGES + 2)} />,
    );

    expect(getByTestId('leaderboard-badge-overflow')).not.toHaveAttribute('href');
  });
});
