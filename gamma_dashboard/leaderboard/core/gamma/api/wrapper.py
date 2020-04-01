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
        self._root_endpoint = self._api_settings.get_root_endpoint(version)

    def _authenticate(self):
        """
        Authenticated using the credentials. (Should be called inside constructor)
        """
        pass

    def _get_absolute_endpiont_url(self, path):
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

        if callable(request_executor):
            response = request_executor(url, **kwargs)

            if response.ok:
                try:
                    result = loads(response.content)

                except ValueError:
                    pass

        return result

    def get_leaderboard_info(self):
        """
        Return leaderboard data.

        Returns:
            dict: parsed leaderboard infromation.
        """
        absolute_url = self._get_absolute_endpiont_url('leaderboard')

        return self._send_request(absolute_url)


gamma_api = GammaApiWrapper()
