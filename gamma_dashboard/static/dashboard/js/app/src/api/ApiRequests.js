import axios from 'axios';

import { FEEDBACK_FORM_URL } from './constants';
import { getDefaultHeaders } from './helpers/utils';

/**
 * Sends feedback form data to the server.
 *
 * @param {Object} body - The data to be sent in the feedback form.
 * @param {Function} callback - Callback function to handle the server response.
 */
const sendFeedbackForm = (body, callback) => {
  axios.post(FEEDBACK_FORM_URL, body, {
    headers: getDefaultHeaders(),
  }).then(result => {
    callback(result.status);
  }).catch(error => {
    // eslint-disable-next-line no-console
    console.log('FeedbackForm::ERROR: ', error);
    callback('Error');
  });
};

export const gammaApi = {
  sendFeedbackForm,
  FEEDBACK_FORM_URL,
};
