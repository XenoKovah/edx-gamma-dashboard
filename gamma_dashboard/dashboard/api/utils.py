import logging
from django.conf import settings

LOGGER = logging.getLogger(__name__)


def is_main_site(request):
    """
    A function to check if the current request is for the main platform site.
    """
    return request.META.get('HTTP_HOST') == settings.SITE_NAME


def site_badge_filter(badges, is_main_site, whitelist, blacklist, course_key_parser):
    """
    Filter badges by organization.

    args:
        badges (list[dict]): List of all badges received from Gamma Core.
        is_main_site (bool): The parameter that determines whether we are 
                             on the main site of the platform.
        whitelist (list[str]): List the orgs configured for the 
                               current site (other than the main site).
        blacklist (list[str]): When using the main site, this list contains 
                               all the org included in the microsites.
        course_key_parser (func): Method for getting data from course key.
        
    Return: The filtered list of badges for microsite/main site.
    """
    # nothing to filter if we have only one site
    if is_main_site and not blacklist:
        return badges
    
    result = []

    for badge in badges:
        # In the case when the badge has no filter, then add this badge to the result list.
        if not (filters := badge.get('rules', {}).get('filters')):
            result.append(badge)
            continue

        course_org = filters.get('course') and course_key_parser(filters['course']).org
        org = course_org or filters.get('org')
        # Only the "org"/"course" filters are used for filtering
        if not (org := course_org or filters.get('org')):
            result.append(badge)
            continue

        # Filter out badges with invalid filters set up.
        # If both `org` and `course` filters exist - the course's organization should
        # match the org from the filter.
        if filters.get('org') and course_org and course_org != filters.get('org'):
            LOGGER.error(
                f"The badge {badge.get('title')} has invalid filters: course's "
                "organization {course_org} doesn't match the `org` filter {filters.get('org')}."
            )
            continue

        if (is_main_site and org not in blacklist) or (not is_main_site and org in whitelist):
            result.append(badge)

    return result
