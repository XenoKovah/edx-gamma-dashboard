import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../setupTests';
import messages from '../../i18n';
import ErrorFallback from '.';

describe('ErrorFallback', () => {
  const mockError = new Error('Test error message');
  const mockResetErrorBoundary = jest.fn();
  let rendered;

  beforeEach(() => {
    jest.clearAllMocks();
    rendered = renderWithProviders(
      <ErrorFallback
        error={mockError}
        resetErrorBoundary={mockResetErrorBoundary}
      />,
    );
  });

  it('displays error message', () => {
    const { getByText } = rendered;

    expect(getByText(messages.genericErrorFallbackTitle.defaultMessage)).toBeInTheDocument();
    expect(getByText(/there was an error:/i)).toBeInTheDocument();
    expect(getByText(mockError.message)).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when try again button is clicked', async () => {
    const { getAllByRole } = rendered;

    const resetButton = getAllByRole('button', {
      name: messages.genericErrorFallbackBtnText.defaultMessage,
    })[0];
    await userEvent.click(resetButton);

    expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1);
  });
});
