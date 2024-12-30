"""
Edx Gamma Dashboard feature toggles.
"""

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
