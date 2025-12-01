"""
Gamma dashboard API urls.
"""

from django.urls import path, re_path

from gamma_dashboard.constants import COURSE_ID_PATTERN
from gamma_dashboard.dashboard.api.v0.views import (
    AvatarProgressApiView,
    GameProfileApiView,
    GameUserAvatarConfigApiView,
    LeaderboardApiView,
)

urlpatterns = [
    re_path(rf"^leaderboard(?:/{COURSE_ID_PATTERN})?/?$", LeaderboardApiView.as_view(), name="api-leaderboard"),
    path("game-profile/", GameProfileApiView.as_view(), name="api-game-profile"),
    path("user-avatar-config/", GameUserAvatarConfigApiView.as_view(), name="api-user-avatar-config"),
    path("avatar-progress/", AvatarProgressApiView.as_view(), name="api-avatar-progress"),
]
