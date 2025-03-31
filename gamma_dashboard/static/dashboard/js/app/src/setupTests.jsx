import React from 'react';
import { IntlProvider } from 'react-intl';
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

export const renderWithProviders = (children) => {
  const messages = getMessages('en');
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en" messages={messages}>
        {children}
      </IntlProvider>
    </QueryClientProvider>,
  );
};
