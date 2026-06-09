import logging
from django.conf import settings

LOGGER = logging.getLogger(__name__)


def repair_mojibake_text(value):
    """
    Repair display text that was double-encoded on import, where UTF-8 bytes were
    stored after being decoded as cp1252/latin-1 (e.g. "Piotr KrÃ³l" -> "Piotr Król",
    "MikoÅ‚aj" -> "Mikołaj").

    The repair is conservative: a correctly-encoded string fails the UTF-8 re-decode
    and is returned unchanged, so only genuinely double-encoded values are altered.
    The underlying data is left untouched; this only fixes what is displayed.
    """
    if not value:
        return value
    for encoding in ('cp1252', 'latin-1'):
        try:
            return value.encode(encoding).decode('utf-8')
        except (UnicodeEncodeError, UnicodeDecodeError):
            continue
    return value


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
        rules_filters = [rule['filters'] for rule in badge.get('rules', []) if 'filters' in rule]

        # In the case when the badge has no filter, then add this badge to the result list.
        if not rules_filters:
            result.append(badge)
            continue

        for rule_filters in rules_filters:
            course_org = rule_filters.get('course') and course_key_parser(rule_filters['course']).org

            # Only the "org"/"course" filters are used for filtering
            if not (org := course_org or rule_filters.get('org')):
                continue

            # Filter out badges with invalid filters set up.
            # If both `org` and `course` filters exist - the course's organization should
            # match the org from the filter.
            if rule_filters.get('org') and course_org and course_org != rule_filters['org']:
                LOGGER.error(
                    f"The badge {badge.get('title')} has invalid filters: course's "
                    f"organization {course_org} doesn't match the `org` filter {rule_filters['org']}."
                )
                break

            is_allowed_main_site_org = is_main_site and org not in blacklist
            is_allowed_tenant_org = not is_main_site and org in whitelist

            if not(is_allowed_main_site_org or is_allowed_tenant_org):
                break
        else:
            result.append(badge)

    return result
