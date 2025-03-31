import { GAMMA_ADMIN_BASE_URL } from '../constants';

export const API_VERSION = 0;

export const BASE_URL = `/gamma_dashboard/api/v${API_VERSION}/`;

export const USER_AVATAR_CONFIG_URL = `${GAMMA_ADMIN_BASE_URL}/api/v${API_VERSION}/user_avatar_config/`;

export const LEADERBOARD_URLS = (courseId) => ({
  getInfo: `${BASE_URL}leaderboard/${courseId}`,
});

export const DASHBOARD_URLS = {
  getGameProfile: `${BASE_URL}game-profile/`,
  selectUserAvatarSet: () => USER_AVATAR_CONFIG_URL,
  updateUserAvatarSet: (userConfigurationId) => `${USER_AVATAR_CONFIG_URL}${userConfigurationId}/`,
};

export const FEEDBACK_FORM_URL = `/rg_products_toolkit/api/v${API_VERSION}/submit_feedback/`;
