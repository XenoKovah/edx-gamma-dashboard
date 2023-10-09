import React from 'react';

import axios from 'axios';

import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import DashboardPage from '../DashboardPage';

import { gameProfileData } from '../../../fixtures/dashboard';

jest.mock('axios')
afterAll(cleanup);

describe('<DashboardPage>', () => {
    it('renders', () => {
        axios.get.mockResolvedValue({data: gameProfileData});

        act(() => {
            render(<DashboardPage />);
        })
        // const { getByTestId } = render(<DashboardPage />));

        const dashboardTable = screen.getByTestId('dashboard-table');

        expect(dashboardTable).toBeInTheDocument();
        expect(axios.get).toBeCalled();
        expect(axios.get.mock.calls[0][0]).toBe('/gamma_dashboard/api/v0/game-profile/');
    });

    it.each`
        data
        ${{}}
        ${null}
    `('render with inconsistent data', (data) => {
        axios.get.mockResolvedValue({data});

        const { getByTestId } = render(<DashboardPage />);

        const dashboardTable = getByTestId('dashboard-table');
        expect(dashboardTable).toBeInTheDocument();
    });
});
