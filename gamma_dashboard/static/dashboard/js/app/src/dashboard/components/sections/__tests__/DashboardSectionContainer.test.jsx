import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../../../setupTests';
import DashboardSectionContainer from '../DashboardSectionContainer';

describe('<DashboardSectionContainer />', () => {
  afterEach(cleanup);

  it('renders children inside the container', () => {
    const { getByText } = renderWithProviders(
      <DashboardSectionContainer>
        <p>Test content</p>
      </DashboardSectionContainer>,
    );
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('has the correct class and data-testid', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardSectionContainer>
        <div>Check class</div>
      </DashboardSectionContainer>,
    );
    const container = getByTestId('dashboard-section-container');

    expect(container).toHaveClass('dashboard-section-container');
    expect(container).toBeInTheDocument();
  });
});
