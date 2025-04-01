import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Button } from '@openedx/paragon';
import { Error as ErrorIcon } from '@openedx/paragon/icons';

import Alert from '../alert';

import messages from '../../i18n';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const intl = useIntl();

  const translations = {
    alertContent: {
      actionBtnText: intl.formatMessage(messages.genericErrorFallbackBtnText),
      alertTitle: intl.formatMessage(messages.genericErrorFallbackTitle),
      alertDescription: intl.formatMessage(messages.genericErrorFallbackDescription),
    },
  };

  return (
    <div className="w-100 mx-2">
      <Alert variant="danger" title={translations.alertContent.alertTitle} icon={ErrorIcon}>
        <p>
          {translations.alertContent.alertDescription} <pre className="d-inline">{error.message}</pre>
        </p>
        <Button onClick={resetErrorBoundary} variant="outline-primary" size="sm">
          {translations.alertContent.actionBtnText}
        </Button>
      </Alert>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

export default ErrorFallback;
