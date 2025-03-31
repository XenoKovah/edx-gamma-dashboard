import React from 'react';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { renderWithProviders } from '../../../../setupTests';
import DashboardSectionAvatar from '../DashboardSectionAvatar';

describe('<DashboardSectionAvatar />', () => {
  const mockButtonClick = jest.fn();

  const baseProps = {
    title: 'Avatar Title',
    status: 'active',
    description: 'This is a description',
    content: 'Some additional content',
    items: (
      <>
        <li>Avatar Item 1</li>
        <li>Avatar Item 2</li>
      </>
    ),
    buttonData: {
      title: 'Click Me',
      onClick: mockButtonClick,
    },
  };

  afterEach(cleanup);

  it('renders all main elements correctly', () => {
    const { getByText, getByRole } = renderWithProviders(<DashboardSectionAvatar {...baseProps} />);

    expect(getByText('Avatar Title')).toBeInTheDocument();
    expect(getByText('This is a description')).toBeInTheDocument();
    expect(getByText('Some additional content')).toBeInTheDocument();
    expect(getByText('Avatar Item 1')).toBeInTheDocument();
    expect(getByText('Avatar Item 2')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('calls button onClick handler when clicked', async () => {
    const { getByRole } = renderWithProviders(<DashboardSectionAvatar {...baseProps} />);
    const button = getByRole('button', { name: 'Click Me' });

    await userEvent.click(button);
    expect(mockButtonClick).toHaveBeenCalled();
  });

  it('renders with default props without crashing', () => {
    const { getByTestId } = renderWithProviders(<DashboardSectionAvatar />);

    expect(getByTestId('slider-statuses-block-description')).toBeInTheDocument();
    expect(getByTestId('progress-avatar-list')).toBeInTheDocument();
    expect(getByTestId('progress-avatar-details-btn-wrapper')).toBeInTheDocument();
  });
});
