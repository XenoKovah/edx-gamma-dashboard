/**
 * Whether two ranking values represent a genuine tie.
 *
 * Only real (defined, non-null) values can tie; a missing value is treated as
 * unique so members without a known score are never collapsed onto one shared
 * rank.
 *
 * @param {number|null|undefined} a
 * @param {number|null|undefined} b
 * @returns {boolean}
 */
const isSameRankValue = (a, b) => a !== undefined && a !== null && a === b;

/**
 * Adds a `position` property to each user in a ranked (best-first) list using
 * dense ranking ("1223"): users sharing the same ranking value get the same
 * position, and the next distinct value is the next consecutive number — no gaps.
 * So a list scored [570, 570, 530, 500, 500] yields positions [1, 1, 2, 3, 3].
 *
 * The list must already be ordered best-first (the backend returns it ranked).
 *
 * @param {Array<Object>} listUsers - The ranked list of user objects.
 * @param {function(Object): (number|null|undefined)} [getRankValue] - Reads the
 *   value the list is ranked by. Defaults to `points`; pass the progress percent
 *   accessor for the "in progress" lists, which are ranked by percentage.
 * @returns {Array<Object>} The list with a `position` on each user.
 */
export const addPositionInTop10 = (listUsers, getRankValue = (user) => user.points) => {
  let densePosition = 0;
  let previousValue;
  return listUsers.map((user, index) => {
    const value = getRankValue(user);
    if (index === 0 || !isSameRankValue(value, previousValue)) {
      densePosition += 1;
    }
    previousValue = value;
    return { ...user, position: densePosition };
  });
};

/**
 * Finds the index of a user in the list by their `user_uid`.
 *
 * @param {Array<Object>} listUsers - The list of user objects.
 * @param {string} userUid - The unique identifier of the user to find.
 * @returns {number} The index of the user in the list, or -1 if not found.
 */
export const findIndexByUserUid = (listUsers, userUid) => listUsers.findIndex(user => user.userUid === userUid);

/**
 * Adds a `position` property to each user in a competitor window using the same
 * dense ranking as {@link addPositionInTop10} so tied competitors share a number
 * and distinct values stay gap-free. The reference user is anchored at `rank`
 * (their backend rank) and every other member is offset by how many *distinct*
 * values separate it from the reference user.
 *
 * @param {Array<Object>} listUsers - The competitor window, ordered best-first.
 * @param {string} userUid - The unique identifier of the reference user.
 * @param {number} rank - The reference user's rank (the window's anchor).
 * @param {function(Object): (number|null|undefined)} [getRankValue] - Reads the
 *   value the window is ranked by (defaults to `points`).
 * @returns {Array<Object>} The window with a `position` on each user.
 */
export const addPositionInCompetitors = (listUsers, userUid, rank, getRankValue = (user) => user.points) => {
  // Dense offset of each row: increment only when the value changes, so ties share
  // an offset and consecutive distinct values differ by exactly 1.
  let denseOffset = -1;
  let previousValue;
  const offsets = listUsers.map((user, index) => {
    const value = getRankValue(user);
    if (index === 0 || !isSameRankValue(value, previousValue)) {
      denseOffset += 1;
    }
    previousValue = value;
    return denseOffset;
  });

  const currentIndex = findIndexByUserUid(listUsers, userUid);
  const startPosition = rank - offsets[currentIndex];
  return listUsers.map((user, index) => ({ ...user, position: startPosition + offsets[index] }));
};

/**
 * Capitalizes the first letter of the given string.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} The string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

/**
 * Retrieves the value of a cookie by its name.
 *
 * @param {string} cookieName - The name of the cookie to retrieve.
 * @returns {string|null} The value of the cookie if found, or `null` if the cookie does not exist.
 */
export const getCookieByName = (cookieName) => {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

/**
 * Gets the value from the CSS variable.
 * If the variable does not exist, returns the default value.
 *
 * @param {string} variableName - The name of the CSS variable (e.g. '--primary-color').
 * @param {string} defaultValue - The default value if the variable is not found.
 * @returns {string} The value from the CSS variable or the default value.
 */
export const getCssVariableValue = (variableName, defaultValue) => {
  if (!variableName.startsWith('--')) {
    console.warn(`CSS variables must start with "--": ${variableName}`); // eslint-disable-line no-console
    return defaultValue;
  }

  const root = document.documentElement;
  const style = getComputedStyle(root);
  const value = style.getPropertyValue(variableName).trim();

  return value || defaultValue;
};
