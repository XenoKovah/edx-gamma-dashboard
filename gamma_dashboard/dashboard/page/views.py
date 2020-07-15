"""
Gamma views.
"""
from django.views import View

from edxmako.shortcuts import render_to_response
from openedx.core.djangoapps.programs.models import ProgramsApiConfig


class DashboardView(View):
    """
    Main gamma dashboard view.
    """

    def get(self, request):
        context = {
            'user': request.user,
            'show_dashboard_tabs': True,
            'show_program_listing': ProgramsApiConfig.is_enabled(),
        }

        return render_to_response('dashboard/dashboard_page.html', context)
