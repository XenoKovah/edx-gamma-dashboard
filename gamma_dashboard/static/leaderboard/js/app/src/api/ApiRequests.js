import axios from 'axios';

const API_VERSION = 0;
const BASE_URL = `/gamma_dashboard/api/v${API_VERSION}/`;

const LEADERBOARD_URLS = {
    getInfo: `${BASE_URL}leaderboard/`
};

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

const gammaApi = {
    leaderboard
};

export default gammaApi;
