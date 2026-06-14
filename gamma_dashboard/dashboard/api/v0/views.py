"""
Gamma leaderboard API views.
"""
from urllib.parse import urljoin

from django.conf import settings
from django.contrib.auth.models import User
from django_countries import countries
from edx_rest_framework_extensions.auth.jwt.authentication import JwtAuthentication
from edx_rest_framework_extensions.auth.session.authentication import SessionAuthenticationAllowInactiveUser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from common.djangoapps.student.models import UserProfile
from common.djangoapps.student.views import get_org_black_and_whitelist_for_site
from opaque_keys.edx.keys import CourseKey
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers
from openedx.core.djangoapps.user_api.accounts import ALL_USERS_VISIBILITY, PRIVATE_VISIBILITY
from openedx.core.djangoapps.user_api.accounts.api import get_account_settings
from openedx.core.djangoapps.user_api.accounts.image_helpers import get_profile_image_urls_for_user
from openedx.core.djangoapps.user_api.accounts.serializers import _visible_fields
from openedx.core.djangoapps.user_api.errors import UserNotFound
from openedx.core.djangoapps.user_api.preferences.api import get_user_preference

from course_leaderboard.toggles import show_course_leaderboard_tab
from gamma_dashboard.dashboard.core.gamma.api.settings import DEFAULT_API_VERSION
from gamma_dashboard.dashboard.core.gamma.api.wrapper import GammaApiWrapper
from gamma_dashboard.toggles import show_gamma_leaderboard, show_student_ui
from ..utils import repair_mojibake_text, site_badge_filter, is_main_site

MAIN_SITE_NAME = 'main'


def _public_display_name(user):
    """Return the learner's real name only when it is shared with everyone.

    Mirrors the profile page's own visibility logic (``_visible_fields``): the
    real name is shown only when the learner's effective visibility includes
    ``name`` (in practice, account_privacy='custom' with visibility.name=
    'all_users'). Otherwise fall back to the username, so a learner who keeps
    their name private is never exposed on the public leaderboard.
    """
    profile = getattr(user, "profile", None)
    if profile and profile.name and "name" in _visible_fields(profile, user):
        return repair_mojibake_text(profile.name)
    return user.username


def _public_country_code(user):
    """Return the learner's 2-letter ISO country code only when it is shared publicly.

    Mirrors ``_public_display_name`` and the per-country leaderboard's own check
    (``_visible_fields``): the country is exposed only when 'country' is in the
    learner's visible fields (default 'all_users', or 'custom' with country shared).
    Otherwise returns '' so a learner who keeps their country private never gets a
    flag on the leaderboard. The dashboard turns the code into a flag emoji that
    links to the per-country leaderboard.
    """
    profile = getattr(user, "profile", None)
    if profile and profile.country and "country" in _visible_fields(profile, user):
        return profile.country.code or ""
    return ""


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
        if not show_student_ui(request):
            return Response({"error": "Gamma UI is disabled."}, status=status.HTTP_404_NOT_FOUND)

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
        leaderboard_info["user_uid"] = _public_display_name(user)
        leaderboard_info["profile_url"] = LeaderboardApiView._get_profile_url(user.username)
        leaderboard_info["country"] = _public_country_code(user)

        # ``in_progress`` is only present for the per-badge leaderboard; the regular
        # leaderboard has just top10/competitors. Missing keys resolve to [] so this
        # stays backward compatible.
        profile_list_keys = ("top10", "competitors", "in_progress")
        all_users = [item for key in profile_list_keys for item in (leaderboard_info.get(key) or [])]
        user_uids = set(item["user_uid"] for item in all_users)
        users = User.objects.filter(username__in=user_uids)
        users_dict = {user.username: user for user in users}

        for key in profile_list_keys:
            for item in leaderboard_info.get(key) or []:
                if user := users_dict.get(item["user_uid"]):
                    item["profile_url"] = LeaderboardApiView._get_profile_url(user.username)
                    item["user_uid"] = _public_display_name(user)
                    item["url_profile_image"] = get_profile_image_urls_for_user(user)["medium"]
                    item["country"] = _public_country_code(user)
                else:
                    # If the user is not found on the platform, change their Gamma-sourced username
                    # and leave them without a profile link.
                    item["user_uid"] = "unknown user"
                    item["profile_url"] = None

        return leaderboard_info


class BadgeLeaderboardApiView(APIView):
    """
    Badge leaderboard API view.

    Returns a leaderboard limited to the users who earned a specific badge, in
    the same shape as :class:`LeaderboardApiView` plus the badge's display data
    (``badge``: title, description, slug and image url).
    """
    permission_classes = (IsAuthenticated,)
    authentication_classes = (SessionAuthenticationAllowInactiveUser,)

    def get(self, request, badge_slug, *args, **kwargs):
        """
        Get badge leaderboard info for the given badge slug.
        """
        if not show_student_ui(request):
            return Response({"error": "Gamma UI is disabled."}, status=status.HTTP_404_NOT_FOUND)

        course_id = kwargs.get("course_id")

        if course_id and not show_course_leaderboard_tab() or not course_id and not show_gamma_leaderboard():
            return Response({"error": "Gamma Leaderboard is disabled."}, status=status.HTTP_404_NOT_FOUND)

        signup_source = request.user.usersignupsource_set.first()
        user_signup_source = signup_source.site if signup_source else MAIN_SITE_NAME

        badge_leaderboard_info = GammaApiWrapper(
            version=DEFAULT_API_VERSION
        ).get_badge_leaderboard_info(request.user.username, user_signup_source, badge_slug, course_id)

        if badge_leaderboard_info:
            # The member enrichment (profile images, profile links, display names) is identical
            # to the regular leaderboard; the empty ``competitors`` list is handled transparently.
            updated_leaderboard_info = LeaderboardApiView._update_leaderboard_info(  # pylint: disable=protected-access
                request.user, badge_leaderboard_info
            )
            response = Response(updated_leaderboard_info)
        else:
            response = Response({"error": "Badge not found."}, status=status.HTTP_404_NOT_FOUND)

        return response


class CountryLeaderboardApiView(APIView):
    """
    Leaderboard restricted to the learners who share a given profile country.

    A learner's country and *whether they share it* live on their Open edX profile
    (``UserProfile.country`` plus their field-visibility preference) — data only the
    LMS can see — while Gamma holds the points. So this view resolves the set of
    learners whose country is the requested one **and** publicly shared, asks Gamma to
    rank just those learners, and enriches the result exactly like the regular
    leaderboard (profile images, public display names, profile links).

    Privacy is evaluated live on every request via the same ``_visible_fields`` logic
    the profile page uses, so a learner who later makes their country public starts
    appearing here immediately — and one who makes it private drops off — with no sync
    step and no copy of the country stored in Gamma.
    """

    permission_classes = (IsAuthenticated,)
    authentication_classes = (SessionAuthenticationAllowInactiveUser,)

    def get(self, request, country_code, *args, **kwargs):
        """
        Get the leaderboard for everyone who publicly shares ``country_code``.
        """
        if not show_student_ui(request):
            return Response({"error": "Gamma UI is disabled."}, status=status.HTTP_404_NOT_FOUND)

        if not show_gamma_leaderboard():
            return Response({"error": "Gamma Leaderboard is disabled."}, status=status.HTTP_404_NOT_FOUND)

        country_code = (country_code or "").upper()

        signup_source = request.user.usersignupsource_set.first()
        user_signup_source = signup_source.site if signup_source else MAIN_SITE_NAME

        public_usernames = self._public_country_usernames(country_code)

        leaderboard_info = GammaApiWrapper(
            version=DEFAULT_API_VERSION
        ).get_country_leaderboard_info(request.user.username, user_signup_source, public_usernames)

        if leaderboard_info is None:
            return Response(
                {"error": "No data received from Gamma server."}, status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        updated_leaderboard_info = LeaderboardApiView._update_leaderboard_info(  # pylint: disable=protected-access
            request.user, leaderboard_info
        )
        updated_leaderboard_info["country_code"] = country_code
        updated_leaderboard_info["country_name"] = countries.name(country_code) or country_code

        return Response(updated_leaderboard_info)

    @staticmethod
    def _public_country_usernames(country_code):
        """
        Usernames of the learners whose profile country is ``country_code`` and who
        share their country publicly.

        Visibility is resolved with ``_visible_fields`` (the profile page's own logic):
        'private' learners, and 'custom' learners who did not share their country, are
        excluded; default 'all_users' learners and 'custom' learners who shared their
        country are included. The check reads current preferences, so the result always
        reflects each learner's latest choice.

        This is O(number of learners in the country) preference lookups; fine at the
        scale this serves. If a single country ever grows large enough to matter, the
        per-user ``_visible_fields`` call is the thing to batch.
        """
        if not country_code:
            return []

        profiles = (
            UserProfile.objects
            .filter(country=country_code)
            .select_related("user")
        )
        return [
            profile.user.username
            for profile in profiles
            if "country" in _visible_fields(profile, profile.user)
        ]


class CourseLeaderboardApiView(APIView):
    """
    Course leaderboard API view.

    For a course, returns two ranked sections in the leaderboard member shape:
    - ``top10``: learners who earned the course certificate, ranked by their Gamma
      course points (the "Completed" section);
    - ``in_progress``: active, not-yet-certified learners with a course grade,
      ranked by that grade percentage (the value shown on the Progress page).
    Both reuse the leaderboard member shape so the dashboard can render them with
    the regular leaderboard components.
    """

    permission_classes = (IsAuthenticated,)
    authentication_classes = (SessionAuthenticationAllowInactiveUser,)

    MEMBERS_LIMIT = 100

    def get(self, request, *args, **kwargs):
        """
        Get the course leaderboard (completed + in-progress sections).
        """
        if not show_student_ui(request):
            return Response({"error": "Gamma UI is disabled."}, status=status.HTTP_404_NOT_FOUND)

        if not show_course_leaderboard_tab():
            return Response({"error": "Gamma Leaderboard is disabled."}, status=status.HTTP_404_NOT_FOUND)

        # Imported lazily: these LMS models may not be importable at app-load time.
        from lms.djangoapps.certificates.models import GeneratedCertificate

        course_id = kwargs.get("course_id")
        course_key = CourseKey.from_string(course_id)
        current_user_id = request.user.id

        cert_user_ids = list(
            GeneratedCertificate.objects.filter(course_id=course_key, status="downloadable")
            .values_list("user_id", flat=True)
        )

        completed_members, completed_rank = self._build_completed_section(course_id, cert_user_ids, current_user_id)
        in_progress_members, in_progress_rank = self._build_in_progress_section(
            course_key, set(cert_user_ids), current_user_id
        )

        return Response({
            "top10": completed_members,
            "competitors": [],
            "rank": completed_rank,
            "in_progress": in_progress_members,
            "in_progress_rank": in_progress_rank,
            "user_uid": self._display_name(request.user),
        })

    def _build_completed_section(self, course_id, cert_user_ids, current_user_id):
        """
        Certificate earners ranked by their Gamma course points (descending).
        """
        if not cert_user_ids:
            return [], None

        cert_users = list(User.objects.filter(id__in=cert_user_ids).select_related("profile"))
        points_by_username = GammaApiWrapper(version=DEFAULT_API_VERSION).get_course_points(
            course_id, [user.username for user in cert_users]
        )

        ranked = sorted(cert_users, key=lambda user: points_by_username.get(user.username, 0), reverse=True)
        rank = next((index + 1 for index, user in enumerate(ranked) if user.id == current_user_id), None)

        members = []
        for user in ranked[:self.MEMBERS_LIMIT]:
            member_points = points_by_username.get(user.username, 0)
            if member_points:
                members.append(self._build_member(user, points=member_points))
            else:
                # Certificate earned but no course points recorded: show 100%, consistent
                # with the in-progress column (and they are, after all, complete).
                members.append(self._build_member(user, progress_percent=100))
        return members, rank

    def _build_in_progress_section(self, course_key, cert_user_id_set, current_user_id):
        """
        Active, not-yet-certified learners with a course grade, ranked by grade %.
        """
        from common.djangoapps.student.models import CourseEnrollment
        from lms.djangoapps.grades.models import PersistentCourseGrade

        active_user_ids = set(
            CourseEnrollment.objects.filter(course_id=course_key, is_active=True)
            .values_list("user_id", flat=True)
        )
        graded_rows = (
            PersistentCourseGrade.objects.filter(course_id=course_key, percent_grade__gt=0)
            .values_list("user_id", "percent_grade")
        )
        rows = [
            (user_id, percent) for user_id, percent in graded_rows
            if user_id in active_user_ids and user_id not in cert_user_id_set
        ]
        rows.sort(key=lambda row: row[1], reverse=True)
        rank = next((index + 1 for index, (user_id, _) in enumerate(rows) if user_id == current_user_id), None)

        top_rows = rows[:self.MEMBERS_LIMIT]
        users_by_id = {
            user.id: user
            for user in User.objects.filter(
                id__in=[user_id for user_id, _ in top_rows]
            ).select_related("profile")
        }
        members = []
        for user_id, percent in top_rows:
            if user := users_by_id.get(user_id):
                members.append(self._build_member(user, progress_percent=round(percent * 100)))
        return members, rank

    @staticmethod
    def _display_name(user):
        """
        The user's real name when public, falling back to their username.
        """
        return _public_display_name(user)

    @staticmethod
    def _build_member(user, points=None, progress_percent=None):
        """
        Build a leaderboard-member dict (matching the regular leaderboard shape).
        """
        member = {
            "user_uid": _public_display_name(user),
            "signup_source": None,
            "url_profile_image": get_profile_image_urls_for_user(user)["medium"],
            "profile_url": LeaderboardApiView._get_profile_url(user.username),  # pylint: disable=protected-access
            "country": _public_country_code(user),
            "badges": {},
            "system_events": [],
        }
        if points is not None:
            member["points"] = points
        if progress_percent is not None:
            member["progress_percent"] = progress_percent
        return member


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
        if not show_student_ui(request):
            return Response({"error": "Gamma UI is disabled."}, status=status.HTTP_404_NOT_FOUND)

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
        if not show_student_ui(request):
            return Response([])

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
                "slug": badge.get("slug"),
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

        Mirrors Open edX per-field visibility. Staff may always view (like
        IsOwnerOrPublicCertificates' IsStaff bypass). Everyone else -- INCLUDING the
        owner, because the profile is read-only and shows exactly what the public
        sees -- gets the gated view: "private" hides everything; "all_users" shows
        everything; "custom" shows accomplishments only when the learner explicitly
        shared them (visibility.accomplishments == all_users), which the
        account-settings "Who can see your Accomplishments?" control sets.
        """
        if request.user.is_staff:
            return True

        try:
            account_settings = get_account_settings(request, usernames=[username])[0]
        except (UserNotFound, IndexError):
            return False

        privacy = account_settings.get("account_privacy")
        if privacy == PRIVATE_VISIBILITY:
            return False
        if privacy == ALL_USERS_VISIBILITY:
            return True

        # "custom": honor the per-field accomplishments visibility preference.
        try:
            target_user = User.objects.get(username=username)
        except User.DoesNotExist:
            return False
        return get_user_preference(target_user, "visibility.accomplishments") == ALL_USERS_VISIBILITY

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


# Open edX user-preference key for the "badge earned" pop-up opt-out. Written by the
# Account Settings toggle (frontend-rgg-widgets BadgeNotificationsToggle) through the
# standard /api/user/v1/preferences/ API; read here when the widget polls.
BADGE_NOTIFICATIONS_PREFERENCE_KEY = 'rgg_badge_notifications'


def badge_notifications_enabled(user):
    """
    Whether the user wants "badge earned" pop-ups.

    Unset means enabled (the feature is opt-out): only the stored literal 'false'
    disables it.
    """
    return get_user_preference(user, BADGE_NOTIFICATIONS_PREFERENCE_KEY) != 'false'


class BadgeNotificationsApiView(APIView):
    """
    Pending "badge earned" notifications for the requesting user.

    GET returns the user's completed-but-not-yet-shown badge notifications (empty,
    and marked disabled, when the user has opted out in Account Settings). POST
    acknowledges shown notifications so they are never returned again.
    """

    permission_classes = (IsAuthenticated,)
    # JWT first: polled cross-origin by the BadgeNotifications widget from MFE pages
    # (apps.<host>), same situation as UserBadgesApiView.
    authentication_classes = (JwtAuthentication, SessionAuthenticationAllowInactiveUser)

    def get(self, request):
        """
        Get the user's pending badge notifications, oldest first.
        """
        # Suppressed while the student gamification UI is hidden (staff bypass), so a
        # learner doesn't get "you earned an Accomplishment" toasts before launch.
        if not show_student_ui(request):
            return Response({"enabled": False, "notifications": []})

        if not badge_notifications_enabled(request.user):
            return Response({"enabled": False, "notifications": []})

        pending = GammaApiWrapper(version=DEFAULT_API_VERSION).get_badge_notifications(
            request.user.username
        )
        if pending is None:
            return Response(
                {"error": "No data received from Gamma server."},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        gamma_base = UserBadgesApiView._gamma_public_base_url()  # pylint: disable=protected-access
        notifications = [
            {
                **notification,
                "image": UserBadgesApiView._absolute_media_url(  # pylint: disable=protected-access
                    notification.get("image"), gamma_base
                ),
            }
            for notification in pending
        ]
        return Response({"enabled": True, "notifications": notifications})

    def post(self, request):
        """
        Mark the given notifications (by achievement uuid) as seen for the user.
        """
        uuids = request.data.get("uuids")
        if not isinstance(uuids, list) or not uuids:
            return Response(
                {"error": "uuids must be a non-empty list."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        result = GammaApiWrapper(version=DEFAULT_API_VERSION).mark_badge_notifications_seen(
            request.user.username, uuids
        )
        if result is None:
            return Response(
                {"error": "No data received from Gamma server."},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )

        return Response({"count": result.get("count", 0)})


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
        if not show_student_ui(request):
            return Response({"error": "Gamma UI is disabled."}, status=status.HTTP_404_NOT_FOUND)

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
