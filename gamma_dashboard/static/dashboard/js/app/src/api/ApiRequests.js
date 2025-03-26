import axios from 'axios';

import { prepareDashboardData } from './utils';
import {
  DASHBOARD_URLS, FEEDBACK_FORM_URL, LEADERBOARD_URLS, DEFAULT_HEADERS,
} from './constants';

const leaderboard = {
  /**
   * Fetches leaderboard information.
   *
   * @param {Function} callback - Callback function to handle the response data.
   */
  getInfo: (callback, courseId = '') => {
    axios.get(
      LEADERBOARD_URLS(courseId).getInfo,
    ).then(result => {
      callback(result.data || {});
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log('Leaderboard.getInfo::ERROR: ', error);
      callback({ error: error.message ?? 'Something went wrong...' });
    });
  },
};

const dashboard = {
  /**
   * Fetches game profile data and processes it.
   *
   * @param {Function} callback - Callback function to handle the processed data.
   */
  getGameProfile: (callback) => {
    axios.get(
      DASHBOARD_URLS.getGameProfile,
    ).then(result => {
      callback(prepareDashboardData(result.data) || {});
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log('Dashboard.getGameProfile::ERROR: ', error);
      callback({});
    });
  },

  /**
   * Select a new user avatar set.
   *
   * @param {string|number} userConfigurationId - The identifier for the user's configuration.
   * @param {string|number} gammaUserId - The gamma user identifier.
   * @param {string|number} selectedAvatarSetId - The identifier for the selected avatar set.
   * @returns {Promise} A Promise that resolves with the Axios response if
   * the request is successful, or rejects with an error.
   */
  selectUserAvatarSet: (gammaUserId, selectedAvatarSetId) => axios.post(
    DASHBOARD_URLS.selectUserAvatarSet(),
    {
      gamma_user_id: gammaUserId,
      selected_avatar_set_id: selectedAvatarSetId,
    },
    {
      headers: DEFAULT_HEADERS,
    },
  ),

  /**
   * Updates the user's avatar set configuration.
   *
   * @param {string|number} userConfigurationId - The user's configuration identifier.
   * @param {string|number} gammaUserId - The gamma user identifier.
   * @param {string|number} selectedAvatarSetId - The identifier of the selected avatar set.
   * @returns {Promise} A Promise that resolves with the Axios response when
   * the update is successful or rejects with an error.
   */
  updateUserAvatarSet: (userConfigurationId, gammaUserId, selectedAvatarSetId) => axios.patch(
    DASHBOARD_URLS.updateUserAvatarSet(userConfigurationId),
    {
      gamma_user_id: gammaUserId,
      selected_avatar_set_id: selectedAvatarSetId,
    },
    {
      headers: DEFAULT_HEADERS,
    },
  ),
};

/**
 * Sends feedback form data to the server.
 *
 * @param {Object} body - The data to be sent in the feedback form.
 * @param {Function} callback - Callback function to handle the server response.
 */
const sendFeedbackForm = (body, callback) => {
  axios.post(FEEDBACK_FORM_URL, body, {
    headers: DEFAULT_HEADERS,
  }).then(result => {
    callback(result.status);
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.log('FeedbackForm::ERROR: ', error);
    callback('Error');
  });
};

export const gammaApi = {
  leaderboard,
  dashboard,
  sendFeedbackForm,
  FEEDBACK_FORM_URL,
};
