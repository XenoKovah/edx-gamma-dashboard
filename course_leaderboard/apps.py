from django.apps import AppConfig
from openedx.core.djangoapps.plugins.constants import (
    ProjectType, SettingsType, PluginURLs, PluginSettings
)
from openedx.core.release import RELEASE_LINE

COURSE_LEADERBOARD = 'course_leaderboard'

COURSE_KEY_PATTERN = r'(?P<course_key_string>[^/+]+(/|\+)[^/+]+(/|\+)[^/?]+)'
COURSE_ID_PATTERN = COURSE_KEY_PATTERN.replace('course_key_string', 'course_id')


class CourseLeaderboardConfig(AppConfig):
    """
    Course Leaderboard App Configuration.
    """

    name = COURSE_LEADERBOARD
    verbose_name = 'RaccoonGang Gamification Course Leaderboard tab'

    SETTINGS_CONF_TYPE = SettingsType.AWS if RELEASE_LINE == 'hawthorn' else SettingsType.PRODUCTION

    # Class attribute that configures and enables this app as a Plugin App.
    plugin_app = {
        PluginURLs.CONFIG: {
            ProjectType.LMS: {
                PluginURLs.NAMESPACE: COURSE_LEADERBOARD,
                PluginURLs.REGEX: '',
                PluginURLs.RELATIVE_PATH: 'urls',
            },
        },
        PluginSettings.CONFIG: {
            ProjectType.LMS: {
                SETTINGS_CONF_TYPE: {  # aws is used because we need variables from lms.env.json
                    PluginSettings.RELATIVE_PATH: 'settings',
                },
            },
        },
    }
