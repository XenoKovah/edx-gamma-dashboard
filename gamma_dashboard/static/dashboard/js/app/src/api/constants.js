export const API_VERSION = 0;

export const BASE_URL = `/gamma_dashboard/api/v${API_VERSION}/`;

export const LEADERBOARD_URLS = {
  getInfo: `${BASE_URL}leaderboard/`,
};

export const DASHBOARD_URLS = {
  getGameProfile: `${BASE_URL}game-profile/`,
};

export const FEEDBACK_FORM_URL = `/rg_products_toolkit/api/v${API_VERSION}/submit_feedback/`;
