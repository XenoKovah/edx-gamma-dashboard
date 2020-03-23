"""
Gamma leaderboard views.
"""
from django.views import View

from edxmako.shortcuts import render_to_response


class LeaderboardView(View):
    """
    Main gamma leaderboard view.
    """

    def get(self, request):
        return render_to_response('leaderboard/base.html')
