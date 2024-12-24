export const gameProfileData = {
  chart: {
    problem_graded: {
      points: 36,
      title: null,
    },
    edx_grades_problem_submitted: {
      points: 12,
      title: null,
    },
    edx_forum_thread_created: {
      points: 13,
      title: null,
    },
    edx_course_enrollment_activated: {
      points: 10,
      title: 'Course Enrollment',
    },
    problem_check: {
      points: 96,
      title: null,
    },
    stop_video: {
      points: 13,
      title: null,
    },
  },
  system_statuses: [
    {
      status_points: 50,
      title: 'Platinum1',
      color: '',
      url: 'https://gamma-url.com/platinum1.png',
      status_uid: 'platinum',
      active: true,
      slug: 'platinum',
    },
    {
      status_points: 100,
      title: 'Gold',
      color: '',
      url: 'https://gamma-url.com/gold.png',
      status_uid: 'gold',
      active: true,
      slug: 'gold',
    },
    {
      status_points: 105,
      title: 'New status',
      color: '',
      url: 'https://gamma-url.com/new-status.png',
      status_uid: 'new-status',
      active: true,
      slug: 'new-status',
    },
  ],
  points: 180,
  badges: {
    10: {
      url: 'https://gamma-url.com/badge10.png',
      progress: {

      },
      done: true,
      title: '10',
    },
    'new-shiny-badge-20': {
      url: 'https://gamma-url.com/badge-new-shiny-badge-20.png',
      progress: {

      },
      done: true,
      title: 'new shiny BADGE 2.0',
    },
    'badge-badge': {
      url: 'https://gamma-url.com/badge-badge-for-badge.png',
      progress: {

      },
      done: true,
      title: 'Badge for badge',
    },
  },
  progress: {
    2020: [
      {
        date: '2020-06-23T00:00:00.000000Z',
        points: 13,
      },
      {
        date: '2020-06-24T00:00:00.000000Z',
        points: 13,
      },
      {
        date: '2020-06-26T00:00:00.000000Z',
        points: 5,
      },
      {
        date: '2020-06-26T00:00:00.000000Z',
        points: 4,
      },
      {
        date: '2020-06-26T00:00:00.000000Z',
        points: 8,
      },
      {
        date: '2020-06-26T00:00:00.000000Z',
        points: 6,
      },
      {
        date: '2020-07-09T00:00:00.000000Z',
        points: 5,
      },
    ],
  },
  statuses: [
    {
      status_points: 100,
      title: 'Gold status',
      color: 'blue',
      url: 'https://gamma-url.com/status-gold-status.png',
      status_uid: 'gold-status',
      active: false,
      slug: 'gold-status',
    },
    {
      status_points: 150,
      title: 'Gold',
      color: '',
      url: 'https://gamma-url.com/status-gold.png',
      status_uid: 'gold',
      active: false,
      slug: 'gold',
    },
    {
      status_points: 50,
      title: 'Platinum1',
      color: '',
      url: 'https://gamma-url.com/status-platinum.png',
      status_uid: 'platinum',
      active: false,
      slug: 'platinum',
    },
    {
      status_points: 105,
      title: 'New status',
      color: '',
      url: 'https://gamma-url.com/status-new-status.png',
      status_uid: 'new-status',
      active: false,
      slug: 'new-status',
    },
  ],
  system_badges: [
    {
      title: '10',
      url: 'https://gamma-url.com/badge10.png',
      rules: {
        actions: {
          stop_video: 1,
        },
      },
      active: true,
      badge_uid: '10',
      slug: '10',
    },
    {
      title: '6',
      url: 'https://gamma-url.com/badge6.png',
      rules: {
        actions: {
          stop_video: 1,
        },
      },
      active: true,
      badge_uid: '6',
      slug: '6',
    },
    {
      title: '5',
      url: 'https://gamma-url.com/badge5.png',
      rules: {
        filters: {
          course: 'course-v1:RaccoonGang+AP101+2018_t2',
        },
        badges: [
          '6',
          '10',
          '5',
        ],
        actions: {
          problem_graded: 1,
          edx_forum_response_created: 1,
          edx_grades_problem_submitted: 1,
          problem_check: 1,
          edx_bookmark_added: 1,
          edx_forum_thread_created: 1,
          edx_course_student_notes_added: 1,
          edx_course_enrollment_activated: 1,
          edx_forum_comment_created: 1,
          edx_forum_thread_voted: 1,
          stop_video: 1,
          openassessmentblock_save_submission: 1,
        },
        status_badge: 'platinum',
      },
      active: true,
      badge_uid: '5',
      slug: '5',
    },
    {
      title: 'Badge for badge',
      url: 'https://gamma-url.com/badge4.png',
      rules: {
        status_badge: 'gold',
        badges: [
          '10',
          'badge-badge',
        ],
      },
      active: true,
      badge_uid: '4',
      slug: '4',
    },
    {
      title: 'Badge for submite',
      url: 'https://gamma-url.com/badge3.png',
      rules: {
        filters: {
          frequency: 1,
        },
        status_badge: 'new-status',
        actions: {
          problem_graded: 1,
        },
      },
      active: true,
      badge_uid: '3',
      slug: '3',
    },
  ],
};

export const statusRoadmap = {
  points: 180,
  statuses: [
    {
      active: true,
      color: '',
      slug: 'gold',
      status_points: 100,
      status_uid: 'gold',
      title: 'Gold',
      url: 'https://gamma-url.com/status-gold.png',
    },
    {
      active: true,
      color: '',
      slug: 'test-status',
      status_points: 150,
      status_uid: 'test-status',
      title: 'Test status',
      url: 'https://gamma-url.com/status-test-status.png',
    },
    {
      active: true,
      color: '',
      slug: 'platinum',
      status_points: 250,
      status_uid: 'platinum',
      title: 'Platinum',
      url: 'https://gamma-url.com/status-platinum.png',
    },
  ],
};

export const parsedBadgeItems = [
  [
    '3',
    {
      id: '4',
      url: 'https://gamma-url.com/badge3.png',
      title: 'Badge for submite',
      progress: {
        edx_bookmark_added: {
          count: 0,
          goal: 1,
          title: 'Bookmark',
        },
        problem_graded: {
          count: 1,
          goal: 1,
          title: 'Problem Graded',
        },
        stop_video: {
          count: 1,
          goal: 1,
          title: 'Stop Video',
        },
      },
      dependencies: [],
      statusDependency: 'New status',
      done: false,
      status_dependency: 'new-status',
    },
  ],
  [
    '10',
    {
      url: 'https://gamma-url.com/badge10.png',
      progress: {},
      done: true,
      title: '10',
    },
  ],
  [
    'new-shiny-badge-20',
    {
      url: 'https://gamma-url.com/badge-new-shiny-badge-20.png',
      progress: {},
      done: true,
      title: 'new shiny BADGE 2.0',
    },
  ],
];

export const parsedStatusItems = [
  {
    title: 'Platinum1',
    color: '',
    url: 'https://gamma-url.com/platinum1.png',
    status_uid: 'platinum',
    active: true,
    slug: 'platinum',
    statusPoints: 50,
    points: 180,
  },
  {
    title: 'Gold',
    color: '',
    url: 'https://gamma-url.com/gold.png',
    status_uid: 'gold',
    active: true,
    slug: 'gold',
    statusPoints: 100,
    points: 180,
  },
  {
    title: 'New status',
    color: '',
    url: 'https://gamma-url.com/new-status.png',
    status_uid: 'new-status',
    active: true,
    slug: 'new-status',
    statusPoints: 105,
    points: 180,
  },
];
