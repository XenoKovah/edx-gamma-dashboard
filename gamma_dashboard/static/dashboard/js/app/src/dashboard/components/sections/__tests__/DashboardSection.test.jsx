import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../../../setupTests';
import {
  CORNER_TOP_LEFT,
  CORNER_BOTTOM_RIGHT,
  CORNER_NONE,
} from '../../constants';
import DashboardSection from '../DashboardSection';

describe('<DashboardSection />', () => {
  afterEach(cleanup);

  it('renders children inside the section', () => {
    const { getByText } = renderWithProviders(
      <DashboardSection>
        <p>Test Content</p>
      </DashboardSection>,
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the default corner class if none provided', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardSection>
        <div>Content</div>
      </DashboardSection>,
    );
    expect(getByTestId('dashboard-section')).toHaveClass(CORNER_NONE);
  });

  it('applies a custom corner class if provided', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardSection corner={CORNER_TOP_LEFT}>
        <div>Content</div>
      </DashboardSection>,
    );
    expect(getByTestId('dashboard-section')).toHaveClass(CORNER_TOP_LEFT);
  });

  it('applies full-width class when fullWidth is true', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardSection fullWidth>
        <div>Full Width Section</div>
      </DashboardSection>,
    );
    expect(getByTestId('dashboard-section')).toHaveClass('full-width');
  });

  it('applies both fullWidth and custom corner classes', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardSection fullWidth corner={CORNER_BOTTOM_RIGHT}>
        <div>Combo Class</div>
      </DashboardSection>,
    );
    const section = getByTestId('dashboard-section');
    expect(section).toHaveClass('full-width');
    expect(section).toHaveClass(CORNER_BOTTOM_RIGHT);
  });
});
