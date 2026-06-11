"""
Gamma views.
"""
from django.http import Http404
from django.views import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from common.djangoapps.edxmako.shortcuts import render_to_response
from openedx.core.djangoapps.programs.models import ProgramsApiConfig

from gamma_dashboard.toggles import show_student_ui


class DashboardView(View):
    """
    Main gamma dashboard view.
    """

    @method_decorator(login_required)
    def get(self, request):
        # Hidden from learners until rgg.show_student_ui is enabled; staff/superusers
        # always pass (preview). A deep link 404s rather than leaking the page.
        if not show_student_ui(request):
            raise Http404()

        is_leaderboard_page = 'leaderboard' in request.path

        context = {
            'user': request.user,
            'show_dashboard_tabs': True,
            'show_program_listing': ProgramsApiConfig.is_enabled(),
            'is_leaderboard_page': is_leaderboard_page,
        }

        return render_to_response('dashboard/dashboard_page.html', context)
