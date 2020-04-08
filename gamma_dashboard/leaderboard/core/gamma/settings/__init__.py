"""
Provides gamma settings interface.
"""
from django.conf import settings

from gamma_dashboard.leaderboard.core.gamma.settings.wrapper import GammaSettingsWrapper


gamma_settings = GammaSettingsWrapper(settings)
