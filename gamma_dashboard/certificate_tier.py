"""
Course Completion tier for a certificate (OST2).

The certificate web view colours the recipient's name and the circuit trees
gold / silver / bronze to match the learner's per-class Course Completion badge,
and prints a line saying which tier it is. Gamma is the source of truth: the tier
is the category of the Course Completion badge the learner earned for the class
whose rule covers the certificate's course run.

Gamma's game profile is ~0.5 s and ~240 KB, so each learner's tiers are cached
in the LMS cache as one ``{course_id: tier}`` map. A course missing from the map
(e.g. a badge granted after the map was cached) triggers one refetch, then a
short negative entry so an un-tiered certificate doesn't refetch on every view.
"""

import logging

from django.core.cache import cache

from gamma_dashboard.dashboard.core.gamma.api.settings import DEFAULT_API_VERSION
from gamma_dashboard.dashboard.core.gamma.api.wrapper import GammaApiWrapper

log = logging.getLogger(__name__)

COURSE_COMPLETION_CATEGORY_PREFIX = 'Course Completion'

# Best first: if a learner somehow holds two tiers for one class, show the better.
TIERS = ('gold', 'silver', 'bronze', 'plain')

TIER_LABELS = {
    'gold': 'Gold certificate for completion in 2 weeks or less',
    'silver': 'Silver certificate for completion in 4 weeks or less',
    'bronze': 'Bronze certificate for completion in 12 weeks or less',
    'plain': 'Plain certificate for completion in > 12 weeks',
}

TIERS_CACHE_TIMEOUT = 24 * 60 * 60
MISSING_CACHE_TIMEOUT = 60
GAMMA_TIMEOUT = 5


def _tiers_cache_key(username):
    return f'ost2.cert_tier.v1.tiers.{username}'


def _missing_cache_key(username, course_id):
    return f'ost2.cert_tier.v1.missing.{username}.{course_id}'


def tier_from_category(category):
    """
    ``'Course Completion / Gold (2 weeks)'`` -> ``'gold'``; None for anything else.
    """
    if not category or not category.startswith(COURSE_COMPLETION_CATEGORY_PREFIX):
        return None
    _, _, rest = category.partition('/')
    words = rest.split()
    tier = words[0].lower() if words else ''
    return tier if tier in TIERS else None


def _rule_courses(badge):
    courses = set()
    for rule in badge.get('rules') or []:
        course = (rule.get('filters') or {}).get('course')
        if isinstance(course, str):
            courses.add(course)
        elif isinstance(course, (list, tuple)):
            courses.update(c for c in course if isinstance(c, str))
    return courses


def tiers_from_profile(profile):
    """
    Map each course run the learner holds a Course Completion badge for to its tier.

    ``profile`` is gamma's ``users/gamma-profile`` payload: ``badges`` are the
    learner's achievements (``object_id`` = badge id, ``done``), ``system_badges``
    carry each badge's ``category`` and ``rules`` (whose ``filters.course`` is a
    course id or a list of them for multi-run classes).
    """
    system_badges = {b.get('id'): b for b in (profile or {}).get('system_badges') or []}
    tiers = {}
    for achievement in (profile or {}).get('badges') or []:
        if not achievement.get('done'):
            continue
        badge = system_badges.get(achievement.get('object_id'))
        if not badge:
            continue
        tier = tier_from_category(badge.get('category'))
        if not tier:
            continue
        for course_id in _rule_courses(badge):
            current = tiers.get(course_id)
            if current is None or TIERS.index(tier) < TIERS.index(current):
                tiers[course_id] = tier
    return tiers


def fetch_tiers(username):
    """
    Fetch the learner's ``{course_id: tier}`` map from gamma; None if gamma fails.
    """
    try:
        profile = GammaApiWrapper(version=DEFAULT_API_VERSION).get_game_profile(
            username, timeout=GAMMA_TIMEOUT,
        )
    except Exception:  # pylint: disable=broad-except
        log.warning('Certificate tier: gamma profile request failed for %s', username, exc_info=True)
        return None
    if not profile:
        log.warning('Certificate tier: no gamma profile for %s', username)
        return None
    return tiers_from_profile(profile)


def get_course_completion_tier(username, course_id, refresh=False):
    """
    The learner's tier for this course run ('gold'/'silver'/'bronze'/'plain'), or None.

    None means "unknown" (no tier badge yet, or gamma unavailable); the certificate
    then renders exactly as it did before tiers existed.
    """
    if not username or not course_id:
        return None
    course_id = str(course_id)

    tiers = cache.get(_tiers_cache_key(username))
    if not refresh and tiers is not None and course_id in tiers:
        return tiers[course_id]
    if not refresh and cache.get(_missing_cache_key(username, course_id)):
        return None

    fresh = fetch_tiers(username)
    if fresh is None:
        return (tiers or {}).get(course_id)
    cache.set(_tiers_cache_key(username), fresh, TIERS_CACHE_TIMEOUT)
    if course_id not in fresh:
        cache.set(_missing_cache_key(username, course_id), True, MISSING_CACHE_TIMEOUT)
    return fresh.get(course_id)


def certificate_tier_context(username, course_id):
    """
    Template helper: ``{'tier': ..., 'label': ...}`` or None.

    Hidden (None) while the student gamification UI is switched off, so boxes that
    keep RGG hidden (beta) render certificates unchanged.
    """
    from gamma_dashboard.toggles import show_student_ui  # pylint: disable=import-outside-toplevel

    if not show_student_ui():
        return None
    tier = get_course_completion_tier(username, course_id)
    if not tier:
        return None
    return {'tier': tier, 'label': TIER_LABELS[tier]}
