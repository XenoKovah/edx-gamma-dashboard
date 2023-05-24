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
from openedx.core.djangoapps.user_api.accounts.image_helpers import get_profile_image_urls_for_user

from gamma_dashboard.dashboard.core.gamma.api.settings import API_VERSION_1, DEFAULT_API_VERSION
from gamma_dashboard.dashboard.core.gamma.api.wrapper import GammaApiWrapper
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
        leaderboard_info = GammaApiWrapper(version=API_VERSION_1)\
                           .get_leaderboard_info(request.user.username, user_signup_source)

        if leaderboard_info:
            leaderboard_info_with_users_images = self._add_profile_image_urls(request.user, leaderboard_info)
            response = Response(leaderboard_info_with_users_images)
        else:
            response = Response(
                {'error': 'No data received from Gamma server.'},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        return response

    @staticmethod
    def _add_profile_image_urls(user, leaderboard_info):
        """
        Adds profile image URLs for each user in the leaderboard_info dictionary.

        Arguments:
            user (User): current user instance.
            leaderboard_info (dict):dictionary containing leaderboard information.
        Return:
            leaderboard_info (dict): Updated leaderboard_info with profile image URLs.
        """
        # Retrieving the url_profile_image for the current user
        # and adding it to the leaderboard_info dictionary.
        leaderboard_info['url_profile_image'] = get_profile_image_urls_for_user(user)['medium']
        
        all_user_list = leaderboard_info.get('top10') + leaderboard_info.get('competitors')
        user_uids = set(item['user_uid'] for item in all_user_list)
        users = User.objects.filter(username__in=user_uids)
        users_dict = {user.username: user for user in users}

        for key in ('top10', 'competitors'):
            for item in leaderboard_info[key]:
                if user := users_dict.get(item['user_uid']):
                    # Fetch the url_profile_image for users in the top 10 list and competitors list
                    # and add it as a parameter to each user.
                    item['url_profile_image'] = get_profile_image_urls_for_user(user)['medium']

        return leaderboard_info


class GameProfileApiView(APIView):
    """
    Game Profile API view.
    """

    def get(self, request):
        """
        Get Game Profile of current logged user.
        """
        user_info = GammaApiWrapper(version=DEFAULT_API_VERSION).get_game_profile(request.user.username)
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
