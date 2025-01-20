import axios from 'axios';

import { prepareDashboardData } from './utils';
import { DASHBOARD_URLS, FEEDBACK_FORM_URL, LEADERBOARD_URLS } from './constants';

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
      callback({});
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
};

/**
 * Sends feedback form data to the server.
 *
 * @param {Object} body - The data to be sent in the feedback form.
 * @param {Function} callback - Callback function to handle the server response.
 */
const sendFeedbackForm = (body, callback) => {
  const csrfToken = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)')?.pop();

  axios.post(FEEDBACK_FORM_URL, body, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
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
