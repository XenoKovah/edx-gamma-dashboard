import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, SelectMenu, MenuItem, Alert,
} from '@openedx/paragon';
import {
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
} from '@openedx/paragon/icons';

import { useTranslate } from '../../i18n/utils';

const FeedbackForm = ({
  handleChange, isSuccess, requestStatus, setFieldValue, formData,
}) => {
  const messages = {
    SUBJECT_LIST: [
      useTranslate('logo.dropdown.feedback.form.subject.question.text'),
      useTranslate('logo.dropdown.feedback.form.subject.comment.text'),
      useTranslate('logo.dropdown.feedback.form.subject.bug.text'),
      useTranslate('logo.dropdown.feedback.form.subject.improvement.text'),
    ],
    successMessage: useTranslate('logo.dropdown.feedback.form.alert.success.text'),
    errorMessage: useTranslate('logo.dropdown.feedback.form.alert.error.text'),
    messageFieldLabel: useTranslate('logo.dropdown.feedback.form.message.label.text'),
  };

  if (requestStatus) {
    return isSuccess ? (
      <Alert variant="success" icon={CheckCircleIcon}>
        <Alert.Heading>
          {messages.successMessage}
        </Alert.Heading>
      </Alert>
    ) : (
      <Alert variant="danger" icon={InfoIcon}>
        <Alert.Heading>
          {messages.errorMessage}
        </Alert.Heading>
      </Alert>
    );
  }

  return (
    <Form>
      <Form.Group>
        <SelectMenu variant="tertiary">
          {messages.SUBJECT_LIST.map(subject => (
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
          floatingLabel={messages.messageFieldLabel}
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
