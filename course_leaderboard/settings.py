"""
Settings for course leaderboard App.
"""

from path import Path


def plugin_settings(settings):
    """
    Read / Update necessary project settings.
    """
    settings.MAKO_TEMPLATE_DIRS_BASE.append(Path(__file__).parent / 'templates')
