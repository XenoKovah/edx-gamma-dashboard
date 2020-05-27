import React from 'react';

import axios from 'axios';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import LeaderboardPage from '../LeaderboardPage';


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


jest.mock('axios');
afterAll(cleanup);


describe('<LeaderboardPage>', () => {
    it('renders', () => {
        axios.get.mockResolvedValue({data: {gameprofiles: correctProfilesData}});

        const { getByTestId } = render(<LeaderboardPage />);

        const pageTitle = getByTestId('leaderboard-page-title');
        const leaderboardTable = getByTestId('leaderboard-table');

        expect(pageTitle).toBeInTheDocument();
        expect(leaderboardTable).toBeInTheDocument();
    });

    it.each`
        data
        ${{gameprofiles: null}}
        ${{gameprofiles: []}}
        ${null}
    `('reanders with incosistent data `$data`', ({data}) => {
        axios.get.mockResolvedValue({data: data});

        const { getByTestId } = render(<LeaderboardPage />);

        const pageTitle = getByTestId('leaderboard-page-title');
        const leaderboardTable = getByTestId('leaderboard-table');

        expect(pageTitle).toBeInTheDocument();
        expect(leaderboardTable).toBeInTheDocument();
    });
});
