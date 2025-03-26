import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@openedx/paragon';
import { Error as ErrorIcon } from '@openedx/paragon/icons';

import { useTranslate } from '../../i18n/utils';
import Alert from '../alert';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const messages = {
    alertContent: {
      actionBtnText: useTranslate('generic.error.fallback.btn.text'),
      alertTitle: useTranslate('generic.error.fallback.title'),
      alertDescription: useTranslate('generic.error.fallback.description'),
    },
  };

  return (
    <div className="w-100 mx-2">
      <Alert variant="danger" title={messages.alertContent.alertTitle} icon={ErrorIcon}>
        <p>
          {messages.alertContent.alertDescription} <pre className="d-inline">{error.message}</pre>
        </p>
        <Button onClick={resetErrorBoundary} variant="outline-primary" size="sm">
          {messages.alertContent.actionBtnText}
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
