import pytest

from gamma_dashboard.dashboard.api.utils import site_badge_filter
from tests.utils import load_params_from_json


@pytest.mark.unittests
@pytest.mark.parametrize(
    'data',
    load_params_from_json('tests/unit/dashboard/api/resourses/system_badges_dataset.json'),
)
def test_site_badge_filter(mocker, data):
    """
    Test all possible cases of filtering badges for the main site and microsite.

    Cases:
        1. Check on the main site if the badges contain filter for orgs from the
            blacklist and non blacklist, and one badge without a filter.
        2. Check on the main site if the badges contain filter for blacklisted orgs
            and non blacklisted orgs, a badge with a course filter from a blacklisted org,
            and one badge without a filter.
        3. Check on the main site if the badges contain filter for blacklisted orgs
            and non blacklisted orgs, a badge with a course filter from a non blacklisted org,
            and one badge without a filter.
        4. Check on the main site if the badges contain filter for blacklisted orgs,
            and a one badge with a course filter from a non blacklisted org
            and course filter from a non blacklisted orgs.
        5. Check on the main site if one badge contains filter for blacklisted orgs
            and course filter from a non blacklisted orgs, and badges contain filter
            for non blacklisted orgs.
        6. Check on the main site if one badge contains filter for non blacklisted orgs
            and course from a blacklisted orgs and badge contain filter for course from
            a blacklisted orgs.
        7. Check on the main site if blacklist is empty.
        8. Check on the microsite if the badges contain filter for orgs from the whitelist
            and non whitelist.
        9. Check on the microsite if the badges contain filter for whitelisted orgs
            and non whitelisted orgs, a badge with a course filter from a whitelisted org,
            and one badge without a filter.
        10. Check on the microsite if the badges contain filter for whitelisted orgs
            and non whitelisted orgs, a badge with a course filter from non whitelisted org,
            and one badge without a filter.
        11. Check on the microsite if one badge contains filter for whitelisted orgs
            and course from a whitelisted orgs and badge contain filter for non whitelisted orgs.
        12. Check on the microsite if one badge contains filter for whitelisted orgs
            and course from non whitelisted orgs and badge contain filter for non whitelisted orgs.
        13. Check on the microsite if one badge contains filter for non whitelisted orgs
            and course from whitelisted orgs and badge contain filter for whitelisted orgs.
        14. Check on the microsite if badge contains filter for non whitelisted orgs
            and badge contain filter for non whitelisted orgs.
        15. Check on the microsite if whitelist is empty.
    """
    mock_course_key_parser= mocker.Mock()
    mock_course_key_parser.return_value.org = data['course_key_org']

    filtered_badges = site_badge_filter(
        badges=data['system_badges'],
        is_main_site=data['is_main_site'],
        whitelist=data['whitelist'],
        blacklist=data['blacklist'],
        course_key_parser=mock_course_key_parser
    )

    assert filtered_badges == data['expected_badges']
