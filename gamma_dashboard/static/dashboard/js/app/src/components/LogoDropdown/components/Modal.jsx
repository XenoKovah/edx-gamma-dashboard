import React from 'react';
import PropTypes from 'prop-types';
import { ModalDialog } from '@openedx/paragon';

const Modal = ({
  isOpen, handleClose, title, children,
}) => (
  <ModalDialog
    title={title}
    isOpen={isOpen}
    onClose={handleClose}
    hasCloseButton={false}
    className="feedBack-modal"
  >
    <ModalDialog.Header>
      <ModalDialog.Title>{title}</ModalDialog.Title>
    </ModalDialog.Header>
    <ModalDialog.Body>{children}</ModalDialog.Body>
  </ModalDialog>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
