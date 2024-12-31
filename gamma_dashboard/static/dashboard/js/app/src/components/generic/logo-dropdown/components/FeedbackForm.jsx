import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, SelectMenu, MenuItem, Alert,
} from '@openedx/paragon';
import {
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
} from '@openedx/paragon/icons';

import { getTranslations } from './utils';

const FeedbackForm = ({
  handleChange, isSuccess, requestStatus, setFieldValue, formData,
}) => {
  if (requestStatus) {
    return isSuccess ? (
      <Alert variant="success" icon={CheckCircleIcon}>
        <Alert.Heading>
          {getTranslations().successMessage}
        </Alert.Heading>
      </Alert>
    ) : (
      <Alert variant="danger" icon={InfoIcon}>
        <Alert.Heading>
          {getTranslations().errorMessage}
        </Alert.Heading>
      </Alert>
    );
  }

  return (
    <Form>
      <Form.Group>
        <SelectMenu variant="tertiary">
          {getTranslations().SUBJECT_LIST.map(subject => (
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
          floatingLabel={getTranslations().messageFieldLabel}
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
  requestStatus: PropTypes.bool,
  formData: PropTypes.shape({
    subject: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

FeedbackForm.defaultProps = {
  requestStatus: null,
};

export default FeedbackForm;
