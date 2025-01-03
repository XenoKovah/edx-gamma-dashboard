import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { renderWithProviders } from '../../../setupTests';
import DashboardPage from '../DashboardPage';
import { gameProfileData } from '../../../__mocks__/dashboard';

jest.mock('axios');

jest.mock('echarts-for-react', () => jest.fn((props) => (
  <div
    data-testid="echarts-instance"
    data-options={props.option ? JSON.stringify(props.option) : null}
  />
)));

afterEach(cleanup);

describe('<DashboardPage>', () => {
  it('renders', () => {
    axios.get.mockResolvedValue({ data: gameProfileData });

    act(() => {
      renderWithProviders(<DashboardPage />);
    });

    const dashboardTable = screen.getByTestId('dashboard-page');

    expect(dashboardTable).toBeInTheDocument();
    expect(axios.get).toBeCalled();
    expect(axios.get.mock.calls[0][0]).toBe('/gamma_dashboard/api/v0/game-profile/');
  });

  it.each`
        data
        ${{}}
        ${null}
    `('render with inconsistent data', (data) => {
    axios.get.mockResolvedValue({ data });

    act(() => {
      const { getByTestId } = renderWithProviders(<DashboardPage />);

      const dashboardTable = getByTestId('dashboard-page');
      expect(dashboardTable).toBeInTheDocument();
    });
  });
});
