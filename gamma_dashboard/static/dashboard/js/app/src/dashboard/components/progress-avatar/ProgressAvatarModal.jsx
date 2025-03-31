import React from 'react';
import PropTypes from 'prop-types';
import { CardGrid } from '@openedx/paragon';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
} from '@openedx/paragon/icons';

import { AvatarProcessingStatesPropType, AvatarSetsPropType } from '../../propTypes';
import { useTranslate } from '../../../i18n/utils';
import { isRtl } from '../../../constants';
import { Modal, Loader, Alert } from '../../../generic';
import ProgressAvatar from './ProgressAvatar';
import { isIdle } from './utils';

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
  const {
    details: { update, select },
  } = avatarProcessingStates;

  const messages = {
    modalBtnCloseTitle: useTranslate('dashboard.progress-avatar.modal.button.close.text'),
    counterText: useTranslate('performance.avatar.section.total.avatar-sets.button.text'),
    saveAvatarSetBtnText: useTranslate('dashboard.progress-avatar-set.modal.avatar-set.save.btn'),
    avatarSuccessText: useTranslate('dashboard.progress-avatar-set.modal.avatar-set.success.text'),
    avatarErrorText: useTranslate('dashboard.progress-avatar-set.modal.avatar-set.error.text'),
    avatarInfoText: useTranslate('dashboard.progress-avatar-set.modal.avatar-set.info.text'),
    emptyAvatarSetText: useTranslate('dashboard.progress-avatar-set.modal.empty.text'),
    modalSupportText: useTranslate('dashboard.progress-avatar-set.modal.avatar-set.support.text'),
  };

  const counterLabelText = isRtl ? `:${messages.counterText}` : `${messages.counterText}:`;

  const canShowForm = isIdle(update) && isIdle(select) && avatarSets.length > 0;

  const footerText = canShowForm
    ? `${counterLabelText} ${avatarSets?.length || 0}`
    : '';

  const getAlertContent = () => {
    if (update.isSuccess || select.isSuccess) {
      return {
        titleText: messages.avatarSuccessText,
        variant: 'success',
        icon: CheckCircleIcon,
      };
    }
    if (update.isError || select.isError) {
      return {
        titleText: messages.avatarErrorText,
        variant: 'danger',
        icon: ErrorIcon,
      };
    }
    return {
      titleText: messages.emptyAvatarSetText,
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
        <p>{messages.modalSupportText}</p>
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
      closeBtnTitle={messages.modalBtnCloseTitle}
      footerText={footerText}
      submitBtnOptions={{
        show: canShowForm,
        title: messages.saveAvatarSetBtnText,
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
  avatarSets: AvatarSetsPropType,
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
