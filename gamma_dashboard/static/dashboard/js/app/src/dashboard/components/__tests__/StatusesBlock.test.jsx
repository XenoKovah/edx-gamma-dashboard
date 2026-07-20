import React from 'react';

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../setupTests';
import { SliderStatusesBlock } from '../slider-statuses-block';

const statusItemsMock = [
  {
    status_uid: 'bronze-status-badge',
    slug: 'bronze-status-badge',
    title: 'Bronze status',
    description: '',
    active: true,
    color: 'blue',
    url: '/media/media/bronze_status_badge.png',
    statusPoints: 175,
    points: 235,
  },
  {
    status_uid: 'silver-status',
    slug: 'silver-status',
    title: 'Silver status',
    description: '',
    active: true,
    color: 'blue',
    url: '/media/media/silver_status_badge.png',
    statusPoints: 200,
    points: 235,
  },
  {
    status_uid: 'gold-status',
    slug: 'gold-status',
    title: 'Gold status',
    description: '',
    active: true,
    color: 'blue',
    url: '/media/media/gold-status-badge.png',
    statusPoints: 220,
    points: 235,
  },
  {
    status_uid: 'platinum-status',
    slug: 'platinum-status',
    title: 'Platinum status',
    description: '',
    active: true,
    color: 'blue',
    url: '/media/media/platinum-status-badge.png',
    statusPoints: 600,
    points: 235,
  },
  {
    status_uid: 'brilliant-status',
    slug: 'brilliant-status',
    title: 'Brilliant status',
    description: '',
    active: true,
    color: 'blue',
    url: '/media/media/brilliant_status_badge.jpeg',
    statusPoints: 800,
    points: 235,
  },
  {
    status_uid: 'titanium-status',
    slug: 'titanium-status',
    title: 'Titanium status',
    description: '',
    active: true,
    color: 'blue',
    url: '/media/media/titanium-badge.jpeg',
    statusPoints: 1200,
    points: 235,
  },
  {
    status_uid: 'rodium-badge',
    slug: 'rodium-badge',
    title: 'Rodium status',
    description: '',
    active: true,
    color: 'blue',
    url: '/media/media/rodium_status_badge_7kzWAH8.png',
    statusPoints: 1400,
    points: 235,
  },
];

const renderComponent = (props) => renderWithProviders(
  <SliderStatusesBlock
    status="3 of 7"
    statusItems={statusItemsMock}
    {...props}
  />,
);

afterEach(cleanup);

describe('<SliderStatusesBlock />', () => {
  it('render SliderStatusesBlock component correctly', () => {
    const { getByText, getAllByTestId } = renderComponent();

    expect(getByText('R0x0r Level')).toBeInTheDocument();
    expect(getByText('3 of 7')).toBeInTheDocument();
    expect(getByText('The simple measure of your personal growth.')).toBeInTheDocument();

    const image = getAllByTestId('slider-item-status-image');

    statusItemsMock.forEach(({
      title, points, statusPoints, url,
    }, index) => {
      // Digit-grouped for the locale, matching intl.formatNumber in
      // SliderStatusesItemInfo (1200 renders as "1,200", not "1200").
      const format = (value) => value.toLocaleString('en');
      const pointsTitle = `${format(points >= statusPoints ? statusPoints : points)} / ${format(statusPoints)}`;

      expect(getByText(title)).toBeInTheDocument();
      expect(getByText(pointsTitle)).toBeInTheDocument();
      expect(image[index]).toHaveAttribute('src', url);
    });
  });

  it('renders SliderStatusesBlock component correctly with titles', () => {
    const { getAllByTestId } = renderComponent();

    const titleElements = getAllByTestId('row-block-item-title');
    statusItemsMock.forEach(({ title }, index) => {
      expect(titleElements[index]).toHaveTextContent(title);
    });
  });

  it('check that first three statuses is done', () => {
    const { getAllByTestId } = renderComponent();
    const statusItems = getAllByTestId('slider-item');

    statusItemsMock.slice(0, 3).forEach((_, index) => {
      const statusItem = statusItems[index];

      expect(statusItem.querySelector('.slider-item-info-icon')).toBeInTheDocument();
      expect(statusItem.querySelector('.slider-item-status-image')).toHaveStyle('filter: grayscale(0)');
      expect(statusItem.querySelector('.slider-item-status-image')).toHaveStyle('opacity: 1');
      expect(statusItem.querySelector('.slider-item-progress-track')).toHaveStyle('width: 100%');
      expect(statusItem.querySelector('.slider-item-progress-end')).toHaveStyle('background-color: var(--pgn-rgg-statuses-progress-track-bg-color, #082644)');
      expect(statusItem.querySelector('.slider-item-progress-end')).toHaveStyle('z-index: 99;');
    });
  });

  it('check that fourth status in progress', () => {
    const { getAllByTestId } = renderComponent();
    const statusItems = getAllByTestId('slider-item');
    const statusItem = statusItems[3];

    expect(statusItem.querySelector('.slider-item-info-icon')).not.toBeInTheDocument();
    expect(statusItem.querySelector('.slider-item-status-image')).toHaveStyle('filter: grayscale(0)');
    expect(statusItem.querySelector('.slider-item-status-image')).toHaveStyle('opacity: 1');
    expect(statusItem.querySelector('.slider-item-progress-track')).toHaveStyle('width: 4%');
    expect(statusItem.querySelector('.slider-item-progress-end')).toHaveStyle('background-color: var(--pgn-rgg-statuses-progress-bg-color, #dfe0e8)');
    expect(statusItem.querySelector('.slider-item-progress-end')).toHaveStyle('z-index: 1');
  });

  it('check that last three status is not done', () => {
    const { getAllByTestId } = renderComponent();
    const statusItems = getAllByTestId('slider-item');

    statusItemsMock.slice(-3).forEach((_, index) => {
      const statusItem = statusItems[index + 4];

      expect(statusItem.querySelector('.slider-item-info-icon')).not.toBeInTheDocument();
      expect(statusItem.querySelector('.slider-item-status-image')).toHaveStyle('filter: grayscale(1)');
      expect(statusItem.querySelector('.slider-item-status-image')).toHaveStyle('opacity: 0.3');
      expect(statusItem.querySelector('.slider-item-progress-track')).toHaveStyle('width: 0%');
      expect(statusItem.querySelector('.slider-item-progress-end')).toHaveStyle('background-color: var(--pgn-rgg-statuses-progress-bg-color, #dfe0e8)');
      expect(statusItem.querySelector('.slider-item-progress-end')).toHaveStyle('z-index: 1');
    });
  });
});
