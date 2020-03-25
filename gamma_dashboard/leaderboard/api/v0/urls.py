"""
Gamma leaderboard API urls.
"""
from django.conf.urls import include, url

from gamma_dashboard.leaderboard.api.v0.views import LeaderboardApiView


urlpatterns = [
    url(r'leaderboard/', LeaderboardApiView.as_view(), name='leaderboard'),
]
