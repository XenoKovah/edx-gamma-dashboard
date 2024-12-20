import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import DashboardTableRowBlock, {
  CORNER_TOP_LEFT,
  CORNER_TOP_RIGHT,
  CORNER_BOTTOM,
} from '../DashboardTableRowBlock';

afterEach(cleanup);

describe('<DashboardTableRowBlock>', () => {
  it('renders component', () => {
    const { getByTestId } = render(<DashboardTableRowBlock />);

    const tableRowBlock = getByTestId('dashboard-table-row-block');
    expect(tableRowBlock).toBeInTheDocument();
    expect(tableRowBlock).not.toHaveClass('full-width');
  });

  it('renders with correct children', () => {
    const { getByTestId } = render(
      <DashboardTableRowBlock>
        <div data-testid="test-child" />
      </DashboardTableRowBlock>,
    );

    const tableRowBlock = getByTestId('dashboard-table-row-block');
    expect(tableRowBlock).toBeInTheDocument();

    const testChild = getByTestId('test-child');
    expect(testChild).toBeInTheDocument();
  });

  it('renders in full width', () => {
    const { getByTestId } = render(<DashboardTableRowBlock fullWidth />);

    const tableRowBlock = getByTestId('dashboard-table-row-block');
    expect(tableRowBlock).toBeInTheDocument();
    expect(tableRowBlock).toHaveClass('full-width');
  });

  it.each`
        corner
        ${CORNER_TOP_LEFT}
        ${CORNER_TOP_RIGHT}
        ${CORNER_BOTTOM}
    `('renders with corner value `$corner`', ({ corner }) => {
    const { getByTestId } = render(<DashboardTableRowBlock corner={corner} />);

    const tableRowBlock = getByTestId('dashboard-table-row-block');
    expect(tableRowBlock).toBeInTheDocument();
    expect(tableRowBlock).toHaveClass(corner);
  });

  it('renders empty cornerClass if a corner is "none"', () => {
    const corner = 'none';
    const { getByTestId } = render(<DashboardTableRowBlock corner={corner} />);

    const tableRowBlock = getByTestId('dashboard-table-row-block');
    expect(tableRowBlock).toBeInTheDocument();
    expect(tableRowBlock).toHaveClass(corner);
  });
});
