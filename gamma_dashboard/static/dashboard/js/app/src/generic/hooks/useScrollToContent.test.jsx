import React from 'react';
import {
  cleanup, render, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useScrollToContent } from '.';

global.scrollTo = jest.fn();

afterEach(cleanup);

describe('Hooks', () => {
  describe('useScrollToContent', () => {
    const TestComponent = () => {
      useScrollToContent();
      return (
        <>
          <a href="#main-content" data-testid="skip-link">Skip to content</a>
          <div id="main-content" tabIndex={-1} data-testid="target-content">Main Content</div>
        </>
      );
    };

    it('should scroll to target element and focus', async () => {
      const { getByRole, getByTestId } = render(<TestComponent />);

      const skipLink = getByRole('link', { name: /skip to content/i });
      const targetContent = getByTestId('target-content');

      targetContent.focus = jest.fn();

      userEvent.click(skipLink);

      await waitFor(() => {
        expect(global.scrollTo).toHaveBeenCalledWith({
          top: expect.any(Number), behavior: 'smooth',
        });
      });
      expect(targetContent.focus).toHaveBeenCalled();
    });

    it('should trigger on "Enter" key', async () => {
      const { getByRole, getByTestId } = render(<TestComponent />);

      const skipLink = getByRole('link', { name: /skip to content/i });
      const targetContent = getByTestId('target-content');

      targetContent.focus = jest.fn();

      skipLink.focus();

      await userEvent.keyboard('{Enter}');

      await waitFor(() => {
        expect(global.scrollTo).toHaveBeenCalledWith({
          top: expect.any(Number), behavior: 'smooth',
        });
      });
      expect(targetContent.focus).toHaveBeenCalled();
    });
  });
});
