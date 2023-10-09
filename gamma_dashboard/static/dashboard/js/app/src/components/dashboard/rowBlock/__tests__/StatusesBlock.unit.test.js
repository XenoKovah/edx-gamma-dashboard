import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import StatusesBlock from '../statusesBlock/StatusesBlock';

const statusItemsMock = [
  {
    "status_uid": "bronze-status-badge",
    "slug": "bronze-status-badge",
    "title": "Bronze status",
    "description": "",
    "active": true,
    "color": "blue",
    "url": "/media/media/bronze_status_badge.png",
    "statusPoints": 175,
    "points": 235
  },
  {
    "status_uid": "silver-status",
    "slug": "silver-status",
    "title": "Silver status",
    "description": "",
    "active": true,
    "color": "blue",
    "url": "/media/media/silver_status_badge.png",
    "statusPoints": 200,
    "points": 235
  },
  {
    "status_uid": "gold-status",
    "slug": "gold-status",
    "title": "Gold status",
    "description": "",
    "active": true,
    "color": "blue",
    "url": "/media/media/gold-status-badge.png",
    "statusPoints": 220,
    "points": 235
  },
  {
    "status_uid": "platinum-status",
    "slug": "platinum-status",
    "title": "Platinum status",
    "description": "",
    "active": true,
    "color": "blue",
    "url": "/media/media/platinum-status-badge.png",
    "statusPoints": 600,
    "points": 235
  },
  {
    "status_uid": "brilliant-status",
    "slug": "brilliant-status",
    "title": "Brilliant status",
    "description": "",
    "active": true,
    "color": "blue",
    "url": "/media/media/brilliant_status_badge.jpeg",
    "statusPoints": 800,
    "points": 235
  },
  {
    "status_uid": "titanium-status",
    "slug": "titanium-status",
    "title": "Titanium status",
    "description": "",
    "active": true,
    "color": "blue",
    "url": "/media/media/titanium-badge.jpeg",
    "statusPoints": 1200,
    "points": 235
  },
  {
    "status_uid": "rodium-badge",
    "slug": "rodium-badge",
    "title": "Rodium status",
    "description": "",
    "active": true,
    "color": "blue",
    "url": "/media/media/rodium_status_badge_7kzWAH8.png",
    "statusPoints": 1400,
    "points": 235
  }
];

const renderComponent = (props) => render(
    <StatusesBlock
      status='3 of 7'
      statusItems={statusItemsMock}
      {...props}
    />
);

afterEach(cleanup);

describe('<StatusesBlock />', () => {
  it('render StatusesBlock component correctly', () => {
    const { getByText, getAllByTestId } = renderComponent();

    expect(getByText('Your Statuses')).toBeInTheDocument();
    expect(getByText('3 of 7')).toBeInTheDocument();
    expect(getByText('The more points you have, the higher status you own. Hover on a badge to know how many points you need to have it.')).toBeInTheDocument();

    const image = getAllByTestId('row-block-item-figure-image');

    statusItemsMock.forEach(({ title, points, statusPoints, url }, index) => {
      const pointsTitle = `${points >= statusPoints ? statusPoints : points}/${statusPoints}`;

      expect(getByText(title)).toBeInTheDocument();
      expect(getByText(pointsTitle)).toBeInTheDocument();
      expect(image[index]).toHaveAttribute('src', url);
    });
  });

  it('check that first three statuses is done', () => {
    const { getAllByTestId } = renderComponent();
    const statusItems = getAllByTestId('slider-item');

    statusItemsMock.slice(0, 3).forEach((_, index) => {
      const statusItem = statusItems[index];

      expect(statusItem.querySelector('.slider-item__info-icon')).toBeInTheDocument();
      expect(statusItem.querySelector('.row-block-item-figure-image')).toHaveStyle('filter: grayscale(0)');
      expect(statusItem.querySelector('.row-block-item-figure-image')).toHaveStyle('opacity: 1');
      expect(statusItem.querySelector('.slider-item__progress-track')).toHaveStyle('width: 100%');
      expect(statusItem.querySelector('.slider-item__progress-end')).toHaveStyle('background-color: rgb(85, 107, 47)');
      expect(statusItem.querySelector('.slider-item__progress-end')).toHaveStyle('z-index: 99;');
    })
  });

  it('check that fourth status in progress', () => {
    const { getAllByTestId } = renderComponent();
    const statusItems = getAllByTestId('slider-item');
    const statusItem = statusItems[3];

    expect(statusItem.querySelector('.slider-item__info-icon')).not.toBeInTheDocument();
    expect(statusItem.querySelector('.row-block-item-figure-image')).toHaveStyle('filter: grayscale(0)');
    expect(statusItem.querySelector('.row-block-item-figure-image')).toHaveStyle('opacity: 1');
    expect(statusItem.querySelector('.slider-item__progress-track')).toHaveStyle(`width: 39%`);
    expect(statusItem.querySelector('.slider-item__progress-end')).toHaveStyle('background-color: rgb(223, 224, 232)');
    expect(statusItem.querySelector('.slider-item__progress-end')).toHaveStyle('z-index: 1');
  });

  it('check that last three status is not done', () => {
    const { getAllByTestId } = renderComponent();
    const statusItems = getAllByTestId('slider-item');

    statusItemsMock.slice(-3).forEach((_, index) => {
      const statusItem = statusItems[index + 4];

      expect(statusItem.querySelector('.slider-item__info-icon')).not.toBeInTheDocument();
      expect(statusItem.querySelector('.row-block-item-figure-image')).toHaveStyle('filter: grayscale(1)');
      expect(statusItem.querySelector('.row-block-item-figure-image')).toHaveStyle('opacity: 0.3');
      expect(statusItem.querySelector('.slider-item__progress-track')).toHaveStyle(`width: 0%`);
      expect(statusItem.querySelector('.slider-item__progress-end')).toHaveStyle('background-color: rgb(223, 224, 232)');
      expect(statusItem.querySelector('.slider-item__progress-end')).toHaveStyle('z-index: 1');
    })
  });
});
