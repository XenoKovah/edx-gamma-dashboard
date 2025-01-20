"""
Gamma Api Wrapper.
"""

import requests
from urllib.parse import urljoin

from gamma_dashboard.dashboard.core.gamma.api.settings import GammaApiSettings
from gamma_dashboard.dashboard.core.gamma.settings import gamma_settings


class GammaApiWrapper:
    """
    Wraps Gamma Api into rpc-like object.
    """

    def __init__(self, settings=None, version=None):
        """
        Arguments:
            settings: django settings object.
        """
        settings = settings or gamma_settings.bridge

        self._api_settings = GammaApiSettings(settings)

        self._authentication_headers = {
            'App-Key': self._api_settings.key,
            'App-Secret': self._api_settings.secret
        }

        self._root_endpoint = self._api_settings.get_root_endpoint(version)

    def _inject_authentication_headers(self, request_kwargs):
        """
        Authenticated using the credentials. (Should be called inside constructor)
        """
        if type(request_kwargs) == dict:
            request_kwargs.setdefault('headers', {}).update(self._authentication_headers)

    def _get_absolute_endpoint_url(self, path):
        """
        Generate an absolute endpoint path from a relative path.

        Returns:
            str: an absolute endpoint path produced from API root endpoint and provided path.
        """
        return urljoin(self._root_endpoint, path.strip().lower())

    def _send_request(self, url, method='GET', **kwargs):
        """
        Perform all prerequisite actions, send a request, parse & return the result.

        Returns:
            dict, list, None: a parsed JSON response of a request or None.
        """
        result = None
        method_ = method.lower()

        if hasattr(requests, method_):
            request_executor = getattr(requests, method_)

            if callable(request_executor):
                self._inject_authentication_headers(kwargs)
                response = request_executor(url, **kwargs)

                if response.ok:
                    try:
                        result = response.json()

                    except ValueError:
                        pass

        return result

    def request_api_endpoint(self, endpoint, **kwargs):
        """
        Perform request to an `endpoint` of gamma API.
        """
        absolute_url = self._get_absolute_endpoint_url(endpoint)

        return self._send_request(absolute_url, **kwargs)

    def get_leaderboard_info(self, username, user_signup_source, course_id=None, **kwargs):
        """
        Return leaderboard data for user.

        Returns:
            dict: parsed leaderboard infromation.
        """
        return self.request_api_endpoint(
            'leaderboard',
            params={'username': username, 'signup_source': user_signup_source, 'course_id': course_id},
            **kwargs
        )

    def get_game_profile(self, username, **kwargs):
        """
        Return game profile data for user.

        Returns:
            dict: parsed game profile information.
        """
        return self.request_api_endpoint('gamma-profile', params={'username': username}, **kwargs)
