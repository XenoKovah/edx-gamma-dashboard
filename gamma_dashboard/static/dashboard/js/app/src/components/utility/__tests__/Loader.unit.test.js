import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import Loader from '../Loader';


afterEach(cleanup);

describe('<Loader>', () => {
    test('renders', () => {
        const { getByTestId } = render(<Loader />)
        const loader = getByTestId('loader');

        expect(loader).toBeInTheDocument();
    });
});
