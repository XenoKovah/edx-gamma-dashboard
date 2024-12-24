import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, SelectMenu, MenuItem, Alert,
} from '@openedx/paragon';
import {
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
} from '@openedx/paragon/icons';

import { gammaApi } from '../../../../api';
import { getTranslations } from './utils';
import { PRODUCT_NAME } from '../constants';

const FeedbackForm = ({ handleClose }) => {
  const [requestStatus, setRequestStatus] = useState(null);
  const [formData, setFormData] = useState({
    message: '',
    subject: getTranslations().SUBJECT_LIST[0],
    product: PRODUCT_NAME,
  });
  const isSuccess = requestStatus === 200;

  const setFieldValue = (key, value) => setFormData({ ...formData, [key]: value });

  const isValid = () => !Object.values(formData).some(value => !value);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid()) {
      return;
    }

    gammaApi.sendFeedbackForm(formData, setRequestStatus);
  };

  const handleChange = ({ target }) => {
    const key = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setFieldValue(key, value);
  };

  if (requestStatus) {
    return (
      <>
        {isSuccess ? (
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
        )}
        <div className="modal-buttons d-flex justify-content-end pt-4.5">
          <Button onClick={handleClose}>
            {getTranslations().confirmButtonText}
          </Button>
        </div>
      </>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
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
      <div className="modal-buttons d-flex justify-content-end mt-2.5">
        <Button variant="tertiary" type="submit" onClick={handleClose}>
          {getTranslations().cancelButtonText}
        </Button>
        <Button type="submit" className="ml-2" disabled={!isValid()}>
          {getTranslations().submitButtonText}
        </Button>
      </div>
    </Form>
  );
};

FeedbackForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default FeedbackForm;
