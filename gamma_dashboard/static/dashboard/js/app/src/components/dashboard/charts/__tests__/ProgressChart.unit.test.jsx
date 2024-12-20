import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';

import ProgressChart from '../ProgressChart';

import { gameProfileData } from '../../../../fixtures/dashboard';

afterEach(cleanup);

const CHART_TITLE = 'Progress Tracker';
const CHART_DESCRIPTION = 'See the dynamics of your activities and points acquisition through time';

describe('<ProgressChart>', () => {
  it('renders', () => {
    const data = gameProfileData.progress;
    const { getByText } = render(<ProgressChart data={data} />);

    const title = getByText(CHART_TITLE);
    const description = getByText(CHART_DESCRIPTION);
    const firstMonth = getByText('24. Jun');
    const lastMonth = getByText('8. Jul');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(firstMonth).toBeInTheDocument();
    expect(lastMonth).toBeInTheDocument();
  });

  it('renders without data', () => {
    const { getByText } = render(<ProgressChart />);

    const title = getByText(CHART_TITLE);
    const description = getByText(CHART_DESCRIPTION);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
