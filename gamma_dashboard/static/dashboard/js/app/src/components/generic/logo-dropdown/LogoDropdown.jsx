import React from 'react';
import {
  Dropdown, Hyperlink, Icon, Image, useToggle,
} from '@openedx/paragon';
import { ArrowDropDown } from '@openedx/paragon/icons';

import { useTranslate } from '../../../i18n/utils';
import Modal from '../Modal';
import { FeedbackForm } from './components';
import { GAMIFICATION_GUIDE_URL } from './constants';

import LogoImage from '../../../assets/images/logo.svg';

const LogoDropdown = () => {
  const [isModalOpen, openModal, closeModal] = useToggle(false);

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
        handleClose={closeModal}
      >
        <FeedbackForm handleClose={closeModal} />
      </Modal>
    </>
  );
};

export default LogoDropdown;
