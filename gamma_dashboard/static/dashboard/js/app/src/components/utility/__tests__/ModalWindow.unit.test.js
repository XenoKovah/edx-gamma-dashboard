import React from 'react';

import ReactModal from 'react-modal';
import '@testing-library/jest-dom';
import {
    cleanup,
    getDefaultNormalizer,
    render,
    within
} from '@testing-library/react';

import ModalWindow from '../ModalWindow';

import {
    parsedBadgeItems,
    parsedStatusItems
} from '../../../fixtures/dashboard';

beforeAll(() => {
    ReactModal.setAppElement('body');

    const ReactDOM = jest.genMockFromModule('react-dom');
    ReactDOM.createPortal = (element, target) => (element);
});

afterEach(cleanup);


describe('<ModalWindow>', () => {
    it('renders with correct content', () => {
        const { getByTestId } = render(
            <ModalWindow
                isOpen={true}
            />
        );

        const modalWindowWrapper = getByTestId('modal-window-wrapper');
        expect(modalWindowWrapper).toBeInTheDocument();
    });

    it('renders with correct content', () => {
        const content = 'Test content';

        const { getByTestId } = render(
            <ModalWindow
                isOpen={true}
                content={content}
            />
        );

        const modalWindowWrapper = getByTestId('modal-window-wrapper');
        expect(modalWindowWrapper).toHaveTextContent(content);
    });

    it('renders with correct content', () => {
        const { getByTestId } = render(
            <ModalWindow
                isOpen={true}
            >
                <div data-testid='test-child'>
                </div>
            </ModalWindow>
        );

        const modalWindowWrapper = getByTestId('modal-window-wrapper');
        const child = within(modalWindowWrapper).getByTestId('test-child');

        expect(child).toBeInTheDocument();
    });

    it('does not render if not `isOpen`', () => {
        const { queryByTestId } = render(<ModalWindow isOpen={false} />);

        const dashboardModalWindow = queryByTestId('dashboard-modal-window-title-bar');
        expect(dashboardModalWindow).not.toBeInTheDocument();
    });

    it('does not render without paramters (isOpen is `false`)', () => {
        const { queryByTestId } = render(<ModalWindow />);

        const dashboardModalWindow = queryByTestId('dashboard-modal-window-title-bar');
        expect(dashboardModalWindow).not.toBeInTheDocument();
    });
});
