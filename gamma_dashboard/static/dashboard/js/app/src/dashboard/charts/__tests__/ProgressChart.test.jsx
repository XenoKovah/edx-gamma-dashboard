import React from 'react';
import { screen, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../../setupTests';
import { gameProfileData } from '../../../__mocks__/dashboard';
import messages from '../../../i18n';
import { ProgressChart } from '../progress-chart';
import { CHART_TITLE_STYLES, CHART_TITLE_DARK_COLOR } from '../constants';

jest.mock('echarts-for-react', () => jest.fn((props) => (
  <div
    data-testid="echarts-instance"
    data-options={props.option ? JSON.stringify(props.option) : null}
  />
)));

afterEach(() => {
  cleanup();
  document.body.classList.remove('indigo-dark-theme');
});

describe('ProgressChart', () => {
  const data = gameProfileData.progress;
  const CHART_TITLE = messages.performanceProgressTrackerSectionHeadingText.defaultMessage;
  const CHART_DESCRIPTION = messages.performanceProgressTrackerSectionDescriptionText.defaultMessage;

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 600,
    });
  });

  it('renders without data', () => {
    renderWithProviders(<ProgressChart />);
    const chartElement = screen.getByTestId('echarts-instance');
    const options = JSON.parse(chartElement.getAttribute('data-options'));

    expect(chartElement).toBeInTheDocument();
    expect(screen.getByText(CHART_TITLE)).toBeInTheDocument();
    expect(screen.getByText(CHART_DESCRIPTION)).toBeInTheDocument();
    expect(options.series).toBeDefined();
  });

  it('renders with the correct options', () => {
    renderWithProviders(<ProgressChart data={data} />);

    const chartElement = screen.getByTestId('echarts-instance');
    const options = JSON.parse(chartElement.getAttribute('data-options'));

    expect(chartElement).toBeInTheDocument();
    expect(screen.getByText(CHART_TITLE)).toBeInTheDocument();
    expect(screen.getByText(CHART_DESCRIPTION)).toBeInTheDocument();
    expect(options.series).toBeDefined();
  });

  it('uses the default navy title color in light mode', () => {
    renderWithProviders(<ProgressChart data={data} />);

    const options = JSON.parse(screen.getByTestId('echarts-instance').getAttribute('data-options'));

    expect(options.legend.textStyle.color).toBe(CHART_TITLE_STYLES.color);
  });

  it('uses the light accent title color when dark mode is active', () => {
    document.body.classList.add('indigo-dark-theme');
    renderWithProviders(<ProgressChart data={data} />);

    const options = JSON.parse(screen.getByTestId('echarts-instance').getAttribute('data-options'));

    expect(options.legend.textStyle.color).toBe(CHART_TITLE_DARK_COLOR);
  });

  it('updates chartWidth on window resize', () => {
    const { container } = renderWithProviders(
      <div style={{ width: '600px' }}>
        <ProgressChart data={data} />
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
