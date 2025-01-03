import React from 'react';
import '@testing-library/jest-dom';
import { screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { renderWithProviders } from '../../setupTests';
import {
  parsedBadgeItems,
  parsedStatusItems,
  gameProfileData,
} from '../../__mocks__/dashboard';
import DashboardWrapper from '../DashboardWrapper';

jest.mock('echarts-for-react', () => jest.fn((props) => (
  <div
    data-testid="echarts-instance"
    data-options={props.option ? JSON.stringify(props.option) : null}
  />
)));

afterEach(cleanup);

describe('<DashboardWrapper>', () => {
  it('renders', () => {
    const progress = {
      2020: [
        { date: '2020-06-23T00:00:00.000000Z', points: 13 },
        { date: '2020-06-24T00:00:00.000000Z', points: 13 },
        { date: '2020-06-26T00:00:00.000000Z', points: 5 },
        { date: '2020-06-26T00:00:00.000000Z', points: 4 },
        { date: '2020-06-26T00:00:00.000000Z', points: 8 },
        { date: '2020-06-26T00:00:00.000000Z', points: 6 },
        { date: '2020-07-09T00:00:00.000000Z', points: 5 },
      ],
    };

    act(() => {
      renderWithProviders(
        <DashboardWrapper
          badgeItems={parsedBadgeItems}
          statusItems={parsedStatusItems}
          progress={progress}
          chart={gameProfileData}
        />,
      );
    });

    const dashboardTable = screen.getByTestId('dashboard-page');
    expect(dashboardTable).toBeInTheDocument();
  });

  it('renders without data', () => {
    act(() => {
      renderWithProviders(<DashboardWrapper />);
    });

    const dashboardTable = screen.getByTestId('dashboard-page');
    expect(dashboardTable).toBeInTheDocument();
  });
});
