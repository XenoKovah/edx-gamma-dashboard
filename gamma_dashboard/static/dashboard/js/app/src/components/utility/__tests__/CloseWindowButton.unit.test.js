import React from 'react';

import '@testing-library/jest-dom';
import {
    cleanup,
    fireEvent,
    render,
} from '@testing-library/react';

import CloseWindowButton from '../CloseWindowButton';


afterEach(cleanup);


describe('<CloseWindowButton>', () => {
    it('renders', () => {
        const { getByTestId } = render(<CloseWindowButton />);

        const closeButton = getByTestId('close-window-button');
        expect(closeButton).toBeInTheDocument();
    });

    it('click callback is being called', () => {
        const onClickHandler = jest.fn();

        const { getByTestId } = render(
            <CloseWindowButton
                onClick={onClickHandler}
            />
        );

        const closeButton = getByTestId('close-window-button');
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);
        expect(onClickHandler).toBeCalledTimes(1);
    });

    it('click without callback does nothing', () => {
        const { getByTestId } = render(<CloseWindowButton />);

        const closeButton = getByTestId('close-window-button');
        expect(closeButton).toBeInTheDocument();

        fireEvent.click(closeButton);
    });
});
