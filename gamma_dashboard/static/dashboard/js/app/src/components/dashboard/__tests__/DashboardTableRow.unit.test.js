import React from 'react';

import '@testing-library/jest-dom';
import { render, within, cleanup } from '@testing-library/react';

import DashboardTableRow from '../DashboardTableRow';


afterEach(cleanup);


describe('<DashboardTableRow>', () => {
    it('renders', () => {
        const { getByTestId } = render(
            <DashboardTableRow>
                <div data-testid={'test-items'}>
                </div>
            </DashboardTableRow>
        );

        const tableRow = getByTestId('dashboard-table-row');
        const testItems = getByTestId('test-items');

        expect(tableRow).toBeInTheDocument();
        expect(testItems).toBeInTheDocument();
    });

    it('renders with children', () => {
        const { getByTestId } = render(
            <DashboardTableRow>
                <div data-testid='test-child'>
                </div>
            </DashboardTableRow>
        );

        const dashboardTableRow = getByTestId('dashboard-table-row');
        const child = within(dashboardTableRow).getByTestId('test-child');

        expect(child).toBeInTheDocument();
    });

    it('renders without children', () => {
        const { getByTestId } = render(<DashboardTableRow />);

        const tableRow = getByTestId('dashboard-table-row');

        expect(tableRow).toBeInTheDocument();
    });
});
