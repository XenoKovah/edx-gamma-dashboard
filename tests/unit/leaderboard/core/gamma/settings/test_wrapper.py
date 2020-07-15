"""
Provide tests for gamma.settings.wrapper module.
"""
import pytest

from gamma_dashboard.dashboard.core.gamma.settings.wrapper import GammaSettingsWrapper


class TestGammaSettingsWrapper:
    """
    GammaSettingsWrapper tests.
    """

    @pytest.mark.unittests
    def test_properties(self, settings):
        """
        Case: Check settings facade properties.
        Expect: GammaSettingsWrapper instance has `bridge` property.
        """
        settings_wrapper = GammaSettingsWrapper(settings)
        assert hasattr(settings_wrapper, 'bridge')

    @pytest.mark.unittests
    def test_bridge_property(self, settings, gamma_settings):
        """
        Case: Check `bridge` property of GammaSettingsWrapper .
        Expect: `bridge` property is a dictionary.
        """
        expected_bridge_settings = gamma_settings

        settings_wrapper = GammaSettingsWrapper(settings)

        assert settings_wrapper.bridge == expected_bridge_settings

    @pytest.mark.unittests
    @pytest.mark.parametrize(
        'custom_settings',
        [
            {
                'FEATURES': {},
            }
        ],
        indirect=['custom_settings'],
    )
    def test_gamma_settings_malformed_format(self, custom_settings):
        """
        Case: There are no gamma settings at all.
        Expect: an empty  dictionary.
        """
        malformed_settings = []
        expected_bridge_settings = {}

        settings_wrapper = GammaSettingsWrapper(malformed_settings)

        assert settings_wrapper.bridge == expected_bridge_settings
