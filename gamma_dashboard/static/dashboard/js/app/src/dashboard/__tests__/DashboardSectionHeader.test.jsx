import React from 'react';

import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
import pretty from 'pretty';

import { DashboardSectionHeader } from '../components/sections';

afterEach(cleanup);

describe('<DashboardSectionHeader>', () => {
  it('renders', () => {
    const title = 'Test title';
    const status = 'Test status';
    const description = 'Test description';

    const { getByText, container } = render(
      <DashboardSectionHeader
        title={title}
        status={status}
        description={description}
      />,
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(status)).toBeInTheDocument();
    expect(getByText(description)).toBeInTheDocument();
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it('renders without data', () => {
    const { queryByTestId } = render(<DashboardSectionHeader status="" title="" description="" />);

    expect(queryByTestId('dashboard-section-header-title')).not.toBeInTheDocument();
    expect(queryByTestId('dashboard-section-header-status')).not.toBeInTheDocument();
    expect(queryByTestId('dashboard-section-header-description')).not.toBeInTheDocument();
  });
});
