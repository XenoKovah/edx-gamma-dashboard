import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../../setupTests';
import { gameProfileData } from '../../../../__mocks__/dashboard';
import messages from '../../../../i18n/en';
import { PointsDistributionChart } from '../points-distribution-chart';

afterEach(cleanup);

const CHART_TITLE = messages['performance.points.distribution.section.heading.text'].defaultMessage;
const CHART_DESCRIPTION = messages['performance.points.distribution.section.description.text'].defaultMessage;

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
