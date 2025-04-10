import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { CardGrid } from '@openedx/paragon';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
} from '@openedx/paragon/icons';

import { AvatarProcessingStatesPropType, AvatarSetsPropType } from '../../propTypes';
import { isRtl } from '../../../constants';
import { Modal, Loader, Alert } from '../../../generic';
import ProgressAvatar from './ProgressAvatar';
import { isIdle } from './utils';

import messages from '../../../i18n';

const ProgressAvatarModal = ({
  title,
  isOpen,
  avatarSets,
  closeCallback,
  avatarProcessingStates,
  selectedAvatarSetId,
  hasSelectedAvatarSet,
  handleSelectAvatarSet,
  setSelectedAvatarSetId,
  savedSelectedAvatarSetId,
  handleUpdateSelectedAvatarSet,
}) => {
  const intl = useIntl();

  const {
    details: { update, select },
  } = avatarProcessingStates;

  const translations = {
    modalBtnCloseTitle: intl.formatMessage(messages.dashboardProgressAvatarModalButtonCloseText),
    counterText: intl.formatMessage(messages.performanceAvatarSectionTotalAvatarSetsButtonText),
    saveAvatarSetBtnText: intl.formatMessage(messages.dashboardProgressAvatarSetModalAvatarSetSaveBtn),
    avatarSuccessText: intl.formatMessage(messages.dashboardProgressAvatarSetModalAvatarSetSuccessText),
    avatarErrorText: intl.formatMessage(messages.dashboardProgressAvatarSetModalAvatarSetErrorText),
    avatarInfoText: intl.formatMessage(messages.dashboardProgressAvatarSetModalAvatarSetInfoText),
    emptyAvatarSetText: intl.formatMessage(messages.dashboardProgressAvatarSetModalEmptyText),
    modalSupportText: intl.formatMessage(messages.dashboardProgressAvatarSetModalAvatarSetSupportText),
  };

  const counterLabelText = isRtl ? `:${translations.counterText}` : `${translations.counterText}:`;

  const canShowForm = isIdle(update) && isIdle(select) && avatarSets.length > 0;

  const footerText = canShowForm
    ? `${counterLabelText} ${avatarSets?.length || 0}`
    : '';

  const getAlertContent = () => {
    if (update.isSuccess || select.isSuccess) {
      return {
        titleText: translations.avatarSuccessText,
        variant: 'success',
        icon: CheckCircleIcon,
      };
    }
    if (update.isError || select.isError) {
      return {
        titleText: translations.avatarErrorText,
        variant: 'danger',
        icon: ErrorIcon,
      };
    }
    return {
      titleText: translations.emptyAvatarSetText,
      variant: 'warning',
      icon: WarningIcon,
    };
  };

  let modalContent;
  if (update.isLoading || select.isLoading) {
    modalContent = <Loader className="text-center mb-4" />;
  } else if (!canShowForm) {
    const { titleText, variant, icon } = getAlertContent();
    modalContent = (
      <Alert title={titleText} variant={variant} icon={icon} />
    );
  } else {
    modalContent = (
      <>
        <p>{translations.modalSupportText}</p>
        <CardGrid columnSizes={{ xs: 12, lg: 6, xl: 4 }}>
          {avatarSets.map((avatarSet) => (
            <ProgressAvatar
              key={avatarSet.id}
              avatarSetData={avatarSet}
              isSelected={selectedAvatarSetId === avatarSet.id}
              onSelect={() => setSelectedAvatarSetId(avatarSet.id)}
              savedSelectedAvatarSetId={savedSelectedAvatarSetId}
              isAvatarSetSelectable
            />
          ))}
        </CardGrid>
      </>
    );
  }

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      handleClose={closeCallback}
      size="xl"
      hasCloseButton
      closeBtnTitle={translations.modalBtnCloseTitle}
      footerText={footerText}
      submitBtnOptions={{
        show: canShowForm,
        title: translations.saveAvatarSetBtnText,
        submitFn: () => (
          hasSelectedAvatarSet
            ? handleUpdateSelectedAvatarSet(selectedAvatarSetId)
            : handleSelectAvatarSet(selectedAvatarSetId)
        ),
        disabled: !selectedAvatarSetId,
      }}
    >
      {modalContent}
    </Modal>
  );
};

ProgressAvatarModal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired,
  avatarSets: PropTypes.arrayOf(AvatarSetsPropType),
  avatarProcessingStates: AvatarProcessingStatesPropType,
  selectedAvatarSetId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  hasSelectedAvatarSet: PropTypes.bool.isRequired,
  handleSelectAvatarSet: PropTypes.func.isRequired,
  setSelectedAvatarSetId: PropTypes.func.isRequired,
  savedSelectedAvatarSetId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleUpdateSelectedAvatarSet: PropTypes.func.isRequired,
};

ProgressAvatarModal.defaultProps = {
  title: '',
  avatarSets: [],
  selectedAvatarSetId: null,
  savedSelectedAvatarSetId: null,
};

export default ProgressAvatarModal;
