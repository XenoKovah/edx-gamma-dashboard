"""
Gamma leaderboard API urls.
"""
from django.urls import re_path

from gamma_dashboard.constants import COURSE_ID_PATTERN
from gamma_dashboard.dashboard.api.v0.views import (
    BadgeLeaderboardApiView,
    CourseLeaderboardApiView,
    GameProfileApiView,
    GameUserAvatarConfigApiView,
    LeaderboardApiView,
    UserBadgesApiView,
)


urlpatterns = [
    re_path(
        fr'^leaderboard/badge/(?P<badge_slug>[-\w]+)(?:/{COURSE_ID_PATTERN})?/?$',
        BadgeLeaderboardApiView.as_view(),
        name='api-badge-leaderboard',
    ),
    # Must precede the generic leaderboard pattern, which would otherwise swallow this path.
    re_path(
        fr'^leaderboard/course/{COURSE_ID_PATTERN}/?$',
        CourseLeaderboardApiView.as_view(),
        name='api-course-leaderboard',
    ),
    re_path(fr'^leaderboard(?:/{COURSE_ID_PATTERN})?/?$', LeaderboardApiView.as_view(), name='api-leaderboard'),
    re_path(r'^game-profile/', GameProfileApiView.as_view(), name='api-gameprofile'),
    re_path(r'^user-badges/(?P<username>[\w.@+-]+)/?$', UserBadgesApiView.as_view(), name='api-user-badges'),
    re_path(r'^user-avatar-config', GameUserAvatarConfigApiView.as_view(), name='api-user-avatarconfig'),
]
