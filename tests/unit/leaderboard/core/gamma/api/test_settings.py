"""
Provide tests for gamma.api.settings module.
"""
import pytest

from gamma_dashboard.dashboard.core.gamma.api.settings import GammaApiSettings
from tests.fixtures.constants import (
    GAMIFICATION_ENDPOINT,
    GAMIFICATION_KEY,
    GAMIFICATION_SECRET,
    RG_GAMIFICATION_ENDPOINT_KEY,
    RG_GAMIFICATION_KEY_KEY,
    RG_GAMIFICATION_SECRET_KEY,
)


class TestGammaApiSettngs:
    """
    `GammaApiSettings` tests.
    """

    @pytest.mark.unittests
    @pytest.mark.parametrize(
        'property_name',
        [
            'host', 'version_prefix', 'key', 'secret',
        ],
    )
    def test_property(self, property_name, gamma_settings):
        """
        Case: Check for `GammaApiSettings` properties.
        Expect: `GammaApiSettings` has `host`, `version_prefix`, `key`, `secret` properties.
        """
        gamma_api_settings = GammaApiSettings(gamma_settings)

        assert hasattr(gamma_api_settings, property_name)

    @pytest.mark.unittests
    @pytest.mark.parametrize(
        'gamma_settings, expected_host',
        [
            ({}, GAMIFICATION_ENDPOINT),
            ({RG_GAMIFICATION_ENDPOINT_KEY: 'invalid data'}, 'invalid data/'),
            ({RG_GAMIFICATION_ENDPOINT_KEY: ''}, '/'),
        ],
        indirect=['gamma_settings']
    )
    def test_host(self, gamma_settings, expected_host):
        """
        Case: Check `host` property value.
        Expect: property value is the same as the on in settings.
        """
        gamma_api_settings = GammaApiSettings(gamma_settings)

        assert gamma_api_settings.host == expected_host

    @pytest.mark.unittests
    @pytest.mark.parametrize(
        'api_version, expected_version_prefix',
        [
            (0, 'v0'),
            (None, 'v0'),
            (5, 'v0'),
        ],
    )
    def test_version_prefix(self, gamma_settings, api_version, expected_version_prefix):
        """
        Case: Check `version_prefix` property value.
        Expect: property value is the same as the on in settings.
        """
        gamma_api_settings = GammaApiSettings(gamma_settings, api_version)

        assert gamma_api_settings.version_prefix == expected_version_prefix

    @pytest.mark.unittests
    @pytest.mark.parametrize(
        'gamma_settings, expected_key',
        [
            ({}, GAMIFICATION_KEY),
            ({RG_GAMIFICATION_KEY_KEY: 'invalid data'}, 'invalid data'),
        ],
        indirect=['gamma_settings']
    )
    def test_key(self, gamma_settings, expected_key):
        """
        Case: Check `key` property value.
        Expect: property value is the same as the on in settings.
        """
        gamma_api_settings = GammaApiSettings(gamma_settings)

        assert gamma_api_settings.key == expected_key

    @pytest.mark.unittests
    @pytest.mark.parametrize(
        'gamma_settings, expected_secret',
        [
            ({}, GAMIFICATION_SECRET),
            ({RG_GAMIFICATION_SECRET_KEY: 'invalid data'}, 'invalid data'),
        ],
        indirect=['gamma_settings']
    )
    def test_secret(self, gamma_settings, expected_secret):
        """
        Case: Check `secret` property value.
        Expect: property value is the same as the on in settings.
        """
        gamma_api_settings = GammaApiSettings(gamma_settings)

        assert gamma_api_settings.secret == expected_secret

    @pytest.mark.unittests
    @pytest.mark.parametrize(
        'version, expected_root',
        [
            (None, '{}api/v0/'.format(GAMIFICATION_ENDPOINT)),
            (1, '{}api/v1/'.format(GAMIFICATION_ENDPOINT)),
        ]
    )
    def test_get_root_endpoint(self, gamma_settings, version, expected_root, mocker):
        """
        Case: Get root endpoint.
        Expect: root endpoint host and api version are correct.
        """
        mocker.patch.dict(
            'gamma_dashboard.dashboard.core.gamma.api.settings.API_VERSION_PREFIX',
            {
                0: 'v0',
                1: 'v1',

            }
        )

        gamma_api_settings = GammaApiSettings(gamma_settings)

        root_endpoint = gamma_api_settings.get_root_endpoint(version=version)

        assert root_endpoint == expected_root
