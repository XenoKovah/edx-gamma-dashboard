"""
Gamma leaderboard API views.
"""
from django.conf import settings
from django.contrib.auth.models import User

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from common.djangoapps.student.views import get_org_black_and_whitelist_for_site
from opaque_keys.edx.keys import CourseKey

from gamma_dashboard.dashboard.core.gamma.api.wrapper import gamma_api
from ..utils import site_badge_filter, is_main_site

MAIN_SITE_NAME = 'main'


class LeaderboardApiView(APIView):
    """
    Leaderboard API view.
    """

    def get(self, request):
        """
        Get Leaderboard info.
        """
        signup_source = request.user.usersignupsource_set.first()
        user_signup_source = signup_source.site if signup_source else MAIN_SITE_NAME
        leaderboard_info = gamma_api.get_leaderboard_info(user_signup_source)

        if leaderboard_info:
            response = Response(leaderboard_info)
        else:
            response = Response(
                {'error': 'No data received from Gamma server.'},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        return response


class GameProfileApiView(APIView):
    """
    Game Profile API view.
    """

    def get(self, request):
        """
        Get Game Profile of current logged user.
        """
        user_info = gamma_api.get_game_profile(request.user.username)
        site_org_whitelist, site_org_blacklist = get_org_black_and_whitelist_for_site()

        user_info['system_badges'] = site_badge_filter(
            badges=user_info.get('system_badges'),
            is_main_site=is_main_site(request),
            whitelist=site_org_whitelist,
            blacklist=site_org_blacklist,
            course_key_parser=CourseKey.from_string
        )

        if user_info:
            response = Response(user_info)
        else:
            response = Response(
                {'error': 'No data recieved from Gamma server.'},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        return response
