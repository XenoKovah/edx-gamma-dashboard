import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../../setupTests';
import PointsDistributionChart from '../PointsDistributionChart';
import { gameProfileData } from '../../../../fixtures/dashboard';

afterEach(cleanup);

const CHART_TITLE = 'Points Distribution';
const CHART_DESCRIPTION = 'Here you can see what actions caused your current points portfolio';

describe('<PointsDistributionChart>', () => {
  it('renders', () => {
    const data = gameProfileData.chart;
    const { getByText } = renderWithProviders(<PointsDistributionChart data={data} />);

    const title = getByText(CHART_TITLE);
    const description = getByText(CHART_DESCRIPTION);
    const lowestValue = getByText('5.6%');
    const highestValue = getByText('53.3%');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(lowestValue).toBeInTheDocument();
    expect(highestValue).toBeInTheDocument();
  });

  it('renders without data', () => {
    const { getByText } = renderWithProviders(<PointsDistributionChart />);
    const title = getByText(CHART_TITLE);
    const description = getByText(CHART_DESCRIPTION);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
