import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../../setupTests';
import { gameProfileData } from '../../../../__mocks__/dashboard';
import messages from '../../../../i18n/en';
import { ProgressChart } from '../progress-chart';

afterEach(cleanup);

const CHART_TITLE = messages['performance.progress.tracker.section.heading.text'].defaultMessage;
const CHART_DESCRIPTION = messages['performance.progress.tracker.section.description.text'].defaultMessage;

describe('<ProgressChart>', () => {
  it('renders', () => {
    const data = gameProfileData.progress;
    const { getByText } = renderWithProviders(<ProgressChart data={data} />);

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
    const { getByText } = renderWithProviders(<ProgressChart />);

    const title = getByText(CHART_TITLE);
    const description = getByText(CHART_DESCRIPTION);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
