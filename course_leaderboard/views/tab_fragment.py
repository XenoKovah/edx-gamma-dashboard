"""
Module for tab fragment.
"""

from django.http import Http404, HttpRequest, HttpResponse
from opaque_keys.edx.keys import CourseKey
from django.views.generic import TemplateView

from lms.djangoapps.courseware.courses import get_course_by_id

from gamma_dashboard.toggles import show_student_ui


class CourseLeaderboardTabView(TemplateView):
    """
    Render the Course Leaderboard tab page.
    """

    template_name = 'leaderboard_tab_fragment.html'

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        self.course = None

    # pylint: disable=arguments-differ
    def get(self, request: HttpRequest, course_id: str, *args, **kwargs) -> HttpResponse:
        if not show_student_ui(request):
            raise Http404()
        course_key = CourseKey.from_string(course_id)
        self.course = get_course_by_id(course_key, depth=0)
        return super().get(request, course_id=course_id, *args, **kwargs)

    def get_context_data(self, **kwargs):
        return {'course': self.course}
