import React from 'react';
import axios from 'axios';
import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useGameProfile } from '../hooks/useGameProfile';
import { gameProfileData } from '../../__mocks__/dashboard';
import { DASHBOARD_URLS } from '../constants';

jest.mock('axios');

describe('Badge API', () => {
  const mockCsrfToken = 'test-csrf-token';
  const mockHeaders = {
    'Content-Type': 'application/json',
    'X-CSRFToken': mockCsrfToken,
  };

  const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });

  const renderUseGameProfile = () => {
    const testQueryClient = createTestQueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    );

    return renderHook(() => useGameProfile(), { wrapper });
  };

  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: `csrftoken=${mockCsrfToken}`,
    });

    axios.get.mockImplementation(() => Promise.resolve({
      data: {},
      config: {
        headers: mockHeaders,
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('useGameProfile', () => {
    it('should fetch game profile data successfully', async () => {
      const mockResponse = { data: gameProfileData };
      axios.get.mockResolvedValueOnce(mockResponse);

      const { result, waitForNextUpdate } = renderUseGameProfile();

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      await waitForNextUpdate();

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual({
        statusItems: expect.any(Array),
        badgeItems: expect.any(Array),
        statusRoadmap: expect.any(Object),
        progress: expect.any(Object),
        chart: expect.any(Object),
        avatarSets: expect.any(Array),
        gammaUserInfo: expect.any(Object),
      });

      expect(axios.get).toHaveBeenCalledWith(DASHBOARD_URLS.getGameProfile);
    });
  });
});
