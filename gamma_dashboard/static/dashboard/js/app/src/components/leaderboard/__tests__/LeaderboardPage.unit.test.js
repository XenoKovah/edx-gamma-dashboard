import React from 'react';

import axios from 'axios';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

import LeaderboardPage from '../LeaderboardPage';
import DataLeaderboardPage from './__mock__/DataLeaderboardPage.json';


jest.mock('axios');
afterAll(cleanup);

describe('<LeaderboardPage>', () => {
    it.each(DataLeaderboardPage)
    ('renders', async ({ state }) => {
        axios.get.mockResolvedValue({
            data: {
                top10: state.top10,
                competitors: state.competitors,
                rank: state.rank,
                user_uid: state.user_uid,
                systemStatuses: state.systemStatuses
            }
        });

        let component;

        await act(async () => 
            component = renderer.create(<LeaderboardPage />)
        );

        const tree = component.toJSON();

        expect(axios.get).toBeCalled();
        expect(axios.get.mock.calls[0][0]).toBe('/gamma_dashboard/api/v0/leaderboard/');
        expect(tree).toMatchSnapshot();
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
        ${{profiles: null}}
        ${{profiles: []}}
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

describe('getLeaderboardTableProps', () => {
    it.each(DataLeaderboardPage)(
    'should return the correct props for given parameters', ({ state, expectedProps }) => {
        const result = LeaderboardPage.prototype.getLeaderboardTableProps(state);

        expect(result).toEqual(expectedProps);
    });
});
