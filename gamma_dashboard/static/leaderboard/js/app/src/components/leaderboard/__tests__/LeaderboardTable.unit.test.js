import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
import LeaderboardTable from '../LeaderboardTable';


const correctProfilesData = [
    {
        user: {
            username: 'Bi-Han'
        },
        badges: [
            'https://badge.one.url/',
        ],
        points: 30
    },
    {
        user: {
            username: 'Kuai Liang'
        },
        badges: [
            'https://badge.one.url/',
            'https://badge.two.url/',
            'https://badge.three.url/',
        ],
        points: 50
    }
];


afterEach(cleanup);


describe('<LeaderboardTable>', () => {
    it('renders empty with loader', () => {
        const { getByTestId, queryByTestId } = render(<LeaderboardTable />);

        expect(getByTestId('leaderboard-table')).toBeInTheDocument();
        expect(queryByTestId('leaderboard-table-row')).not.toBeInTheDocument();
        expect(getByTestId('loader')).toBeInTheDocument();
    });

    it('renders headers correctly', () => {
        const { getAllByTestId } = render(<LeaderboardTable />);

        const studentsHeader = getAllByTestId('students-header');
        const progressHeader = getAllByTestId('progress-header');
        const badgesHeader = getAllByTestId('badges-header');

        expect(studentsHeader.length).toBe(1);
        expect(progressHeader.length).toBe(1);
        expect(badgesHeader.length).toBe(1);

        expect(studentsHeader[0].textContent).toBe('Students');
        expect(progressHeader[0].textContent).toBe('Progress');
        expect(badgesHeader[0].textContent).toBe('Badges');
    });

    it('renders with correct number of rows', () => {
        const { getAllByTestId } = render(<LeaderboardTable profiles={correctProfilesData} />);

        const tableRows = getAllByTestId('leaderboard-table-row');

        expect(tableRows.length).toBe(correctProfilesData.length);
    });
});
