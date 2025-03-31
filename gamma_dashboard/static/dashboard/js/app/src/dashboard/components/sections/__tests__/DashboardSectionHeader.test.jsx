import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../../../setupTests';
import DashboardSectionHeader from '../DashboardSectionHeader';

describe('<DashboardSectionHeader />', () => {
  const title = 'Section Title';
  const status = 'In Progress';
  const description = 'This is a section description.';

  afterEach(cleanup);

  it('renders title, status, and description when provided', () => {
    const { getByTestId } = renderWithProviders(
      <DashboardSectionHeader title={title} status={status} description={description} />,
    );

    expect(getByTestId('dashboard-section-header')).toBeInTheDocument();
    expect(getByTestId('dashboard-section-header-title')).toHaveTextContent(title);
    expect(getByTestId('dashboard-section-header-status')).toHaveTextContent(status);
    expect(getByTestId('dashboard-section-header-description')).toHaveTextContent(description);
  });

  it('does not render description if not provided', () => {
    const { queryByTestId } = renderWithProviders(
      <DashboardSectionHeader title={title} status={status} />,
    );

    expect(queryByTestId('dashboard-section-header-description')).not.toBeInTheDocument();
  });
});
