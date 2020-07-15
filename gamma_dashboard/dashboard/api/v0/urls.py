"""
Gamma leaderboard API urls.
"""
from django.conf.urls import include, url

from gamma_dashboard.dashboard.api.v0.views import LeaderboardApiView, GameProfileApiView


urlpatterns = [
    url(r'leaderboard/', LeaderboardApiView.as_view(), name='leaderboard'),
    url(r'game-profile/', GameProfileApiView.as_view(), name='gameprofile')
]
