import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, within } from '@testing-library/react';

import { renderWithProviders } from '../../../../setupTests';
import { ProgressBadge } from '../progress-badge';

afterEach(cleanup);

describe('<ProgressBadge>', () => {
  it('renders with correct `complete badge` data', () => {
    const data = {
      done: true,
      id: '3',
      progress: {},
      title: 'Badge for filter 1',
      url: 'https://gamma-url.com/badge3.png',
    };

    const { getByTestId, queryByTestId } = renderWithProviders(
      <ProgressBadge
        data={data}
      />,
    );

    const element = getByTestId('progress-badge').querySelector('.progress-badge-diagram.progress');
    expect(element).not.toBeInTheDocument();

    const figure = getByTestId('progress-badge-figure');
    expect(figure).not.toHaveClass('progress-badge-figure-disabled');

    const title = getByTestId('progress-badge-title');
    expect(title).toHaveTextContent(data.title);

    const popup = queryByTestId('row-block-item-popup');
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
      url: 'https://gamma-url.com/badge3.png',
    };

    const { getByTestId } = renderWithProviders(
      <ProgressBadge
        data={data}
      />,
    );

    const element = getByTestId('progress-badge').querySelector('.progress-badge-diagram.progress');
    expect(element).toBeInTheDocument();

    const figure = getByTestId('progress-badge-figure');
    expect(figure).toHaveClass('progress-badge-figure-disabled');

    const title = getByTestId('progress-badge-title');
    expect(title).toHaveTextContent(data.title);

    const popup = getByTestId('row-block-item-popup');
    expect(popup).toBeInTheDocument();

    const imageBadge = getByTestId('progress-badge-figure-image');
    expect(imageBadge).toHaveAttribute('src', data.url);
  });

  it('renders with correct `complete status` data', () => {
    const data = {
      active: true,
      color: '',
      points: 180,
      slug: 'test-status',
      statusPoints: 150,
      status_uid: 'test-status',
      title: 'Test status',
      url: 'https://gamma-url.com/status-test-status.png',
    };

    const { getByTestId, queryByTestId } = renderWithProviders(
      <ProgressBadge
        data={data}
      />,
    );

    const element = getByTestId('progress-badge').querySelector('.progress-badge-diagram.progress');
    expect(element).not.toBeInTheDocument();

    const figure = getByTestId('progress-badge-figure');
    expect(figure).not.toHaveClass('progress-badge-figure-disabled');

    const title = getByTestId('progress-badge-title');
    expect(title.textContent).toBe(data.title);

    const popup = queryByTestId('row-block-item-popup');
    expect(popup).not.toBeInTheDocument();

    const imageBadge = getByTestId('progress-badge-figure-image');
    expect(imageBadge).toHaveAttribute('src', data.url);
  });

  it('renders with correct `incomplete status` data', () => {
    const data = {
      active: true,
      color: '',
      points: 180,
      slug: 'test-status',
      statusPoints: 250,
      status_uid: 'test-status',
      title: 'Test status',
      url: 'https://gamma-url.com/status-test-status.png',
    };

    const { getByTestId } = renderWithProviders(
      <ProgressBadge
        data={data}
      />,
    );

    const element = getByTestId('progress-badge').querySelector('.progress-badge-diagram.progress');
    expect(element).toBeInTheDocument();

    const figure = getByTestId('progress-badge-figure');
    expect(figure).toHaveClass('progress-badge-figure-disabled');

    const title = getByTestId('progress-badge-title');
    expect(title).toHaveTextContent(data.title);

    const popup = getByTestId('row-block-item-popup');
    expect(popup).toBeInTheDocument();

    const imageBadge = getByTestId('progress-badge-figure-image');
    expect(imageBadge).toHaveAttribute('src', data.url);
  });

  it('renders with correct but zeroed `incomplete status` data', () => {
    const data = {
      active: true,
      color: '',
      points: 0,
      slug: 'test-status',
      statusPoints: 669,
      status_uid: 'test-status',
      title: 'Test status',
      url: 'https://gamma-url.com/status-test-status.png',
    };
    const progressString = `${data.points}/${data.statusPoints}`;
    const { getByTestId } = renderWithProviders(
      <ProgressBadge
        data={data}
      />,
    );

    const figure = getByTestId('progress-badge-figure');
    expect(figure).toHaveClass('progress-badge-figure-disabled');

    const title = getByTestId('progress-badge-title');
    expect(title).toHaveTextContent(data.title);

    const popup = getByTestId('row-block-item-popup');
    expect(popup).toBeInTheDocument();
    expect(popup).toHaveTextContent(progressString);
  });

  it('renders with `center` prop defined', () => {
    const data = {
      active: true,
      color: '',
      points: 180,
      slug: 'test-status',
      statusPoints: 150,
      status_uid: 'test-status',
      title: 'Test status',
      url: 'https://gamma-url.com/status-test-status.png',
    };

    const { getByTestId } = renderWithProviders(
      <ProgressBadge
        data={data}
        center
      />,
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
          goal: 10,
        },
        problem_check: {
          title: 'Problem Check',
          count: 0,
          goal: 10,
        },
      },
      title: 'Badge 3',
      url: 'https://gamma.com/badge3.png',
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
          goal: 10,
        },
        problem_check: {
          title: 'Problem Check',
          count: 0,
          goal: 10,
        },
      },
      title: 'Badge 3',
      url: 'https://gamma.com/badge3.png',
    };

    const { getByTestId } = renderWithProviders(<ProgressBadge data={data} />);

    const totalProgressElement = getByTestId('total-progress-percent');
    expect(totalProgressElement).toHaveTextContent('50%');
  });
});
