"""
Gamification dashboard urls.
"""
from django.conf.urls import include, url

from gamma_dashboard.leaderboard.core.gamma.settings import gamma_settings

urlpatterns = []

if gamma_settings.bridge.get('ENABLED'):
    urlpatterns.extend([
        url(r'api/', include('gamma_dashboard.leaderboard.api.urls', namespace='gamma-api')),
        url(r'leaderboard/',  include('gamma_dashboard.leaderboard.urls', namespace='gamma-leaderboard'))
    ])
