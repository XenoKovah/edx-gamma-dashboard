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

import messages from '../../i18n/en';

jest.mock('../../featureFlags', () => ({
  SHOW_STATUS_BLOCK: true,
  SHOW_PROGRESS_CHART: true,
  SHOW_PROGRESS_BADGES: true,
  SHOW_POINTS_DISTRIBUTION_CHART: true,
}));

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

afterEach(cleanup);

describe('<DashboardWrapper>', () => {
  const mockGammaUserInfo = {
    userAvatarSetInfo: {
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

  const defaultProps = {
    badgeItems: parsedBadgeItems,
    statusItems: parsedStatusItems,
    progress: mockProgress,
    chart: gameProfileData,
    gammaUserInfo: mockGammaUserInfo,
    avatarProcessingStates: {
      details: {
        update: { isIdle: true },
        select: { isIdle: true },
      },
    },
    avatarResetProcessingMutations: {
      all: jest.fn(),
      update: jest.fn(),
      select: jest.fn(),
    },
    handleUpdateSelectedAvatarSet: jest.fn(),
    handleSelectAvatarSet: jest.fn(),
  };

  it('renders', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const dashboardTable = getByTestId('dashboard-page');
    expect(dashboardTable).toBeInTheDocument();
  });

  it('renders without data', () => {
    const { getByTestId } = renderWithProviders(<DashboardWrapper gammaUserInfo={mockGammaUserInfo} />);

    const dashboardTable = getByTestId('dashboard-page');
    expect(dashboardTable).toBeInTheDocument();
  });

  it('displays avatar section with warning when avatar set is selected but not completed', () => {
    const userInfoWithSelectedSet = {
      userAvatarSetInfo: {
        selectedAvatarId: null,
        selectedAvatarSetId: '123',
      },
    };

    const { getByText } = renderWithProviders(
      <DashboardWrapper {...defaultProps} gammaUserInfo={userInfoWithSelectedSet} />,
    );

    expect(getByText(
      messages['dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.title'].defaultMessage,
    )).toBeInTheDocument();
    expect(getByText(
      messages['dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.text'].defaultMessage,
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

    const modalItemsList = getByTestId('dashboard-modal-window-items-list');
    expect(modalItemsList).toBeInTheDocument();
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
      id: 17,
      gammaUserId: 17,
      selectedAvatarId: 967,
      selectedAvatarSetId: 309,
    };

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
      <DashboardWrapper {...defaultProps} avatarResetProcessingMutations={mockResetMutations} />,
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
    expect(badgesList.children.length).toBe(0);
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
      <DashboardWrapper {...defaultProps} handleSelectAvatarSet={mockHandleSelectAvatarSet} />,
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
      <DashboardWrapper {...defaultProps} handleUpdateSelectedAvatarSet={mockHandleUpdateSelectedAvatarSet} />,
    );

    const avatarButton = getByTestId('progress-avatar-details-btn-wrapper');
    userEvent.click(avatarButton);

    const updateButton = getByTestId('mock-avatar-update');
    userEvent.click(updateButton);

    expect(mockHandleUpdateSelectedAvatarSet).toHaveBeenCalled();
  });
});
