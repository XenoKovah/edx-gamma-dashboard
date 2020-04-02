"""
Gamification dashboard urls.
"""
from django.conf.urls import include, url

urlpatterns = [
    url(r'api/', include('gamma_dashboard.leaderboard.api.urls', namespace='gamma-api')),
    url(r'leaderboard/',  include('gamma_dashboard.leaderboard.urls', namespace='gamma-leaderboard'))
]
