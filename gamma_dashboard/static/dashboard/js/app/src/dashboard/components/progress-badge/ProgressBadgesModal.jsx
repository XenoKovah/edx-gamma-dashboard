import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Info as InfoIcon } from '@openedx/paragon/icons';

import { isRtl } from '../../../constants';
import { Modal, Alert } from '../../../generic';
import ProgressBadge from './ProgressBadge';

import messages from '../../../i18n';

const ProgressBadgesModal = ({
  title, filteredActiveBadges, getItemDataFunction, isOpen, closeCallback,
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

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      handleClose={closeCallback}
      size="xl"
      hasCloseButton
      closeBtnTitle={translations.modalBtnCloseTitle}
      footerText={filteredActiveBadges.length ? `${counterLabelText} ${filteredActiveBadges.length}` : null}
    >
      {filteredActiveBadges.length ? (
        <ul
          className="d-flex flex-wrap justify-content-center p-0"
          data-testid="dashboard-modal-window-items-list"
        >
          {filteredActiveBadges.map((item) => (
            <ProgressBadge
              key={getItemDataFunction(item).title}
              slug={item[0]}
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

ProgressBadgesModal.propTypes = {
  title: PropTypes.string,
  filteredActiveBadges: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          id: PropTypes.string,
          image: PropTypes.string,
          title: PropTypes.string.isRequired,
          progress: PropTypes.oneOfType([
            PropTypes.objectOf(PropTypes.shape({
              count: PropTypes.number.isRequired,
              goal: PropTypes.number.isRequired,
              title: PropTypes.string,
            })),
            PropTypes.arrayOf(PropTypes.shape({
              events: PropTypes.objectOf(PropTypes.shape({
                goal: PropTypes.number.isRequired,
                last: PropTypes.string,
                count: PropTypes.number.isRequired,
              })),
            })),
          ]).isRequired,
          dependencies: PropTypes.arrayOf(PropTypes.string),
          statusDependency: PropTypes.string,
          done: PropTypes.bool.isRequired,
          isActive: PropTypes.bool.isRequired,
        }),
      ]),
    ),
  ),
  getItemDataFunction: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired,
};

ProgressBadgesModal.defaultProps = {
  title: '',
  filteredActiveBadges: [],
  getItemDataFunction: null,
};

export default ProgressBadgesModal;
