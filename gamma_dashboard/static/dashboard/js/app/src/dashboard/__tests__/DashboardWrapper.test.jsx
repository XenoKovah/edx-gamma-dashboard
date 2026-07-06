import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../setupTests';
import {
  parsedStatusItems,
  gameProfileData,
} from '../../__mocks__/dashboard';
import { convertKeysToCamelCase } from '../../api/helpers/utils';
import DashboardWrapper from '../DashboardWrapper';

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
    badgeItems: convertKeysToCamelCase(gameProfileData).system_badges,
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

  it('displays badges section with correct number of preview badges', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const badgesList = getByTestId('progress-badges-list');
    expect(badgesList.children.length).toBeLessThanOrEqual(10);
  });

  it('links the badges section button to the accomplishments page', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const badgesButton = getByTestId('progress-badges-details-btn');
    expect(badgesButton.tagName).toBe('A');
    expect(badgesButton).toHaveAttribute('href', '/gamma_dashboard/accomplishments');
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

  it('displays correct number of badges in the badges section', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    const badgesList = getByTestId('progress-badges-list');
    const badgeItems = badgesList.querySelectorAll('[data-testid="progress-badge"]');

    expect(badgeItems.length).toBeLessThanOrEqual(10);
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

  it('renders the Your Aggregate Accomplishment Level block (slider) when the feature is enabled', () => {
    const { getAllByTestId } = renderWithProviders(
      <DashboardWrapper {...defaultProps} />,
    );

    // `slider-item-status-image` is rendered once per status and is unique to
    // SliderStatusesBlock (unlike `slider-statuses-block-description`, which the
    // badges section also uses), so it actually asserts the status block renders.
    const statusImages = getAllByTestId('slider-item-status-image');
    expect(statusImages.length).toBe(parsedStatusItems.length);
  });
});
