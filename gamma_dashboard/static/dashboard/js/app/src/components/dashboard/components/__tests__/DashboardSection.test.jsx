import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import { DashboardSection } from '../sections';
import { CORNER_BOTTOM, CORNER_TOP_LEFT, CORNER_TOP_RIGHT } from '../constants';

afterEach(cleanup);

describe('<DashboardSection>', () => {
  it('renders component', () => {
    const { getByTestId } = render(<DashboardSection />);

    const tableRowBlock = getByTestId('dashboard-section');
    expect(tableRowBlock).toBeInTheDocument();
    expect(tableRowBlock).not.toHaveClass('full-width');
  });

  it('renders with correct children', () => {
    const { getByTestId } = render(
      <DashboardSection>
        <div data-testid="test-child" />
      </DashboardSection>,
    );

    const tableRowBlock = getByTestId('dashboard-section');
    expect(tableRowBlock).toBeInTheDocument();

    const testChild = getByTestId('test-child');
    expect(testChild).toBeInTheDocument();
  });

  it('renders in full width', () => {
    const { getByTestId } = render(<DashboardSection fullWidth />);

    const tableRowBlock = getByTestId('dashboard-section');
    expect(tableRowBlock).toBeInTheDocument();
    expect(tableRowBlock).toHaveClass('full-width');
  });

  it.each`
        corner
        ${CORNER_TOP_LEFT}
        ${CORNER_TOP_RIGHT}
        ${CORNER_BOTTOM}
    `('renders with corner value `$corner`', ({ corner }) => {
    const { getByTestId } = render(<DashboardSection corner={corner} />);

    const tableRowBlock = getByTestId('dashboard-section');
    expect(tableRowBlock).toBeInTheDocument();
    expect(tableRowBlock).toHaveClass(corner);
  });

  it('renders empty cornerClass if a corner is "none"', () => {
    const corner = 'none';
    const { getByTestId } = render(<DashboardSection corner={corner} />);

    const tableRowBlock = getByTestId('dashboard-section');
    expect(tableRowBlock).toBeInTheDocument();
    expect(tableRowBlock).toHaveClass(corner);
  });
});
