import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../setupTests';
import messages from '../../../i18n';
import ModalFooter from '../ModalFooter';

const submitBtnText = messages.logoDropdownFeedbackFormButtonSubmitDefaultText.defaultMessage;
const cancelBtnText = messages.logoDropdownFeedbackFormButtonCancelText.defaultMessage;

describe('<ModalFooter />', () => {
  const defaultProps = {
    closeBtnTitle: cancelBtnText,
    handleClose: jest.fn(),
    submitBtnOptions: {
      show: false,
    },
  };

  afterEach(cleanup);

  it('renders close button with correct label', () => {
    const { getByRole } = renderWithProviders(<ModalFooter {...defaultProps} />);
    const closeButton = getByRole('button', { name: cancelBtnText });
    expect(closeButton).toBeInTheDocument();
  });

  it('calls handleClose when close button is clicked', async () => {
    const { getByRole } = renderWithProviders(<ModalFooter {...defaultProps} />);
    const closeButton = getByRole('button', { name: cancelBtnText });

    await userEvent.click(closeButton);
    expect(defaultProps.handleClose).toHaveBeenCalled();
  });

  it('renders footer text when provided', () => {
    const { getByTestId } = renderWithProviders(<ModalFooter {...defaultProps} footerText="Info badge text" />);
    expect(getByTestId('footer-text')).toHaveTextContent('Info badge text');
  });

  it('renders submit button when submit options show is true', () => {
    const { getByRole } = renderWithProviders(
      <ModalFooter
        {...defaultProps}
        submitBtnOptions={{
          show: true,
          title: submitBtnText,
          submitFn: jest.fn(),
          disabled: false,
        }}
      />,
    );
    expect(getByRole('button', { name: submitBtnText })).toBeInTheDocument();
  });

  it('calls submit function when submit button is clicked', async () => {
    const submitFn = jest.fn();
    const { getByRole } = renderWithProviders(
      <ModalFooter
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
    await userEvent.click(submitButton);
    expect(submitFn).toHaveBeenCalled();
  });

  it('disables submit button when disabled is true', () => {
    const { getByRole } = renderWithProviders(
      <ModalFooter
        {...defaultProps}
        submitBtnOptions={{
          show: true,
          title: submitBtnText,
          submitFn: jest.fn(),
          disabled: true,
        }}
      />,
    );
    expect(getByRole('button', { name: submitBtnText })).toBeDisabled();
  });

  it('uses default translated title when no title is passed', () => {
    const { getByRole } = renderWithProviders(
      <ModalFooter
        {...defaultProps}
        submitBtnOptions={{
          show: true,
          title: undefined,
          submitFn: jest.fn(),
          disabled: false,
        }}
      />,
    );
    expect(getByRole('button', { name: submitBtnText })).toBeInTheDocument();
  });
});
