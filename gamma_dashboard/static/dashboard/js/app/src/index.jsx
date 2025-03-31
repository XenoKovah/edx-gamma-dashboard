import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppRoutes from './routes/AppRoutes';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import './assets/scss/index.scss';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AppRoutes />
  </QueryClientProvider>,
  document.getElementById('app'),
);
