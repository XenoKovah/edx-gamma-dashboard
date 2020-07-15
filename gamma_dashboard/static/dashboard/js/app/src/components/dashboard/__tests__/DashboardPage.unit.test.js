import React from 'react';

import axios from 'axios';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import DashboardPage from '../DashboardPage';

import { gameProfileData } from '../../../fixtures/dashboard';


jest.mock('axios')
afterAll(cleanup);


describe('<DashboardPage>', () => {
    it('renders', () => {
        axios.get.mockResolvedValue({data: gameProfileData});

        const { getByTestId } = render(<DashboardPage />);

        const dashboardTable = getByTestId('dashboard-table');
        expect(dashboardTable).toBeInTheDocument();
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