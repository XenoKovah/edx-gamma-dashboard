import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, SelectMenu, MenuItem, Alert,
} from '@openedx/paragon';
import { CheckCircle, Info } from '@openedx/paragon/icons';

import { gammaApi } from '../../../api/ApiRequests';
import { useTranslate } from '../../../i18n/utils';

const FeedbackForm = ({ handleClose }) => {
  const SUBJECT_LIST = [
    useTranslate('logo.dropdown.feedback.form.subject.question.text'),
    useTranslate('logo.dropdown.feedback.form.subject.comment.text'),
    useTranslate('logo.dropdown.feedback.form.subject.bug.text'),
    useTranslate('logo.dropdown.feedback.form.subject.improvement.text'),
  ];
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    message: '',
    subject: SUBJECT_LIST[0],
    product: 'rg_gamification',
  });

  const messages = {
    successMessage: useTranslate('logo.dropdown.feedback.form.alert.success.text'),
    errorMessage: useTranslate('logo.dropdown.feedback.form.alert.error.text'),
    confirmButtonText: useTranslate('logo.dropdown.feedback.form.alert.button.submit.text'),
    messageFieldLabel: useTranslate('logo.dropdown.feedback.form.message.label.text'),
    cancelButtonText: useTranslate('logo.dropdown.feedback.form.button.cancel.text'),
    submitButtonText: useTranslate('logo.dropdown.feedback.form.button.submit.text'),
  };

  const setFieldValue = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const isValid = () => !Object.values(formData).some(value => !value);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid()) {
      return;
    }

    gammaApi.sendFeedbackForm(formData, setStatus);
  };

  const handleChange = ({ target }) => {
    const key = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFieldValue(key, value);
  };

  if (status) {
    return (
      <>
        {status === 200 ? (
          <Alert variant="success" icon={CheckCircle}>
            <Alert.Heading>
              {messages.successMessage}
            </Alert.Heading>
          </Alert>
        ) : (
          <Alert variant="danger" icon={Info}>
            <Alert.Heading>
              {messages.errorMessage}
            </Alert.Heading>
          </Alert>
        )}
        <div className="modal-buttons d-flex justify-content-end pt-4.5">
          <Button variant="primary" onClick={handleClose}>
            {messages.confirmButtonText}
          </Button>
        </div>
      </>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <SelectMenu variant="tertiary">
          {SUBJECT_LIST.map(subject => (
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
      <div className="modal-buttons d-flex justify-content-end mt-2.5">
        <Button variant="tertiary" type="submit" onClick={handleClose}>
          {messages.cancelButtonText}
        </Button>
        <Button variant="primary" type="submit" className="ml-2" disabled={!isValid()}>
          {messages.submitButtonText}
        </Button>
      </div>
    </Form>
  );
};

FeedbackForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default FeedbackForm;
