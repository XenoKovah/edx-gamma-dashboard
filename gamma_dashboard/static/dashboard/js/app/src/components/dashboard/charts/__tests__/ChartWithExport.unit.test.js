import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import ChartWithExport from '../ChartWithExport';


afterEach(cleanup);


describe('<ChartWithExport>', () => {
    it('renders', () => {
        const { getByText } = render(<ChartWithExport options={{}} />);

        expect(getByText(/chart title/i)).toBeInTheDocument();
    });
});
