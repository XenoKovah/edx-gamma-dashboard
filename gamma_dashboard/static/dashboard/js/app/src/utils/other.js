/**
 * Adds a `position` property to each user in the top 10 list based on their index.
 *
 * @param {Array<Object>} listUsers - The list of user objects.
 * @returns {Array<Object>} The updated list of user objects with a `position` property.
 */
export const addPositionInTop10 = (listUsers) => listUsers.map((user, index) => ({
  ...user,
  position: index + 1,
}));

/**
 * Finds the index of a user in the list by their `user_uid`.
 *
 * @param {Array<Object>} listUsers - The list of user objects.
 * @param {string} userUid - The unique identifier of the user to find.
 * @returns {number} The index of the user in the list, or -1 if not found.
 */
export const findIndexByUserUid = (listUsers, userUid) => listUsers.findIndex(user => user.user_uid === userUid);

/**
 * Adds a `position` property to each user in a competitors list relative to the specified user's rank.
 *
 * @param {Array<Object>} listUsers - The list of user objects.
 * @param {string} userUid - The unique identifier of the reference user.
 * @param {number} rank - The starting rank for the reference user.
 * @returns {Array<Object>} The updated list of user objects with a `position` property.
 */
export const addPositionInCompetitors = (listUsers, userUid, rank) => {
  const startIndex = rank - findIndexByUserUid(listUsers, userUid);
  return listUsers.map((user, index) => ({
    ...user,
    position: startIndex + index,
  }));
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
