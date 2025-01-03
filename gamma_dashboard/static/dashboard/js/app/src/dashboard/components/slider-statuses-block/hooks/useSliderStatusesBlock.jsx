import { useRef, useEffect, useMemo } from 'react';

import { calculateCurrentIndex, getProgressTrackStyles } from './utils';
import { sliderSettings } from './config';

/**
 * Custom hook to manage slider statuses and calculate progress styles.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {Array<Object>} params.statusItems - Array of status items for the slider.
 * @returns {Object} The slider ref and settings.
 * @returns {Object} return.sliderRef - The ref for the slider component.
 * @returns {Object} return.sliderSettings - The settings for the slider.
 */
export function useSliderStatusesBlock({ statusItems }) {
  const sliderRef = useRef();

  const currentIndex = useMemo(() => calculateCurrentIndex(statusItems), [statusItems]);

  // Update the slider position when the currentIndex changes
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current?.slickGoTo(currentIndex);
    }
  }, [currentIndex]);

  return {
    sliderRef,
    sliderSettings,
    calculateCurrentIndex,
    getProgressTrackStyles,
  };
}
