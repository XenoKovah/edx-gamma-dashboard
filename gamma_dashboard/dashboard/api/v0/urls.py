"""
Gamma leaderboard API urls.
"""
from django.urls import re_path

from gamma_dashboard.constants import COURSE_ID_PATTERN
from gamma_dashboard.dashboard.api.v0.views import LeaderboardApiView, GameProfileApiView


urlpatterns = [
    re_path(fr'^leaderboard(?:/{COURSE_ID_PATTERN})?/?$', LeaderboardApiView.as_view(), name='api-leaderboard'),
    re_path(r'^game-profile/', GameProfileApiView.as_view(), name='api-gameprofile')
]
