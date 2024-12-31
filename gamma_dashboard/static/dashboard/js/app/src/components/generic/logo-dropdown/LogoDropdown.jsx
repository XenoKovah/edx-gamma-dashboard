import React, { useState } from 'react';
import {
  Dropdown, Hyperlink, Icon, Image, useToggle,
} from '@openedx/paragon';
import { ArrowDropDown } from '@openedx/paragon/icons';

import { useTranslate } from '../../../i18n/utils';
import { Modal } from '../modal';
import { FeedbackForm } from './components';
import { GAMIFICATION_GUIDE_URL, PRODUCT_NAME } from './constants';

import LogoImage from '../../../assets/images/logo.svg';
import { gammaApi } from '../../../api';
import { getTranslations } from './components/utils';

const LogoDropdown = () => {
  const [isModalOpen, openModal, closeModal] = useToggle(false);
  const [isValidData, setIsValidData] = useState(false);

  const [requestStatus, setRequestStatus] = useState(null);
  const [formData, setFormData] = useState({
    message: '',
    subject: getTranslations().SUBJECT_LIST[0],
    product: PRODUCT_NAME,
  });
  const isSuccess = requestStatus === 200;

  const setFieldValue = (key, value) => setFormData({ ...formData, [key]: value });

  const dropdownItems = [
    {
      as: Hyperlink,
      target: '_blank',
      href: GAMIFICATION_GUIDE_URL,
      content: useTranslate('logo.dropdown.guide.item.text'),
      destination: '', // TODO: Paragon bug, if the component as a Hyperlink link must be passed via `destination` without `href`.
    },
    {
      type: 'button',
      onClick: openModal,
      content: useTranslate('logo.dropdown.feedback.item.text'),
    },
  ];

  const handleCloseFeedbackModal = () => {
    closeModal();
    setIsValidData(false);
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
            alt={useTranslate('generic.logo-dropdown.image.screen-reader.text')}
          />
          <Icon src={ArrowDropDown} variant="tertiary" />
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
        title={useTranslate('logo.dropdown.feedback.item.text')}
        handleClose={handleCloseFeedbackModal}
        closeBtnTitle={isSuccess ? getTranslations().confirmButtonText : 'Cancel'}
        submitBtnOptions={{
          show: !isSuccess,
          title: getTranslations().submitButtonText,
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
