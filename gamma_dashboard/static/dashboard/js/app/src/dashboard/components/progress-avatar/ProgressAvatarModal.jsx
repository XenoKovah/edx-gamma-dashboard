import React from 'react';
import PropTypes from 'prop-types';
import { CardGrid } from '@openedx/paragon';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
} from '@openedx/paragon/icons';

import { useTranslate } from '../../../i18n/utils';
import { isRtl } from '../../../constants';
import { Modal, Loader, Alert } from '../../../generic';
import ProgressAvatar from './ProgressAvatar';

const ProgressAvatarModal = ({
  title,
  isOpen,
  avatarSets,
  isUpdating,
  updateError,
  closeCallback,
  updateSuccess,
  selectedAvatarSetId,
  hasSelectedAvatarSet,
  handleSelectAvatarSet,
  setSelectedAvatarSetId,
  savedSelectedAvatarSetId,
  handleUpdateSelectedAvatarSet,
}) => {
  const messages = {
    modalBtnCloseTitle: useTranslate('dashboard.progress-avatar.modal.button.close.text'),
    counterText: useTranslate('performance.avatar.section.total.avatar-sets.button.text'),
    saveAvatarSetBtnText: useTranslate('dashboard.progress-avatar-set.modal.avatar-set.save.btn'),
    avatarSuccessText: useTranslate('dashboard.progress-avatar-set.modal.avatar-set.success.text'),
    avatarErrorText: useTranslate('dashboard.progress-avatar-set.modal.avatar-set.error.text'),
    avatarInfoText: useTranslate('dashboard.progress-avatar-set.modal.avatar-set.info.text'),
    emptyAvatarSetText: useTranslate('dashboard.progress-avatar-set.modal.empty.text'),
  };

  const counterLabelText = isRtl ? `:${messages.counterText}` : `${messages.counterText}:`;

  const canShowForm = !isUpdating && !updateSuccess && !updateError && avatarSets.length > 0;

  const footerText = canShowForm
    ? `${counterLabelText} ${avatarSets?.length || 0}`
    : '';

  const getAlertContent = () => {
    if (updateSuccess) {
      return {
        title: messages.avatarSuccessText,
        variant: 'success',
        icon: CheckCircleIcon,
      };
    }
    if (updateError) {
      return {
        title: messages.avatarErrorText,
        variant: 'danger',
        icon: ErrorIcon,
      };
    }
    return {
      title: messages.emptyAvatarSetText,
      variant: 'warning',
      icon: WarningIcon,
    };
  };

  let modalContent;
  if (isUpdating) {
    modalContent = <Loader className="text-center mb-4" />;
  } else if (!canShowForm) {
    const alertContent = getAlertContent();
    modalContent = (
      <Alert
        title={alertContent.title}
        variant={alertContent.variant}
        icon={alertContent.icon}
      />
    );
  } else {
    modalContent = (
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
  isOpen: PropTypes.bool,
  closeCallback: PropTypes.func,
  avatarSets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      avatars: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          title: PropTypes.string,
          description: PropTypes.string,
          image: PropTypes.string.isRequired,
          rules: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
              event_configuration: PropTypes.number,
              action: PropTypes.objectOf(PropTypes.string),
              filters: PropTypes.object, // eslint-disable-line react/forbid-prop-types
              created_at: PropTypes.string,
            }),
          ),
          stage: PropTypes.string,
          created_at: PropTypes.string,
        }),
      ).isRequired,
    }),
  ),
  handleUpdateSelectedAvatarSet: PropTypes.func,
  updateSuccess: PropTypes.bool,
  updateError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null]),
  ]),
  isUpdating: PropTypes.bool,
  selectedAvatarSetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectedAvatarSetId: PropTypes.func,
  savedSelectedAvatarSetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasSelectedAvatarSet: PropTypes.bool,
  handleSelectAvatarSet: PropTypes.func,
};

ProgressAvatarModal.defaultProps = {
  title: '',
  isOpen: false,
  closeCallback: () => {},
  avatarSets: [],
  handleUpdateSelectedAvatarSet: () => {},
  updateSuccess: false,
  updateError: null,
  isUpdating: false,
  selectedAvatarSetId: null,
  setSelectedAvatarSetId: () => {},
  savedSelectedAvatarSetId: null,
  hasSelectedAvatarSet: false,
  handleSelectAvatarSet: () => {},
};

export default ProgressAvatarModal;
