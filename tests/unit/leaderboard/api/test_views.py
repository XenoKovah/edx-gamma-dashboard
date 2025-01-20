# TODO test not completed, need to mock the database query

import pytest

from rest_framework import status

from gamma_dashboard.dashboard.api.v0.temporary_mock_data import COURSE_LEADERBOARD_MOCK
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
    def test_leaderboard_toggle_enabled_and_leaderboard_info_exist(self, mocker):
        view = LeaderboardApiView()
        request_mock = mocker.MagicMock()
        leaderboard_info_mock = {"rank": 1, "score": 100}
        toggle_mock = mocker.patch("gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard", return_value=True)
        gamma_api_wrapper_mock = mocker.patch.object(
            GammaApiWrapper, "get_leaderboard_info", return_value=leaderboard_info_mock
        )
        update_leaderboard_info_mock = mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.LeaderboardApiView._update_leaderboard_info",
            return_value=leaderboard_info_mock
        )

        response = view.get(request_mock)

        toggle_mock.assert_called_once_with()
        gamma_api_wrapper_mock.assert_called_once_with(
            request_mock.user.username,
            request_mock.user.usersignupsource_set.first.return_value.site,
            None
        )
        update_leaderboard_info_mock.assert_called_once_with(request_mock.user, leaderboard_info_mock)
        assert response.status_code == status.HTTP_200_OK
        assert response.data == leaderboard_info_mock

    @pytest.mark.django_db
    def test_leaderboard_toggle_enabled_and_not_leaderboard_info(self, mocker):
        view = LeaderboardApiView()
        request_mock = mocker.MagicMock()
        toggle_mock = mocker.patch("gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard", return_value=True)
        gamma_api_wrapper_mock = mocker.patch.object(GammaApiWrapper, "get_leaderboard_info", return_value=None)

        response = view.get(request_mock)

        toggle_mock.assert_called_once_with()
        gamma_api_wrapper_mock.assert_called_once_with(
            request_mock.user.username,
            request_mock.user.usersignupsource_set.first.return_value.site,
            None
        )
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
        assert response.data == {"error": "No data received from Gamma server."}

    @pytest.mark.django_db
    def test_leaderboard_toggle_disabled(self, mocker):
        view = LeaderboardApiView()
        request_mock = mocker.MagicMock()
        toggle_mock = mocker.patch("gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard", return_value=False)

        response = view.get(request_mock)

        toggle_mock.assert_called_once_with()
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert response.data == {"error": "Gamma Leaderboard is disabled."}

    @pytest.mark.django_db
    def test_leaderboard_toggle_enabled_with_course_id(self, mocker):
        view = LeaderboardApiView()
        request_mock = mocker.MagicMock()
        course_id_mock = "course-v1:mock+mock+mock"
        leaderboard_info_mock = {"rank": 1, "score": 100}
        toggle_mock = mocker.patch("gamma_dashboard.dashboard.api.v0.views.show_gamma_leaderboard", return_value=True)
        gamma_api_wrapper_mock = mocker.patch.object(
            GammaApiWrapper, "get_leaderboard_info", return_value=leaderboard_info_mock
        )
        update_leaderboard_info_mock = mocker.patch(
            "gamma_dashboard.dashboard.api.v0.views.LeaderboardApiView._update_leaderboard_info",
            return_value=leaderboard_info_mock
        )

        response = view.get(request_mock, course_id=course_id_mock)

        toggle_mock.assert_called_once_with()
        gamma_api_wrapper_mock.assert_not_called()
        update_leaderboard_info_mock.assert_called_once_with(request_mock.user, COURSE_LEADERBOARD_MOCK)
        assert response.status_code == status.HTTP_200_OK
        assert response.data == leaderboard_info_mock
