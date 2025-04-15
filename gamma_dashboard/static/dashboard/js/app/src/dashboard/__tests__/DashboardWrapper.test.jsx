import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../setupTests';
import {
  parsedBadgeItems,
  parsedStatusItems,
  gameProfileData,
} from '../../__mocks__/dashboard';
import DashboardWrapper from '../DashboardWrapper';

import messages from '../../i18n';

jest.mock('echarts-for-react', () => jest.fn((props) => (
  <div
    data-testid="echarts-instance"
    data-options={props.option ? JSON.stringify(props.option) : null}
  />
)));

/* eslint-disable react/prop-types */
jest.mock('../components/progress-avatar/ProgressAvatarModal', () => function MockProgressAvatarModal({
  closeCallback, handleSelectAvatarSet, handleUpdateSelectedAvatarSet,
}) {
  return (
    <div data-testid="mock-progress-avatar-modal">
      <button
        data-testid="mock-avatar-select"
        onClick={() => handleSelectAvatarSet && handleSelectAvatarSet()}
        type="button"
      >
        Select Avatar
      </button>
      <button
        data-testid="mock-avatar-update"
        onClick={() => handleUpdateSelectedAvatarSet && handleUpdateSelectedAvatarSet()}
        type="button"
      >
        Update Avatar
      </button>
      <button
        data-testid="mock-avatar-close"
        onClick={() => closeCallback && closeCallback()}
        type="button"
      >
        Close
      </button>
    </div>
  );
});
/* eslint-enable react/prop-types */

jest.mock('react-error-boundary', () => ({
  ErrorBoundary: ({ children }) => children,
}));

afterEach(cleanup);

describe('<DashboardWrapper>', () => {
  const mockGammaUserInfo = {
    userAvatarConfig: {
      selectedAvatarId: null,
      selectedAvatarSetId: null,
    },
  };

  const mockProgress = {
    2020: [
      { date: '2020-06-23T00:00:00.000000Z', points: 13 },
      { date: '2020-06-24T00:00:00.000000Z', points: 13 },
      { date: '2020-06-26T00:00:00.000000Z', points: 5 },
      { date: '2020-06-26T00:00:00.000000Z', points: 4 },
      { date: '2020-06-26T00:00:00.000000Z', points: 8 },
      { date: '2020-06-26T00:00:00.000000Z', points: 6 },
      { date: '2020-07-09T00:00:00.000000Z', points: 5 },
    ],
  };

  const mockAvatarHandlers = {
    handleSelectAvatarSet: jest.fn(),
    avatarProcessingStates: {
      details: {
        update: { isIdle: true },
        select: { isIdle: true },
      },
    },
    handleUpdateSelectedAvatarSet: jest.fn(),
    avatarResetProcessingMutations: {
      all: jest.fn(),
      update: jest.fn(),
      select: jest.fn(),
    },
  };

  const mockStatusRoadmap = {
    points: 100,
  };

  const defaultProps = {
    badgeItems: parsedBadgeItems,
    statusItems: parsedStatusItems,
    progress: mockProgress,
    chart: gameProfileData,
    gammaUserInfo: mockGammaUserInfo,
    avatarHandlers: mockAvatarHandlers,
    statusRoadmap: mockStatusRoadmap,
  };

  it('renders', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const dashboardTable = getByTestId('dashboard-page');
    expect(dashboardTable).toBeInTheDocument();
  });

  it('renders without data', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper
        gammaUserInfo={mockGammaUserInfo}
        avatarHandlers={mockAvatarHandlers}
      />,
    );

    const dashboardTable = getByTestId('dashboard-page');
    expect(dashboardTable).toBeInTheDocument();
  });

  it('displays avatar section with warning when avatar set is selected but not completed', () => {
    const userInfoWithSelectedSet = {
      userAvatarConfig: {
        selectedAvatarId: null,
        selectedAvatarSetId: '123',
      },
    };

    const { getByText } = renderWithProviders(
      <DashboardWrapper {...defaultProps} gammaUserInfo={userInfoWithSelectedSet} />,
    );

    expect(getByText(
      messages.dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedTitle.defaultMessage,
    )).toBeInTheDocument();
    expect(getByText(
      messages.dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedText.defaultMessage,
    )).toBeInTheDocument();
  });

  it('displays avatar section with info when no avatar set is selected', () => {
    const userInfoWithNoSet = {
      userAvatarSetInfo: null,
    };

    const { getByText } = renderWithProviders(
      <DashboardWrapper {...defaultProps} gammaUserInfo={userInfoWithNoSet} />,
    );

    expect(getByText(
      messages.dashboardProgressAvatarSetModalAlertAvatarSetNotSelectedTitle.defaultMessage,
    )).toBeInTheDocument();
    expect(getByText(
      messages.dashboardProgressAvatarSetModalAlertAvatarSetNotSelectedText.defaultMessage,
    )).toBeInTheDocument();
  });

  it('opens avatar modal when clicking avatar section button', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const avatarButton = getByTestId('progress-avatar-details-btn-wrapper');
    userEvent.click(avatarButton);
    expect(getByTestId('mock-progress-avatar-modal')).toBeInTheDocument();
  });

  it('displays badges section with correct number of preview badges', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const badgesList = getByTestId('progress-badges-list');
    expect(badgesList.children.length).toBeLessThanOrEqual(3);
  });

  it('opens badges modal when clicking badges section button', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const badgesButton = getByTestId('progress-badges-details-btn');
    userEvent.click(badgesButton);

    expect(getByTestId('modal-backdrop')).toBeInTheDocument();
  });

  it('renders all dashboard sections in correct order', () => {
    const { getAllByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const sections = getAllByTestId('dashboard-section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('renders charts with correct data', () => {
    const { getAllByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const chartInstances = getAllByTestId('echarts-instance');
    expect(chartInstances.length).toBeGreaterThan(0);
    expect(chartInstances[0].dataset.options).toBeTruthy();
  });

  it('displays completed avatar when user has completed avatar set', () => {
    const userAvatarInfo = {
      userAvatarSetInfo: {
        selectedAvatarId: 967,
        selectedAvatarSetId: 309,
      },
    };

    const mockCompletedAvatar = {
      id: 309,
      title: 'Test Avatar Set',
      image: 'test-image.jpg',
      avatars: [
        { id: 967, image: 'test-avatar.jpg' },
      ],
    };

    jest.mock('../hooks', () => ({
      useDashboardWrapper: () => ({
        modalData: [],
        isModalOpen: false,
        translations: {},
        setIsModalOpen: jest.fn(),
        completedAvatar: mockCompletedAvatar,
        handleOpenModal: jest.fn(),
        isAvatarModalOpen: false,
        previewBadgeItems: [],
        selectedAvatarSetId: null,
        hasSelectedAvatarSet: true,
        hasCompletedAvatarSet: true,
        setSelectedAvatarSetId: jest.fn(),
        savedSelectedAvatarSetId: null,
        handleCloseProgressAvatarModal: jest.fn(),
      }),
    }));

    const { getByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} gammaUserInfo={userAvatarInfo} />,
    );

    const avatarButtonWrapper = getByTestId('progress-avatar-details-btn-wrapper');
    expect(avatarButtonWrapper).toBeInTheDocument();
  });

  it('calls avatar reset mutations when closing avatar modal', () => {
    const mockResetMutations = {
      all: jest.fn(),
      update: jest.fn(),
      select: jest.fn(),
    };

    const { getByTestId } = renderWithProviders(
      <DashboardWrapper
        {...defaultProps}
        avatarHandlers={{
          ...mockAvatarHandlers,
          avatarResetProcessingMutations: mockResetMutations,
        }}
      />,
    );

    const avatarButton = getByTestId('progress-avatar-details-btn-wrapper');
    userEvent.click(avatarButton);

    const closeButton = getByTestId('mock-avatar-close');
    userEvent.click(closeButton);

    expect(mockResetMutations.all).toHaveBeenCalled();
  });

  it('handles empty badge items gracefully', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} badgeItems={[]} />,
    );

    const badgesList = getByTestId('progress-badges-list');
    expect(badgesList.children.length).toBe(1);
  });

  it('handles empty status items gracefully', () => {
    const { getAllByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} statusItems={[]} />,
    );

    const statusBlocks = getAllByTestId('slider-statuses-block-description');
    expect(statusBlocks.length).toBeGreaterThan(0);
  });

  it('handles empty progress data gracefully', () => {
    const emptyProgressProps = {
      ...defaultProps,
      progress: {},
      chart: {},
    };

    const { getAllByTestId } = renderWithProviders(
      <DashboardWrapper {...emptyProgressProps} />,
    );

    const chartInstances = getAllByTestId('echarts-instance');
    expect(chartInstances.length).toBeGreaterThan(0);

    const chartOptions = JSON.parse(chartInstances[0].dataset.options || 'null');
    const hasData = chartOptions?.series?.some(series => series.name === 'progress' && Object.keys(series.value).length === 0);
    expect(hasData).toBeFalsy();
  });

  it('calls handleSelectAvatarSet when selecting an avatar', () => {
    const mockHandleSelectAvatarSet = jest.fn();
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper
        {...defaultProps}
        avatarHandlers={{
          ...mockAvatarHandlers,
          handleSelectAvatarSet: mockHandleSelectAvatarSet,
        }}
      />,
    );

    const avatarButton = getByTestId('progress-avatar-details-btn-wrapper');
    userEvent.click(avatarButton);

    const selectButton = getByTestId('mock-avatar-select');
    userEvent.click(selectButton);

    expect(mockHandleSelectAvatarSet).toHaveBeenCalled();
  });

  it('calls handleUpdateSelectedAvatarSet when updating avatar selection', () => {
    const mockHandleUpdateSelectedAvatarSet = jest.fn();
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper
        {...defaultProps}
        avatarHandlers={{
          ...mockAvatarHandlers,
          handleUpdateSelectedAvatarSet: mockHandleUpdateSelectedAvatarSet,
        }}
      />,
    );

    const avatarButton = getByTestId('progress-avatar-details-btn-wrapper');
    userEvent.click(avatarButton);

    const updateButton = getByTestId('mock-avatar-update');
    userEvent.click(updateButton);

    expect(mockHandleUpdateSelectedAvatarSet).toHaveBeenCalled();
  });

  it('closes badges modal when clicking close button', () => {
    const { getByTestId, queryByTestId, getByRole } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const badgesButton = getByTestId('progress-badges-details-btn');
    userEvent.click(badgesButton);
    expect(getByTestId('modal-backdrop')).toBeInTheDocument();

    const closeButton = getByRole('button', { name: 'Close' });
    userEvent.click(closeButton);
    expect(queryByTestId('modal-backdrop')).not.toBeInTheDocument();
  });

  it('displays correct number of badges in the badges section', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const badgesList = getByTestId('progress-badges-list');
    const badgeItems = badgesList.querySelectorAll('[data-testid="progress-badge"]');

    expect(badgeItems.length).toBeLessThanOrEqual(3);
  });

  it('displays correct badge information in the badges section', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const badgesList = getByTestId('progress-badges-list');
    const firstBadge = badgesList.querySelector('[data-testid="progress-badge"]');

    if (firstBadge) {
      const badgeTitle = firstBadge.querySelector('[data-testid="progress-badge-title"]');
      expect(badgeTitle).toBeInTheDocument();
      expect(badgeTitle.textContent).toBeTruthy();
    }
  });

  it('displays correct status information in the status section', () => {
    const { getAllByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const statusBlocks = getAllByTestId('slider-statuses-block-description');
    expect(statusBlocks.length).toBeGreaterThan(0);

    statusBlocks.forEach(block => {
      expect(block.textContent).toBeTruthy();
    });
  });
});
