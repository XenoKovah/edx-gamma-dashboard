import React, { useRef, useEffect } from 'react';
import { Icon } from '@edx/paragon';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowNextIcon
} from '@edx/paragon/icons/es5';

export function useStatusesBlock({ statusItems }) {
  const sliderRef = useRef();

  const calculateCurrentIndex = (statusItems) => {
    let index = statusItems.indexOf(statusItems.find((item) => item.points <= item.statusPoints));
    if (index === -1) {
      index = statusItems.length - 1;
    } else if (index > 0) {
      index -= 1;
    }
    return index;
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow: <Icon src={ArrowBackIcon} />,
    nextArrow: <Icon src={ArrowNextIcon} />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };

  const getProgressTrackStyles = (index) => {
    const currentItem = statusItems[index];
    const prevItem = statusItems[index - 1];
    const nextItem = statusItems[index + 1];
    const points = statusItems[0].points;
    const isLastItem = index === statusItems.length - 1;
    const isFirstItem = index === 0;
    const isStatusComplete = points >= currentItem.statusPoints;

    const getProgressWidth = () => {
      switch (true) {
        case isStatusComplete:
          return '100%';
        case !isStatusComplete && index === 0:
          return `${Math.round((points / currentItem.statusPoints) * 100)}%`;
        case !isStatusComplete && index > 0  && points > prevItem.statusPoints:
          return `${Math.round((points - prevItem.statusPoints) / 
                               (currentItem.statusPoints - prevItem.statusPoints) * 100)}%`;
        default:
          return '0%';
      }
    };

    return {
      badgeStyles: {
        filter: `grayscale(${
          isFirstItem
          || isStatusComplete
          || (points < currentItem.statusPoints && points >= prevItem.statusPoints) ? 0 : 1
        })`,
        opacity:
          isFirstItem
          || isStatusComplete
          || (points < currentItem.statusPoints && points >= prevItem.statusPoints) ? '1' : '0.3',
      },
      progressTrackStyles: {
        width: getProgressWidth(),
      },
      progressTrackEndStyles: {
        display:
             isLastItem && points >= prevItem?.statusPoints
          || isLastItem && points >= currentItem.statusPoints
          || isFirstItem && points <= currentItem.statusPoints
          || points >= prevItem?.statusPoints && points < nextItem?.statusPoints
            ? 'block'
            : 'none',
      },
      progressEndStyles: {
        backgroundColor: isStatusComplete ? '#556b2f' : '#dfe0e8',
        zIndex: isStatusComplete ? '99' : '1',
      },
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current?.slickGoTo(calculateCurrentIndex(statusItems));
    }
  }, [sliderRef.current, statusItems]);

  return {
    sliderRef,
    sliderSettings,
    calculateCurrentIndex,
    getProgressTrackStyles,
  }
}
