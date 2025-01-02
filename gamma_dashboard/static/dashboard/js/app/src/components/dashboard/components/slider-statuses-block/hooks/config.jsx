import React from 'react';
import { Icon } from '@openedx/paragon';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowNextIcon,
} from '@openedx/paragon/icons';

export const breakpoints = [
  { size: 991, slides: 4 },
  { size: 767, slides: 3 },
  { size: 567, slides: 2 },
  { size: 479, slides: 1 },
];

export const sliderSettings = {
  dots: true,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 5,
  prevArrow: <Icon src={ArrowBackIcon} />,
  nextArrow: <Icon src={ArrowNextIcon} />,
  responsive: breakpoints.map(({ size, slides }) => ({
    breakpoint: size,
    settings: {
      slidesToShow: slides,
      slidesToScroll: slides,
    },
  })),
};
