import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import {
  ActionRow, Badge, Button, ModalDialog,
} from '@openedx/paragon';

import messages from '../../i18n';

const ModalFooter = ({
  footerText, closeBtnTitle, submitBtnOptions, handleClose,
}) => {
  const intl = useIntl();

  const translations = {
    submitButtonText: intl.formatMessage(messages.logoDropdownFeedbackFormButtonSubmitDefaultText),
  };

  const resolvedSubmitBtnTitle = submitBtnOptions.title || translations.submitButtonText;

  return (
    <ModalDialog.Footer>
      <ActionRow>
        {footerText && (
          <p className="small">
            <Badge variant="info" data-testid="footer-text">
              {footerText}
            </Badge>
          </p>
        )}
        <ActionRow.Spacer />
        <div className="modal-buttons">
          <Button variant="tertiary" onClick={handleClose}>
            {closeBtnTitle}
          </Button>
          {submitBtnOptions?.show && (
            <Button
              className="ml-2"
              disabled={submitBtnOptions?.disabled}
              onClick={submitBtnOptions?.submitFn}
              variant="outline-primary"
            >
              {resolvedSubmitBtnTitle}
            </Button>
          )}
        </div>
      </ActionRow>
    </ModalDialog.Footer>
  );
};

ModalFooter.propTypes = {
  footerText: PropTypes.string,
  closeBtnTitle: PropTypes.string,
  submitBtnOptions: PropTypes.shape({
    show: PropTypes.bool,
    title: PropTypes.string,
    submitFn: PropTypes.func,
    disabled: PropTypes.bool,
  }),
  handleClose: PropTypes.func.isRequired,
};

ModalFooter.defaultProps = {
  footerText: undefined,
  closeBtnTitle: undefined,
  submitBtnOptions: {
    show: false,
    title: undefined,
    submitFn: undefined,
    disabled: false,
  },
};

export default ModalFooter;
