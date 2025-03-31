import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Button, breakpoints, useMediaQuery, Card as BaseCard, Badge,
} from '@openedx/paragon';

import { useTranslate } from '../../../i18n/utils';
import defaultAvatarSetPlaceholder from '../../../assets/images/image-placeholder.jpg';
import { useImageLoader } from '../../../generic/hooks';
import { GAMMA_ADMIN_BASE_URL } from '../../../constants';
import { getActualImageUrl } from './utils';

const ProgressAvatar = ({
  onSelect,
  isSelected,
  avatarSetData,
  isAvatarSetSelectable,
  savedSelectedAvatarSetId,
}) => {
  const isExtraSmall = useMediaQuery({ maxWidth: breakpoints.extraSmall.maxWidth });
  const isSavedUserAvatarSet = savedSelectedAvatarSetId === avatarSetData?.id;

  const messages = {
    avatarSetCardSelectBtnText: useTranslate('dashboard.progress-avatar-set.modal.avatar-set.card.select.btn'),
    avatarSetCardSelectedText: useTranslate('dashboard.progress-avatar-set.modal.avatar-set.card.selected.text'),
  };

  const actualImageUrl = getActualImageUrl(
    avatarSetData,
    isAvatarSetSelectable,
    GAMMA_ADMIN_BASE_URL,
    defaultAvatarSetPlaceholder,
  );

  const imageSrc = useImageLoader(actualImageUrl, defaultAvatarSetPlaceholder);

  const handleSelectAvatarSet = () => {
    if (!isAvatarSetSelectable) { return; }
    onSelect();
  };

  return (
    <BaseCard
      className={classNames('progress-avatar', {
        'avatar-selected': isSelected && !isSavedUserAvatarSet,
      })}
      style={{ width: isExtraSmall ? '100%' : '18rem' }}
      onClick={handleSelectAvatarSet}
    >
      <BaseCard.ImageCap
        className="card-item-image"
        src={imageSrc}
        srcAlt={avatarSetData.title}
      />
      <BaseCard.Header
        classNames="avatar-card-header"
        title={avatarSetData.title}
      />
      <BaseCard.Footer>
        {isAvatarSetSelectable && !isSavedUserAvatarSet && (
          <Button variant="outline-primary" block>
            {messages.avatarSetCardSelectBtnText}
          </Button>
        )}
        {isSavedUserAvatarSet && (
          <Badge variant="info">
            {messages.avatarSetCardSelectedText}
          </Badge>
        )}
      </BaseCard.Footer>
    </BaseCard>
  );
};

ProgressAvatar.propTypes = {
  isAvatarSetSelectable: PropTypes.bool,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  avatarSetData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    image: PropTypes.string,
    avatars: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        image: PropTypes.string,
      }),
    ),
  }),
  savedSelectedAvatarSetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ProgressAvatar.defaultProps = {
  isAvatarSetSelectable: false,
  isSelected: false,
  onSelect: () => {},
  avatarSetData: {
    id: null,
    title: '',
    image: '',
    avatars: [],
  },
};

export default ProgressAvatar;
