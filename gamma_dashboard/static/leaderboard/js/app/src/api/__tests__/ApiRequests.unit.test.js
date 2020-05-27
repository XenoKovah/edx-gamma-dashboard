import 'regenerator-runtime';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import gammaApi from '../ApiRequests';


const correctProfilesData = {
    gameprofiles: [
        {
            username: 'Bi-Han',
            user_uid: 'Bi-Han',
            badges: [
                'https://badge.one.url/',
            ],
            points: 30
        },
        {
            username: 'Kuai Liang',
            user_uid: 'Kuai Liang',
            badges: [
                'https://badge.one.url/',
                'https://badge.two.url/',
                'https://badge.three.url/',
            ],
            points: 50
        }
    ]
};


describe('ApiRequests', () => {
    describe('leaderboard', () => {
        const flushPromises = () => new Promise(setImmediate);

        it('getInfo returns valid data', async () => {
            const mock = new MockAdapter(axios);

            const callback = jest.fn();

            mock.onGet().reply(200, correctProfilesData);
            gammaApi.leaderboard.getInfo(callback);
            await flushPromises();

            expect(callback).toHaveBeenCalledWith(correctProfilesData);
        });

        it('getInfo returns empty data on error', async () => {
            const mock = new MockAdapter(axios);
            const callback = jest.fn();

            const logSpy = jest.spyOn(global.console, 'log');
            mock.onGet().reply(new Error('No data was found.'));

            gammaApi.leaderboard.getInfo(callback);
            await flushPromises();

            expect(logSpy).toHaveBeenCalled();
            expect(callback).toHaveBeenCalledWith({});
        });
    });
});
