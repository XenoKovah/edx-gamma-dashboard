import React from 'react';
import axios from 'axios';
import { cleanup, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../setupTests';
import messages from '../../i18n';
import { gammaApi } from '../../api';
import { GAMIFICATION_GUIDE_URL, PRODUCT_NAME } from './constants';
import LogoDropdown from './LogoDropdown';

afterEach(cleanup);

jest.mock('axios');

describe('LogoDropdown', () => {
  it('renders the logo with the correct alt text', () => {
    const { getByAltText } = renderWithProviders(<LogoDropdown />);
    expect(getByAltText(messages.genericLogoDropdownImageScreenReaderText.defaultMessage)).toBeInTheDocument();
  });

  it('toggles the dropdown open and closed when the toggle button is clicked', async () => {
    const { getByRole } = renderWithProviders(<LogoDropdown />);

    const dropdownTriggerBtn = getByRole('button');

    userEvent.click(dropdownTriggerBtn);

    const feedbackBtn = await waitFor(() => getByRole('button', {
      name: messages.logoDropdownFeedbackItemText.defaultMessage,
    }));
    const gamificationUserGuide = getByRole('link', {
      name: `${messages.logoDropdownGuideItemText.defaultMessage} in a new tab`,
    });

    expect(feedbackBtn).toBeInTheDocument();
    expect(gamificationUserGuide).toBeInTheDocument();
  });

  it('opens the modal when the feedback item is clicked', async () => {
    const { getByRole, queryByText } = renderWithProviders(<LogoDropdown />);

    const dropdownTriggerBtn = getByRole('button');
    userEvent.click(dropdownTriggerBtn);

    expect(queryByText(messages.logoDropdownFeedbackItemText.defaultMessage)).toBeInTheDocument();

    const feedbackBtn = await waitFor(() => getByRole('button', {
      name: messages.logoDropdownFeedbackItemText.defaultMessage,
    }));
    userEvent.click(feedbackBtn);

    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByRole('button', {
      name: messages.logoDropdownFeedbackFormButtonSubmitText.defaultMessage,
    })).toBeInTheDocument();
    expect(getByRole('button', {
      name: messages.logoDropdownFeedbackFormButtonCancelText.defaultMessage,
    })).toBeInTheDocument();
  });

  it('has a hyperlink that redirects to the correct URL', async () => {
    const { getByRole } = renderWithProviders(<LogoDropdown />);

    const dropdownTriggerBtn = getByRole('button');

    userEvent.click(dropdownTriggerBtn);

    const gamificationUserGuide = getByRole('link', {
      name: `${messages.logoDropdownGuideItemText.defaultMessage} in a new tab`,
    });
    expect(gamificationUserGuide).toHaveAttribute('href', GAMIFICATION_GUIDE_URL);
    expect(gamificationUserGuide).toHaveAttribute('target', '_blank');
  });

  it('closes the modal when the cancel button is clicked', async () => {
    const { getByRole, queryByRole } = renderWithProviders(<LogoDropdown />);

    const dropdownTriggerBtn = getByRole('button');

    userEvent.click(dropdownTriggerBtn);

    const feedbackBtn = await waitFor(() => getByRole('button', {
      name: messages.logoDropdownFeedbackItemText.defaultMessage,
    }));
    userEvent.click(feedbackBtn);

    const closeButton = getByRole('button', {
      name: messages.logoDropdownFeedbackFormButtonCancelText.defaultMessage,
    });
    userEvent.click(closeButton);

    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  describe('LogoDropdown Feedback Form', () => {
    const mockCsrfToken = 'mocked_csrf_token';
    const feedbackMessage = 'Test feedback message';
    const feedbackPayload = {
      message: feedbackMessage,
      subject: 'Ask a question',
      product: PRODUCT_NAME,
    };

    beforeAll(() => {
      Object.defineProperty(document, 'cookie', {
        writable: true,
        value: 'csrftoken=mocked_csrf_token',
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('submits feedback successfully and displays confirmation message', async () => {
      axios.post.mockResolvedValueOnce({ status: 200 });

      const { getByRole, getByText } = renderWithProviders(<LogoDropdown />);

      const dropdownTriggerBtn = getByRole('button');
      userEvent.click(dropdownTriggerBtn);

      const feedbackBtn = await waitFor(() => getByRole('button', {
        name: messages.logoDropdownFeedbackItemText.defaultMessage,
      }));
      userEvent.click(feedbackBtn);

      const textarea = getByRole('textbox');
      userEvent.type(textarea, feedbackMessage);

      expect(getByText(feedbackMessage)).toBeInTheDocument();

      const sendFeedbackBtn = getByRole('button', {
        name: messages.logoDropdownFeedbackFormButtonSubmitText.defaultMessage,
      });
      userEvent.click(sendFeedbackBtn);

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          gammaApi.FEEDBACK_FORM_URL,
          feedbackPayload,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': mockCsrfToken,
            },
          },
        );
      });
      const successAlert = getByRole('alert');
      expect(within(successAlert).getByText(
        messages.logoDropdownFeedbackFormAlertSuccessText.defaultMessage,
      )).toBeInTheDocument();
    });

    it('displays an error message when feedback submission fails', async () => {
      axios.post.mockResolvedValueOnce({ status: 500 });

      const { getByRole, getByText } = renderWithProviders(<LogoDropdown />);

      const dropdownTriggerBtn = getByRole('button');
      userEvent.click(dropdownTriggerBtn);

      const feedbackBtn = await waitFor(() => getByRole('button', {
        name: messages.logoDropdownFeedbackItemText.defaultMessage,
      }));
      userEvent.click(feedbackBtn);

      const textarea = getByRole('textbox');
      userEvent.type(textarea, feedbackMessage);

      expect(getByText(feedbackMessage)).toBeInTheDocument();

      const sendFeedbackBtn = getByRole('button', {
        name: messages.logoDropdownFeedbackFormButtonSubmitText.defaultMessage,
      });
      userEvent.click(sendFeedbackBtn);

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          gammaApi.FEEDBACK_FORM_URL,
          feedbackPayload,
          {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': mockCsrfToken,
            },
          },
        );
      });
      const errorAlert = getByRole('alert');
      expect(within(errorAlert).getByText(
        messages.logoDropdownFeedbackFormAlertErrorText.defaultMessage,
      )).toBeInTheDocument();
    });
  });
});
