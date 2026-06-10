import React from 'react';
import { screen, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../../setupTests';
import { gameProfileData } from '../../../__mocks__/dashboard';
import messages from '../../../i18n';
import { PointsDistributionChart } from '../points-distribution-chart';

jest.mock('echarts-for-react', () => jest.fn((props) => (
  <div
    data-testid="echarts-instance"
    data-options={props.option ? JSON.stringify(props.option) : null}
  />
)));

afterEach(cleanup);

describe('PointsDistributionChart', () => {
  const data = gameProfileData.chart;
  const CHART_TITLE = `{header|${ messages.performancePointsDistributionSectionHeadingText.defaultMessage}}`;
  const CHART_DESCRIPTION = messages.performancePointsDistributionSectionDescriptionText.defaultMessage;

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 600,
    });
  });

  it('renders without data', () => {
    renderWithProviders(<PointsDistributionChart />);
    const chartElement = screen.getByTestId('echarts-instance');
    const options = JSON.parse(chartElement.getAttribute('data-options'));

    expect(chartElement).toBeInTheDocument();
    expect(options.title.text).toBe(CHART_TITLE);
    expect(options.graphic[0].style.text).toBe(CHART_DESCRIPTION);
    expect(options.series).toBeDefined();
  });

  it('renders with the correct options', () => {
    renderWithProviders(<PointsDistributionChart data={data} />);

    const chartElement = screen.getByTestId('echarts-instance');
    const options = JSON.parse(chartElement.getAttribute('data-options'));

    expect(chartElement).toBeInTheDocument();
    expect(options.title.text).toBe(CHART_TITLE);
    expect(options.graphic[0].style.text).toBe(CHART_DESCRIPTION);
    expect(options.series).toBeDefined();
  });

  it('shows both the percentage and the raw points total in the tooltip', () => {
    renderWithProviders(<PointsDistributionChart data={data} />);

    const options = JSON.parse(screen.getByTestId('echarts-instance').getAttribute('data-options'));

    // {d} renders the percent share, {c} the slice value (the points total).
    expect(options.tooltip.formatter).toContain('{d}%');
    expect(options.tooltip.formatter).toContain(
      `${messages.performancePointsItemPointsLabel.defaultMessage}: <strong>{c}</strong>`,
    );
  });

  it('updates chartWidth on window resize', () => {
    const { container } = renderWithProviders(
      <div style={{ width: '600px' }}>
        <PointsDistributionChart data={data} />
      </div>,
    );

    const initialWidth = container.firstChild.offsetWidth;
    expect(initialWidth).toBe(600);

    act(() => {
      Object.defineProperty(container.firstChild, 'offsetWidth', { value: 800 });
      window.dispatchEvent(new Event('resize'));
    });

    expect(container.firstChild.offsetWidth).toBe(800);
  });
});
