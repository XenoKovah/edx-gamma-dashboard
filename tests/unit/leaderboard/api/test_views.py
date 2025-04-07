# TODO test not completed, need to mock the database query

import pytest

from rest_framework import status

from gamma_dashboard.dashboard.api.v0.views import LeaderboardApiView
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
