import React from 'react';
import axios from 'axios';
import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';

import { leaderboardData } from '../../__mocks__/leaderboard';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { convertKeysToCamelCase } from '../helpers/utils';
import { LEADERBOARD_URLS } from '../constants';

jest.mock('axios');

const courseId = 'test-course';

describe('Leaderboard API', () => {
  const mockCsrfToken = 'test-csrf-token';

  const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });

  const renderLeaderboardHook = (id) => {
    const testQueryClient = createTestQueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    );

    return renderHook(() => useLeaderboard(id), { wrapper });
  };

  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: `csrftoken=${mockCsrfToken}`,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('useLeaderboard', () => {
    it('should fetch course leaderboard data successfully', async () => {
      const mockResponse = { data: leaderboardData };
      axios.get.mockResolvedValueOnce(mockResponse);

      const { result, waitForNextUpdate } = renderLeaderboardHook(courseId);

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      await waitForNextUpdate();

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(convertKeysToCamelCase(leaderboardData));
      expect(axios.get).toHaveBeenCalledWith(LEADERBOARD_URLS(courseId).getInfo);
    });

    it('should fetch platform leaderboard data successfully', async () => {
      const mockResponse = { data: leaderboardData };
      axios.get.mockResolvedValueOnce(mockResponse);

      const { result, waitForNextUpdate } = renderLeaderboardHook();

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      await waitForNextUpdate();

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(convertKeysToCamelCase(leaderboardData));
      expect(axios.get).toHaveBeenCalledWith(LEADERBOARD_URLS().getInfo);
    });

    it('should handle error responses', async () => {
      axios.get.mockRejectedValueOnce(new Error());

      const { result, waitForNextUpdate } = renderLeaderboardHook(courseId);

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      await waitForNextUpdate();

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeDefined();
      expect(axios.get).toHaveBeenCalledWith(LEADERBOARD_URLS(courseId).getInfo);
    });
  });
});
