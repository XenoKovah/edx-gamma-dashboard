"""
Settings for gamma dashboard pages provider.
"""
from os.path import (
    abspath,
    dirname,
    join,
)


PROJECT_BASE_DIR = dirname(abspath(__file__))


def _absolute_path_to(path):
    """
    Return an absolute path of a project's subpath `path`.
    """
    return join(PROJECT_BASE_DIR, path)


def plugin_settings(settings):
    """
    Read / Update necessary project settings.
    """
    settings.MAKO_TEMPLATE_DIRS_BASE.append(
        _absolute_path_to('templates')
    )

    settings.STATICFILES_DIRS.append(
        _absolute_path_to('static')
    )
