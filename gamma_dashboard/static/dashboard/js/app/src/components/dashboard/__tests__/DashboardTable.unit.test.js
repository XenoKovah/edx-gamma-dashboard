import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import DashboardTable from '../DashboardTable';

import {
    parsedBadgeItems,
    parsedStatusItems
} from '../../../fixtures/dashboard';


afterEach(cleanup);


describe('<DashboardTable>', () => {
    it('renders', () => {
        const statusRoadmap = {
            points: 180,
            statuses: [
                {
                    status_points: 50,
                    title: 'Platinum1',
                    color: '',
                    url: 'https://gamma-url.com/platinum1.png',
                    status_uid: 'platinum',
                    active: true,
                    slug: 'platinum'
                },
                {
                    status_points: 100,
                    title: 'Gold',
                    color: '',
                    url: 'https://gamma-url.com/gold.png',
                    status_uid: 'gold',
                    active: true,
                    slug: 'gold'
                },
                {
                    status_points: 105,
                    title: 'New status',
                    color: '',
                    url: 'https://gamma-url.com/new-status.png',
                    status_uid: 'new-status',
                    active: true,
                    slug: 'new-status'
                }
            ]
        };

        const progress = {
            '2020': [
                { date: '2020-06-23T00:00:00.000000Z', points: 13 },
                { date: '2020-06-24T00:00:00.000000Z', points: 13 },
                { date: '2020-06-26T00:00:00.000000Z', points: 5 },
                { date: '2020-06-26T00:00:00.000000Z', points: 4 },
                { date: '2020-06-26T00:00:00.000000Z', points: 8 },
                { date: '2020-06-26T00:00:00.000000Z', points: 6 },
                { date: '2020-07-09T00:00:00.000000Z', points: 5 }
            ]
        };

        const chart = {
            problem_graded: {
                points: 36,
                title: null
            },
            edx_grades_problem_submitted: {
                points: 12,
                title: null
            },
            edx_forum_thread_created: {
                points: 13,
                title: null
            },
            edx_course_enrollment_activated: {
                points: 10,
                title: 'Course Enrollment'
            },
            problem_check: {
                points: 96,
                title: null
            },
            stop_video: {
                points: 13,
                title: null
            }
        };


        const { getByTestId } = render(
            <DashboardTable
                badgeItems={parsedBadgeItems}
                statusItems={parsedStatusItems}
                statusRoadmap={statusRoadmap}
                progress={progress}
                chart={chart}
            />
        );

        const dashboardTable = getByTestId('dashboard-table');

        expect(dashboardTable).toBeInTheDocument();
    });

    it('renders without data', () => {
        const { getByTestId } = render(<DashboardTable />);

        const dashboardTable = getByTestId('dashboard-table');

        expect(dashboardTable).toBeInTheDocument();
    });
});
