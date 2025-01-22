"""
Edx Gamma Course Leaderboard feature toggles.
"""

from edx_toggles.toggles import WaffleFlag


RGG_NAMESPACE = 'rgg'


# .. toggle_name: rgg.show_gamma_course_leaderboard
# .. toggle_implementation: WaffleFlag
# .. toggle_default: True
# .. toggle_description: This flag enables or disables showing RGG Gamma Course Leaderboard tab
# .. toggle_use_cases: temporary
# .. toggle_creation_date: 2025-01-21
# .. toggle_target_removal_date: 2030-01-21
# .. toggle_tickets: NAU-170
# .. toggle_warning:
ENABLE_SHOWING_COURSE_LEADERBOARD_TAB = WaffleFlag(f'{RGG_NAMESPACE}.show_gamma_course_leaderboard', __name__)


def show_course_leaderboard_tab() -> bool:
    """
    Returns a boolean = true if RGG Gamma Course Leaderboard tab is enabled.

    This variable disables or enables RGG Gamma Course Leaderboard tab.
    To enable or disable use waffle flag in LMS admin:
    {{LMS_BASE}}/admin/waffle/flag/
    `rgg.show_gamma_course_leaderboard` - enable or disable this flag.
    """
    return ENABLE_SHOWING_COURSE_LEADERBOARD_TAB.is_enabled()
