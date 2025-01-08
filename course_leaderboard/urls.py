from django.urls import include, path, re_path

from openedx.core.constants import COURSE_ID_PATTERN

from .views.tab_fragment import CourseLeaderboardTabView


urlpatterns = [
    re_path(
        fr'courses/{COURSE_ID_PATTERN}/course_leaderboard',
        CourseLeaderboardTabView.as_view(),
        name='course_leaderboard_tab'
    ),
]
