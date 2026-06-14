"""
Provide tests for gamma.api.wrapper module.
"""
import pytest

from gamma_dashboard.dashboard.core.gamma.api.settings import API_VERSION_1
from gamma_dashboard.dashboard.core.gamma.api.wrapper import GammaApiWrapper
from tests.fixtures.constants import (
    GAMIFICATION_ENDPOINT,
    GAMIFICATION_KEY,
    GAMIFICATION_SECRET,
)


class TestGammaApiWrapper:
    """
    GammaSettingsWrapper tests.
    """

    @pytest.mark.unittests
    @pytest.mark.parametrize(
        'actual_kwargs, expected_kwargs',
        [
            (
                {},
                {
                    'headers': {
                        'App-Key': GAMIFICATION_KEY,
                        'App-Secret': GAMIFICATION_SECRET,
                    }
                }
            ),
            (
                {
                    'headers': {
                        'Content-Type': 'application/json',
                    }
                },
                {
                    'headers': {
                        'Content-Type': 'application/json',
                        'App-Key': GAMIFICATION_KEY,
                        'App-Secret': GAMIFICATION_SECRET,
                    }
                }
            )
        ]
    )
    def test_inject_authentication_headers(self, gamma_settings, mocker, actual_kwargs, expected_kwargs):
        """
        Case: Inject authentication headers into 'kwargs' dictionary.
        Expect: 'kwargs' dictionary is populated with correct App-Key & App-Secret header values.
        """
        mocker.patch(
            'gamma_dashboard.dashboard.core.gamma.settings.wrapper.GammaSettingsWrapper.bridge',
            new_callable=mocker.PropertyMock(return_value=gamma_settings)
        )

        api_wrapper = GammaApiWrapper()
        api_wrapper._inject_authentication_headers(actual_kwargs)

        assert actual_kwargs == expected_kwargs

    @pytest.mark.unittests
    def test_inject_authentication_headers_malformed_request_kwargs(self, gamma_settings, mocker):
        """
        Case: Inject authentication headers into malformed 'kwargs'.
        Expect: 'kwargs' entity is lef as is.
        """
        expected_kwargs = []
        incorrect_kwargs = []

        mocker.patch(
            'gamma_dashboard.dashboard.core.gamma.settings.wrapper.GammaSettingsWrapper.bridge',
            new_callable=mocker.PropertyMock(return_value=gamma_settings)
        )

        api_wrapper = GammaApiWrapper()
        api_wrapper._inject_authentication_headers(incorrect_kwargs)

        assert incorrect_kwargs == expected_kwargs

    @pytest.mark.unittests
    @pytest.mark.parametrize(
        'endpoint_name, expected_url',
        [
            ('first', '{}api/v0/first'.format(GAMIFICATION_ENDPOINT)),
            ('', '{}api/v0/'.format(GAMIFICATION_ENDPOINT)),
            ('  ', '{}api/v0/'.format(GAMIFICATION_ENDPOINT)),
            (' MY_path ', '{}api/v0/my_path'.format(GAMIFICATION_ENDPOINT)),
        ]
    )
    def test_get_absolute_endpoint_url(self, gamma_settings, endpoint_name, expected_url):
        """
        Case: Get absolute endpoint url by it's name.
        Expect: Absolute endpoint url is correct.
        """

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        actual_url = api_wrapper._get_absolute_endpoint_url(endpoint_name)

        assert actual_url == expected_url

    @pytest.mark.unittests
    def test_send_request_default_method(self, gamma_settings, mocker):
        """
        Case: Send request to a url.
        Expect: `get` method is used to send requests by default.
        """
        test_url = GAMIFICATION_ENDPOINT

        mocked_get = mocker.patch('requests.get')
        mocked_get.return_value.ok = True
        mocked_get.return_value.json = mocker.Mock(return_value=[])

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        request_result = api_wrapper._send_request(test_url)

        assert request_result == []

    @pytest.mark.unittests
    def test_send_request_invalid_method(self, gamma_settings, mocker):
        """
        Case: Send request with invalid method.
        Expect: Request is not sent and a `None` result is returned.
        """
        test_url = GAMIFICATION_ENDPOINT
        invalid_method = 'toss'

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        request_result = api_wrapper._send_request(test_url, method=invalid_method)

        assert request_result == None

    @pytest.mark.unittests
    def test_send_request_invalid_response_json(self, gamma_settings, mocker):
        """
        Case: Send request & receive invalid JSON data response.
        Expect: Request is not sent and a `None` result is returned.
        """
        test_url = GAMIFICATION_ENDPOINT

        mocked_get = mocker.patch('requests.get')
        mocked_get.return_value.ok = True
        mocked_get.return_value.json = mocker.Mock(side_effect=ValueError)

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        request_result = api_wrapper._send_request(test_url)

        assert request_result == None

    @pytest.mark.unittests
    def test_get_leaderboard_info(self, gamma_settings, mocker):
        """
        Case: Request leaderboard data for specific user (DEFAULT_API_VERSION).
        Expect: Request is sent to correct URL & correct data is received.
        """
        expeceted_data = {}
        username = 'test_username'
        user_signup_source = 'main-site.com'
        leaderboard_absolute_url = '{}api/v0/leaderboard'.format(GAMIFICATION_ENDPOINT)

        mocked_get = mocker.patch('requests.get')
        mocked_get.return_value.ok = True
        mocked_get.return_value.json = mocker.Mock(return_value={})

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        api_wrapper_spy = mocker.spy(api_wrapper, '_send_request')
        leaderboard_data = api_wrapper.get_leaderboard_info(username, user_signup_source)

        api_wrapper_spy.assert_called_with(
            leaderboard_absolute_url, params={
                'username': username, 'signup_source': user_signup_source, 'course_id': None,
            }
        )

        assert leaderboard_data == expeceted_data

    @pytest.mark.unittests
    def test_get_leaderboard_info_v1(self, gamma_settings, mocker):
        """
        Case: Request leaderboard data for specific user (API_VERSION_1).
        Expect: Request is sent to correct URL & correct data is received.
        """
        expeceted_data = {
            "top10": [
                { "user_uid": "username1", "url_profile_image": "/images/default.png", "points": 100000, "system_statuses": [] },
                { "user_uid": "username2", "url_profile_image": "/images/default.png", "points": 99999, "system_statuses": [] },
                { "user_uid": "username3", "url_profile_image": "/images/default.png", "points": 88888, "system_statuses": [] },
                { "user_uid": "username4", "url_profile_image": "/images/default.png", "points": 77777, "system_statuses": [] },
                { "user_uid": "current_user", "url_profile_image": "/images/default_0.png", "points": 67891, "system_statuses": [] },
                { "user_uid": "username6", "url_profile_image": "/images/default.png", "points": 55555, "system_statuses": [] },
                { "user_uid": "username7", "url_profile_image": "/images/default.png", "points": 44444, "system_statuses": [] },
                { "user_uid": "username8", "url_profile_image": "/images/default.png", "points": 33333, "system_statuses": [] },
                { "user_uid": "username9", "url_profile_image": "/images/default.png", "points": 22222, "system_statuses": [] },
                { "user_uid": "username10", "url_profile_image": "/images/default.png", "points": 11111, "system_statuses": [] }
            ],
            "system_statuses": [],
            "rank": 5,
            "user_uid": "current_user",
            "url_profile_image": "/images/default_0.png",
            "competitors": []
        }

        username = 'test_username'
        user_signup_source = 'main'
        leaderboard_absolute_url = '{}api/v1/leaderboard'.format(GAMIFICATION_ENDPOINT)

        mocked_get = mocker.patch('requests.get')
        mocked_get.return_value.ok = True
        mocked_get.return_value.json = mocker.Mock(return_value=expeceted_data)

        api_wrapper = GammaApiWrapper(settings=gamma_settings, version=API_VERSION_1)
        api_wrapper_spy = mocker.spy(api_wrapper, '_send_request')
        leaderboard_data = api_wrapper.get_leaderboard_info(username, user_signup_source)

        api_wrapper_spy.assert_called_with(
            leaderboard_absolute_url, params={
                'username': username, 'signup_source': user_signup_source, 'course_id': None
            }
        )

        assert leaderboard_data == expeceted_data

    @pytest.mark.unittests
    def test_get_gamma_user_avatar_config(self, gamma_settings, mocker):
        """
        Case: Request User's Avatar Set Config data for given `config_id` (DEFAULT_API_VERSION).
        Expect: Request is sent to correct URL & correct data is received.
        """
        expected_data = {}
        user_avatar_config_absolute_url = '{}api/v0/user_avatar_config'.format(GAMIFICATION_ENDPOINT)
        config_id_mock = 1

        mocked_get = mocker.patch('requests.get')
        mocked_get.return_value.ok = True
        mocked_get.return_value.json = mocker.Mock(return_value={})

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        api_wrapper_spy = mocker.spy(api_wrapper, '_send_request')
        user_avatar_config_data = api_wrapper.get_gamma_user_avatar_config(config_id=config_id_mock)

        api_wrapper_spy.assert_called_with(f'{user_avatar_config_absolute_url}/{config_id_mock}/')

        assert user_avatar_config_data == expected_data

    @pytest.mark.unittests
    def test_create_gamma_user_avatar_config(self, gamma_settings, mocker):
        """
        Case: Create User's Avatar Set Config data for given (DEFAULT_API_VERSION).
        Expect: Request is sent to correct URL & correct data is received.
        """
        expected_data = {}
        user_avatar_config_absolute_url = '{}api/v0/user_avatar_config/'.format(GAMIFICATION_ENDPOINT)
        data_mock = {
            'gamma_user_id': 1,
            'selected_avatar_set_id': 1
        }

        mocked_get = mocker.patch('requests.post')
        mocked_get.return_value.ok = True
        mocked_get.return_value.json = mocker.Mock(return_value={})

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        api_wrapper_spy = mocker.spy(api_wrapper, '_send_request')
        user_avatar_config_data = api_wrapper.create_gamma_user_avatar_config(data=data_mock)

        api_wrapper_spy.assert_called_with(user_avatar_config_absolute_url, method='POST', data=data_mock)

        assert user_avatar_config_data == expected_data

    @pytest.mark.unittests
    def test_update_gamma_user_avatar_config(self, gamma_settings, mocker):
        """
        Case: Update User's Avatar Set Config data for given `config_id` (DEFAULT_API_VERSION).
        Expect: Request is sent to correct URL & correct data is received.
        """
        expected_data = {}
        user_avatar_config_absolute_url = '{}api/v0/user_avatar_config'.format(GAMIFICATION_ENDPOINT)
        config_id_mock = 1
        data_mock = {
            'gamma_user_id': 1,
            'selected_avatar_set_id': 1
        }

        mocked_get = mocker.patch('requests.patch')
        mocked_get.return_value.ok = True
        mocked_get.return_value.json = mocker.Mock(return_value={})

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        api_wrapper_spy = mocker.spy(api_wrapper, '_send_request')
        user_avatar_config_data = api_wrapper.update_gamma_user_avatar_config(config_id=config_id_mock, data=data_mock)

        api_wrapper_spy.assert_called_with(
            f'{user_avatar_config_absolute_url}/{config_id_mock}/', method='PATCH', data=data_mock
        )

        assert user_avatar_config_data == expected_data

    @pytest.mark.unittests
    def test_get_leaderboard_opt_out(self, gamma_settings, mocker):
        """
        Case: Read a user's leaderboard opt-out flag (DEFAULT_API_VERSION).
        Expect: GET is sent to the opt-out URL with the username and data returned.
        """
        opt_out_url = '{}api/v0/users/leaderboard-opt-out/'.format(GAMIFICATION_ENDPOINT)
        mocked_get = mocker.patch('requests.get')
        mocked_get.return_value.ok = True
        mocked_get.return_value.json = mocker.Mock(return_value={'excluded': True})

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        api_wrapper_spy = mocker.spy(api_wrapper, '_send_request')
        result = api_wrapper.get_leaderboard_opt_out('test_username')

        api_wrapper_spy.assert_called_with(opt_out_url, params={'username': 'test_username'})
        assert result == {'excluded': True}

    @pytest.mark.unittests
    def test_set_leaderboard_opt_out(self, gamma_settings, mocker):
        """
        Case: Set a user's leaderboard opt-out flag (DEFAULT_API_VERSION).
        Expect: POST is sent to the opt-out URL with the username + excluded payload.
        """
        opt_out_url = '{}api/v0/users/leaderboard-opt-out/'.format(GAMIFICATION_ENDPOINT)
        mocked_post = mocker.patch('requests.post')
        mocked_post.return_value.ok = True
        mocked_post.return_value.json = mocker.Mock(return_value={'excluded': True})

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        api_wrapper_spy = mocker.spy(api_wrapper, '_send_request')
        result = api_wrapper.set_leaderboard_opt_out('test_username', True)

        api_wrapper_spy.assert_called_with(
            opt_out_url, method='POST', json={'username': 'test_username', 'excluded': True}
        )
        assert result == {'excluded': True}

    @pytest.mark.unittests
    def test_get_excluded_user_uids(self, gamma_settings, mocker):
        """
        Case: List the user_uids of everyone opted out of ranking (DEFAULT_API_VERSION).
        Expect: GET is sent to the excluded-uids URL and the data returned.
        """
        excluded_url = '{}api/v0/users/leaderboard-excluded-uids/'.format(GAMIFICATION_ENDPOINT)
        mocked_get = mocker.patch('requests.get')
        mocked_get.return_value.ok = True
        mocked_get.return_value.json = mocker.Mock(return_value={'user_uids': ['a', 'b']})

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        api_wrapper_spy = mocker.spy(api_wrapper, '_send_request')
        result = api_wrapper.get_excluded_user_uids()

        api_wrapper_spy.assert_called_with(excluded_url)
        assert result == {'user_uids': ['a', 'b']}
