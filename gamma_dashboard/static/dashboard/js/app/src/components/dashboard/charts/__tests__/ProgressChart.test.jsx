import React from 'react';
import { screen, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../../../setupTests';
import { gameProfileData } from '../../../../__mocks__/dashboard';
import messages from '../../../../i18n/en';
import { ProgressChart } from '../progress-chart';

jest.mock('echarts-for-react', () => jest.fn((props) => (
  <div
    data-testid="echarts-instance"
    data-options={props.option ? JSON.stringify(props.option) : null}
  />
)));

afterEach(cleanup);

describe('ProgressChart', () => {
  const data = gameProfileData.progress;
  const CHART_TITLE = `{header|${ messages['performance.progress.tracker.section.heading.text'].defaultMessage}}`;
  const CHART_DESCRIPTION = messages['performance.progress.tracker.section.description.text'].defaultMessage;

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
    expect(options.title.text).toBe(CHART_TITLE);
    expect(options.graphic[0].style.text).toBe(CHART_DESCRIPTION);
    expect(options.series).toBeDefined();
  });

  it('renders with the correct options', () => {
    renderWithProviders(<ProgressChart data={data} />);

    const chartElement = screen.getByTestId('echarts-instance');
    const options = JSON.parse(chartElement.getAttribute('data-options'));

    expect(chartElement).toBeInTheDocument();
    expect(options.title.text).toBe(CHART_TITLE);
    expect(options.graphic[0].style.text).toBe(CHART_DESCRIPTION);
    expect(options.series).toBeDefined();
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
