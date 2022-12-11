import React from 'react';

import axios from 'axios';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
import pretty from 'pretty';

import LeaderboardPage from '../LeaderboardPage';


const correctProfilesData = [
    {
        username: 'Bi-Han',
        user_uid: 'Bi-Han',
        badges: {
            'badge.one': {'url': 'https://badge.one.url/'},
        },
        points: 30
    },
    {
        username: 'Kuai Liang',
        user_uid: 'Kuai Liang',
        badges: {
            'badge.one': {'url': 'https://badge.one.url/'},
            'badge.two': {'url': 'https://badge.two.url/'},
            'badge.three': {'url': 'https://badge.three.url/'},
        },
        points: 50
    }
];


jest.mock('axios');
afterAll(cleanup);


describe('<LeaderboardPage>', () => {
    it('renders', () => {
        axios.get.mockResolvedValue({data: {gameprofiles: correctProfilesData}});

        const { getByTestId, container } = render(<LeaderboardPage />);

        const pageTitle = getByTestId('leaderboard-page-title');
        const leaderboardTable = getByTestId('leaderboard-table');

        expect(pageTitle).toBeInTheDocument();
        expect(leaderboardTable).toBeInTheDocument();
        expect(axios.get).toBeCalled();
        expect(axios.get.mock.calls[0][0]).toBe('/gamma_dashboard/api/v0/leaderboard/');
        expect(pretty(container.innerHTML)).toMatchSnapshot();
        
    });

    it('renders with correct title', () => {
        const title = 'Leaderboard';

        const { getByTestId } = render(<LeaderboardPage />);
        const windowTitle = getByTestId('leaderboard-page-title');

        expect(windowTitle).toBeInTheDocument();
        expect(windowTitle).toHaveTextContent(title);
    });

    it.each`
        data
        ${{gameprofiles: null}}
        ${{gameprofiles: []}}
        ${null}
    `('renders with inconsistent data `$data`', ({data}) => {
        axios.get.mockResolvedValue({data: data});

        const { getByTestId } = render(<LeaderboardPage />);

        const pageTitle = getByTestId('leaderboard-page-title');
        const leaderboardTable = getByTestId('leaderboard-table');

        expect(pageTitle).toBeInTheDocument();
        expect(leaderboardTable).toBeInTheDocument();
    });
});
