import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Form, SelectMenu, MenuItem, Alert,
} from '@openedx/paragon';
import {
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
} from '@openedx/paragon/icons';

import messages from '../../i18n';

const FeedbackForm = ({
  handleChange, isSuccess, requestStatus, setFieldValue, formData,
}) => {
  const intl = useIntl();
  const translations = {
    SUBJECT_LIST: [
      intl.formatMessage(messages.logoDropdownFeedbackFormSubjectQuestionText),
      intl.formatMessage(messages.logoDropdownFeedbackFormSubjectCommentText),
      intl.formatMessage(messages.logoDropdownFeedbackFormSubjectBugText),
      intl.formatMessage(messages.logoDropdownFeedbackFormSubjectImprovementText),
    ],
    successMessage: intl.formatMessage(messages.logoDropdownFeedbackFormAlertSuccessText),
    errorMessage: intl.formatMessage(messages.logoDropdownFeedbackFormAlertErrorText),
    messageFieldLabel: intl.formatMessage(messages.logoDropdownFeedbackFormMessageLabelText),
  };

  if (requestStatus) {
    return isSuccess ? (
      <Alert variant="success" icon={CheckCircleIcon}>
        <Alert.Heading>
          {translations.successMessage}
        </Alert.Heading>
      </Alert>
    ) : (
      <Alert variant="danger" icon={InfoIcon}>
        <Alert.Heading>
          {translations.errorMessage}
        </Alert.Heading>
      </Alert>
    );
  }

  return (
    <Form>
      <Form.Group>
        <SelectMenu variant="tertiary">
          {translations.SUBJECT_LIST.map(subject => (
            <MenuItem
              as="div"
              key={subject}
              onClick={() => setFieldValue('subject', subject)}
              defaultSelected={subject === formData.subject}
            >
              {subject}
            </MenuItem>
          ))}
        </SelectMenu>
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="textarea"
          name="message"
          autoResize
          floatingLabel={translations.messageFieldLabel}
          value={formData.message}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
};

FeedbackForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  requestStatus: PropTypes.number,
  formData: PropTypes.shape({
    subject: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

FeedbackForm.defaultProps = {
  requestStatus: null,
};

export default FeedbackForm;
