import React from 'react';

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  it('links to the per-badge leaderboard when a slug is provided', () => {
    const { getByTestId } = renderWithProviders(
      <Badge url="https://localhost/b.png" title="Subtitle Fixer" slug="subtitle-fixer" />,
    );

    expect(getByTestId('leaderboard-badge-link'))
      .toHaveAttribute('href', '/gamma_dashboard/leaderboard/badge/subtitle-fixer');
    expect(getByTestId('leaderboard-badge')).toHaveAttribute('src', 'https://localhost/b.png');
  });

  it('uses the badge title as the image alt text', () => {
    const { getByTestId } = renderWithProviders(
      <Badge url="https://localhost/b.png" title="Subtitle Fixer" slug="subtitle-fixer" />,
    );

    expect(getByTestId('leaderboard-badge')).toHaveAttribute('alt', 'Subtitle Fixer');
  });

  it('renders no link when the slug is missing', () => {
    const { queryByTestId, getByTestId } = renderWithProviders(
      <Badge url="https://localhost/b.png" title="Subtitle Fixer" />,
    );

    expect(queryByTestId('leaderboard-badge-link')).not.toBeInTheDocument();
    expect(getByTestId('leaderboard-badge')).toBeInTheDocument();
  });

  it('shows the badge title in a tooltip on hover', async () => {
    const { getByTestId, findByRole } = renderWithProviders(
      <Badge url="https://localhost/b.png" title="Subtitle Fixer" slug="subtitle-fixer" />,
    );

    userEvent.hover(getByTestId('leaderboard-badge-link'));

    const tooltip = await findByRole('tooltip');
    expect(tooltip).toHaveTextContent('Subtitle Fixer');
  });
});
