import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../../setupTests';
import {
  parsedBadgeItems,
} from '../../__mocks__/dashboard';
import ProgressBadgesModal from '../components/progress-badge/ProgressBadgesModal';
import messages from '../../i18n';

beforeAll(() => {
  const ReactDOM = jest.genMockFromModule('react-dom');
  ReactDOM.createPortal = (element) => (element);
});

afterEach(cleanup);

describe('<ProgressBadgesModal>', () => {
  const mockCloseCallback = jest.fn();

  it('renders with correct title', () => {
    const title = 'Test title';

    const { getByRole } = renderWithProviders(
      <ProgressBadgesModal
        title={title}
        isOpen
        closeCallback={mockCloseCallback}
      />,
    );

    const modalWindow = getByRole('dialog');
    const modalTitle = within(modalWindow).getByRole('heading', { name: title });
    expect(modalWindow).toBeInTheDocument();
    expect(modalTitle).toHaveTextContent(title);
  });

  it('renders with badge items', () => {
    const getItemDataFunction = item => ({ ...item[1], isActive: true });

    const { getAllByTestId, getByRole } = renderWithProviders(
      <ProgressBadgesModal
        items={parsedBadgeItems}
        isOpen
        getItemDataFunction={getItemDataFunction}
        closeCallback={mockCloseCallback}
      />,
    );

    const modalWindow = getByRole('dialog');
    expect(modalWindow).toBeInTheDocument();

    const listItems = getAllByTestId('progress-badge');
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('displays empty state when no active badges are present', () => {
    const getItemDataFunction = item => ({ ...item[1], isActive: false });

    const { getByText } = renderWithProviders(
      <ProgressBadgesModal
        items={parsedBadgeItems}
        isOpen
        getItemDataFunction={getItemDataFunction}
        closeCallback={mockCloseCallback}
      />,
    );

    expect(getByText(
      messages.dashboardProgressBadgeModalEmptyBadgesListTitle.defaultMessage,
    )).toBeInTheDocument();
    expect(getByText(
      messages.dashboardProgressBadgeModalEmptyBadgesListDescription.defaultMessage,
    )).toBeInTheDocument();
  });

  it('displays footer text with badge count when active badges are present', () => {
    const getItemDataFunction = item => ({ ...item[1], isActive: true });

    const { getByText } = renderWithProviders(
      <ProgressBadgesModal
        items={parsedBadgeItems}
        isOpen
        getItemDataFunction={getItemDataFunction}
        closeCallback={mockCloseCallback}
      />,
    );

    const footerText = getByText(
      new RegExp(`${messages.performanceBadgesSectionTotalBadgesButtonText.defaultMessage}: ${parsedBadgeItems.length}`),
    );
    expect(footerText).toBeInTheDocument();
  });

  it('calls closeCallback when close button is clicked', () => {
    const { getByRole } = renderWithProviders(
      <ProgressBadgesModal
        isOpen
        closeCallback={mockCloseCallback}
      />,
    );

    const closeButton = getByRole('button', { name: /close/i });
    userEvent.click(closeButton);

    expect(mockCloseCallback).toHaveBeenCalled();
  });

  it('does not render when isOpen is false', () => {
    const { queryByRole } = renderWithProviders(
      <ProgressBadgesModal
        isOpen={false}
        closeCallback={mockCloseCallback}
      />,
    );

    const modalWindow = queryByRole('dialog');
    expect(modalWindow).not.toBeInTheDocument();
  });

  it('renders with default props', () => {
    const { getByRole, getByText } = renderWithProviders(
      <ProgressBadgesModal
        isOpen
        closeCallback={mockCloseCallback}
      />,
    );

    const modalWindow = getByRole('dialog');
    expect(modalWindow).toBeInTheDocument();

    expect(getByText(messages.dashboardProgressBadgeModalEmptyBadgesListTitle.defaultMessage)).toBeInTheDocument();
  });
});
