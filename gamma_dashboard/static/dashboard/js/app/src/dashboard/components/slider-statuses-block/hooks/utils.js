import { COLOR_PALETTE } from '../../../../constants';

/**
 * Calculates the current index in the list of items based on points and status points.
 *
 * @param {Array<Object>} items - Array of items, each containing `points` and `statusPoints`.
 * @returns {number} The calculated index.
 */
export const calculateCurrentIndex = (items) => {
  const foundIndex = items.findIndex((item) => item.points <= item.statusPoints);
  if (foundIndex === -1) {
    return items.length - 1;
  }
  return Math.max(0, foundIndex - 1);
};

/**
 * Calculates the progress width as a percentage string.
 *
 * @param {boolean} isStatusComplete - Whether the current status is complete.
 * @param {number} index - The index of the current item in the list.
 * @param {number} points - The current points accumulated.
 * @param {Object} currentItem - The current item in the list.
 * @param {number} currentItem.statusPoints - The required points to complete the current status.
 * @param {Object} [prevItem] - The previous item in the list.
 * @param {number} prevItem.statusPoints - The required points to complete the previous status.
 * @returns {string} The progress width as a percentage string (e.g., "50%").
 */
export const getProgressWidth = (isStatusComplete, index, points, currentItem, prevItem) => {
  const isFirstItem = index === 0;
  const isPartialProgress = index > 0 && points > prevItem?.statusPoints;

  if (isStatusComplete) {
    return '100%';
  }

  if (isFirstItem) {
    return `${Math.round((points / currentItem.statusPoints) * 100)}%`;
  }

  if (isPartialProgress) {
    return `${Math.round(((points - prevItem.statusPoints) / (currentItem.statusPoints - prevItem.statusPoints)) * 100)}%`;
  }

  return '0%';
};

/**
 * Generates styles for a badge based on the item's progress and status.
 *
 * @param {boolean} isFirstItem - Indicates if the current item is the first in the sequence.
 * @param {boolean} isStatusComplete - Indicates if the current item's status is complete.
 * @param {number} points - The current progress points.
 * @param {Object} currentItem - The current status item.
 * @param {number} currentItem.statusPoints - The required points to complete the current status item.
 * @param {Object} [prevItem] - The previous status item.
 * @param {number} [prevItem.statusPoints] - The required points to complete the previous status item.
 *
 * @returns {Object} An object containing styles for the badge.
 * @returns {string} return.filter -
 * A CSS filter value (`grayscale`) indicating whether the badge is highlighted or grayed out.
 * @returns {string} return.opacity - A CSS opacity value indicating the visibility of the badge.
 */
export const getBadgeStyles = (isFirstItem, isStatusComplete, points, currentItem, prevItem) => {
  const isPartialProgress = points < currentItem.statusPoints && points >= prevItem?.statusPoints;

  return {
    filter: `grayscale(${isFirstItem || isStatusComplete || (isPartialProgress) ? 0 : 1})`,
    opacity: isFirstItem || isStatusComplete || (isPartialProgress) ? '1' : '0.3',
  };
};

/**
 * Determines the styles for the end of the progress track based on the item's state.
 *
 * @param {boolean} isLastItem - Indicates if the current item is the last in the sequence.
 * @param {boolean} isFirstItem - Indicates if the current item is the first in the sequence.
 * @param {number} points - The current progress points.
 * @param {Object} currentItem - The current status item.
 * @param {number} currentItem.statusPoints - The required points to complete the current status item.
 * @param {Object} [prevItem] - The previous status item.
 * @param {number} prevItem.statusPoints - The required points to complete the previous status item.
 * @param {Object} [nextItem] - The next status item.
 * @param {number} nextItem.statusPoints - The required points to complete the next status item.
 *
 * @returns {{display: (string)}}
 * An object containing the `display` style for the progress track end.
 * @returns {string} return.display - A string indicating whether
 * the progress track end should be visible ('block') or hidden ('none').
 */
export const getProgressTrackEndStyles = (isLastItem, isFirstItem, points, currentItem, prevItem, nextItem) => {
  const isLastItemCompleted = isLastItem && points >= prevItem?.statusPoints;
  const isCurrentItemCompleted = isLastItem && points >= currentItem.statusPoints;
  const isFirstItemNotStarted = isFirstItem && points <= currentItem.statusPoints;
  const isPartialProgress = points >= prevItem?.statusPoints && points < nextItem?.statusPoints;

  return {
    display: (isLastItemCompleted || isCurrentItemCompleted || isFirstItemNotStarted || isPartialProgress)
      ? 'block'
      : 'none',
  };
};

/**
 * Generates styles for the progress end indicator based on the completion status.
 *
 * @param {boolean} isStatusComplete - Indicates if the current item's status is complete.
 *
 * @returns {Object} An object containing styles for the progress end indicator.
 * @returns {string} return.backgroundColor - The background color of the progress end.
 * @returns {string} return.zIndex - The z-index value for the progress end (`99` if complete, `1` if not).
 */
export const getProgressEndStyles = (isStatusComplete) => ({
  backgroundColor: isStatusComplete ? COLOR_PALETTE.oliveGreen : COLOR_PALETTE.lightGray,
  zIndex: isStatusComplete ? '99' : '1',
});

/**
 * Calculates styles for the progress track and badge.
 *
 * @param {number} index - Index of the current status item.
 * @param {Array<Object>} statusItems - Array of status items, each containing `points` and `statusPoints`.
 * @returns {Object} An object containing styles for badge, progress track, and progress end elements.
 */
export const getProgressTrackStyles = (index, statusItems) => {
  const currentItem = statusItems[index];
  const prevItem = statusItems[index - 1];
  const nextItem = statusItems[index + 1];
  const { points } = statusItems[0];
  const isLastItem = index === statusItems.length - 1;
  const isFirstItem = index === 0;
  const isStatusComplete = points >= currentItem.statusPoints;

  return {
    badgeStyles: getBadgeStyles(isFirstItem, isStatusComplete, points, currentItem, prevItem),
    progressTrackStyles: {
      width: getProgressWidth(isStatusComplete, index, points, currentItem, prevItem),
    },
    progressTrackEndStyles: getProgressTrackEndStyles(isLastItem, isFirstItem, points, currentItem, prevItem, nextItem),
    progressEndStyles: getProgressEndStyles(isStatusComplete),
  };
};
