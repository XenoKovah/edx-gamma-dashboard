"""
Edx Gamma Dashboard feature toggles.
"""

from crum import get_current_request
from edx_toggles.toggles import WaffleFlag


RGG_NAMESPACE = 'rgg'


# .. toggle_name: rgg.show_gamma_leaderboard
# .. toggle_implementation: WaffleFlag
# .. toggle_default: False
# .. toggle_description: This flag enables or disables showing RGG Gamma Leaderboard
# .. toggle_use_cases: temporary
# .. toggle_creation_date: 2024-12-09
# .. toggle_target_removal_date: 2030-12-09
# .. toggle_tickets: NAU-56
# .. toggle_warning:
ENABLE_SHOWING_GAMMA_LEADERBOARD = WaffleFlag(f'{RGG_NAMESPACE}.show_gamma_leaderboard', __name__)


def show_gamma_leaderboard() -> bool:
    """
    Returns a boolean = true if showing RGG Gamma Leaderboard is enabled.

    This variable disables or enables showing RGG Gamma Leaderboard.
    To enable or disable sending task use waffle flag in LMS admin:
    {{LMS_BASE}}/admin/waffle/flag/
    `rgg.show_gamma_leaderboard` - enable or disable this flag.
    """
    return ENABLE_SHOWING_GAMMA_LEADERBOARD.is_enabled()


# .. toggle_name: rgg.show_student_ui
# .. toggle_implementation: WaffleFlag
# .. toggle_default: False
# .. toggle_description: Master switch for the student-facing RGG gamification UI — the
#   header dropdown links (MFE + legacy), the profile "Earned Accomplishments" section,
#   the gamification dashboard/leaderboard pages, and the course leaderboard. Staff and
#   superusers always see the UI regardless of this flag, so they can preview it while it
#   is hidden from learners. Default off (hidden); flip on for learners with no rebuild.
# .. toggle_use_cases: opt_in
# .. toggle_creation_date: 2026-06-11
# .. toggle_tickets: rgg-student-ui-gate
ENABLE_STUDENT_UI = WaffleFlag(f'{RGG_NAMESPACE}.show_student_ui', __name__)


def show_student_ui(request=None) -> bool:
    """
    Whether the RGG student gamification UI should be visible to the current user.

    Staff and superusers always get ``True`` (so they can preview the UI while it is
    hidden from learners); everyone else gets the ``rgg.show_student_ui`` flag value
    (default off). Toggle for learners in the LMS admin:
    {{LMS_BASE}}/admin/waffle/flag/ -> ``rgg.show_student_ui``.

    ``request`` is optional: when omitted, the current request/user is resolved from the
    thread-local (crum), the same mechanism ``WaffleFlag.is_enabled`` uses, so callers
    without a request in scope (e.g. a course tab's ``is_enabled``) still get the staff
    bypass.
    """
    if request is None:
        request = get_current_request()
    user = getattr(request, 'user', None)
    if user is not None and user.is_authenticated and (user.is_staff or user.is_superuser):
        return True
    return ENABLE_STUDENT_UI.is_enabled()
