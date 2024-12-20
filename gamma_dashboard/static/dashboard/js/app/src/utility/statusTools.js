/**
 * Determines the user's status based on their points and a list of system statuses.
 *
 * @param {Array<Object>} systemStatuses - An array of status objects ordered by `status_points` in ascending order.
 * @param {number} userPoints - The total points the user has accumulated.
 * @returns {string} The title of the user's current status or a default message if no status is applicable.
 */
export const getUserStatus = (systemStatuses, userPoints) => {
  const noStatusTitle = 'No status so far';
  // systemStatuses should be ordered ascending on backend side

  // Empty systemStatuses
  if (!systemStatuses || systemStatuses.length === 0) { return noStatusTitle; }

  // Check for obvious noStatusTitle
  if (userPoints < systemStatuses[0].status_points) { return noStatusTitle; }

  let i = 0;
  while (i + 1 < systemStatuses.length && systemStatuses[i + 1].status_points <= userPoints) {
    i++;
  }

  return systemStatuses[i].title;
};
