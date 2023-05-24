import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import Avatar from '../Avatar';

jest.mock('../../../utility/colorTools');

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
        const testBackgroundColor = '#cde4fc';
        const testFontColor = '#303030';
        const avatar = getByTestId('avatar');
        const avatarLetter = getByTestId('avatar-logo')

        expect(avatar).toHaveStyle(`background-color: ${testBackgroundColor}`);
        expect(avatarLetter).toHaveStyle(`color: ${testFontColor}`);
    });

    it('renders profile image', () => {
        const { getByTestId } = render(<Avatar urlProfileImage={'/images/defaul.png'}/>);
        const backgroundImage = 'url(/images/defaul.png)';

        expect(getByTestId('avatar')).toBeInTheDocument();
        expect(getByTestId('avatar')).toHaveStyle({backgroundImage: backgroundImage});
    });

    it('always renders username with the first character capitalized', () => {
        const { getByText } = render(<Avatar username={'name'}/>);

        expect(getByText('N')).toBeInTheDocument();
    });
});
