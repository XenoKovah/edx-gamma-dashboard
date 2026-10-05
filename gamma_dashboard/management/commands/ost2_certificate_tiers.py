"""
Backfill (and verify) the Course Completion tier shown on certificates.

For every downloadable certificate, fetch the learner's tiers from gamma once,
store them in the LMS cache the certificate page reads (so pages render tiers
without waiting on gamma), and report how many certificates landed in each tier
and which have none.

    ./manage.py lms ost2_certificate_tiers --dry-run            # report only
    ./manage.py lms ost2_certificate_tiers --tsv /tmp/tiers.tsv # backfill + per-cert list
    ./manage.py lms ost2_certificate_tiers --username XenoPublic

Safe to re-run: it only (re)writes cache entries. Re-run after a tier regrade so
pages pick up the new tier immediately instead of when the cache entry expires.
"""

import time
from collections import Counter, defaultdict

from django.core.cache import cache
from django.core.management.base import BaseCommand

from gamma_dashboard import certificate_tier


class Command(BaseCommand):
    help = 'Backfill/verify the Course Completion tier cache used by the certificate page.'

    def add_arguments(self, parser):
        parser.add_argument('--dry-run', action='store_true', help='Report only; do not write the cache.')
        parser.add_argument('--username', action='append', default=[], help='Limit to these usernames.')
        parser.add_argument('--course', action='append', default=[], help='Limit to these course ids.')
        parser.add_argument('--sleep', type=float, default=0.05, help='Seconds between gamma requests.')
        parser.add_argument('--tsv', help='Write username, course_id, tier rows to this path.')

    def handle(self, *args, **options):
        # pylint: disable=import-outside-toplevel
        from lms.djangoapps.certificates.data import CertificateStatuses
        from lms.djangoapps.certificates.models import GeneratedCertificate

        certs = GeneratedCertificate.objects.filter(status=CertificateStatuses.downloadable)
        if options['username']:
            certs = certs.filter(user__username__in=options['username'])
        if options['course']:
            certs = certs.filter(course_id__in=options['course'])

        by_user = defaultdict(list)
        for username, course_id in certs.values_list('user__username', 'course_id'):
            by_user[username].append(str(course_id))

        counts = Counter()
        rows = []
        failed = []
        for i, (username, course_ids) in enumerate(sorted(by_user.items()), 1):
            tiers = certificate_tier.fetch_tiers(username)
            if tiers is None:
                failed.append(username)
                for course_id in course_ids:
                    counts['gamma error'] += 1
                    rows.append((username, course_id, 'ERROR'))
            else:
                if not options['dry_run']:
                    cache.set(
                        certificate_tier._tiers_cache_key(username),  # pylint: disable=protected-access
                        tiers, certificate_tier.TIERS_CACHE_TIMEOUT,
                    )
                for course_id in course_ids:
                    tier = tiers.get(course_id) or 'none'
                    counts[tier] += 1
                    rows.append((username, course_id, tier))
            if i % 200 == 0:
                self.stdout.write(f'  {i}/{len(by_user)} learners')
            if options['sleep']:
                time.sleep(options['sleep'])

        if options['tsv']:
            with open(options['tsv'], 'w') as out:
                out.write('username\tcourse_id\ttier\n')
                out.writelines(f'{u}\t{c}\t{t}\n' for u, c, t in rows)

        total = sum(counts.values())
        mode = 'DRY RUN (cache untouched)' if options['dry_run'] else 'cache written'
        self.stdout.write(f'{total} certificates, {len(by_user)} learners, {mode}')
        for tier in (*certificate_tier.TIERS, 'none', 'gamma error'):
            if counts[tier]:
                self.stdout.write(f'  {tier:12} {counts[tier]}')
        for username, course_id, tier in rows:
            if tier == 'none':
                self.stdout.write(f'  no tier badge: {username} {course_id}')
        if failed:
            self.stdout.write(self.style.ERROR(f'gamma failed for {len(failed)} learners: {failed[:20]}'))
