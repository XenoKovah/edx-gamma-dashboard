import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

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

    it('renders without children', () => {
        const { getByTestId } = render(<DashboardTableRow />);

        const tableRow = getByTestId('dashboard-table-row');

        expect(tableRow).toBeInTheDocument();
    });
});
