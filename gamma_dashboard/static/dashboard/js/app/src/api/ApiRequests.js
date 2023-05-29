import axios from 'axios';

const API_VERSION = 0;
const BASE_URL = `/gamma_dashboard/api/v${API_VERSION}/`;

const LEADERBOARD_URLS = {
    getInfo: `${BASE_URL}leaderboard/`
};
const DASHBOARD_URLS = {
    getGameProfile: `${BASE_URL}game-profile/`
}
const FEEDBACK_FORM_URL = '/rg_products_toolkit/api/v0/submit_feedback/';

const leaderboard =  {
    getInfo: (callback) => {
        axios.get(
            LEADERBOARD_URLS.getInfo
        ).then(result => {
            callback(result.data || {});
        }).catch(error => {
            console.log('Leaderboard.getInfo::ERROR: ', error);
            callback({});
        });
    }
};

const dashboard = {
    getGameProfile: (callback) => {
        axios.get(
            DASHBOARD_URLS.getGameProfile
        ).then(result => {
            callback(result.data || {});
        }).catch(error => {
            console.log('Dashboard.getGameProfile::ERROR: ', error);
            callback({});
        });
    }
};

const sendFeedbackForm = (body, callback) => {
    const csrfToken = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)')?.pop();

    axios.post(
        FEEDBACK_FORM_URL, body, { headers: { "Content-Type": "application/json", "X-CSRFToken": csrfToken } }
    ).then(result => {
        callback(result.statusText || 'Error');
    }).catch(error => {
        console.log('FeedbackForm::ERROR: ', error);
        callback('Error');
    });
};

const gammaApi = {
    leaderboard,
    dashboard,
    sendFeedbackForm,
};

export default gammaApi;
