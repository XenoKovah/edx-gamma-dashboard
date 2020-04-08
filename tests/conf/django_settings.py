"""
Test Django settings.
"""
from tests.fixtures.constants import (
    GAMIFICATION_ENDPOINT,
    GAMIFICATION_KEY,
    GAMIFICATION_SECRET
)

SECRET_KEY = "test secret"

FEATURES = {
    'RG_GAMIFICATION': {
        "ENABLED": True,
        "RG_GAMIFICATION_ENDPOINT": GAMIFICATION_ENDPOINT,
        "SECRET": GAMIFICATION_SECRET,
        "KEY": GAMIFICATION_KEY,
        "IGNORED_EVENT_TYPES": []
    }
}

__all__ = [
    'SECRET_KEY'
    'FEATURES'
]
