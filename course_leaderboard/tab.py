from django.utils.translation import gettext_noop

from common.djangoapps.student.models import CourseEnrollment
from xmodule.tabs import CourseTab


class CourseLeaderboardTab(CourseTab):
    """
    Provides information for tab.
    """

    name = 'course_leaderboard'
    type = 'course_leaderboard'
    title = gettext_noop('Course Leaderboard')
    is_dynamic = True
    view_name = 'course_leaderboard:course_leaderboard_tab'

    @classmethod
    def is_enabled(cls, course, user=None):
        """
        Enables the tab only to instructors and staff members.
        """
        return user and user.is_authenticated and CourseEnrollment.is_enrolled(user, course.id)
