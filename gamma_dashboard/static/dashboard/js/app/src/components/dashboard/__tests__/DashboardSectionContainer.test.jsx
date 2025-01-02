import React from 'react';

import '@testing-library/jest-dom';
import { render, within, cleanup } from '@testing-library/react';

import { DashboardSectionContainer } from '../components/sections';

afterEach(cleanup);

describe('<DashboardSectionContainer>', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <DashboardSectionContainer>
        <div data-testid="test-items" />
      </DashboardSectionContainer>,
    );

    const tableRow = getByTestId('dashboard-section-container');
    const testItems = getByTestId('test-items');

    expect(tableRow).toBeInTheDocument();
    expect(testItems).toBeInTheDocument();
  });

  it('renders with children', () => {
    const { getByTestId } = render(
      <DashboardSectionContainer>
        <div data-testid="test-child" />
      </DashboardSectionContainer>,
    );

    const dashboardTableRow = getByTestId('dashboard-section-container');
    const child = within(dashboardTableRow).getByTestId('test-child');

    expect(child).toBeInTheDocument();
  });

  it('renders without children', () => {
    const { getByTestId } = render(<DashboardSectionContainer />);

    const tableRow = getByTestId('dashboard-section-container');

    expect(tableRow).toBeInTheDocument();
  });
});
