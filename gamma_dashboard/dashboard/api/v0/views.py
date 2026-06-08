"""
Gamma leaderboard API views.
"""
from urllib.parse import urljoin

from django.conf import settings
from django.contrib.auth.models import User
from edx_rest_framework_extensions.auth.jwt.authentication import JwtAuthentication
from edx_rest_framework_extensions.auth.session.authentication import SessionAuthenticationAllowInactiveUser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from common.djangoapps.student.views import get_org_black_and_whitelist_for_site
from opaque_keys.edx.keys import CourseKey
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers
from openedx.core.djangoapps.user_api.accounts import PRIVATE_VISIBILITY
from openedx.core.djangoapps.user_api.accounts.api import get_account_settings
from openedx.core.djangoapps.user_api.accounts.image_helpers import get_profile_image_urls_for_user
from openedx.core.djangoapps.user_api.errors import UserNotFound

from course_leaderboard.toggles import show_course_leaderboard_tab
from gamma_dashboard.dashboard.core.gamma.api.settings import DEFAULT_API_VERSION
from gamma_dashboard.dashboard.core.gamma.api.wrapper import GammaApiWrapper
from gamma_dashboard.toggles import show_gamma_leaderboard
from ..utils import site_badge_filter, is_main_site

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

        if course_id and not show_course_leaderboard_tab() or not course_id and not show_gamma_leaderboard():
            return Response({"error": "Gamma Leaderboard is disabled."}, status=status.HTTP_404_NOT_FOUND)

        signup_source = request.user.usersignupsource_set.first()
        user_signup_source = signup_source.site if signup_source else MAIN_SITE_NAME

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
    def _get_profile_url(username):
        """
        Build the URL of a user's profile page.

        When the Profile MFE is configured (``PROFILE_MICROFRONTEND_URL``) the link points
        straight at it, mirroring how edx-platform itself builds learner profile links.
        Otherwise it falls back to the LMS ``/u/<username>`` route, which redirects to the
        Profile MFE when it is enabled.

        Arguments:
            username (str): the platform username to link to.
        Return:
            str: an absolute (or LMS-relative) URL to the user's profile page.
        """
        profile_mfe_base = getattr(settings, "PROFILE_MICROFRONTEND_URL", None)
        if profile_mfe_base:
            return f"{profile_mfe_base}{username}"
        return f"/u/{username}"

    @staticmethod
    def _update_leaderboard_info(user, leaderboard_info):
        """
        Updates the leaderboard_info with profile image URLs, profile page URLs and the
        updated user_uid field for each user.

        Arguments:
            user (User): current user instance.
            leaderboard_info (dict):dictionary containing leaderboard information.
        Return:
            leaderboard_info (dict): Updated leaderboard_info with profile image URLs,
            profile page URLs and new user_uid.
        """
        leaderboard_info["url_profile_image"] = get_profile_image_urls_for_user(user)["medium"]
        leaderboard_info["user_uid"] = user.profile.name if user.profile.name else user.username
        leaderboard_info["profile_url"] = LeaderboardApiView._get_profile_url(user.username)

        all_users = leaderboard_info.get("top10") + leaderboard_info.get("competitors")
        user_uids = set(item["user_uid"] for item in all_users)
        users = User.objects.filter(username__in=user_uids)
        users_dict = {user.username: user for user in users}

        for key in ("top10", "competitors"):
            for item in leaderboard_info[key]:
                if user := users_dict.get(item["user_uid"]):
                    item["profile_url"] = LeaderboardApiView._get_profile_url(user.username)
                    item["user_uid"] = user.profile.name if user.profile.name else user.username
                    item["url_profile_image"] = get_profile_image_urls_for_user(user)["medium"]
                else:
                    # If the user is not found on the platform, change their Gamma-sourced username
                    # and leave them without a profile link.
                    item["user_uid"] = "unknown user"
                    item["profile_url"] = None

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


class UserBadgesApiView(APIView):
    """
    Returns the badges a given user has earned (completed), for display on their
    Open edX profile page. Honors the target user's profile-visibility setting.
    """

    permission_classes = (IsAuthenticated,)
    # JWT is listed first because this endpoint is called cross-origin from the
    # Profile MFE (apps.<host>); the other gamma_dashboard views are same-origin only.
    authentication_classes = (JwtAuthentication, SessionAuthenticationAllowInactiveUser)

    def get(self, request, username):
        """
        Get the list of completed badges for ``username``.
        """
        if not self._is_profile_visible(request, username):
            return Response([])

        profile_info = GammaApiWrapper(version=DEFAULT_API_VERSION).get_game_profile(username)

        if not profile_info:
            return Response(
                {"error": "No data received from Gamma server."},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        gamma_base = self._gamma_public_base_url()
        # Index the current badge configuration by slug so we can show the up-to-date
        # title/description/image rather than the snapshot stored on the achievement
        # at award time.
        system_badges_by_slug = {
            badge["slug"]: badge
            for badge in (profile_info.get("system_badges") or [])
            if badge.get("slug")
        }

        earned_badges = []
        for badge in profile_info.get("badges") or []:
            if not badge.get("done"):
                continue

            current = system_badges_by_slug.get(badge.get("slug"), {})
            earned_badges.append({
                "title": current.get("title") or badge.get("title"),
                "description": current.get("description") or badge.get("description") or "",
                "image": self._absolute_media_url(
                    current.get("image") or badge.get("object_uri"), gamma_base
                ),
            })

        return Response(earned_badges)

    @staticmethod
    def _is_profile_visible(request, username):
        """
        Return whether ``request.user`` may view ``username``'s profile.

        Mirrors Open edX account visibility: a profile is visible to its owner, to
        staff, or unless its effective privacy is fully "private". A "custom"
        privacy profile still exposes a subset of fields and remains viewable, so
        its badges are shown.
        """
        if request.user.username == username or request.user.is_staff:
            return True

        try:
            account_settings = get_account_settings(request, usernames=[username])[0]
        except (UserNotFound, IndexError):
            return False

        return account_settings.get("account_privacy") != PRIVATE_VISIBILITY

    @staticmethod
    def _gamma_public_base_url():
        """
        Public base URL of the Gamma service that serves badge media.

        Uses the same source as the dashboard page's ``window.GAMIFICATION_BASE_URL``.
        """
        return configuration_helpers.get_value(
            "GAMIFICATION_BASE_URL",
            settings.FEATURES.get("RG_GAMIFICATION", {}).get("RG_GAMIFICATION_ENDPOINT", ""),
        )

    @staticmethod
    def _absolute_media_url(uri, base_url):
        """
        Resolve a possibly-relative badge image URI to an absolute, browser-reachable URL.
        """
        if not uri:
            return None
        if uri.startswith(("http://", "https://")):
            return uri
        if not base_url:
            return uri
        return urljoin(f"{base_url.rstrip('/')}/", uri.lstrip("/"))


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
