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

/**
 * Tracks the active Indigo theme so the canvas charts re-render (and re-read
 * their theme colors) when the user toggles light/dark. The toggle adds/removes
 * the `indigo-dark-theme` class on <body>; ECharts paints to a <canvas> that CSS
 * can't recolor, and echarts-for-react only re-renders on prop/size changes, so
 * without this the chart title/labels/legend/icons stay on whatever theme they
 * mounted with (an app-switch "fixes" it only by forcing a resize-driven redraw).
 * @returns {boolean} Whether dark theme is currently active.
 */
export const useIsDarkTheme = () => {
  const [isDark, setIsDark] = useState(
    () => document.body.classList.contains('indigo-dark-theme'),
  );

  useEffect(() => {
    const sync = () => setIsDark(document.body.classList.contains('indigo-dark-theme'));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
};
