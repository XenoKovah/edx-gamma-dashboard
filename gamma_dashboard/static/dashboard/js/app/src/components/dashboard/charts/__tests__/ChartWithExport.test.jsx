import React from 'react';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

import { renderWithProviders } from '../../../../setupTests';
import { ChartWithExport } from '../chart-with-export';

afterEach(cleanup);

describe('<ChartWithExport>', () => {
  it('renders', () => {
    const { getByText } = renderWithProviders(<ChartWithExport options={{}} />);

    expect(getByText(/chart title/i)).toBeInTheDocument();
  });
});
