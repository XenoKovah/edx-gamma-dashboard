import React from 'react';
import PropTypes from 'prop-types';

import { useTranslate } from '../../../../i18n/utils';
import { isRtl } from '../../../../constants';
import { Modal } from '../../../generic/modal';
import ProgressBadge from './ProgressBadge';

const ProgressBadgesModal = ({
  title, items, getItemDataFunction, isOpen, closeCallback,
}) => {
  const counterTranslation = useTranslate('performance.badges.section.total.badges.button.text');
  const counterLabelText = isRtl ? `:${counterTranslation}` : `${counterTranslation}:`;

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      handleClose={closeCallback}
      size="xl"
      hasCloseButton
      footerText={`${counterLabelText}: ${items.length}`}
    >
      <ul className="d-flex flex-wrap p-0" data-testid="dashboard-modal-window-items-list">
        {items.map((item) => (
          <ProgressBadge
            key={getItemDataFunction(item).title}
            data={getItemDataFunction(item)}
            center
          />
        ))}
      </ul>
    </Modal>
  );
};

const ProgressPropType = PropTypes.shape({
  count: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  title: PropTypes.string,
});

const ItemPropType = PropTypes.shape({
  id: PropTypes.string,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  progress: PropTypes.objectOf(ProgressPropType).isRequired,
  dependencies: PropTypes.arrayOf(PropTypes.string),
  statusDependency: PropTypes.string,
  done: PropTypes.bool.isRequired,
});

ProgressBadgesModal.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        ItemPropType,
      ]),
    ),
  ),
  getItemDataFunction: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired,
};

ProgressBadgesModal.defaultProps = {
  title: '',
  items: [],
  getItemDataFunction: null,
};

export default ProgressBadgesModal;
