"""
Gamma leaderboard API urls.
"""
from django.urls import re_path

from gamma_dashboard.constants import COURSE_ID_PATTERN
from gamma_dashboard.dashboard.api.v0.views import (
    BadgeLeaderboardApiView,
    BadgeNotificationsApiView,
    CountryLeaderboardApiView,
    CourseLeaderboardApiView,
    GameProfileApiView,
    GameUserAvatarConfigApiView,
    LeaderboardApiView,
    LeaderboardOptOutApiView,
    UserBadgesApiView,
    UserLevelApiView,
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
    # 2-letter ISO country code; also precedes the generic leaderboard pattern.
    re_path(
        r'^leaderboard/country/(?P<country_code>[A-Za-z]{2})/?$',
        CountryLeaderboardApiView.as_view(),
        name='api-country-leaderboard',
    ),
    # Precedes the generic leaderboard pattern (which would otherwise swallow this path).
    re_path(r'^leaderboard-opt-out/?$', LeaderboardOptOutApiView.as_view(), name='api-leaderboard-opt-out'),
    re_path(fr'^leaderboard(?:/{COURSE_ID_PATTERN})?/?$', LeaderboardApiView.as_view(), name='api-leaderboard'),
    re_path(r'^game-profile/', GameProfileApiView.as_view(), name='api-gameprofile'),
    re_path(r'^user-badges/(?P<username>[\w.@+-]+)/?$', UserBadgesApiView.as_view(), name='api-user-badges'),
    re_path(r'^user-level/(?P<username>[\w.@+-]+)/?$', UserLevelApiView.as_view(), name='api-user-level'),
    re_path(
        r'^badge-notifications/?$',
        BadgeNotificationsApiView.as_view(),
        name='api-badge-notifications',
    ),
    re_path(r'^user-avatar-config', GameUserAvatarConfigApiView.as_view(), name='api-user-avatarconfig'),
]
