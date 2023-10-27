import React from 'react';

import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import DashboardTable from '../DashboardTable';

import {
    parsedBadgeItems,
    parsedStatusItems
} from '../../../fixtures/dashboard';


afterEach(cleanup);


describe('<DashboardTable>', () => {
    it('renders', () => {
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


        act(() => {
            render(
                <DashboardTable
                    badgeItems={parsedBadgeItems}
                    statusItems={parsedStatusItems}
                    progress={progress}
                    chart={chart}
                />
            );
        });

        const dashboardTable = screen.getByTestId('dashboard-table');

        expect(dashboardTable).toBeInTheDocument();
    });

    it('renders without data', () => {
        act(() => {
            render(<DashboardTable />);
        });

        const dashboardTable = screen.getByTestId('dashboard-table');

        expect(dashboardTable).toBeInTheDocument();
    });
});
