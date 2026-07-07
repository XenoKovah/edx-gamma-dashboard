# TODO test not completed, need to mock the database query

import pytest

from django.contrib.auth.models import User
from rest_framework import status

from gamma_dashboard.dashboard.api.v0.views import (
    BadgeLeaderboardApiView,
    CountryLeaderboardApiView,
    CourseLeaderboardApiView,
    LeaderboardApiView,
    UserBadgesApiView,
)
from gamma_dashboard.dashboard.api.utils import repair_mojibake_text
from gamma_dashboard.dashboard.core.gamma.api.wrapper import GammaApiWrapper

# from tests.utils import load_params_from_json


# @pytest.mark.unittests
# @pytest.mark.parametrize(
#     "data",
#     load_params_from_json("tests/unit/leaderboard/api/resourses/data.json")
# )
# def test_update_leaderboard_info(mocker, data):
#     """
#     Test the _update_leaderboard_info method of the LeaderboardApiView class.

#     Test data structure:
#         {
#             "current_user": { "id": 106, "username": "current_user" },
#             "users_set": [username_1, username_2, ...],
#             "users": [
#                 { "id": 1, "username": "username_1", "profile": { "name": "Full Name 1" },
#                 { "id": 2, "username": "username_2", "profile": { "name": "Full Name 2" }
#                 ...
#             ],
#             "leaderboard_info": { 
#                 "top10": [...],
#                 "system_statuses": [],
#                 "rank": 106,
#                 "user_uid": "current_user",
#                 "competitors": [...]
#             },
#             "expected_leaderboard_info": {
#                 "top10": [...],
#                 "system_statuses": [],
#                 "rank": 106,
#                 "user_uid": "Current Full Name",
#                 "url_urofile_image": "/images/default.png",
#                 "competitors": [...]
#             }
#         }
#     """
#     current_user = data["current_user"]
#     users_set = data["users_set"]
#     users = data["users"]
#     leaderboard_info = data["leaderboard_info"]
#     expected_leaderboard_info = data["expected_leaderboard_info"]

#     # Mocking required methods
#     mocked_get_profile_image_urls_for_user = mocker.patch(
#         "openedx.core.djangoapps.user_api.accounts.image_helpers.get_profile_image_urls_for_user"
#     )
#     mocked_is_username_retired = mocker.patch(
#         "common.djangoapps.student.models.is_username_retired"
#     )
#     mocked_user_objects_filter = mocker.patch("django.contrib.auth.models.User.objects.filter")

#     # Mocked return values
#     mocked_get_profile_image_urls_for_user.return_value = {"medium": "/images/default.png"}
#     mocked_user_objects_filter.return_value = users
#     mocked_is_username_retired.return_value = False

#     # Calling the method under test
#     result = LeaderboardApiView._add_profile_image_urls(current_user, leaderboard_info)

#     # Assertions and verifications
#     mocked_get_profile_image_urls_for_user.assert_called_once_with(users)
#     mocked_user_objects_filter.assert_called_once_with(username__in=set(users_set))

#     assert result == expected_leaderboard_info


class TestLeaderboardApiView:
    """
    Test Case for the testing LeaderboardApiView.
    """

    @pytest.mark.django_db
    @pytest.mark.parametrize(
        "show_gamma_leaderboard,show_course_leaderboard_tab,view_kwargs,gamma_api_wrapper_call_course_id_arg",
        (
            (True, False, {}, None),
            (True, True, {}, None),
            (False, True, {"course_id": "course-v1:OpenedX+DemoX+DemoCourse"}, "course-v1:OpenedX+DemoX+DemoCourse"),
            (True, True, {"course_id": "course-v1:OpenedX+DemoX+DemoCourse"}, "course-v1:OpenedX+DemoX+DemoCourse"),
        ),
    )
    def test_leaderboard_toggle_enabled_and_leaderboard_info_exist(
        self,
        mocker,
        show_gamma_leaderboard,
        show_course_leaderboard_tab,
        view_kwargs,
        gamma_api_wrapper_call_course_id_arg,
    ):
        view = LeaderboardApiView()
        request_mock = mocker.MagicMock()
        leaderboard_info_mock = {"rank": 1, "score": 100}
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard",
            return_value=show_gamma_leaderboard,
        )
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_course_leaderboard_tab",
            return_value=show_course_leaderboard_tab,
        )
        gamma_api_wrapper_mock = mocker.patch.object(
            GammaApiWrapper, "get_leaderboard_info", return_value=leaderboard_info_mock
        )
        update_leaderboard_info_mock = mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.LeaderboardApiView._update_leaderboard_info",
            return_value=leaderboard_info_mock
        )

        response = view.get(request_mock, **view_kwargs)

        gamma_api_wrapper_mock.assert_called_once_with(
            request_mock.user.username,
            request_mock.user.usersignupsource_set.first.return_value.site,
            gamma_api_wrapper_call_course_id_arg,
        )
        update_leaderboard_info_mock.assert_called_once_with(request_mock.user, leaderboard_info_mock)
        assert response.status_code == status.HTTP_200_OK
        assert response.data == leaderboard_info_mock

    @pytest.mark.django_db
    @pytest.mark.parametrize(
        "show_gamma_leaderboard,show_course_leaderboard_tab,view_kwargs,gamma_api_wrapper_call_course_id_arg",
        (
            (True, False, {}, None),
            (True, True, {}, None),
            (False, True, {"course_id": "course-v1:OpenedX+DemoX+DemoCourse"}, "course-v1:OpenedX+DemoX+DemoCourse"),
            (True, True, {"course_id": "course-v1:OpenedX+DemoX+DemoCourse"}, "course-v1:OpenedX+DemoX+DemoCourse"),
        ),
    )
    def test_leaderboard_toggle_enabled_and_not_leaderboard_info(
        self,
        mocker,
        show_gamma_leaderboard,
        show_course_leaderboard_tab,
        view_kwargs,
        gamma_api_wrapper_call_course_id_arg,
    ):
        view = LeaderboardApiView()
        request_mock = mocker.MagicMock()
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard",
            return_value=show_gamma_leaderboard,
        )
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_course_leaderboard_tab",
            return_value=show_course_leaderboard_tab,
        )
        gamma_api_wrapper_mock = mocker.patch.object(GammaApiWrapper, "get_leaderboard_info", return_value=None)

        response = view.get(request_mock, **view_kwargs)

        gamma_api_wrapper_mock.assert_called_once_with(
            request_mock.user.username,
            request_mock.user.usersignupsource_set.first.return_value.site,
            gamma_api_wrapper_call_course_id_arg,
        )
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert response.data == {"error": "No data received from Gamma server."}

    @pytest.mark.django_db
    @pytest.mark.parametrize(
        "show_gamma_leaderboard,show_course_leaderboard_tab,view_kwargs",
        (
            (False, True, {}),
            (False, False, {}),
            (True, False, {"course_id": "course-v1:OpenedX+DemoX+DemoCourse"}),
            (False, False, {"course_id": "course-v1:OpenedX+DemoX+DemoCourse"}),
        ),
    )
    def test_leaderboard_toggle_disabled_during_leaderboard_retrieving(
        self,
        mocker,
        show_gamma_leaderboard,
        show_course_leaderboard_tab,
        view_kwargs,
    ):
        view = LeaderboardApiView()
        request_mock = mocker.MagicMock()

        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard",
            return_value=show_gamma_leaderboard,
        )
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_course_leaderboard_tab",
            return_value=show_course_leaderboard_tab,
        )

        response = view.get(request_mock, **view_kwargs)

        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.data == {"error": "Gamma Leaderboard is disabled."}


class TestBadgeLeaderboardApiView:
    """
    Test Case for the testing BadgeLeaderboardApiView.
    """

    BADGE_SLUG = "firmware-master-level-1"

    @pytest.mark.django_db
    @pytest.mark.parametrize(
        "show_gamma_leaderboard,show_course_leaderboard_tab,view_kwargs,gamma_api_wrapper_call_course_id_arg",
        (
            (True, False, {}, None),
            (True, True, {}, None),
            (False, True, {"course_id": "course-v1:OpenedX+DemoX+DemoCourse"}, "course-v1:OpenedX+DemoX+DemoCourse"),
            (True, True, {"course_id": "course-v1:OpenedX+DemoX+DemoCourse"}, "course-v1:OpenedX+DemoX+DemoCourse"),
        ),
    )
    def test_badge_leaderboard_toggle_enabled_and_info_exist(
        self,
        mocker,
        show_gamma_leaderboard,
        show_course_leaderboard_tab,
        view_kwargs,
        gamma_api_wrapper_call_course_id_arg,
    ):
        view = BadgeLeaderboardApiView()
        request_mock = mocker.MagicMock()
        badge_leaderboard_info_mock = {
            "badge": {"slug": self.BADGE_SLUG, "title": "Firmware Master Level 1"},
            "top10": [],
            "competitors": [],
            "rank": None,
        }
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard",
            return_value=show_gamma_leaderboard,
        )
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_course_leaderboard_tab",
            return_value=show_course_leaderboard_tab,
        )
        gamma_api_wrapper_mock = mocker.patch.object(
            GammaApiWrapper, "get_badge_leaderboard_info", return_value=badge_leaderboard_info_mock
        )
        update_leaderboard_info_mock = mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.LeaderboardApiView._update_leaderboard_info",
            return_value=badge_leaderboard_info_mock,
        )

        response = view.get(request_mock, self.BADGE_SLUG, **view_kwargs)

        gamma_api_wrapper_mock.assert_called_once_with(
            request_mock.user.username,
            request_mock.user.usersignupsource_set.first.return_value.site,
            self.BADGE_SLUG,
            gamma_api_wrapper_call_course_id_arg,
        )
        update_leaderboard_info_mock.assert_called_once_with(request_mock.user, badge_leaderboard_info_mock)
        assert response.status_code == status.HTTP_200_OK
        assert response.data == badge_leaderboard_info_mock

    @pytest.mark.django_db
    @pytest.mark.parametrize(
        "show_gamma_leaderboard,show_course_leaderboard_tab,view_kwargs,gamma_api_wrapper_call_course_id_arg",
        (
            (True, False, {}, None),
            (True, True, {"course_id": "course-v1:OpenedX+DemoX+DemoCourse"}, "course-v1:OpenedX+DemoX+DemoCourse"),
        ),
    )
    def test_badge_leaderboard_toggle_enabled_and_no_info_returns_404(
        self,
        mocker,
        show_gamma_leaderboard,
        show_course_leaderboard_tab,
        view_kwargs,
        gamma_api_wrapper_call_course_id_arg,
    ):
        view = BadgeLeaderboardApiView()
        request_mock = mocker.MagicMock()
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard",
            return_value=show_gamma_leaderboard,
        )
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_course_leaderboard_tab",
            return_value=show_course_leaderboard_tab,
        )
        gamma_api_wrapper_mock = mocker.patch.object(
            GammaApiWrapper, "get_badge_leaderboard_info", return_value=None
        )

        response = view.get(request_mock, self.BADGE_SLUG, **view_kwargs)

        gamma_api_wrapper_mock.assert_called_once_with(
            request_mock.user.username,
            request_mock.user.usersignupsource_set.first.return_value.site,
            self.BADGE_SLUG,
            gamma_api_wrapper_call_course_id_arg,
        )
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.data == {"error": "Badge not found."}

    @pytest.mark.django_db
    @pytest.mark.parametrize(
        "show_gamma_leaderboard,show_course_leaderboard_tab,view_kwargs",
        (
            (False, True, {}),
            (False, False, {}),
            (True, False, {"course_id": "course-v1:OpenedX+DemoX+DemoCourse"}),
        ),
    )
    def test_badge_leaderboard_toggle_disabled(
        self,
        mocker,
        show_gamma_leaderboard,
        show_course_leaderboard_tab,
        view_kwargs,
    ):
        view = BadgeLeaderboardApiView()
        request_mock = mocker.MagicMock()
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard",
            return_value=show_gamma_leaderboard,
        )
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_course_leaderboard_tab",
            return_value=show_course_leaderboard_tab,
        )

        response = view.get(request_mock, self.BADGE_SLUG, **view_kwargs)

        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.data == {"error": "Gamma Leaderboard is disabled."}


class TestCourseLeaderboardApiView:
    """
    Test Case for the testing CourseLeaderboardApiView.

    The section assembly reads LMS certificate/grade/enrollment models, so it is
    verified end-to-end against a real course rather than unit-tested here; these
    cover the toggle gate and the member-shape helper.
    """

    @pytest.mark.django_db
    def test_disabled_returns_404(self, mocker):
        view = CourseLeaderboardApiView()
        request_mock = mocker.MagicMock()
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_course_leaderboard_tab",
            return_value=False,
        )

        response = view.get(request_mock, course_id="course-v1:OpenedX+DemoX+DemoCourse")

        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.data == {"error": "Gamma Leaderboard is disabled."}

    def test_build_member_completed_and_in_progress_shapes(self, mocker, settings):
        settings.PROFILE_MICROFRONTEND_URL = "https://apps.example.com/profile/u/"
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.get_profile_image_urls_for_user",
            return_value={"full": "/images/default.png"},
        )

        user = mocker.MagicMock()
        user.username = "pietrushnic"
        user.profile.name = "Piotr KrÃ³l"  # double-encoded; should be repaired on output

        completed = CourseLeaderboardApiView._build_member(user, points=120)
        assert completed["user_uid"] == "Piotr Król"  # mojibake repaired
        assert completed["profile_url"] == "https://apps.example.com/profile/u/pietrushnic"
        assert completed["url_profile_image"] == "/images/default.png"
        assert completed["points"] == 120
        assert "progress_percent" not in completed

        in_progress = CourseLeaderboardApiView._build_member(user, progress_percent=9)
        assert in_progress["user_uid"] == "Piotr Król"
        assert in_progress["progress_percent"] == 9
        assert "points" not in in_progress


class TestRepairMojibakeText:
    """
    Test the ``repair_mojibake_text`` helper used to fix double-encoded display names.
    """

    @pytest.mark.parametrize(
        "value,expected",
        (
            ("Piotr KrÃ³l", "Piotr Król"),
            ("ZoltÃ¡n RusnÃ¡k", "Zoltán Rusnák"),
            ("MikoÅ‚aj PlewiÅ„ski", "Mikołaj Plewiński"),
            ("Bob Bob", "Bob Bob"),  # ASCII is unchanged
            ("Zoltán", "Zoltán"),  # already-correct text is preserved
            ("", ""),
            (None, None),
        ),
    )
    def test_repairs_only_double_encoded_values(self, value, expected):
        assert repair_mojibake_text(value) == expected


class TestGetProfileUrl:
    """
    Test the `_get_profile_url` helper of `LeaderboardApiView`.
    """

    @pytest.mark.parametrize(
        "profile_mfe_base,username,expected",
        (
            (
                "https://apps.example.com/profile/u/",
                "XenoPublic",
                "https://apps.example.com/profile/u/XenoPublic",
            ),
            (None, "XenoPublic", "/u/XenoPublic"),
            ("", "XenoPublic", "/u/XenoPublic"),
        ),
    )
    def test_get_profile_url(self, settings, profile_mfe_base, username, expected):
        settings.PROFILE_MICROFRONTEND_URL = profile_mfe_base

        assert LeaderboardApiView._get_profile_url(username) == expected


class TestUpdateLeaderboardInfo:
    """
    Test the `_update_leaderboard_info` method of `LeaderboardApiView`.
    """

    @pytest.mark.django_db
    def test_adds_profile_url_for_known_users_and_none_for_unknown(self, mocker, settings):
        settings.PROFILE_MICROFRONTEND_URL = "https://apps.example.com/profile/u/"

        def make_user(username, name):
            user = mocker.MagicMock()
            user.username = username
            user.profile.name = name
            return user

        current_user = make_user("current_user", "Current Full Name")
        alice = make_user("alice", "Alice Liddell")
        bob = make_user("bob", "")  # empty profile name falls back to the username

        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.get_profile_image_urls_for_user",
            return_value={"full": "/images/default.png"},
        )
        mocker.patch(
            "django.contrib.auth.models.User.objects.filter",
            return_value=[alice, bob],
        )

        leaderboard_info = {
            "top10": [{"user_uid": "alice"}, {"user_uid": "ghost"}],
            "competitors": [{"user_uid": "bob"}],
        }

        result = LeaderboardApiView._update_leaderboard_info(current_user, leaderboard_info)

        # The current (top-level) user gets a profile URL built from their username.
        assert result["user_uid"] == "Current Full Name"
        assert result["profile_url"] == "https://apps.example.com/profile/u/current_user"

        top10_by_name = {item["user_uid"]: item for item in result["top10"]}
        assert top10_by_name["Alice Liddell"]["profile_url"] == "https://apps.example.com/profile/u/alice"
        # Users not found on the platform become "unknown user" with no profile link.
        assert top10_by_name["unknown user"]["profile_url"] is None

        bob_item = result["competitors"][0]
        assert bob_item["user_uid"] == "bob"
        assert bob_item["profile_url"] == "https://apps.example.com/profile/u/bob"

    @pytest.mark.django_db
    def test_enriches_in_progress_list_and_preserves_progress_percent(self, mocker, settings):
        settings.PROFILE_MICROFRONTEND_URL = "https://apps.example.com/profile/u/"

        current_user = mocker.MagicMock()
        current_user.username = "current_user"
        current_user.profile.name = "Current Full Name"

        carol = mocker.MagicMock()
        carol.username = "carol"
        carol.profile.name = "Carol Danvers"

        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.get_profile_image_urls_for_user",
            return_value={"full": "/images/default.png"},
        )
        mocker.patch(
            "django.contrib.auth.models.User.objects.filter",
            return_value=[carol],
        )

        # The per-badge response carries an extra ``in_progress`` list that must be
        # enriched just like top10/competitors, without dropping ``progress_percent``.
        leaderboard_info = {
            "top10": [],
            "competitors": [],
            "in_progress": [{"user_uid": "carol", "progress_percent": 42}],
        }

        result = LeaderboardApiView._update_leaderboard_info(current_user, leaderboard_info)

        in_progress_item = result["in_progress"][0]
        assert in_progress_item["user_uid"] == "Carol Danvers"
        assert in_progress_item["profile_url"] == "https://apps.example.com/profile/u/carol"
        assert in_progress_item["url_profile_image"] == "/images/default.png"
        assert in_progress_item["progress_percent"] == 42


class TestUserBadgesApiView:
    """
    Test Case for `UserBadgesApiView`.
    """

    PROFILE_INFO = {
        "badges": [
            {
                "title": "Answerer (stale)",
                "slug": "answerer",
                "description": "stale snapshot description",
                "done": True,
                "object_uri": "/media/uploads/badges/answerer.png",
            },
            {
                "title": "In Progress",
                "slug": "in-progress",
                "description": "not earned yet",
                "done": False,
                "object_uri": "/media/uploads/badges/in_progress.png",
            },
            {
                "title": "Orphan",
                "slug": "orphan",
                "description": "fallback description",
                "done": True,
                "object_uri": "https://cdn.example.com/orphan.png",
            },
        ],
        "system_badges": [
            {
                "slug": "answerer",
                "title": "Answerer",
                "description": "Answered a question in the Discussions section...",
                "image": "/media/uploads/badges/answerer.png",
            },
        ],
    }

    @staticmethod
    def _request(mocker, *, username="viewer", is_staff=False):
        request = mocker.MagicMock()
        request.user.username = username
        request.user.is_staff = is_staff
        return request

    @pytest.mark.django_db
    @pytest.mark.parametrize("account_privacy", ["all_users", "custom"])
    def test_returns_only_completed_badges_with_current_config(self, mocker, settings, account_privacy):
        # Badges show on both fully-public ("all_users") and per-field ("custom") profiles.
        settings.FEATURES = {"RG_GAMIFICATION": {"RG_GAMIFICATION_ENDPOINT": "http://rgg:8000"}}
        # A "custom" profile shows accomplishments only when explicitly shared.
        User.objects.create(username="target")
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.get_account_settings",
            return_value=[{"account_privacy": account_privacy}],
        )
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.get_user_preference",
            return_value="all_users",
        )
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.configuration_helpers.get_value",
            return_value="https://gamma.example.com",
        )
        mocker.patch.object(GammaApiWrapper, "get_game_profile", return_value=self.PROFILE_INFO)

        response = UserBadgesApiView().get(self._request(mocker), username="target")

        assert response.status_code == status.HTTP_200_OK
        assert response.data == [
            {
                "title": "Answerer",  # current config wins over the achievement snapshot
                "description": "Answered a question in the Discussions section...",
                "image": "https://gamma.example.com/media/uploads/badges/answerer.png",
            },
            {
                "title": "Orphan",  # no system badge -> fall back to achievement fields
                "description": "fallback description",
                "image": "https://cdn.example.com/orphan.png",  # already absolute -> untouched
            },
        ]

    @pytest.mark.django_db
    def test_private_profile_returns_empty_list(self, mocker):
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.get_account_settings",
            return_value=[{"account_privacy": "private"}],
        )
        gamma_mock = mocker.patch.object(GammaApiWrapper, "get_game_profile")

        response = UserBadgesApiView().get(self._request(mocker), username="target")

        assert response.status_code == status.HTTP_200_OK
        assert response.data == []
        gamma_mock.assert_not_called()  # gamma is not even queried for hidden profiles

    @pytest.mark.django_db
    def test_custom_profile_hides_unshared_accomplishments(self, mocker):
        # On a "custom" profile, accomplishments stay hidden unless explicitly shared
        # (visibility.accomplishments == all_users); mirrors certificate visibility.
        User.objects.create(username="target")
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.get_account_settings",
            return_value=[{"account_privacy": "custom"}],
        )
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.get_user_preference",
            return_value="private",
        )
        gamma_mock = mocker.patch.object(GammaApiWrapper, "get_game_profile")

        response = UserBadgesApiView().get(self._request(mocker), username="target")

        assert response.status_code == status.HTTP_200_OK
        assert response.data == []
        gamma_mock.assert_not_called()

    @pytest.mark.django_db
    def test_owner_sees_the_public_gated_view(self, mocker):
        # The read-only profile shows the owner exactly what the public sees, so the
        # owner no longer bypasses: their own "custom + not shared" accomplishments are
        # hidden from their own profile too (only staff bypass remains).
        User.objects.create(username="target")
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.get_account_settings",
            return_value=[{"account_privacy": "custom"}],
        )
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.get_user_preference",
            return_value="private",
        )
        gamma_mock = mocker.patch.object(GammaApiWrapper, "get_game_profile")

        # request.user IS the target -> owner viewing their own profile.
        response = UserBadgesApiView().get(self._request(mocker, username="target"), username="target")

        assert response.status_code == status.HTTP_200_OK
        assert response.data == []
        gamma_mock.assert_not_called()

    @pytest.mark.django_db
    def test_no_gamma_data_returns_422(self, mocker):
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.get_account_settings",
            return_value=[{"account_privacy": "all_users"}],
        )
        mocker.patch.object(GammaApiWrapper, "get_game_profile", return_value=None)

        response = UserBadgesApiView().get(self._request(mocker), username="target")

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


class TestCountryLeaderboardApiView:
    """
    Test Case for `CountryLeaderboardApiView`.
    """

    @pytest.mark.django_db
    def test_disabled_returns_404(self, mocker):
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard",
            return_value=False,
        )

        response = CountryLeaderboardApiView().get(mocker.MagicMock(), country_code="JP")

        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.data == {"error": "Gamma Leaderboard is disabled."}

    @pytest.mark.django_db
    def test_enabled_ranks_public_country_users_and_labels_country(self, mocker):
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard",
            return_value=True,
        )
        mocker.patch.object(
            CountryLeaderboardApiView,
            "_public_country_usernames",
            return_value=["alice", "bob"],
        )
        leaderboard_info = {"top10": [{"user_uid": "alice"}], "competitors": [], "rank": 1}
        gamma_mock = mocker.patch.object(
            GammaApiWrapper,
            "get_country_leaderboard_info",
            return_value=leaderboard_info,
        )
        # The member enrichment is covered by TestUpdateLeaderboardInfo; here it just
        # passes the gamma payload through unchanged so we can assert the country wrapping.
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.LeaderboardApiView._update_leaderboard_info",
            side_effect=lambda user, info: info,
        )
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.countries.name",
            return_value="Japan",
        )

        request = mocker.MagicMock()
        request.user.username = "viewer"

        # The lower-case path segment must be normalized to the upper-case ISO code.
        response = CountryLeaderboardApiView().get(request, country_code="jp")

        gamma_mock.assert_called_once_with(
            "viewer",
            request.user.usersignupsource_set.first.return_value.site,
            ["alice", "bob"],
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.data["country_code"] == "JP"
        assert response.data["country_name"] == "Japan"
        assert response.data["top10"] == [{"user_uid": "alice"}]

    @pytest.mark.django_db
    def test_no_gamma_data_returns_422(self, mocker):
        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard",
            return_value=True,
        )
        mocker.patch.object(
            CountryLeaderboardApiView,
            "_public_country_usernames",
            return_value=[],
        )
        mocker.patch.object(GammaApiWrapper, "get_country_leaderboard_info", return_value=None)

        response = CountryLeaderboardApiView().get(mocker.MagicMock(), country_code="JP")

        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert response.data == {"error": "No data received from Gamma server."}

    @pytest.mark.django_db
    def test_public_country_usernames_includes_only_users_sharing_country(self, mocker):
        # Three learners list the country; only those whose effective visibility
        # includes "country" (default 'all_users', or 'custom' with country shared)
        # are returned. 'private' / 'custom-without-country' learners are dropped.
        def profile_for(username):
            profile = mocker.MagicMock()
            profile.user.username = username
            return profile

        public_a = profile_for("public_a")
        private_b = profile_for("private_b")
        public_c = profile_for("public_c")

        filter_mock = mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.UserProfile.objects.filter",
        )
        filter_mock.return_value.select_related.return_value = [public_a, private_b, public_c]

        def visible_fields(profile, user):
            return {"country"} if user.username in ("public_a", "public_c") else {"username"}

        mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views._visible_fields",
            side_effect=visible_fields,
        )

        usernames = CountryLeaderboardApiView._public_country_usernames("JP")

        assert usernames == ["public_a", "public_c"]
        filter_mock.assert_called_once_with(country="JP")

    def test_public_country_usernames_empty_code_returns_empty(self):
        assert CountryLeaderboardApiView._public_country_usernames("") == []
