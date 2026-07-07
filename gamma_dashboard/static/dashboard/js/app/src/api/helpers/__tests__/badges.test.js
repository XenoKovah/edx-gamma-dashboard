import { gameProfileData } from '../../../__mocks__/dashboard';
import { mergeBadges } from '../badges';

describe('mergeBadges', () => {
  const mockStatusTitles = {
    platinum: 'Platinum1',
    gold: 'Gold',
    'new-status': 'New status',
  };

  const mockEventTitles = {
    edx_bookmark_added: 'Bookmark Added',
    problem_graded: 'Problem Graded',
    stop_video: 'Stop Video',
  };

  const mockUserBadges = gameProfileData.badges.map((badge) => ({
    slug: badge.slug,
    done: badge.done,
    progress: badge.progress,
  }));

  const mockSystemBadges = gameProfileData.system_badges.map((badge) => ({
    slug: badge.slug,
    image: badge.image,
    title: badge.title,
    isActive: badge.is_active,
    rules: badge.rules.map((rule) => rule.action),
  }));

  it('should merge user and system badges correctly', () => {
    const result = mergeBadges(mockStatusTitles, mockEventTitles, mockUserBadges, mockSystemBadges);

    expect(Object.keys(result)).toHaveLength(mockSystemBadges.length);
    mockSystemBadges.forEach((systemBadge) => {
      expect(result).toHaveProperty(systemBadge.slug);
    });

    const badge1 = result['badge-1'];
    expect(badge1).toEqual({
      done: true,
      category: '',
      progress: [
        {
          events: {
            edx_bookmark_added: {
              count: 1,
              goal: 1,
              last: '2025-03-25T16:36:11.868189+00:00',
            },
          },
        },
      ],
      slug: 'badge-1',
    });
  });

  it('should handle badges with multiple rules', () => {
    const systemBadgesWithMultipleRules = [
      {
        slug: 'badge-3',
        image: 'image3.png',
        title: 'Badge Three',
        isActive: true,
        rules: [
          {
            action: {
              edx_bookmark_added: 3,
            },
            eventConfiguration: {
              eventType: 'edx_bookmark_added',
              title: 'Bookmark Added',
            },
          },
          {
            action: {
              status_badge: 1,
            },
            eventConfiguration: {
              eventType: 'status_badge',
              title: 'Status Badge',
            },
          },
        ],
      },
    ];

    const result = mergeBadges(mockStatusTitles, mockEventTitles, mockUserBadges, systemBadgesWithMultipleRules);
    const badge3 = result['badge-3'];
    expect(badge3.progress).toEqual({
      edx_bookmark_added: {
        count: 1,
        goal: { count: 3 },
        title: 'Bookmark Added',
      },
      status_badge: {
        count: 0,
        goal: { count: 1 },
        title: 'Status Badge',
      },
    });
  });

  it('sums same-slug rules so a 3-certificate badge shows a goal of 3, not 1', () => {
    const certRule = {
      action: { edx_certificate_created: { count: 1 } },
      eventConfiguration: { eventType: 'edx_certificate_created', title: 'Get a Course Certificate' },
    };
    const systemBadges = [{
      slug: 'intel-l2',
      image: 'i.png',
      title: 'Intel Firmware Adept Level 2',
      isActive: true,
      // Three cert rules (one per course; the OR-variants are a single list-filter rule).
      rules: [certRule, certRule, certRule],
    }];

    const result = mergeBadges(mockStatusTitles, mockEventTitles, [], systemBadges);

    expect(result['intel-l2'].progress).toEqual({
      edx_certificate_created: {
        count: 0,
        goal: { count: 3 },
        title: 'Get a Course Certificate',
      },
    });
  });

  it('sums same-slug user progress so a partly-earned multi-cert badge counts correctly', () => {
    const certRule = {
      action: { edx_certificate_created: { count: 1 } },
      eventConfiguration: { eventType: 'edx_certificate_created', title: 'Get a Course Certificate' },
    };
    const systemBadges = [{
      slug: 'intel-l2',
      image: 'i.png',
      title: 'Intel Firmware Adept Level 2',
      isActive: true,
      rules: [certRule, certRule, certRule],
    }];
    // Learner earned 1 of the 3 certificates (per-rule progress list, mirroring the API).
    const userBadges = [{
      slug: 'intel-l2',
      done: false,
      progress: [
        { events: { edx_certificate_created: { goal: 1, count: 1 } } },
        { events: { edx_certificate_created: { goal: 1, count: 0 } } },
        { events: { edx_certificate_created: { goal: 1, count: 0 } } },
      ],
    }];

    const result = mergeBadges(mockStatusTitles, mockEventTitles, userBadges, systemBadges);

    expect(result['intel-l2'].progress.edx_certificate_created).toEqual({
      count: 1,
      goal: { count: 3 },
      title: 'Get a Course Certificate',
    });
  });

  it('carries description and manual criteria onto incomplete (manual) badges', () => {
    const systemBadges = [{
      slug: 'instructor',
      image: 'instructor.png',
      title: 'Instructor',
      isActive: true,
      description: 'For course instructors',
      manualCriteria: 'Granted by an admin to course instructors',
      rules: [],
    }];

    const result = mergeBadges(mockStatusTitles, mockEventTitles, [], systemBadges);

    expect(result.instructor).toMatchObject({
      description: 'For course instructors',
      manualCriteria: 'Granted by an admin to course instructors',
      done: false,
    });
  });
});
