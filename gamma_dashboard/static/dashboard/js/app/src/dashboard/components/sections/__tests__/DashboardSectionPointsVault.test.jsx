import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../../../setupTests';
import DashboardSectionPointsVault from '../DashboardSectionPointsVault';
import messages from '../../../../i18n';

const POINTS_VALUE = 150;

describe('<DashboardSectionPointsVault />', () => {
  afterEach(cleanup);

  it('renders the component with correct title and description', () => {
    const { getByText } = renderWithProviders(
      <DashboardSectionPointsVault points={POINTS_VALUE} />,
    );

    expect(getByText(messages.dashboardPointsVaultSectionTitle.defaultMessage)).toBeInTheDocument();
    expect(getByText(messages.dashboardPointsVaultSectionDescription.defaultMessage)).toBeInTheDocument();
  });

  it('displays the correct points value', () => {
    const { getByText } = renderWithProviders(
      <DashboardSectionPointsVault points={POINTS_VALUE} />,
    );
    expect(getByText(POINTS_VALUE)).toBeInTheDocument();
  });

  it('renders the vault icon', () => {
    const { container } = renderWithProviders(
      <DashboardSectionPointsVault points={POINTS_VALUE} />,
    );

    const svg = container.querySelector('.points-vault-img');
    expect(svg).toBeInTheDocument();
    expect(svg.querySelector('use')).toHaveAttribute('href', expect.stringContaining('vault-icon'));
  });

  it('applies correct CSS classes', () => {
    const { container } = renderWithProviders(
      <DashboardSectionPointsVault points={POINTS_VALUE} />,
    );

    expect(container.querySelector('.block-description')).toBeInTheDocument();
    expect(container.querySelector('.points-vault-total')).toBeInTheDocument();
    expect(container.querySelector('.text-center')).toBeInTheDocument();
  });
});
