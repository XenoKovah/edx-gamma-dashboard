from django.apps import AppConfig
from openedx.core.djangoapps.plugins.constants import (
    ProjectType, SettingsType, PluginURLs, PluginSettings
)
from openedx.core.release import RELEASE_LINE

GAMMA_DASHBOARD = 'gamma_dashboard'


class GamificationDashboardConfig(AppConfig):
    name = GAMMA_DASHBOARD
    verbose_name = "RaccoonGang Gamification Dashboard Pages"

    SETTINGS_CONF_TYPE = SettingsType.AWS if RELEASE_LINE == 'hawthorn' else SettingsType.PRODUCTION

    # Class attribute that configures and enables this app as a Plugin App.
    plugin_app = {
        PluginURLs.CONFIG: {
            ProjectType.LMS: {
                PluginURLs.NAMESPACE: GAMMA_DASHBOARD,
                PluginURLs.APP_NAME: GAMMA_DASHBOARD,
                PluginURLs.REGEX: '^{}/'.format(GAMMA_DASHBOARD),
                PluginURLs.RELATIVE_PATH: 'urls',
            }
        },

        PluginSettings.CONFIG: {
            ProjectType.LMS: {
                SETTINGS_CONF_TYPE: {  # aws is used because we need variables from lms.env.json
                    PluginSettings.RELATIVE_PATH: 'settings',
                },
            }
        },
    }
