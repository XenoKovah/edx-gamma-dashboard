import React from 'react';
import '@testing-library/jest-dom';
import {
  cleanup, screen, within, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../setupTests';
import { ProgressBadge } from '../progress-badge';

afterEach(cleanup);

describe('<ProgressBadge>', () => {
  it('renders with correct `complete badge` data', () => {
    const data = {
      done: true,
      id: '3',
      progress: {},
      title: 'Badge for filter 1',
      imageSrc: 'https://gamma-url.com/badge3.png',
    };

    const { getByTestId, queryByTestId } = renderWithProviders(
      <ProgressBadge data={data} />,
    );

    const element = getByTestId('progress-badge').querySelector('.progress-badge-diagram.progress');
    expect(element).not.toBeInTheDocument();

    const figure = getByTestId('progress-badge-figure');
    expect(figure).not.toHaveClass('progress-badge-figure-disabled');

    const title = getByTestId('progress-badge-title');
    expect(title).toHaveTextContent(data.title);

    const popup = queryByTestId('popover-content');
    expect(popup).not.toBeInTheDocument();

    const imageBadge = queryByTestId('progress-badge-figure-image');
    expect(imageBadge).toHaveAttribute('src', data.url);
  });

  it('renders with correct `incomplete badge` data', () => {
    const data = {
      done: false,
      id: '3',
      progress: {},
      title: 'Badge for filter 1',
      imageSrc: 'https://gamma-url.com/badge3.png',
    };

    const { getByTestId } = renderWithProviders(<ProgressBadge data={data} />);

    const element = getByTestId('progress-badge').querySelector('.progress-badge-diagram.progress');
    expect(element).toBeInTheDocument();

    const figure = getByTestId('progress-badge-figure');
    expect(figure).toHaveClass('progress-badge-figure-disabled');

    const title = getByTestId('progress-badge-title');
    expect(title).toHaveTextContent(data.title);

    const imageBadge = getByTestId('progress-badge-figure-image');
    expect(imageBadge).toHaveAttribute('src', data.url);

    userEvent.hover(getByTestId('progress-badge'));

    waitFor(() => {
      const popup = getByTestId('popover-positioned-popover');
      expect(popup).toBeInTheDocument();
    });
  });

  it('shows an informational popover for a completed badge, without completion criteria', async () => {
    const data = {
      done: true,
      id: '7',
      progress: {},
      title: 'Instructor',
      description: 'Leader in the darkness, giver of light',
      manualCriteria: 'This badge is only given to people who create classes for OST2!',
      points: 10000,
      imageSrc: 'https://gamma-url.com/badge7.png',
    };

    const { getByTestId } = renderWithProviders(<ProgressBadge data={data} />);

    userEvent.hover(getByTestId('progress-badge'));

    await waitFor(() => {
      expect(screen.getByText(data.description)).toBeInTheDocument();
    });
    expect(screen.getByText('Points for completion: 10,000')).toBeInTheDocument();
    // Completed badges hide how they were earned.
    expect(screen.queryByText(/Manual assignment criteria/)).not.toBeInTheDocument();
    expect(screen.queryByText(data.manualCriteria)).not.toBeInTheDocument();
  });

  it('renders a completed badge with raw array-shaped progress as an earned figure, never "NaN%"', () => {
    // Completed badges (done: true) carry the raw achievement progress as an
    // array, not the goal-keyed object calculateBadgeProgress reads. Before the
    // fix this rendered the progress ring with a "NaN%" label.
    const data = {
      done: true,
      id: 'fw-master',
      progress: [{ events: { edx_x: { goal: 1, count: 1 } }, is_achieved: true }],
      title: 'Firmware Master',
      imageSrc: 'https://gamma-url.com/badge.png',
    };

    const { getByTestId, queryByTestId } = renderWithProviders(<ProgressBadge data={data} />);

    // No progress ring/diagram for a completed badge.
    const diagram = getByTestId('progress-badge').querySelector('.progress-badge-diagram.progress');
    expect(diagram).not.toBeInTheDocument();

    // Earned figure: the colored (not disabled) figure is shown.
    const figure = getByTestId('progress-badge-figure');
    expect(figure).not.toHaveClass('progress-badge-figure-disabled');

    // The percentage element is only rendered for in-progress items.
    expect(queryByTestId('total-progress-percent')).not.toBeInTheDocument();

    // And nothing renders the dreaded "NaN".
    expect(getByTestId('progress-badge').textContent).not.toMatch(/NaN/);
  });

  it('renders an incomplete badge with a numeric progress percentage', () => {
    const data = {
      done: false,
      id: '3',
      progress: {
        stop_video: {
          title: 'Stop Video',
          count: 5,
          goal: { count: 10 },
        },
      },
      title: 'Badge 3',
      imageSrc: 'https://gamma.com/badge3.png',
    };

    const { getByTestId } = renderWithProviders(<ProgressBadge data={data} />);

    const totalProgressElement = getByTestId('total-progress-percent');
    expect(totalProgressElement).toHaveTextContent('50%');
    expect(totalProgressElement.textContent).not.toMatch(/NaN/);
  });

  it('shows completion points alongside the criteria for an incomplete badge', async () => {
    const data = {
      done: false,
      id: '8',
      progress: {},
      title: 'Instructor',
      description: 'Leader in the darkness, giver of light',
      manualCriteria: 'This badge is only given to people who create classes for OST2!',
      points: 250,
      imageSrc: 'https://gamma-url.com/badge8.png',
    };

    const { getByTestId } = renderWithProviders(<ProgressBadge data={data} />);

    userEvent.hover(getByTestId('progress-badge'));

    await waitFor(() => {
      expect(screen.getByText(data.description)).toBeInTheDocument();
    });
    expect(screen.getByText('Points for completion: 250')).toBeInTheDocument();
    expect(screen.getByText(/Manual assignment criteria/)).toBeInTheDocument();
    expect(screen.getByText(data.manualCriteria)).toBeInTheDocument();
  });

  it('renders with correct `complete status` data', () => {
    const data = {
      isActive: true,
      color: '',
      points: 180,
      slug: 'test-status',
      statusPoints: 150,
      status_uid: 'test-status',
      title: 'Test status',
      imageSrc: 'https://gamma-url.com/status-test-status.png',
    };

    const { getByTestId, queryByTestId } = renderWithProviders(<ProgressBadge data={data} />);

    const element = getByTestId('progress-badge').querySelector('.progress-badge-diagram.progress');
    expect(element).not.toBeInTheDocument();

    const figure = getByTestId('progress-badge-figure');
    expect(figure).not.toHaveClass('progress-badge-figure-disabled');

    const title = getByTestId('progress-badge-title');
    expect(title.textContent).toBe(data.title);

    const popup = queryByTestId('popover-content');
    expect(popup).not.toBeInTheDocument();

    const imageBadge = getByTestId('progress-badge-figure-image');
    expect(imageBadge).toHaveAttribute('src', data.url);
  });

  it('renders with correct `incomplete status` data', () => {
    const data = {
      isActive: true,
      color: '',
      points: 180,
      slug: 'test-status',
      statusPoints: 250,
      status_uid: 'test-status',
      title: 'Test status',
      imageSrc: 'https://gamma-url.com/status-test-status.png',
    };

    const { getByTestId } = renderWithProviders(<ProgressBadge data={data} />);

    const element = getByTestId('progress-badge').querySelector('.progress-badge-diagram.progress');
    expect(element).toBeInTheDocument();

    const figure = getByTestId('progress-badge-figure');
    expect(figure).toHaveClass('progress-badge-figure-disabled');

    const title = getByTestId('progress-badge-title');
    expect(title).toHaveTextContent(data.title);

    const imageBadge = getByTestId('progress-badge-figure-image');
    expect(imageBadge).toHaveAttribute('src', data.url);

    userEvent.hover(getByTestId('progress-badge'));

    waitFor(() => {
      const popup = getByTestId('popover-positioned-popover');
      expect(popup).toBeInTheDocument();
    });
  });

  it('renders with correct but zeroed `incomplete status` data', () => {
    const data = {
      isActive: true,
      color: '',
      points: 0,
      slug: 'test-status',
      statusPoints: 669,
      status_uid: 'test-status',
      title: 'Test status',
      imageSrc: 'https://gamma-url.com/status-test-status.png',
    };
    const progressString = `${data.points}/${data.statusPoints}`;
    const { getByTestId } = renderWithProviders(<ProgressBadge data={data} />);

    const figure = getByTestId('progress-badge-figure');
    expect(figure).toHaveClass('progress-badge-figure-disabled');

    const title = getByTestId('progress-badge-title');
    expect(title).toHaveTextContent(data.title);

    userEvent.hover(getByTestId('progress-badge'));

    waitFor(() => {
      const popup = getByTestId('popover-positioned-popover');
      expect(popup).toBeInTheDocument();
      expect(popup).toHaveTextContent(progressString);
    });
  });

  it('renders with `center` prop defined', () => {
    const data = {
      isActive: true,
      color: '',
      points: 180,
      slug: 'test-status',
      statusPoints: 150,
      status_uid: 'test-status',
      title: 'Test status',
      imageSrc: 'https://gamma-url.com/status-test-status.png',
    };

    const { getByTestId } = renderWithProviders(
      <ProgressBadge data={data} center />,
    );

    const rowBlockItem = getByTestId('progress-badge');
    expect(rowBlockItem).toHaveClass('progress-badge-center');
  });

  it('renders correct children', () => {
    const { getByTestId } = renderWithProviders(
      <ProgressBadge>
        <div data-testid="test-child" />
      </ProgressBadge>,
    );

    const rowBlockItem = getByTestId('progress-badge');
    const child = within(rowBlockItem).getByTestId('test-child');

    expect(child).toBeInTheDocument();
  });

  it('renders without data', () => {
    const { getByTestId } = renderWithProviders(<ProgressBadge />);

    const rowBlockItem = getByTestId('progress-badge');
    expect(rowBlockItem).toBeInTheDocument();
  });

  it('check correct progressCount when count < goal', () => {
    const data = {
      done: false,
      id: '3',
      progress: {
        stop_video: {
          title: 'Stop Video',
          count: 5,
          goal: { count: 10 },
        },
        problem_check: {
          title: 'Problem Check',
          count: 0,
          goal: { count: 10 },
        },
      },
      title: 'Badge 3',
      imageSrc: 'https://gamma.com/badge3.png',
    };

    const { getByTestId } = renderWithProviders(<ProgressBadge data={data} />);

    const totalProgressElement = getByTestId('total-progress-percent');
    expect(totalProgressElement).toHaveTextContent('25%');
  });

  it('check correct progressCount when count > goal', () => {
    const data = {
      done: false,
      id: '3',
      progress: {
        stop_video: {
          title: 'Stop Video',
          count: 30,
          goal: { count: 10 },
        },
        problem_check: {
          title: 'Problem Check',
          count: 0,
          goal: { count: 10 },
        },
      },
      title: 'Badge 3',
      imageSrc: 'https://gamma.com/badge3.png',
    };

    const { getByTestId } = renderWithProviders(<ProgressBadge data={data} />);

    const totalProgressElement = getByTestId('total-progress-percent');
    expect(totalProgressElement).toHaveTextContent('50%');
  });

  it('links the badge to its per-badge leaderboard page, wrapping the figure and title', () => {
    const data = {
      done: true,
      id: 'firmware-master-level-1',
      progress: {},
      title: 'Firmware Master Level 1',
      imageSrc: 'https://gamma-url.com/badge.png',
    };

    const { getByTestId } = renderWithProviders(
      <ProgressBadge slug="firmware-master-level-1" data={data} />,
    );

    const link = getByTestId('progress-badge-link');
    expect(link).toHaveAttribute('href', '/gamma_dashboard/leaderboard/badge/firmware-master-level-1');
    expect(within(link).getByTestId('progress-badge-title')).toHaveTextContent(data.title);
    expect(within(link).getByTestId('progress-badge-figure')).toBeInTheDocument();
  });
});
