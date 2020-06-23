"""
Gamma API Wrapper settings.
"""
from urllib.parse import urljoin

GAMMA_ENDPOINT_KEY = 'RG_GAMIFICATION_ENDPOINT'
GAMMA_DASHBOARD_API_VERSION_KEY = 'GAMMA_DASHBOARD_API_VERSION_KEY'
AUTHORIZATION_KEY_KEY = 'KEY'
AUTHORIZATION_SECRET_KEY = 'SECRET'

DEFAULT_API_VERSION = 0
DEFAULT_API_PREFIX = 'v0'
# TODO: Use enum when the edx/project is moved to python > 3.4
API_VERSION_PREFIX = {
    0: 'v0'
}


class GammaApiSettings:
    """
    Gamma API settings wrapper.
    """

    def __init__(self, gamma_settings=None, version=None):
        """
        args:
            settings: a dictionary containing gamification settings read from settings.FEATURES["RG_GAMIFICATION"].
        """
        self._settings = gamma_settings or dict()

        self._host = self._settings.get(GAMMA_ENDPOINT_KEY, '')
        self._host = self._host if self._host.endswith('/') else '{}/'.format(self._host)

        version = version or DEFAULT_API_VERSION
        version = self._settings.get(GAMMA_DASHBOARD_API_VERSION_KEY, version)
        self._version_prefix = self._get_version_prefix(version)

    @staticmethod
    def _get_version_prefix(version):
        """
        Generate version prefix string.

        Returns:
            str: API URL version prefix.
        """
        return API_VERSION_PREFIX.get(version, DEFAULT_API_PREFIX)

    @property
    def host(self):
        """
        Return gamma API host string.
        """
        return self._host

    @property
    def version_prefix(self):
        """
        Return gamma API endpoit version prefix.
        """
        return self._version_prefix

    def get_root_endpoint(self, version=None):
        """
        Return gamma API root endpoint.

        Returns:
            str: gamma API root endpoint.
        """
        version_prefix = self._get_version_prefix(version) if version else self.version_prefix
        api_root = 'api/{}/'.format(version_prefix)

        return urljoin(self._host, api_root)

    @property
    def key(self):
        """
        Return authorization key.
        """
        return self._settings.get(AUTHORIZATION_KEY_KEY)

    @property
    def secret(self):
        """
        Return authorization secret.
        """
        return self._settings.get(AUTHORIZATION_SECRET_KEY)
