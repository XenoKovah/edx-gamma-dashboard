import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { getMessages } from './i18n/utils';

global.matchMedia = global.matchMedia || (() => ({
  matches: false,
  addListener() {},
  removeListener() {},
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

/**
 * Render a component with the providers the app supplies in production.
 *
 * The router is a MemoryRouter so components that read the URL (e.g. the All
 * Accomplishments page's ?category= deep link) work under test; pass
 * `initialEntries` to start the test at a specific URL.
 */
export const renderWithProviders = (children, { initialEntries = ['/'] } = {}) => {
  const messages = getMessages('en');
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en" messages={messages}>
        <MemoryRouter initialEntries={initialEntries}>
          {children}
        </MemoryRouter>
      </IntlProvider>
    </QueryClientProvider>,
  );
};
