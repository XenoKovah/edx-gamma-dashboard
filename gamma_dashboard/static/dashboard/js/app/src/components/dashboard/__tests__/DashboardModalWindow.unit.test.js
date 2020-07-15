import React from 'react';

import ReactModal from 'react-modal';
import '@testing-library/jest-dom';
import {
    cleanup,
    getDefaultNormalizer,
    render,
    within
} from '@testing-library/react';

import DashboardModalWindow from '../DashboardModalWindow';

import {
    parsedBadgeItems,
    parsedStatusItems
} from '../../../fixtures/dashboard';

beforeAll(() => {
    ReactModal.setAppElement('body');

    const ReactDOM = jest.genMockFromModule('react-dom');
    ReactDOM.createPortal = (element, target) => {
        return (element);
    };
});

afterEach(cleanup);


describe('<DashboardModalWindow>', () => {
    it('renders with correct title', () => {
        const title = 'Test title';

        const { getByTestId } = render(
            <DashboardModalWindow
                title={title}
                isOpen={true}
            />
        );

        const dashboardModalWindow = getByTestId('dashboard-modal-window-title-bar');
        expect(dashboardModalWindow).toBeInTheDocument();

        const windowTitle = within(dashboardModalWindow).getByTestId('title');
        expect(windowTitle).toBeInTheDocument();
        expect(windowTitle).toHaveTextContent(title);
    });

    it.each`
        type        | items                | getItemDataFunction
        ${'badge'}  | ${parsedBadgeItems}  | ${item => item[1]}
        ${'status'} | ${parsedStatusItems} | ${item => item}
    `('renders with correct `$type items`', ({ items, getItemDataFunction }) => {
        const { getByTestId } = render(
            <DashboardModalWindow
                items={items}
                isOpen={true}
                getItemDataFunction={getItemDataFunction}
            />
        );

        const dashboardModalWindow = getByTestId('dashboard-modal-window-title-bar');
        expect(dashboardModalWindow).toBeInTheDocument();

        const counterValue = within(dashboardModalWindow).getByTestId('counter-value');
        expect(counterValue).toBeInTheDocument();
        expect(counterValue).toHaveTextContent(`${items.length}`);

        const itemsList = getByTestId('dashboard-modal-window-items-list');
        expect(itemsList).toBeInTheDocument();

        const listItems = within(itemsList).getAllByTestId('row-block-item');
        expect(listItems.length).toBe(items.length);
    });

    it('renders without data', () => {
        const { queryByTestId } = render(<DashboardModalWindow />);

        const dashboardModalWindow = queryByTestId('modal-window');
        expect(dashboardModalWindow).not.toBeInTheDocument();
    });
});
