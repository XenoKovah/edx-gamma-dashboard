/**
 * Calculates the total progress percentage for a badge.
 *
 * @param {Object} progress - The progress object where keys are
 * event names and values are objects with `count` and `goal`.
 * @param {number} progress[].count - The current count of an event.
 * @param {number} progress[].goal - The goal count of an event.
 * @returns {number} - The total progress as a percentage (0-100).
 */
export const calculateBadgeProgress = (progress) => {
  const percentageOneEvent = 100 / Object.keys(progress).length;
  return Object.values(progress).reduce(
    (total, { count, goal }) => {
      const targetValue = goal?.count || goal?.points;
      return total + Math.floor((Math.min(count, targetValue) / targetValue) * percentageOneEvent);
    },
    0,
  );
};

/**
 * Calculates the progress percentage for a status.
 *
 * @param {number} points - The current points.
 * @param {number} statusPoints - The total points required to complete the status.
 * @returns {number} - The progress as a percentage (0-100).
 */
export const calculateStatusProgress = (points, statusPoints) => Math.floor((points / statusPoints) * 100);

/**
 * Determines the popup visibility and total progress percentage for a badge or status.
 *
 * @param {Object} data - The data object containing progress information.
 * @param {boolean} [data.done] - Indicates whether the badge is completed.
 * @param {boolean} [data.isActive] - Indicates whether the status is active.
 * @param {number} [data.points] - The current points for the status.
 * @param {number} [data.statusPoints] - The total points required to complete the status.
 * @param {Object} [data.progress] - The progress object for badges.
 * @returns {Object} - An object containing:
 *   - `hasPopup` {boolean} - Indicates whether the popup should be shown.
 *   - `totalProgressPercent` {number} - The total progress as a percentage.
 */
export const getTotalProgress = (data) => {
  if (data.done !== undefined) {
    return {
      // Completed badges keep an informational popover (description + the
      // points the badge granted); PopoverContent hides the completion
      // criteria for them. Skip the popover only when it would be empty.
      // Completed achievements without rules report progress as null.
      hasPopup: !data.done || Boolean(data.description || data.points),
      totalProgressPercent: calculateBadgeProgress(data.progress || {}),
    };
  }

  if (data.isActive !== undefined) {
    return {
      hasPopup: !data.isActive || data.points < data.statusPoints,
      totalProgressPercent: calculateStatusProgress(data.points, data.statusPoints),
    };
  }

  return { hasPopup: false, totalProgressPercent: 0 };
};

/**
 * Updates the visual progress view of a progress diagram element.
 *
 * @param {HTMLElement} progressElement - The progress element to update.
 * @param {number} percent - The progress percentage (0-100).
 */
export const updateProgressView = (progressElement, percent) => {
  const FULL_CIRCLE_DEGREES = 360;
  const PERCENT_DIVISOR = 100;
  const OFFSET_DEGREES = 180;

  if (!progressElement) { return; }

  const { classList } = progressElement;

  const degree = ((FULL_CIRCLE_DEGREES * percent) / PERCENT_DIVISOR) + OFFSET_DEGREES;

  classList.toggle('over_50', percent >= 50);

  const rightPiece = progressElement.querySelector('.piece.right');
  if (rightPiece) {
    rightPiece.style.transform = `rotate(${degree}deg)`;
  }
};
