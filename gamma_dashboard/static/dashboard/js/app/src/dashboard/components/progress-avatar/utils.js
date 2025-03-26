/**
 * Computes the actual image URL for an avatar set.
 *
 * @param {Object} avatarSetData - The object containing avatar set information.
 * @param {boolean} isAvatarSetSelectable - Flag indicating whether the avatar set is selectable.
 * @param {string} gammaAdminBaseUrl - The base URL to prepend to the image path.
 * @param {string} fallback - The fallback URL to use if no image is available.
 * @returns {string} The full URL of the avatar image or the fallback URL if no image exists.
 */
export const getActualImageUrl = (
  avatarSetData,
  isAvatarSetSelectable,
  gammaAdminBaseUrl,
  fallback,
) => {
  if (!avatarSetData) {
    return fallback;
  }

  const { avatars = [], image: mainImage } = avatarSetData;
  const lastAvatar = avatars.length ? avatars[avatars.length - 1] : null;
  const avatarImage = isAvatarSetSelectable ? lastAvatar?.image : mainImage;
  return avatarImage ? `${gammaAdminBaseUrl}${avatarImage}` : fallback;
};
