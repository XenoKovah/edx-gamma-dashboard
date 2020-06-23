"""
Gamification dashboard urls.
"""
from django.conf.urls import include, url

from gamma_dashboard.leaderboard.core.gamma.settings import gamma_settings

urlpatterns = []

if gamma_settings.bridge.get('ENABLED'):
    urlpatterns.extend([
        url(r'api/', include(('gamma_dashboard.leaderboard.api.urls', 'gamma.leaderboard.api'), namespace='gamma-api')),
        url(r'leaderboard/',  include(('gamma_dashboard.leaderboard.urls', 'gamma.leaderboard'), namespace='gamma-leaderboard'))
    ])
