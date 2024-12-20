import React, { useState } from 'react';
import { Dropdown, Icon } from '@openedx/paragon';
import { ArrowDropDown } from '@openedx/paragon/icons';

import { Modal, FeedbackForm } from './components';
import { useTranslate } from '../../i18n/utils';

import LogoImage from './assets/logo.svg';
import './assets/LogoDropdown.scss';

const LogoDropdown = () => {
  const [isOpen, toggleModal] = useState(false);

  return (
    <>
      <Dropdown alignRight>
        <Dropdown.Toggle variant="tertiary" bsPrefix="btn-logo" id="logo-dropdown">
          <img src={LogoImage} alt="analytics-logo" />
          <Icon src={ArrowDropDown} variant="tertiary" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item target="_blank" href="https://products.pages.raccoongang.com/docs/rg-gamification/index.html">
            {useTranslate('logo.dropdown.guide.item.text')}
          </Dropdown.Item>
          <Dropdown.Item type="button" onClick={() => toggleModal(true)}>
            {useTranslate('logo.dropdown.feedback.item.text')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Modal isOpen={isOpen} title="Give feedback" handleClose={() => toggleModal(false)}>
        <FeedbackForm handleClose={() => toggleModal(false)} />
      </Modal>
    </>
  );
};

export default LogoDropdown;
