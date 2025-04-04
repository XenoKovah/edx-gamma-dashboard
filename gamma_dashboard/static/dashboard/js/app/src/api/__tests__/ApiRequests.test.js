import 'regenerator-runtime';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { gammaApi } from '..';

const correctProfilesData = {
  gameprofiles: [
    {
      username: 'Bi-Han',
      user_uid: 'Bi-Han',
      badges: [
        'https://badge.one.url/',
      ],
      points: 30,
    },
    {
      username: 'Kuai Liang',
      user_uid: 'Kuai Liang',
      badges: [
        'https://badge.one.url/',
        'https://badge.two.url/',
        'https://badge.three.url/',
      ],
      points: 50,
    },
  ],
};

describe('ApiRequests', () => {
  describe('leaderboard', () => {
    const flushPromises = () => new Promise(resolve => {
      setTimeout(resolve, 0);
    });

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
      expect(callback).toHaveBeenCalledWith({
        error: 'Request failed with status code Error: No data was found.',
      });
    });

    it('getInfo returns empty data when response.data is falsy', async () => {
      const mock = new MockAdapter(axios);
      const callback = jest.fn();

      const logSpy = jest.spyOn(global.console, 'log');
      mock.onGet().reply(false);
      gammaApi.leaderboard.getInfo(callback);
      await flushPromises();

      expect(logSpy).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith({
        error: 'Request failed with status code false',
      });
    });

    it('getInfo returns valid data under external app', async () => {
      const courseId = 'course-v1:edx+101+101';
      const mock = new MockAdapter(axios);

      const callback = jest.fn();

      mock.onGet().reply(200, correctProfilesData);
      gammaApi.leaderboard.getInfo(callback, courseId);
      await flushPromises();

      expect(callback).toHaveBeenCalledWith(correctProfilesData);
    });
  });
});
