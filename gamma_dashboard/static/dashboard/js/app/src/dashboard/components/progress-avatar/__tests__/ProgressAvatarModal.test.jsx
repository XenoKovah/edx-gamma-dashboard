import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../../../setupTests';
import messages from '../../../../i18n';
import ProgressAvatarModal from '../ProgressAvatarModal';

jest.mock('../../../../constants', () => ({
  isRtl: false,
}));

const baseProps = {
  title: 'Choose Your Avatar',
  isOpen: true,
  closeCallback: jest.fn(),
  avatarProcessingStates: {
    details: {
      update: { isLoading: false, isSuccess: false, isError: false },
      select: { isLoading: false, isSuccess: false, isError: false },
    },
  },
  avatarSets: [
    {
      id: 1, title: 'Avatar 1', image: '/1.jpg', avatars: [],
    },
    {
      id: 2, title: 'Avatar 2', image: '/2.jpg', avatars: [],
    },
  ],
  selectedAvatarSetId: 1,
  savedSelectedAvatarSetId: 2,
  hasSelectedAvatarSet: false,
  setSelectedAvatarSetId: jest.fn(),
  handleSelectAvatarSet: jest.fn(),
  handleUpdateSelectedAvatarSet: jest.fn(),
};

describe('<ProgressAvatarModal />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal with title and avatars when idle', () => {
    const { getByText } = renderWithProviders(<ProgressAvatarModal {...baseProps} />);
    expect(getByText('Choose Your Avatar')).toBeInTheDocument();
    expect(getByText('Avatar 1')).toBeInTheDocument();
    expect(getByText('Avatar 2')).toBeInTheDocument();
    expect(getByText(messages.dashboardProgressAvatarSetModalAvatarSetSaveBtn.defaultMessage)).toBeInTheDocument();
  });

  it('disables submit button if no avatar is selected', () => {
    const { getByRole } = renderWithProviders(<ProgressAvatarModal {...baseProps} selectedAvatarSetId={null} />);
    expect(getByRole('button', {
      name: messages.dashboardProgressAvatarSetModalAvatarSetSaveBtn.defaultMessage,
    })).toBeDisabled();
  });

  it('calls handleSelectAvatarSet on submit when no avatar was previously saved', async () => {
    const { getByRole } = renderWithProviders(<ProgressAvatarModal {...baseProps} />);
    const button = getByRole('button', {
      name: messages.dashboardProgressAvatarSetModalAvatarSetSaveBtn.defaultMessage,
    });
    await userEvent.click(button);
    expect(baseProps.handleSelectAvatarSet).toHaveBeenCalledWith(1);
  });

  it('calls handleUpdateSelectedAvatarSet on submit when avatar was previously saved', async () => {
    const { getByRole } = renderWithProviders(<ProgressAvatarModal {...baseProps} hasSelectedAvatarSet />);
    const button = getByRole('button', {
      name: messages.dashboardProgressAvatarSetModalAvatarSetSaveBtn.defaultMessage,
    });
    await userEvent.click(button);
    expect(baseProps.handleUpdateSelectedAvatarSet).toHaveBeenCalledWith(1);
  });

  it('shows loader when update or select is loading', () => {
    const loadingProps = {
      ...baseProps,
      avatarProcessingStates: {
        details: {
          update: { isLoading: true, isSuccess: false, isError: false },
          select: { isLoading: false, isSuccess: false, isError: false },
        },
      },
    };
    const { getByRole } = renderWithProviders(<ProgressAvatarModal {...loadingProps} />);
    expect(getByRole('status')).toBeInTheDocument();
  });

  it('shows success alert when update or select is successful', () => {
    const successProps = {
      ...baseProps,
      avatarProcessingStates: {
        details: {
          update: { isLoading: false, isSuccess: true, isError: false },
          select: { isLoading: false, isSuccess: false, isError: false },
        },
      },
    };
    const { getByText } = renderWithProviders(<ProgressAvatarModal {...successProps} />);
    expect(getByText(messages.dashboardProgressAvatarSetModalAvatarSetSuccessText.defaultMessage)).toBeInTheDocument();
  });

  it('shows error alert when update or select fails', () => {
    const errorProps = {
      ...baseProps,
      avatarProcessingStates: {
        details: {
          update: { isLoading: false, isSuccess: false, isError: true },
          select: { isLoading: false, isSuccess: false, isError: false },
        },
      },
    };
    const { getByText } = renderWithProviders(<ProgressAvatarModal {...errorProps} />);
    expect(getByText(messages.dashboardProgressAvatarSetModalAvatarSetErrorText.defaultMessage)).toBeInTheDocument();
  });

  it('shows empty alert when avatarSets is empty and idle', () => {
    const emptyProps = {
      ...baseProps,
      avatarSets: [],
    };
    const { getByText } = renderWithProviders(<ProgressAvatarModal {...emptyProps} />);
    expect(getByText(messages.dashboardProgressAvatarSetModalEmptyText.defaultMessage)).toBeInTheDocument();
  });
});
