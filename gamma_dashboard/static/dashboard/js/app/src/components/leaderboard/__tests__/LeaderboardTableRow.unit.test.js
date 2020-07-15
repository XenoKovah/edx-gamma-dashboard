import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import LeaderboardTableRow from '../LeadeboardTableRow';


const correctProfileData = {
    username: 'Bi-Han',
    user_uid: 'Bi-Han',
    badges: [
        'https://badge.1.url/',
        'https://badge.2.url/',
        'https://badge.3.url/',
        'https://badge.4.url/',
        'https://badge.5.url/',
        'https://badge.6.url/',
        'https://badge.7.url/',
        'https://badge.8.url/',
        'https://badge.9.url/',
        'https://badge.10.url/',
        'https://badge.11.url/',
        'https://badge.12.url/',
        'https://badge.13.url/',
        'https://badge.14.url/',
        'https://badge.15.url/',
        'https://badge.16.url/',
        'https://badge.17.url/'
    ],
    points: 30
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
        expect(usernames[0].textContent).toBe(correctProfileData.username);
    });

    it('renders with correct `points` value', () => {
        const { getByTestId } = render(<LeaderboardTableRow profile={correctProfileData} />);

        const progressCell = getByTestId('progress-cell');

        const expectedProgressText = `${correctProfileData.points}`
        expect(progressCell.textContent).toBe(expectedProgressText)
    });

    it('renders with correct number of badges', () => {
        const { getAllByTestId } = render(<LeaderboardTableRow profile={correctProfileData} />);

        const badge = getAllByTestId('leaderboard-badge');
        const badgeCounter = getAllByTestId('badge-counter');
        const badgeFullLine = 16; //we need only 16 badges in row
        const counterText = "+" + (correctProfileData.badges.length - badgeFullLine);

        expect(badgeCounter[0].textContent).toBe(counterText);
        expect(badge.length).toBe(badgeFullLine); 
        expect(badgeCounter[0].classList.contains('badge-counter__hide')).toBe(false); //when we have more then 16 bages counter is visible
    });

    it('renders with small number of badges', () => {
        const profileWithoutOneBadge = {...correctProfileData};

        profileWithoutOneBadge.badges.shift();

        const { getAllByTestId } = render(<LeaderboardTableRow profile={profileWithoutOneBadge} />);

        const badgeCounter = getAllByTestId('badge-counter');

        expect(badgeCounter[0].classList.contains('badge-counter__hide')).toBe(true); //when we have less then 16 bages counter is hidden
    });

    it('renders with status', () => {
        const testStatus = 'Test User Status';
        const { getAllByTestId } = render(<LeaderboardTableRow profile={correctProfileData} status={testStatus}/>);

        const userstatuses = getAllByTestId('userstatus');

        expect(userstatuses.length).toBe(1);
        expect(userstatuses[0].textContent).toBe(testStatus);
    });

    it('renders without `username` data but with `user_uid`', () => {
        const profileWithoutUserData = {...correctProfileData};

        delete profileWithoutUserData.username;

        const { getByTestId } = render(<LeaderboardTableRow profile={profileWithoutUserData} />);
        const username = getByTestId('username');

        expect(username.textContent).toBe(correctProfileData.user_uid);
    });

    it('renders without `username` and `user_uid` data', () => {
        const profileWithoutUserData = {...correctProfileData};

        delete profileWithoutUserData.username;
        delete profileWithoutUserData.user_uid;

        const { getByTestId } = render(<LeaderboardTableRow profile={profileWithoutUserData} />);
        const username = getByTestId('username');

        expect(username.textContent).toBe('');
    });

    it('renders without `points` data', () => {
        const profileWithoutPointsData = {...correctProfileData};

        delete profileWithoutPointsData.points;

        const { getByTestId } = render(<LeaderboardTableRow profile={profileWithoutPointsData} />);
        const progress = getByTestId('progress-cell');

        const expectedProgress = '0';

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
