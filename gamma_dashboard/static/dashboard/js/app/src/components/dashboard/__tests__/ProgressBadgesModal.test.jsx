import React from 'react';
import pretty from 'pretty';
import '@testing-library/jest-dom';
import { cleanup, within } from '@testing-library/react';

import { renderWithProviders } from '../../../setupTests';
import { ProgressBadgesModal } from '../rowBlock/progress-badge';
import {
  parsedBadgeItems,
  parsedStatusItems,
} from '../../../__mocks__/dashboard';

beforeAll(() => {
  const ReactDOM = jest.genMockFromModule('react-dom');
  ReactDOM.createPortal = (element) => (element);
});

afterEach(cleanup);

describe('<ProgressBadgesModal>', () => {
  it('renders with correct title', () => {
    const title = 'Test title';

    const { container, getByRole } = renderWithProviders(
      <ProgressBadgesModal
        title={title}
        isOpen
        closeCallback={jest.fn()}
      />,
    );

    const modalWindow = getByRole('dialog');
    const modalTitle = within(modalWindow).getByRole('heading', { name: title });
    expect(modalWindow).toBeInTheDocument();
    expect(modalTitle).toHaveTextContent(title);
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it.each`
        type        | items                | getItemDataFunction
        ${'badge'}  | ${parsedBadgeItems}  | ${item => item[1]}
        ${'status'} | ${parsedStatusItems} | ${item => item}
    `('renders with correct `$type items`', ({ items, getItemDataFunction }) => {
    const { container, getByRole } = renderWithProviders(
      <ProgressBadgesModal
        items={items}
        isOpen
        getItemDataFunction={getItemDataFunction}
        closeCallback={jest.fn()}
      />,
    );

    const modalWindow = getByRole('dialog');
    expect(modalWindow).toBeInTheDocument();

    const counterValue = within(modalWindow).getByTestId('footer-text');
    expect(counterValue).toBeInTheDocument();
    expect(counterValue).toHaveTextContent(`${items.length}`);

    const badgesList = getByRole('list');
    expect(badgesList).toBeInTheDocument();

    const listItems = within(badgesList).getAllByTestId('progress-badge');
    expect(listItems.length).toBe(items.length);
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it('renders without data', () => {
    const { queryByRole } = renderWithProviders(
      <ProgressBadgesModal isOpen={false} closeCallback={jest.fn()} />,
    );

    const modalWindow = queryByRole('dialog');
    expect(modalWindow).not.toBeInTheDocument();
  });
});
