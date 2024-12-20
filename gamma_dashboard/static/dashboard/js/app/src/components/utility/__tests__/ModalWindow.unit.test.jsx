import React from 'react';

import ReactModal from 'react-modal';
import '@testing-library/jest-dom';
import {
  cleanup,
  fireEvent,
  render,
  within,
} from '@testing-library/react';

import ModalWindow from '../ModalWindow';
import CloseWindowButton from '../CloseWindowButton';

beforeAll(() => {
  ReactModal.setAppElement('body');

  const ReactDOM = jest.genMockFromModule('react-dom');
  ReactDOM.createPortal = (element) => (element);
});

afterEach(cleanup);

describe('<ModalWindow>', () => {
  it('renders component', () => {
    const { getByTestId } = render(
      <ModalWindow
        isOpen
      />,
    );

    const modalWindowWrapper = getByTestId('modal-window-wrapper');
    expect(modalWindowWrapper).toBeInTheDocument();
  });

  it('renders with correct content text', () => {
    const content = 'Test content';

    const { getByTestId } = render(
      <ModalWindow
        isOpen
        content={content}
      />,
    );

    const modalWindowWrapper = getByTestId('modal-window-wrapper');
    expect(modalWindowWrapper).toHaveTextContent(content);
  });

  it('renders with correct children', () => {
    const { getByTestId } = render(
      <ModalWindow
        isOpen
      >
        <div data-testid="test-child" />
      </ModalWindow>,
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

  it('click callback is being called', () => {
    const onClickHandler = jest.fn();

    const { getByTestId } = render(
      <CloseWindowButton
        onClick={onClickHandler}
      />,
    );

    const button = getByTestId('close-window-button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClickHandler).toBeCalledTimes(1);
  });
});
