"""
General Gamma settings wrapper.
"""
GAMMA_SETTINGS_KEY = 'FEATURES'
BRIDGE_SETTINGS_KEY = 'RG_GAMIFICATION'


# TODO: Make GammaSettings class a facade to all settings, incorporating subsection settings wrappers.
class GammaSettingsWrapper:
    """
    Provides an interface to access gamma settings from django app settings.
    """

    def __init__(self, settings):
        """
        args:
            settings: django settings object.
        """
        self._settings = getattr(settings, GAMMA_SETTINGS_KEY, dict())

    @property
    def bridge(self):
        """
        Return unparsed bridges settings dictionary.

        Returns:
            dict: unparsed bridge settings.
        """
        return self._settings.get(BRIDGE_SETTINGS_KEY, dict())
