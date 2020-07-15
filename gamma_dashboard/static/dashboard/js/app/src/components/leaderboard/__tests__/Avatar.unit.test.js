import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import Avatar from '../Avatar';
import { getRandomColors } from '../../../utility/colorTools';


const testBackgroundColor = 'rgb(1, 1, 1)';
const testFontColor = 'rgb(0, 0, 0)';

jest.mock('../../../utility/colorTools');
getRandomColors.mockImplementation(() => ({
    backgroundColor: testBackgroundColor,
    fontColor: testFontColor
}));


afterEach(cleanup);


describe('<Avatar>', () => {
    it('renders', () => {
        const { getByTestId } = render(<Avatar />);

        expect(getByTestId('avatar')).toBeInTheDocument();
    });

    it('renders with correct username', () => {
        const testName = 'Ivasyk';

        const { getByText } = render(<Avatar username={testName} />);

        expect(getByText('I')).toBeInTheDocument();
    });

    it('renders with empty username', () => {
        const { getByText } = render(<Avatar />);

        expect(getByText('-')).toBeInTheDocument();
    });

    it('has correct colors', () => {
        const { getByTestId } = render(<Avatar />);

        const avatar = getByTestId('avatar');
        const avatarLetter = getByTestId('avatar-letter');

        expect(avatar).toHaveStyle(`background-color: ${testBackgroundColor}`);
        expect(avatarLetter).toHaveStyle(`color: ${testFontColor}`);
    });
});
