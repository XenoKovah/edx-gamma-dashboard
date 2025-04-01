import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Dropdown, Hyperlink, Icon, Image, useToggle,
} from '@openedx/paragon';
import { ArrowDropDown as ArrowDropDownIcon } from '@openedx/paragon/icons';

import { gammaApi } from '../../api';
import Modal from '../modal/Modal';
import { GAMIFICATION_GUIDE_URL, PRODUCT_NAME } from './constants';
import FeedbackForm from './FeedbackForm';

import messages from '../../i18n';

import LogoImage from '../../assets/images/logo.svg';

const LogoDropdown = () => {
  const intl = useIntl();
  const [isModalOpen, openModal, closeModal] = useToggle(false);
  const [isValidData, setIsValidData] = useState(false);

  const translations = {
    SUBJECT_LIST: [
      intl.formatMessage(messages.logoDropdownFeedbackFormSubjectQuestionText),
    ],
    confirmButtonText: intl.formatMessage(messages.logoDropdownFeedbackFormAlertButtonSubmitText),
    cancelButtonText: intl.formatMessage(messages.logoDropdownFeedbackFormButtonCancelText),
    submitButtonText: intl.formatMessage(messages.logoDropdownFeedbackFormButtonSubmitText),
    guideItemText: intl.formatMessage(messages.logoDropdownGuideItemText),
    feedbackItemText: intl.formatMessage(messages.logoDropdownFeedbackItemText),
    imageAltText: intl.formatMessage(messages.genericLogoDropdownImageScreenReaderText),
    feedbackModalTitle: intl.formatMessage(messages.logoDropdownFeedbackItemText),
  };

  const [requestStatus, setRequestStatus] = useState(null);
  const [formData, setFormData] = useState({
    message: '',
    subject: translations.SUBJECT_LIST[0],
    product: PRODUCT_NAME,
  });
  const isSuccess = requestStatus === 200;

  const setFieldValue = (key, value) => setFormData({ ...formData, [key]: value });

  const dropdownItems = [
    {
      as: Hyperlink,
      target: '_blank',
      href: GAMIFICATION_GUIDE_URL,
      content: translations.guideItemText,
      destination: '', // TODO: Paragon bug, if the component as a Hyperlink link must be passed via `destination` without `href`.
    },
    {
      type: 'button',
      onClick: openModal,
      content: translations.feedbackItemText,
    },
  ];

  const handleCloseFeedbackModal = () => {
    closeModal();
    setIsValidData(false);
    setFormData({ ...formData, message: '' });
  };

  const isDataValid = (data) => {
    const dataIsValid = !Object.values(data).some(value => !value);
    setIsValidData(dataIsValid);
    return dataIsValid;
  };

  const handleSubmitFeedbackModalData = () => {
    if (!isDataValid(formData)) {
      return;
    }

    gammaApi.sendFeedbackForm(formData, setRequestStatus);
    setFormData({ ...formData, message: '' });
  };

  const handleChange = ({ target }) => {
    const key = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    isDataValid(formData);
    setFieldValue(key, value);
  };

  return (
    <>
      <Dropdown className="logo-dropdown" alignRight>
        <Dropdown.Toggle id="logo-dropdown" variant="tertiary" bsPrefix="btn-logo">
          <Image
            className="logo-dropdown-img"
            src={LogoImage}
            alt={translations.imageAltText}
          />
          <Icon src={ArrowDropDownIcon} variant="tertiary" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {dropdownItems.map((item) => (
            <Dropdown.Item key={item.content} {...item}>
              {item.content}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Modal
        isOpen={isModalOpen}
        title={translations.feedbackModalTitle}
        handleClose={handleCloseFeedbackModal}
        closeBtnTitle={isSuccess ? translations.confirmButtonText : translations.cancelButtonText}
        submitBtnOptions={{
          show: !isSuccess,
          title: translations.submitButtonText,
          submitFn: handleSubmitFeedbackModalData,
          disabled: !isValidData,
        }}
        isOverflowVisible
      >
        <FeedbackForm
          isDataValid={isDataValid}
          isSuccess={isSuccess}
          requestStatus={requestStatus}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          formData={formData}
        />
      </Modal>
    </>
  );
};

export default LogoDropdown;
