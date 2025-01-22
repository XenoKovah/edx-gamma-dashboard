"""
Module for tab fragment.
"""

from django.http import HttpRequest, HttpResponse
from opaque_keys.edx.keys import CourseKey
from django.views.generic import TemplateView

from lms.djangoapps.courseware.courses import get_course_by_id

from course_leaderboard.constants import COURSE_LEADERBOARD_DISABLE_MESSAGE
from course_leaderboard.toggles import show_course_leaderboard_tab


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
        if not show_course_leaderboard_tab():
            return HttpResponse(COURSE_LEADERBOARD_DISABLE_MESSAGE, status=404)

        course_key = CourseKey.from_string(course_id)
        self.course = get_course_by_id(course_key, depth=0)
        return super().get(request, course_id=course_id, *args, **kwargs)

    def get_context_data(self, **kwargs):
        return {'course': self.course}
