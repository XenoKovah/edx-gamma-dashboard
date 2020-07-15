"""
Provide tests for gamma.api.wrapper module.
"""
import pytest


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
        mocked_get.return_value.content = '[]'

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
        mocked_get.return_value.content = '<h1>Hello there!</h1>'

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        request_result = api_wrapper._send_request(test_url)

        assert request_result == None

    @pytest.mark.unittests
    def test_get_leaderboard_info(self, gamma_settings, mocker):
        """
        Case: Request leaderboard data.
        Expect: Request is sent to correct URL & correct data is received.
        """
        expeceted_data = {}
        leaderboard_absolute_url = '{}api/v0/leaderboard'.format(GAMIFICATION_ENDPOINT)

        mocked_get = mocker.patch('requests.get')
        mocked_get.return_value.ok = True
        mocked_get.return_value.content = '{}'

        api_wrapper = GammaApiWrapper(settings=gamma_settings)
        api_wrapper_spy = mocker.spy(api_wrapper, '_send_request')
        leaderboard_data = api_wrapper.get_leaderboard_info()

        api_wrapper_spy.assert_called_with(leaderboard_absolute_url)

        assert leaderboard_data == expeceted_data
