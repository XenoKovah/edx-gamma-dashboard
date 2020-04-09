import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import LeaderboardTableRow from '../LeadeboardTableRow';


const correctProfileData = {
    user: {
        username: 'Bi-Han'
    },
    badges: [
        'https://badge.one.url/',
        'https://badge.two.url/',
        'https://badge.tree.url/',
    ],
    points: 30,
    goal: 100
};

afterAll(cleanup);


describe('<LeaderboardTableRow>', () => {
    it('renders', () => {
        const { getByTestId } = render(<LeaderboardTableRow />);

        expect(getByTestId('leaderboard-table-row')).toBeInTheDocument();
    });

    it('renders with an avatar and correct name', () => {
        const { getAllByTestId } = render(<LeaderboardTableRow profile={correctProfileData} />);

        const avatars = getAllByTestId('avatar');
        const usernames = getAllByTestId('username');

        expect(avatars.length).toBe(1);
        expect(usernames.length).toBe(1);
        expect(usernames[0].textContent).toBe(correctProfileData.user.username);
    });

    it('renders with correct `points` & `goal` values', () => {
        const { getByTestId } = render(<LeaderboardTableRow profile={correctProfileData} />);

        const progressCell = getByTestId('progress-cell');

        const expectedProgressText = `${correctProfileData.points}/${correctProfileData.goal}`
        expect(progressCell.textContent).toBe(expectedProgressText)
    });

    it('renders with correct number of badges', () => {
        const { getAllByTestId } = render(<LeaderboardTableRow profile={correctProfileData} />);

        const avatars = getAllByTestId('avatar');
        const badges = getAllByTestId('leaderboard-badge');

        expect(avatars.length).toBe(1);
        expect(badges.length).toBe(correctProfileData.badges.length);
    });

    it('renders without `user` data', () => {
        const profileWithoutUserData = {...correctProfileData};

        delete profileWithoutUserData.user;

        const { getByTestId } = render(<LeaderboardTableRow profile={profileWithoutUserData} />);
        const username = getByTestId('username');

        expect(username.textContent).toBe('');
    });

    it('renders without `points` & `goal` data', () => {
        const profileWithoutPointsData = {...correctProfileData};

        delete profileWithoutPointsData.points;
        delete profileWithoutPointsData.goal;

        const { getByTestId } = render(<LeaderboardTableRow profile={profileWithoutPointsData} />);
        const progress = getByTestId('progress-cell');

        const expectedProgress = '0/0';

        expect(progress.textContent).toBe(expectedProgress);
    });

    it('renders without `badges` data', () => {
        const profileWithoutBadgesData = {...correctProfileData};

        delete profileWithoutBadgesData.badges;

        const { queryAllByTestId } = render(<LeaderboardTableRow profile={profileWithoutBadgesData} />);
        const badges = queryAllByTestId('leaderboard-badge');

        expect(badges.length).toBe(0);
    });
});
