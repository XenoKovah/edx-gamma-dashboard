import { useState, useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';

import messages from '../../i18n';

const PREVIEW_BADGES_ITEMS_COUNT = 10;

export const useDashboardWrapper = ({
  badgeItems,
  statusItems,
  avatarSets,
  gammaUserInfo,
  avatarResetProcessingMutations,
}) => {
  const intl = useIntl();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedAvatarSetId, setSelectedAvatarSetId] = useState(null);

  // Active badges sorted: earned (done) first, then not-yet-earned; alphabetical by title within each group.
  const sortedActiveBadges = useMemo(
    () => badgeItems
      .filter(([, badge]) => badge.isActive)
      .sort(([, a], [, b]) => {
        if (Boolean(a.done) !== Boolean(b.done)) {
          return a.done ? -1 : 1;
        }
        return (a.title || '').localeCompare(b.title || '', undefined, { sensitivity: 'base' });
      }),
    [badgeItems],
  );

  const previewBadgeItems = useMemo(
    () => sortedActiveBadges.slice(0, PREVIEW_BADGES_ITEMS_COUNT),
    [sortedActiveBadges],
  );

  const doneBadgeItems = useMemo(
    () => sortedActiveBadges.filter(([, badge]) => badge.done),
    [sortedActiveBadges],
  );

  const points = statusItems[0]?.points || 0;
  const doneStatuses = useMemo(
    () => statusItems.filter((item) => points >= item.statusPoints),
    [statusItems, points],
  );

  const hasSelectedAvatarSet = Boolean(gammaUserInfo?.avatarSet);
  const hasCompletedAvatarSet = Boolean(gammaUserInfo?.avatar);

  const savedSelectedAvatarSetId = gammaUserInfo?.avatarSet;
  const selectedAvatarId = gammaUserInfo?.avatar?.id;

  const getItemDataFunction = (item) => item[1];

  const filteredActiveBadges = sortedActiveBadges;

  const completedAvatar = useMemo(() => {
    if (!avatarSets || !savedSelectedAvatarSetId || !selectedAvatarId) { return null; }

    const selectedSet = avatarSets.find((set) => set.id === savedSelectedAvatarSetId);
    return selectedSet?.avatars?.find((avatar) => avatar.id === selectedAvatarId) || null;
  }, [avatarSets, savedSelectedAvatarSetId, selectedAvatarId]);

  const handleOpenModal = useCallback((type) => {
    switch (type) {
      case 'avatar':
        setIsAvatarModalOpen(true);
        break;
      case 'badges':
        setIsModalOpen(true);
        break;
      default:
        // eslint-disable-next-line no-console
        console.warn(`Unknown modal type: ${type}`);
    }
  }, [badgeItems]);

  const translations = useMemo(() => ({
    subHeaderTitle: intl.formatMessage(messages.performanceHeadingText),
    performanceSectionCounter: intl.formatMessage(messages.performanceSectionCounterText, {
      completedStatuses: doneStatuses.length,
      totalStatuses: statusItems.length,
    }),
    badgeSectionCounter: intl.formatMessage(messages.badgesSectionCounterText, {
      completedBadgeItemsLength: doneBadgeItems.length,
      badgeItemsLength: filteredActiveBadges.length,
    }),
    badgesSectionTitle: intl.formatMessage(messages.performanceBadgesSectionHeadingText),
    badgesSectionDescription: intl.formatMessage(messages.performanceBadgesSectionDescriptionText),
    badgesSectionBtnTitle: intl.formatMessage(messages.performanceBadgesSectionBadgesButtonText),
    badgesSectionAllBadgesBtnTitle: intl.formatMessage(messages.performanceBadgesSectionAllBadgesButtonText),
    avatarSectionTitle: intl.formatMessage(messages.performanceAvatarSectionTitleText),
    avatarSectionDescription: intl.formatMessage(messages.performanceAvatarSectionDescriptionText),
    avatarSectionBtnTitle: intl.formatMessage(messages.performanceAvatarSectionAvatarSetsButtonText),
    avatarSetsModalTitle: intl.formatMessage(messages.dashboardProgressAvatarSetModalTitle),
    alertAvatarSetNotCompletedTitle: intl.formatMessage(
      messages.dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedTitle,
    ),
    alertAvatarSetNotCompletedText: intl.formatMessage(
      messages.dashboardProgressAvatarSetModalAlertAvatarSetNotCompletedText,
    ),
    alertAvatarSetNotSelectedTitle: intl.formatMessage(
      messages.dashboardProgressAvatarSetModalAlertAvatarSetNotSelectedTitle,
    ),
    alertAvatarSetNotSelectedText: intl.formatMessage(
      messages.dashboardProgressAvatarSetModalAlertAvatarSetNotSelectedText,
    ),
    alertBadgesEmptyListTitle: intl.formatMessage(
      messages.performanceBadgesSectionAlertNoBadgesTitle,
    ),
    alertBadgesEmptyListDescription: intl.formatMessage(
      messages.performanceBadgesSectionAlertNoBadgesDescription,
    ),
  }), [intl, doneStatuses, statusItems, doneBadgeItems, badgeItems]);

  const handleCloseProgressAvatarModal = () => {
    setIsAvatarModalOpen(false);
    setSelectedAvatarSetId(null);
    avatarResetProcessingMutations.all();
  };

  return {
    isModalOpen,
    translations,
    setIsModalOpen,
    completedAvatar,
    handleOpenModal,
    isAvatarModalOpen,
    previewBadgeItems,
    getItemDataFunction,
    filteredActiveBadges,
    selectedAvatarSetId,
    hasSelectedAvatarSet,
    hasCompletedAvatarSet,
    setSelectedAvatarSetId,
    savedSelectedAvatarSetId,
    handleCloseProgressAvatarModal,
  };
};
