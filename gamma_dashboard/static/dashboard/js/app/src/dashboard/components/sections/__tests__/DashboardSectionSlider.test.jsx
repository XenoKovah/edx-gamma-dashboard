import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../../../setupTests';
import DashboardSectionSlider from '../DashboardSectionSlider';

describe('<DashboardSectionSlider />', () => {
  const mockClick = jest.fn();

  const defaultProps = {
    title: 'Slider Title',
    status: 'Completed',
    description: 'This is a slider description',
    content: 'Here is the content paragraph',
    items: [<li key="1">Badge 1</li>, <li key="2">Badge 2</li>],
    buttonData: {
      title: 'See More',
      onClick: mockClick,
    },
    fullWidth: true,
  };

  afterEach(cleanup);

  it('renders title, status, description, and content', () => {
    const { getByText, getByTestId } = renderWithProviders(<DashboardSectionSlider {...defaultProps} />);

    expect(getByText('Slider Title')).toBeInTheDocument();
    expect(getByText('Completed')).toBeInTheDocument();
    expect(getByText('This is a slider description')).toBeInTheDocument();
    expect(getByTestId('slider-statuses-block-description')).toHaveTextContent('Here is the content paragraph');
  });

  it('renders list items correctly', () => {
    const { getByText, getByTestId } = renderWithProviders(<DashboardSectionSlider {...defaultProps} />);

    const list = getByTestId('progress-badges-list');
    expect(list).toBeInTheDocument();
    expect(list.children.length).toBe(2);
    expect(getByText('Badge 1')).toBeInTheDocument();
    expect(getByText('Badge 2')).toBeInTheDocument();
  });

  it('renders button and handles click event', async () => {
    const { getByTestId } = renderWithProviders(<DashboardSectionSlider {...defaultProps} />);

    const button = getByTestId('progress-badges-details-btn');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('See More');

    await userEvent.click(button);
    expect(mockClick).toHaveBeenCalled();
  });

  it('renders correctly with minimal/default props', () => {
    const { getByTestId } = renderWithProviders(<DashboardSectionSlider />);

    expect(getByTestId('slider-statuses-block-description')).toBeInTheDocument();
    expect(getByTestId('progress-badges-list')).toBeInTheDocument();
    expect(getByTestId('progress-badges-details-btn')).toBeInTheDocument();
  });
});
