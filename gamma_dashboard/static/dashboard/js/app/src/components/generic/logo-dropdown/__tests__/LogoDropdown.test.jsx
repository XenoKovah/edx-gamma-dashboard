import React from 'react';
import axios from 'axios';
import {
  cleanup, screen, waitFor, within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../../../setupTests';
import messages from '../../../../i18n/en';
import { GAMIFICATION_GUIDE_URL, PRODUCT_NAME } from '../constants';
import { gammaApi } from '../../../../api';
import { LogoDropdown } from '..';

afterEach(cleanup);

jest.mock('axios');

describe('LogoDropdown', () => {
  it('renders the logo with the correct alt text', () => {
    const { getByAltText } = renderWithProviders(<LogoDropdown />);
    expect(getByAltText(messages['generic.logo-dropdown.image.screen-reader.text'].defaultMessage)).toBeInTheDocument();
  });

  it('toggles the dropdown open and closed when the toggle button is clicked', async () => {
    const { getByRole } = renderWithProviders(<LogoDropdown />);

    const dropdownTriggerBtn = getByRole('button');

    userEvent.click(dropdownTriggerBtn);

    const feedbackBtn = await waitFor(() => getByRole('button', { name: messages['logo.dropdown.feedback.item.text'].defaultMessage }));
    const gamificationUserGuide = getByRole('link', { name: `${messages['logo.dropdown.guide.item.text'].defaultMessage} in a new tab` });

    expect(feedbackBtn).toBeInTheDocument();
    expect(gamificationUserGuide).toBeInTheDocument();
  });

  it('opens the modal when the feedback item is clicked', async () => {
    const { getByRole, queryByText } = renderWithProviders(<LogoDropdown />);

    const dropdownTriggerBtn = getByRole('button');
    userEvent.click(dropdownTriggerBtn);

    expect(queryByText(messages['logo.dropdown.feedback.item.text'].defaultMessage)).toBeInTheDocument();

    const feedbackBtn = await waitFor(() => getByRole('button', { name: messages['logo.dropdown.feedback.item.text'].defaultMessage }));
    userEvent.click(feedbackBtn);

    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByRole('button', { name: messages['logo.dropdown.feedback.form.button.submit.text'].defaultMessage })).toBeInTheDocument();
    expect(getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('has a hyperlink that redirects to the correct URL', async () => {
    const { getByRole } = renderWithProviders(<LogoDropdown />);

    const dropdownTriggerBtn = getByRole('button');

    userEvent.click(dropdownTriggerBtn);

    const gamificationUserGuide = getByRole('link', { name: `${messages['logo.dropdown.guide.item.text'].defaultMessage} in a new tab` });
    expect(gamificationUserGuide).toHaveAttribute('href', GAMIFICATION_GUIDE_URL);
    expect(gamificationUserGuide).toHaveAttribute('target', '_blank');
  });

  it('closes the modal when the cancel button is clicked', async () => {
    const { getByRole } = renderWithProviders(<LogoDropdown />);

    const dropdownTriggerBtn = getByRole('button');

    userEvent.click(dropdownTriggerBtn);

    const feedbackBtn = await waitFor(() => getByRole('button', { name: messages['logo.dropdown.feedback.item.text'].defaultMessage }));
    userEvent.click(feedbackBtn);

    const closeButton = screen.getByRole('button', { name: /cancel/i });
    userEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  describe('LogoDropdown Feedback Form', () => {
    const mockCsrfToken = 'mocked_csrf_token';
    const feedbackMessage = 'Test feedback message';
    const feedbackPayload = {
      message: feedbackMessage,
      subject: 'Ask a question',
      product: PRODUCT_NAME,
    };

    beforeEach(() => {
      jest.spyOn(document, 'cookie', 'get').mockReturnValue(`csrftoken=${mockCsrfToken}`);
    });

    afterEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it('submits feedback successfully and displays confirmation message', async () => {
      axios.post.mockResolvedValueOnce({ status: 200 });

      const { getByRole } = renderWithProviders(<LogoDropdown />);

      const dropdownTriggerBtn = getByRole('button');
      userEvent.click(dropdownTriggerBtn);

      const feedbackBtn = await waitFor(() => getByRole('button', { name: messages['logo.dropdown.feedback.item.text'].defaultMessage }));
      userEvent.click(feedbackBtn);

      const textarea = getByRole('textbox');
      userEvent.type(textarea, feedbackMessage);

      expect(screen.getByText(feedbackMessage)).toBeInTheDocument();

      const sendFeedbackBtn = getByRole('button', {
        name: messages['logo.dropdown.feedback.form.button.submit.text'].defaultMessage,
      });
      userEvent.click(sendFeedbackBtn);

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          gammaApi.FEEDBACK_FORM_URL,
          feedbackPayload,
          expect.objectContaining({
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': mockCsrfToken,
            },
          }),
        );
      });
      const successAlert = getByRole('alert');
      expect(within(successAlert).getByText(messages['logo.dropdown.feedback.form.alert.success.text'].defaultMessage)).toBeInTheDocument();
    });

    it('displays an error message when feedback submission fails', async () => {
      axios.post.mockResolvedValueOnce({ status: 500 });

      const { getByRole } = renderWithProviders(<LogoDropdown />);

      const dropdownTriggerBtn = getByRole('button');
      userEvent.click(dropdownTriggerBtn);

      const feedbackBtn = await waitFor(() => getByRole('button', { name: messages['logo.dropdown.feedback.item.text'].defaultMessage }));
      userEvent.click(feedbackBtn);

      const textarea = getByRole('textbox');
      userEvent.type(textarea, feedbackMessage);

      expect(screen.getByText(feedbackMessage)).toBeInTheDocument();

      const sendFeedbackBtn = getByRole('button', {
        name: messages['logo.dropdown.feedback.form.button.submit.text'].defaultMessage,
      });
      userEvent.click(sendFeedbackBtn);

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          gammaApi.FEEDBACK_FORM_URL,
          feedbackPayload,
          expect.objectContaining({
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': mockCsrfToken,
            },
          }),
        );
      });
      const errorAlert = getByRole('alert');
      expect(within(errorAlert).getByText(messages['logo.dropdown.feedback.form.alert.error.text'].defaultMessage)).toBeInTheDocument();
    });
  });
});
