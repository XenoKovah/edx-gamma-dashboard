import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import messages from '../../../i18n';
import { renderWithProviders } from '../../../setupTests';
import Modal from '../Modal';

const defaultProps = {
  isOpen: true,
  handleClose: jest.fn(),
  title: 'Test Modal',
  children: <p>Modal content</p>,
};

describe('<Modal />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal with title and children', () => {
    const { getByText } = renderWithProviders(<Modal {...defaultProps} />);
    expect(getByText('Test Modal')).toBeInTheDocument();
    expect(getByText('Modal content')).toBeInTheDocument();
  });

  it('calls handleClose when close button is clicked', async () => {
    const { getByRole } = renderWithProviders(<Modal {...defaultProps} />);
    const closeButton = getByRole('button', {
      name: messages.logoDropdownFeedbackFormButtonCancelText.defaultMessage,
    });

    await userEvent.click(closeButton);
    expect(defaultProps.handleClose).toHaveBeenCalled();
  });

  it('renders with custom close button title', () => {
    const { getByRole } = renderWithProviders(<Modal {...defaultProps} closeBtnTitle="Close it" />);
    expect(getByRole('button', { name: 'Close it' })).toBeInTheDocument();
  });

  it('renders footer text', () => {
    const { getByText } = renderWithProviders(<Modal {...defaultProps} footerText="Footer content" />);
    expect(getByText('Footer content')).toBeInTheDocument();
  });

  it('renders submit button when submit options are provided', async () => {
    const submitFn = jest.fn();
    const { getByRole } = renderWithProviders(
      <Modal
        {...defaultProps}
        submitBtnOptions={{
          show: true,
          title: 'Submit',
          submitFn,
          disabled: false,
        }}
      />,
    );

    const submitButton = getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();

    await userEvent.click(submitButton);
    expect(submitFn).toHaveBeenCalled();
  });

  it('submit button is disabled when disabled flag is true', () => {
    const { getByRole } = renderWithProviders(
      <Modal
        {...defaultProps}
        submitBtnOptions={{
          show: true,
          title: 'Submit',
          submitFn: jest.fn(),
          disabled: true,
        }}
      />,
    );

    const submitButton = getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeDisabled();
  });
});
