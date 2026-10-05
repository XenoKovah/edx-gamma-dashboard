"""
Tests for the certificate Course Completion tier lookup.
"""
import pytest
from django.core.cache import cache

from gamma_dashboard import certificate_tier as ct

ARCH = 'course-v1:OpenSecurityTraining2+Arch1001_x86-64_Asm+2021_v1'
DBG_21 = 'course-v1:OpenSecurityTraining2+Dbg1011_WinDbg1+2021_v1'
DBG_24 = 'course-v1:OpenSecurityTraining2+Dbg1011_WinDbg1+2024_v1'
VULNS = 'course-v1:OpenSecurityTraining2+Vulns1001_C-family+2023_v1'


def _badge(badge_id, category, course):
    return {'id': badge_id, 'category': category, 'rules': [{'filters': {'course': course}}]}


def _profile(*achievements):
    return {
        'system_badges': [
            _badge(1, 'Course Completion / Gold (2 weeks)', ARCH),
            _badge(2, 'Course Completion / Silver (4 weeks)', [DBG_21, DBG_24]),
            _badge(3, 'Course Completion / Plain (> 12 weeks)', VULNS),
            _badge(4, 'Course Completion / Bronze (12 weeks)', ARCH),
            _badge(5, 'Multi-class Accomplishment', ARCH),
        ],
        'badges': [{'object_id': i, 'done': done} for i, done in achievements],
    }


@pytest.fixture(autouse=True)
def _locmem_cache(settings):
    settings.CACHES = {'default': {'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'}}
    cache.clear()
    yield
    cache.clear()


@pytest.mark.unittests
@pytest.mark.parametrize('category, tier', [
    ('Course Completion / Gold (2 weeks)', 'gold'),
    ('Course Completion / Silver (4 weeks)', 'silver'),
    ('Course Completion / Bronze (12 weeks)', 'bronze'),
    ('Course Completion / Plain (> 12 weeks)', 'plain'),
    ('Course Completion', None),
    ('Multi-class Accomplishment', None),
    ('', None),
    (None, None),
])
def test_tier_from_category(category, tier):
    assert ct.tier_from_category(category) == tier


@pytest.mark.unittests
def test_tiers_from_profile_maps_every_run_of_a_class():
    tiers = ct.tiers_from_profile(_profile((1, True), (2, True), (3, True), (5, True)))
    assert tiers == {ARCH: 'gold', DBG_21: 'silver', DBG_24: 'silver', VULNS: 'plain'}


@pytest.mark.unittests
def test_tiers_from_profile_ignores_unfinished_and_unknown_badges():
    assert ct.tiers_from_profile(_profile((1, False), (99, True))) == {}
    assert ct.tiers_from_profile(None) == {}


@pytest.mark.unittests
def test_tiers_from_profile_prefers_best_tier():
    assert ct.tiers_from_profile(_profile((4, True), (1, True)))[ARCH] == 'gold'


@pytest.mark.unittests
def test_lookup_caches_and_refetches_for_a_newly_granted_badge(mocker):
    fetch = mocker.patch.object(ct, 'fetch_tiers', side_effect=[{ARCH: 'gold'}, {ARCH: 'gold', VULNS: 'plain'}])

    assert ct.get_course_completion_tier('ann', ARCH) == 'gold'
    assert ct.get_course_completion_tier('ann', ARCH) == 'gold'
    assert fetch.call_count == 1

    # A badge granted after the map was cached: the missing course triggers one refetch.
    assert ct.get_course_completion_tier('ann', VULNS) == 'plain'
    assert fetch.call_count == 2


@pytest.mark.unittests
def test_lookup_negative_cache_limits_refetches(mocker):
    fetch = mocker.patch.object(ct, 'fetch_tiers', return_value={ARCH: 'gold'})

    assert ct.get_course_completion_tier('ann', VULNS) is None
    assert ct.get_course_completion_tier('ann', VULNS) is None
    assert fetch.call_count == 1

    cache.delete(ct._missing_cache_key('ann', VULNS))
    fetch.return_value = {ARCH: 'gold', VULNS: 'bronze'}
    assert ct.get_course_completion_tier('ann', VULNS) == 'bronze'


@pytest.mark.unittests
def test_lookup_gamma_down_falls_back_to_cached_or_none(mocker):
    mocker.patch.object(ct, 'fetch_tiers', return_value=None)
    assert ct.get_course_completion_tier('ann', ARCH) is None
    assert cache.get(ct._tiers_cache_key('ann')) is None

    cache.set(ct._tiers_cache_key('ann'), {ARCH: 'silver'})
    assert ct.get_course_completion_tier('ann', ARCH, refresh=True) == 'silver'


@pytest.mark.unittests
def test_fetch_tiers_survives_request_errors(mocker):
    mocker.patch.object(ct.GammaApiWrapper, 'get_game_profile', side_effect=OSError('down'))
    assert ct.fetch_tiers('ann') is None


@pytest.mark.unittests
def test_certificate_tier_context(mocker):
    toggle = mocker.patch('gamma_dashboard.toggles.show_student_ui', return_value=True)
    mocker.patch.object(ct, 'get_course_completion_tier', return_value='bronze')
    assert ct.certificate_tier_context('ann', ARCH) == {
        'tier': 'bronze', 'label': 'Bronze certificate for completion in 12 weeks or less',
    }

    toggle.return_value = False
    assert ct.certificate_tier_context('ann', ARCH) is None

    toggle.return_value = True
    ct.get_course_completion_tier.return_value = None
    assert ct.certificate_tier_context('ann', ARCH) is None
