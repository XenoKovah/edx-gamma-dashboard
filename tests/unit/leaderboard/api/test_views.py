# TODO test not completed, need to mock the database query

# import pytest

# import pytest
# from pytest_mock import mocker

# from gamma_dashboard.dashboard.api.v0.views import LeaderboardApiView

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
