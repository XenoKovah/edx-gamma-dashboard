import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render, cleanup } from '@testing-library/react';

import CustomRowBlock from '../CustomRowBlock';


afterEach(cleanup);


describe('<CustomRowBlock>', () => {
    it('renders', () => {
        const content = 'Test content';
        const buttonTitle = 'Test button';
        const buttonOnClickHandler = jest.fn();

        const { getByTestId } = render(
            <CustomRowBlock
                content={content}
                items={
                    <div data-testid={'test-items'}>
                    </div>
                }
                buttonData={{
                    title: buttonTitle,
                    onClick: buttonOnClickHandler
                }}
            />
        );

        const tableRowBlock = getByTestId('dashboard-table-row-block');
        const rowBlockHeader = getByTestId('table-row-block-header');
        const detailsButton = getByTestId('button');
        const contentContainer = getByTestId('row-block-text');
        const itemsContainer = getByTestId('row-block-items-list')
        const testItems = getByTestId('test-items');

        expect(tableRowBlock).toBeInTheDocument();
        expect(rowBlockHeader).toBeInTheDocument();

        expect(contentContainer).toBeInTheDocument();
        expect(contentContainer).toHaveTextContent(content);

        expect(itemsContainer).toBeInTheDocument();
        expect(testItems).toBeInTheDocument();

        expect(detailsButton).toBeInTheDocument();
        expect(detailsButton).toHaveTextContent(buttonTitle);

        fireEvent.click(detailsButton);
        expect(buttonOnClickHandler).toHaveBeenCalledTimes(1);
    });

    it('renders without data', () => {
        const { getByTestId } = render(<CustomRowBlock />);

        const tableRowBlock = getByTestId('dashboard-table-row-block');
        const rowBlockHeader = getByTestId('table-row-block-header');
        const detailsButton = getByTestId('button');
        const contentContainer = getByTestId('row-block-text');
        const itemsContainer = getByTestId('row-block-items-list')

        expect(tableRowBlock).toBeInTheDocument();
        expect(rowBlockHeader).toBeInTheDocument();

        expect(contentContainer).toBeInTheDocument();

        expect(itemsContainer).toBeInTheDocument();

        expect(detailsButton).toBeInTheDocument();
    });
});
