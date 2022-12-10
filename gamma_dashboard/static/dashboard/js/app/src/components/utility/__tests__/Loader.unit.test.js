import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import Loader from '../Loader';


afterEach(cleanup);

describe('<Loader>', () => {
    test('renders component', () => {
        const { getByTestId } = render(<Loader />)
        const loader = getByTestId('loader');

        expect(loader).toBeInTheDocument();
    });

    test('has the expected text', () => {
        const content = 'Loading...';
        const { getByTestId } = render(<Loader />)
        const loader = getByTestId('loader');
        
        expect(loader).toHaveTextContent(content);
    });
});
