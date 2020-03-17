"""
Gamma leaderboard views.
"""
from django.views import View
from django.http.response import HttpResponse


class LeaderboardView(View):
    """
    Main gamma leaderboard view.
    """
    # template_name = 'leaderboard.html'

    def get(self, request):
        return HttpResponse('<h1>Leaderboard</h1>')
