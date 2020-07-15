import React from 'react';

import '@testing-library/jest-dom';
import {
    cleanup,
    fireEvent,
    render,
} from '@testing-library/react';

import Button from '../Button';


afterEach(cleanup);


describe('<Button>', () => {
    it('renders', () => {
        const { getByTestId } = render(<Button />);

        const button = getByTestId('button');
        expect(button).toBeInTheDocument();
    });

    it('renders with correct title', () => {
        const title = 'Test title';
        const { getByTestId } = render(
            <Button
                title={title}
            />
        );

        const button = getByTestId('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(title);
    });

    it('click callback is being called', () => {
        const onClickHandler = jest.fn();

        const { getByTestId } = render(
            <Button
                onClick={onClickHandler}
            />
        );

        const button = getByTestId('button');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        expect(onClickHandler).toBeCalledTimes(1);
    });
});
