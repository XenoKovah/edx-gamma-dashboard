"""
Gamma leaderboard views.
"""
from django.views import View

from edxmako.shortcuts import render_to_response
from openedx.core.djangoapps.programs.models import ProgramsApiConfig


class LeaderboardView(View):
    """
    Main gamma leaderboard view.
    """

    def get(self, request):
        context = {
            'user': request.user,
            'show_dashboard_tabs': True,
            'show_program_listing': ProgramsApiConfig.is_enabled(),
        }

        return render_to_response('leaderboard/leaderboard_page.html', context)
