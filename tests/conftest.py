"""
Provide test fixtures.
"""
import pytest

from gamma_dashboard.leaderboard.core.gamma.api.settings import GammaApiSettings
from tests.fixtures.constants import (
    GAMIFICATION_ENDPOINT,
    GAMIFICATION_KEY,
    GAMIFICATION_SECRET,
)


@pytest.fixture
def custom_settings(settings, request):
    """
    Provide django settngs with ability to inject into/modify default settings.
    """
    if hasattr(request, 'param'):
        if type(request.param) == dict:
            settings.__dict__.update(request.param)

    return settings


@pytest.fixture(scope='class')
def gamma_settings(request):
    """
    Provide gamma settings with an option to override/append any desired setting.
    """
    settings = {
        "ENABLED": True,
        "RG_GAMIFICATION_ENDPOINT": GAMIFICATION_ENDPOINT,
        "SECRET": GAMIFICATION_SECRET,
        "KEY": GAMIFICATION_KEY,
        "IGNORED_EVENT_TYPES": []
    }

    if hasattr(request, 'param'):
        if type(request.param) == dict:
            settings.update(request.param)

    return settings
