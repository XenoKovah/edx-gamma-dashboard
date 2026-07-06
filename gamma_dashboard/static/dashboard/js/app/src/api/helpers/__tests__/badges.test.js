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
        goal: 3,
        title: 'Bookmark Added',
      },
      status_badge: {
        count: 0,
        goal: 1,
        title: 'Status Badge',
      },
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
