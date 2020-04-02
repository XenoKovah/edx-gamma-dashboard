"""
Gamma Api Wrapper.
"""
from json import loads

import requests
from urlparse import urljoin

from gamma_dashboard.leaderboard.core.gamma.api.settings import GammaApiSettings
from gamma_dashboard.leaderboard.core.gamma.settings import gamma_settings


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
        request_kwargs.setdefault('headers', {}).update(self._authentication_headers)

    def _get_absolute_endpoint_url(self, path):
        """
        Generate an absolute endpoint path from a relative path.

        Returns:
            str: an absolute endpoint path produced from API root endpoint and provided path.
        """
        return urljoin(self._root_endpoint, path)

    def _send_request(self, url, method='GET', **kwargs):
        """
        Perform all prerequisite actions, send a request, parse & return the result.

        Returns:
            dict, list, None: a parsed JSON response of a request or None.
        """
        result = None
        request_executor = getattr(requests, method.lower())

        self._inject_authentication_headers(kwargs)

        if callable(request_executor):
            response = request_executor(url, **kwargs)

            if response.ok:
                try:
                    result = loads(response.content)

                except ValueError:
                    pass

        return result

    def request_api_endpoint(self, endpoint, **kwargs):
        """
        Perform request to an `endpoint` of gamma API.
        """
        absolute_url = self._get_absolute_endpoint_url(endpoint)

        return self._send_request(absolute_url, **kwargs)

    def get_leaderboard_info(self):
        """
        Return leaderboard data.

        Returns:
            dict: parsed leaderboard infromation.
        """
        return self.request_api_endpoint('leaderboard')


gamma_api = GammaApiWrapper()
