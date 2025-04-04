import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Info as InfoIcon } from '@openedx/paragon/icons';

import { isRtl } from '../../../constants';
import { Modal, Alert } from '../../../generic';
import ProgressBadge from './ProgressBadge';

import messages from '../../../i18n';

const ProgressBadgesModal = ({
  title, items, getItemDataFunction, isOpen, closeCallback,
}) => {
  const intl = useIntl();

  const translations = {
    modalBtnCloseTitle: intl.formatMessage(messages.dashboardProgressBadgeModalButtonCloseText),
    counterText: intl.formatMessage(messages.performanceBadgesSectionTotalBadgesButtonText),
    alertModalEmptyBadgesListTitle: intl.formatMessage(messages.dashboardProgressBadgeModalEmptyBadgesListTitle),
    alertModalEmptyBadgesListDescription: intl.formatMessage(
      messages.dashboardProgressBadgeModalEmptyBadgesListDescription,
    ),
  };

  const counterLabelText = isRtl ? `:${translations.counterText}` : `${translations.counterText}:`;

  const filteredActiveBadges = items.filter((item) => getItemDataFunction(item).isActive);

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      handleClose={closeCallback}
      size="xl"
      hasCloseButton
      closeBtnTitle={translations.modalBtnCloseTitle}
      footerText={filteredActiveBadges.length ? `${counterLabelText} ${items.length}` : null}
    >
      {filteredActiveBadges.length ? (
        <ul
          className="d-flex flex-wrap justify-content-center p-0"
          data-testid="dashboard-modal-window-items-list"
        >
          {filteredActiveBadges.map((item) => (
            <ProgressBadge
              key={getItemDataFunction(item).title}
              data={getItemDataFunction(item)}
              center
            />
          ))}
        </ul>
      ) : (
        <Alert
          variant="info"
          icon={InfoIcon}
          title={translations.alertModalEmptyBadgesListTitle}
        >
          <p>{translations.alertModalEmptyBadgesListDescription}</p>
        </Alert>
      )}
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
