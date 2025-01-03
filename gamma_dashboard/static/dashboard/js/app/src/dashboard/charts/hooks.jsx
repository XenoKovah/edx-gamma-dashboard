import { useState, useEffect } from 'react';

/**
 * Custom hook to track the width of a referenced element.
 * @param {React.RefObject<HTMLElement>} ref - The ref of the element to track.
 * @returns {number} The current width of the referenced element.
 */
export const useElementWidth = (ref) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [ref]);

  return width;
};
