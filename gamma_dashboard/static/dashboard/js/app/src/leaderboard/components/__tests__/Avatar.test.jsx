import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../setupTests';
import Avatar from '../Avatar';

const username = 'John';
const profileImage = '/images/default.png';

afterEach(cleanup);

describe('<Avatar>', () => {
  it('renders', () => {
    const { getByTestId } = renderWithProviders(<Avatar />);

    expect(getByTestId('avatar')).toBeInTheDocument();
  });

  it('renders with empty username', () => {
    const { getByText } = renderWithProviders(<Avatar />);

    expect(getByText('-')).toBeInTheDocument();
  });

  it('has correct colors', () => {
    const { getByTestId } = renderWithProviders(<Avatar />);
    const testBackgroundColor = '#cde4fc';
    const testFontColor = '#303030';
    const avatar = getByTestId('avatar');
    const avatarLetter = getByTestId('avatar-letter-logo');

    expect(avatar).toHaveStyle(`background-color: ${testBackgroundColor}`);
    expect(avatarLetter).toHaveStyle(`color: ${testFontColor}`);
  });

  it('renders profile image', () => {
    const { getByAltText } = renderWithProviders(
      <Avatar username={username} urlProfileImage={profileImage} />,
    );

    expect(getByAltText(`${username} profile image`)).toHaveAttribute('src', profileImage);
  });

  it('always renders username with the first character capitalized', () => {
    const { getByText } = renderWithProviders(<Avatar username={username} />);

    expect(getByText('J')).toBeInTheDocument();
  });

  it('renders an icon instead of a position number', () => {
    const { getByLabelText } = renderWithProviders(<Avatar username={username} position={1} />);

    expect(getByLabelText('1')).toBeInTheDocument();
  });

  it('renders a position number', () => {
    const { getByText } = renderWithProviders(<Avatar username={username} position={10} />);

    expect(getByText('10')).toBeInTheDocument();
  });
});
