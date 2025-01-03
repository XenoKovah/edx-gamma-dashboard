import React from 'react';
import ReactDOM from 'react-dom';

import AppRoutes from './routes/AppRoutes';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import './assets/scss/index.scss';

ReactDOM.render(
  <AppRoutes />,
  document.getElementById('app'),
);
