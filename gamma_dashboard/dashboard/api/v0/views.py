"""
Gamma leaderboard API views.
"""
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from gamma_dashboard.dashboard.core.gamma.api.wrapper import gamma_api


class LeaderboardApiView(APIView):
    """
    Leaderboard API view.
    """

    def get(self, request):
        """
        Get Leaderboard info.
        """
        leaderboard_info = gamma_api.get_leaderboard_info()

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

        if user_info:
            response = Response(user_info)
        else:
            response = Response(
                {'error': 'No data recieved from Gamma server.'},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        return response
