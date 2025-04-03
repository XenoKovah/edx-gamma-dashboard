"""
Gamma leaderboard API views.
"""
from django.contrib.auth.models import User
from edx_rest_framework_extensions.auth.session.authentication import SessionAuthenticationAllowInactiveUser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from common.djangoapps.student.views import get_org_black_and_whitelist_for_site
from opaque_keys.edx.keys import CourseKey
from openedx.core.djangoapps.user_api.accounts.image_helpers import get_profile_image_urls_for_user

from gamma_dashboard.dashboard.core.gamma.api.settings import DEFAULT_API_VERSION
from gamma_dashboard.dashboard.core.gamma.api.wrapper import GammaApiWrapper
from gamma_dashboard.toggles import show_gamma_leaderboard
from ..utils import site_badge_filter, is_main_site

from .temporary_mock_data import COURSE_LEADERBOARD_MOCK

MAIN_SITE_NAME = 'main'


class LeaderboardApiView(APIView):
    """
    Leaderboard API view.
    """
    permission_classes = (IsAuthenticated,)
    authentication_classes = (SessionAuthenticationAllowInactiveUser,)

    # TODO: Need to Refactor after `LeaderBoardView` updating in Gamma Core.
    def get(self, request, *args, **kwargs):
        """
        Get Leaderboard info.
        """
        course_id = kwargs.get("course_id")

        if not show_gamma_leaderboard() and not course_id:
            return Response({"error": "Gamma Leaderboard is disabled."}, status=status.HTTP_404_NOT_FOUND)

        signup_source = request.user.usersignupsource_set.first()
        user_signup_source = signup_source.site if signup_source else MAIN_SITE_NAME

        if course_id:
            leaderboard_info = COURSE_LEADERBOARD_MOCK
        else:
            leaderboard_info = GammaApiWrapper(
                version=DEFAULT_API_VERSION
            ).get_leaderboard_info(request.user.username, user_signup_source, course_id)

        if leaderboard_info:
            updated_leaderboard_info = self._update_leaderboard_info(request.user, leaderboard_info)
            response = Response(updated_leaderboard_info)
        else:
            response = Response(
                {"error": "No data received from Gamma server."}, status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        return response

    @staticmethod
    def _update_leaderboard_info(user, leaderboard_info):
        """
        Updates the leaderboard_info with profile image URLs and updated user_uid field for each user.

        Arguments:
            user (User): current user instance.
            leaderboard_info (dict):dictionary containing leaderboard information.
        Return:
            leaderboard_info (dict): Updated leaderboard_info with profile image URLs and new user_uid.
        """
        leaderboard_info["url_profile_image"] = get_profile_image_urls_for_user(user)["medium"]
        leaderboard_info["user_uid"] = user.profile.name if user.profile.name else user.username

        all_users = leaderboard_info.get("top10") + leaderboard_info.get("competitors")
        user_uids = set(item["user_uid"] for item in all_users)
        users = User.objects.filter(username__in=user_uids)
        users_dict = {user.username: user for user in users}

        for key in ("top10", "competitors"):
            for item in leaderboard_info[key]:
                if user := users_dict.get(item["user_uid"]):
                    item["user_uid"] = user.profile.name if user.profile.name else user.username
                    item["url_profile_image"] = get_profile_image_urls_for_user(user)["medium"]
                else:
                    # If the user is not found on the platform, change their Gamma-sourced username
                    item["user_uid"] = "unknown user"

        return leaderboard_info


class GameProfileApiView(APIView):
    """
    Game Profile API view.
    """
    permission_classes = (IsAuthenticated,)
    authentication_classes = (SessionAuthenticationAllowInactiveUser,)

    def get(self, request):
        """
        Get Game Profile of current logged user.
        """
        user_info = GammaApiWrapper(version=DEFAULT_API_VERSION).get_game_profile(request.user.username)

        if not user_info:
            return Response(
                {"error": "No data recieved from Gamma server."},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        site_org_whitelist, site_org_blacklist = get_org_black_and_whitelist_for_site()
        user_info["system_badges"] = site_badge_filter(
            badges=user_info.get("system_badges"),
            is_main_site=is_main_site(request),
            whitelist=site_org_whitelist,
            blacklist=site_org_blacklist,
            course_key_parser=CourseKey.from_string
        )

        return Response(user_info)


class GameUserAvatarConfigApiView(APIView):
    """
    Gamma User Avatar Config API view.
    """

    permission_classes = (IsAuthenticated,)
    authentication_classes = (SessionAuthenticationAllowInactiveUser,)

    def get(self, request):
        """
        Get User's Avatar Set Config by `config_id`.
        """
        config_id = request.query_params.get('config_id')
        gamma_user_avatar_config = GammaApiWrapper(
            version=DEFAULT_API_VERSION
        ).get_gamma_user_avatar_config(config_id=config_id)

        return Response(gamma_user_avatar_config)

    def post(self, request):
        """
        Create new User's Avatar Set Config.
        """
        gamma_user_avatar_config = GammaApiWrapper(
            version=DEFAULT_API_VERSION
        ).create_gamma_user_avatar_config(data=request.data)

        return Response(gamma_user_avatar_config)

    def patch(self, request):
        """
        Update existent User's Avatar Set Config by `config_id`.
        """
        config_id = request.query_params.get('config_id')
        gamma_user_avatar_config = GammaApiWrapper(
            version=DEFAULT_API_VERSION
        ).update_gamma_user_avatar_config(config_id=config_id, data=request.data)

        return Response(gamma_user_avatar_config)
