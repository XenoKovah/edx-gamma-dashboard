import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import LeaderboardTableRow from '../LeadeboardTableRow';


const correctProfileData = {
    username: 'Bi-Han',
    user_uid: 'Bi-Han',
    badges: {
        'badge.1': {'url': 'https://badge.1.url/'},
        'badge.2': {'url': 'https://badge.2.url/'},
        'badge.3': {'url': 'https://badge.3.url/'},
        'badge.4': {'url': 'https://badge.4.url/'},
        'badge.5': {'url': 'https://badge.5.url/'},
        'badge.6': {'url': 'https://badge.6.url/'},
        'badge.7': {'url': 'https://badge.7.url/'},
        'badge.8': {'url': 'https://badge.8.url/'},
        'badge.9': {'url': 'https://badge.9.url/'},
        'badge.10': {'url': 'https://badge.10.url/'},
        'badge.11': {'url': 'https://badge.11.url/'},
        'badge.12': {'url': 'https://badge.12.url/'},
        'badge.13': {'url': 'https://badge.13.url/'},
        'badge.14': {'url': 'https://badge.14.url/'},
        'badge.15': {'url': 'https://badge.15.url/'},
        'badge.16': {'url': 'https://badge.16.url/'},
        'badge.17': {'url': 'https://badge.17.url/'}
    },
    points: 30
};

afterAll(cleanup);


const BADGES_IN_FULL_LINE_COUNT = 16;
const BADGES_IN_LINE_COUNT = 13;



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

    it(`renders with correct number of badges if there are more then ${BADGES_IN_FULL_LINE_COUNT} badges`, () => {
        const { getAllByTestId, getByTestId } = render(<LeaderboardTableRow profile={correctProfileData} />);

        const badges = getAllByTestId('leaderboard-badge');
        const badgeCounter = getByTestId('badge-counter');
        const counterText = `+${Object.keys(correctProfileData.badges).length - BADGES_IN_FULL_LINE_COUNT}`;

        expect(badges.length).toBe(BADGES_IN_FULL_LINE_COUNT);

        expect(badgeCounter).toBeInTheDocument();
        expect(badgeCounter).toHaveTextContent(counterText);
    });

    it(`renders without counter with less then ${BADGES_IN_FULL_LINE_COUNT} badges`, () => {
        const profileWithoutSomeBadges = {...correctProfileData};
        let badgesList = Object.entries(profileWithoutSomeBadges.badges); // convert object to list

        const extraBadgesCount = badgesList.length - BADGES_IN_FULL_LINE_COUNT;
        if (extraBadgesCount > 0) {
            badgesList.splice(0, extraBadgesCount);
            profileWithoutSomeBadges.badges = Object.assign({}, ...badgesList.map(([k, v]) => ({[k]: v}))); // convert list to object
        }

        const { queryByTestId } = render(<LeaderboardTableRow profile={profileWithoutSomeBadges} />);

        const badgeCounter = queryByTestId('badge-counter');

        expect(badgeCounter).not.toBeInTheDocument();
    });

    it(`renders with correct badges cell styles when there are more then ${BADGES_IN_LINE_COUNT} badges`, () => {
        const { getByTestId } = render(<LeaderboardTableRow profile={correctProfileData} />);

        const badgesCell = getByTestId('badges-cell');

        expect(badgesCell).toHaveClass('badges-full');
    });

    it(`renders with correct badges cell styles when there are less then ${BADGES_IN_LINE_COUNT + 1} badges`, () => {
        const profileWithoutSomeBadges = {...correctProfileData};
        let badgesList = Object.entries(profileWithoutSomeBadges.badges); // convert object to list

        const extraBadgesCount = badgesList.length - BADGES_IN_LINE_COUNT + 1;
        if (extraBadgesCount > 0) {
            badgesList.splice(0, extraBadgesCount);
            profileWithoutSomeBadges.badges = Object.assign({}, ...badgesList.map(([k, v]) => ({[k]: v}))); // convert list to object
        }

        const { getByTestId } = render(<LeaderboardTableRow profile={profileWithoutSomeBadges} />);

        const badgesCell = getByTestId('badges-cell');

        expect(badgesCell).not.toHaveClass('badges-full');
    });

    it('renders with status', () => {
        const testStatus = 'Test User Status';
        const { getByTestId } = render(<LeaderboardTableRow profile={correctProfileData} status={testStatus}/>);

        const userStatus = getByTestId('userstatus');

        expect(userStatus).toBeInTheDocument();
        expect(userStatus).toHaveTextContent(testStatus);
    });

    it('renders without `username` data but with `user_uid`', () => {
        const profileWithoutUserData = {...correctProfileData};

        delete profileWithoutUserData.username;

        const { getByTestId } = render(<LeaderboardTableRow profile={profileWithoutUserData} />);
        const username = getByTestId('username');

        expect(username).toHaveTextContent(correctProfileData.user_uid);
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
