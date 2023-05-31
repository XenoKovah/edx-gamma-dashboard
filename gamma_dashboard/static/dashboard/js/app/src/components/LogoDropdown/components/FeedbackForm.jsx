import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, SelectMenu, MenuItem, Alert } from "@edx/paragon";
import { CheckCircle, Info } from "@edx/paragon/icons";

import gammaApi from '../../../api/ApiRequests';


const SUBJECT_LIST = [
  "Ask a question", "Leave a comment", "Report a bug", "Suggest an improvement",
];

const FeedbackForm = ({ handleClose }) => {
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    message: "",
    subject: "Ask a question",
    product: "rg_gamification",
  });

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

    gammaApi.sendFeedbackForm(formData, setStatus)
  };

  const handleChange = ({ target }) => {
    const key = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFieldValue(key, value);
  };

  if (status) {
    return (
      <>
        {status === 200 ? (
          <Alert variant="success" icon={CheckCircle}>
            <Alert.Heading>Your feedback has been noted.</Alert.Heading>
          </Alert>
        ) : (
          <Alert variant="danger" icon={Info}>
            <Alert.Heading>The server is not responding. Please try again later</Alert.Heading>
          </Alert>
        )}
        <div className="modal-buttons d-flex justify-content-end pt-4.5">
          <Button variant="primary" onClick={handleClose}>Got it</Button>
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
              onClick= {()=> setFieldValue("subject", subject)}
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
          floatingLabel="Let us know how we can help"
          value={formData.message}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="modal-buttons d-flex justify-content-end mt-2.5">
        <Button variant="tertiary" type="submit" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" className="ml-2" disabled={!isValid()}>
          Send feedback
        </Button>
      </div>
    </Form>
  );
};

FeedbackForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default FeedbackForm;
