import React from 'react';
import PropTypes from 'prop-types';

import ReactModal from 'react-modal';

import CloseWindowButton from './CloseWindowButton';

import '../../styles/app/utility/modal-window.scss';

// you should keep this value synced with `transition` property of .ReactModal__Overlay class in modal-window.scss
// until a better solution is found
const CLOSE_TIMEOUT_SECONDS = 0.5;

const ModalWindow = ({
  isOpen, closeCallback, content, children,
}) => (
  <ReactModal
    closeTimeoutMS={CLOSE_TIMEOUT_SECONDS * 1000}
    isOpen={isOpen}
  >
    <div
      className="modal-window-wrapper"
      data-testid="modal-window-wrapper"
    >
      <CloseWindowButton onClick={closeCallback} />
      {content}
      {children}
    </div>
  </ReactModal>
);

ModalWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalWindow;
