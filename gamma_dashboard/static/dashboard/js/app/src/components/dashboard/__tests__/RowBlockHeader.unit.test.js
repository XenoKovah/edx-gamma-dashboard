import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import RowBlockHeader from '../RowBlockHeader';


afterEach(cleanup);


describe('<RowBlockHeader>', () => {
    it('renders', () => {
        const title = 'Test title';
        const status = 'Test status';
        const description = 'Test description';

        const { getByText } = render(
            <RowBlockHeader
                title={title}
                status={status}
                description={description}
            />
        );

        expect(getByText(title)).toBeInTheDocument();
        expect(getByText(status)).toBeInTheDocument();
        expect(getByText(description)).toBeInTheDocument();
    });

    it('renders without data', () => {
        const { getByTestId } = render(<RowBlockHeader/>);

        expect(getByTestId('row-block-title')).toBeInTheDocument();
        expect(getByTestId('row-block-status')).toBeInTheDocument();
        expect(getByTestId('row-block-description')).toBeInTheDocument();
    });
});
