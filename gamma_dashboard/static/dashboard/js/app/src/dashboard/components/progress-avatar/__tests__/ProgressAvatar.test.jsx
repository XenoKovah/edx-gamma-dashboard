import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../../../setupTests';
import messages from '../../../../i18n/en';
import ProgressAvatar from '../ProgressAvatar';

jest.mock('../../../../generic/hooks/useImageLoader', () => ({
  useImageLoader: jest.fn(() => 'loaded-image.jpg'),
}));

jest.mock('../../../../constants', () => ({
  GAMMA_ADMIN_BASE_URL: 'https://admin.example.com',
}));

describe('<ProgressAvatar />', () => {
  const baseAvatarSet = {
    id: 1,
    title: 'Warrior Set',
    image: '/images/main.jpg',
    avatars: [
      { id: 'a1', image: '/images/avatar1.jpg' },
      { id: 'a2', image: '/images/avatar2.jpg' },
    ],
  };

  afterEach(cleanup);

  const renderComponent = (props = {}) => renderWithProviders(
    <ProgressAvatar
      avatarSetData={baseAvatarSet}
      savedSelectedAvatarSetId={2}
      {...props}
    />,
  );

  it('renders title and image', () => {
    const { getByText, getByAltText } = renderComponent();
    expect(getByText('Warrior Set')).toBeInTheDocument();
    expect(getByAltText('Warrior Set')).toHaveAttribute('src', 'loaded-image.jpg');
  });

  it('renders "Select" button if set is selectable and not saved', () => {
    const { getByRole } = renderComponent({ isAvatarSetSelectable: true });
    expect(getByRole('button', {
      name: messages['dashboard.progress-avatar-set.modal.avatar-set.card.select.btn'].defaultMessage,
    })).toBeInTheDocument();
  });

  it('does not render select button if set is not selectable', () => {
    const { queryByRole } = renderComponent({ isAvatarSetSelectable: false });
    expect(queryByRole('button', {
      name: messages['dashboard.progress-avatar-set.modal.avatar-set.card.select.btn'].defaultMessage,
    })).not.toBeInTheDocument();
  });

  it('does not render select button if set is already saved', () => {
    const { queryByRole } = renderComponent({
      isAvatarSetSelectable: true,
      savedSelectedAvatarSetId: 1,
    });
    expect(queryByRole('button', {
      name: messages['dashboard.progress-avatar-set.modal.avatar-set.card.select.btn'].defaultMessage,
    })).not.toBeInTheDocument();
  });

  it('calls onSelect when card is clicked and selectable', async () => {
    const onSelect = jest.fn();
    const { getByText } = renderComponent({
      isAvatarSetSelectable: true,
      onSelect,
    });

    await userEvent.click(getByText('Warrior Set'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('does not call onSelect when not selectable', async () => {
    const onSelect = jest.fn();
    const { getByText } = renderComponent({
      isAvatarSetSelectable: false,
      onSelect,
    });

    await userEvent.click(getByText('Warrior Set'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('applies "avatar-selected" class when isSelected and not saved', () => {
    const { container } = renderComponent({
      isAvatarSetSelectable: true,
      isSelected: true,
    });

    expect(container.querySelector('.progress-avatar')).toHaveClass('avatar-selected');
  });

  it('does not apply "avatar-selected" if already saved', () => {
    const { container } = renderComponent({
      isAvatarSetSelectable: true,
      isSelected: true,
      savedSelectedAvatarSetId: 1,
    });

    expect(container.querySelector('.progress-avatar')).not.toHaveClass('avatar-selected');
  });
});
