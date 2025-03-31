/**
 * Returns the actual image URL for an avatar or avatar set.
 *
 * @param {Object} avatarOrSet - Object representing either a single avatar or an avatar set.
 * @param {boolean} isAvatarSetSelectable - Indicates if the avatar set is selectable; affects which image is used.
 * @param {string} gammaAdminBaseUrl - Base URL used to resolve relative image paths.
 * @param {string} fallback - Fallback URL returned if no image is available.
 * @returns {string} The resolved image URL or the fallback if no image is found.
 */
export const getActualImageUrl = (
  avatarOrSet,
  isAvatarSetSelectable,
  gammaAdminBaseUrl,
  fallback,
) => {
  if (!avatarOrSet) {
    return fallback;
  }

  const { avatars = [], image: mainImage } = avatarOrSet;
  const lastAvatar = avatars.length ? avatars[avatars.length - 1] : null;
  const avatarOrSetImage = isAvatarSetSelectable ? lastAvatar?.image : mainImage;

  if (!avatarOrSetImage) {
    return fallback;
  }

  // Handles relative URLs in local dev; server always returns absolute URLs.
  const isAbsoluteUrl = /^https?:\/\//i.test(avatarOrSetImage);
  return isAbsoluteUrl ? avatarOrSetImage : `${gammaAdminBaseUrl}${avatarOrSetImage}`;
};

/**
 * Checks if the given state is idle (not loading, not successful, not error).
 *
 * @param {Object} state - The state object to check.
 * @returns {boolean} True if the state is idle, false otherwise.
 */
export const isIdle = (state) => !state.isLoading && !state.isSuccess && !state.isError;
