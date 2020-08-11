export const buildURL = (url) => {
    // check if provided URL is not absolute and complete it with base URL if needed
    // windows.GAMIFICATION_BASE_URL should be passed from server at template page

    return /^(http(s?)):\/\//i.test(url)? url : `${window.GAMIFICATION_BASE_URL}${url}`
};
