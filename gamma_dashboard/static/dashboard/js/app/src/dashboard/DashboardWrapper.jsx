import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Info as InfoIcon, Warning as WarningIcon } from '@openedx/paragon/icons';
import { ErrorBoundary } from 'react-error-boundary';

import { useTranslate } from '../i18n/utils';
import { SubHeader, Alert, ErrorFallback } from '../generic';
import {
  DashboardSection,
  DashboardSectionSlider,
  DashboardSectionContainer,
  DashboardSectionAvatar,
} from './components/sections';
import { ProgressBadge, ProgressBadgesModal } from './components/progress-badge';
import { ProgressAvatar, ProgressAvatarModal } from './components/progress-avatar';
import { SliderStatusesBlock } from './components/slider-statuses-block';
import { CORNER_BOTTOM, CORNER_TOP } from './components/constants';
import {
  BadgeItemPropType, ChartDataPropType, ProgressDataPropType, StatusPropType,
} from './propTypes';
import { PointsDistributionChart, ProgressChart } from './charts';

const PREVIEW_BADGES_ITEMS_COUNT = 3;

const DashboardWrapper = ({
  chart,
  progress,
  badgeItems,
  avatarSets,
  isUpdating,
  updateError,
  statusItems,
  updateSuccess,
  gammaUserInfo,
  setUpdateError,
  setUpdateSuccess,
  handleSelectAvatarSet,
  handleUpdateSelectedAvatarSet,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedAvatarSetId, setSelectedAvatarSetId] = useState(null);

  const previewBadgeItems = badgeItems.slice(0, PREVIEW_BADGES_ITEMS_COUNT);
  const points = statusItems[0]?.points;
  const doneStatuses = statusItems.filter((item) => points >= item.statusPoints);
  const hasSelectedAvatarSet = Boolean(gammaUserInfo?.user_avatar_set_info);
  const hasCompletedAvatarSet = Boolean(gammaUserInfo?.user_avatar_set_info?.selected_avatar_id);

  const savedSelectedAvatarSetId = gammaUserInfo?.user_avatar_set_info?.selected_avatar_set_id;
  const selectedAvatarId = gammaUserInfo?.user_avatar_set_info?.selected_avatar_id;

  const completedAvatar = useMemo(() => {
    if (!avatarSets || !savedSelectedAvatarSetId || !selectedAvatarId) { return null; }

    for (const set of avatarSets) {
      if (set.id === savedSelectedAvatarSetId) {
        return set.avatars?.find(avatar => avatar.id === selectedAvatarId) || null;
      }
    }

    return null;
  }, [avatarSets, savedSelectedAvatarSetId, selectedAvatarId]);

  const messages = {
    subHeaderTitle: useTranslate('performance.heading.text'),
    performanceSectionCounter: useTranslate('performance.section.counter.text', {
      previewBadgeItemsLength: doneStatuses.length,
      badgeItemsLength: statusItems.length,
    }),
    badgesSectionTitle: useTranslate('performance.badges.section.heading.text'),
    badgesSectionDescription: useTranslate('performance.badges.section.description.text'),
    badgesSectionBtnTitle: useTranslate('performance.badges.section.badges.button.text'),
    badgesSectionAllBadgesBtnTitle: useTranslate('performance.badges.section.all.badges.button.text'),
    avatarSectionTitle: useTranslate('performance.avatar.section.title.text'),
    avatarSectionDescription: useTranslate('performance.avatar.section.description.text'),
    avatarSectionBtnTitle: useTranslate('performance.avatar.section.avatar-sets.button.text'),
    avatarSetsModalTitle: useTranslate('dashboard.progress-avatar-set.modal.title'),
    alertAvatarSetNotCompletedTitle: useTranslate('dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.title'),
    alertAvatarSetNotCompletedText: useTranslate('dashboard.progress-avatar-set.modal.alert.avatar-set-not-completed.text'),
    alertAvatarSetNotSelectedTitle: useTranslate('dashboard.progress-avatar-set.modal.alert.avatar-set-not-selected.title'),
    alertAvatarSetNotSelectedText: useTranslate('dashboard.progress-avatar-set.modal.alert.avatar-set-not-selected.text'),
  };

  const handleCloseProgressAvatarModal = () => {
    setIsAvatarModalOpen(false);
    setSelectedAvatarSetId(null);
    setUpdateSuccess(false);
    setUpdateError(false);
  };

  return (
    <>
      <div className="dashboard-page" data-testid="dashboard-page">
        <SubHeader
          id="dashboard-page-title"
          title={messages.subHeaderTitle}
        />
        <div className="dashboard-page-body">

            <DashboardSectionContainer>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
              >
                <DashboardSectionAvatar
                  title={messages.avatarSectionTitle}
                  content={messages.avatarSectionDescription}
                  items={
                    hasCompletedAvatarSet ? (
                      <ProgressAvatar avatarSetData={completedAvatar} />
                    ) : (
                      <Alert
                        className="mb-0"
                        variant={hasSelectedAvatarSet ? 'warning' : 'info'}
                        icon={hasSelectedAvatarSet ? WarningIcon : InfoIcon}
                        title={
                          hasSelectedAvatarSet
                            ? messages.alertAvatarSetNotCompletedTitle
                            : messages.alertAvatarSetNotSelectedTitle
                        }
                      >
                        <p>
                          {hasSelectedAvatarSet
                            ? messages.alertAvatarSetNotCompletedText
                            : messages.alertAvatarSetNotSelectedText}
                        </p>
                      </Alert>
                    )
                  }
                  buttonData={{
                    title: messages.avatarSectionBtnTitle,
                    onClick: () => {
                      setModalData(badgeItems);
                      setIsAvatarModalOpen(true);
                    },
                  }}
                />
              </ErrorBoundary>

              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
              >
                <DashboardSection>
                  <PointsDistributionChart data={chart} />
                </DashboardSection>
              </ErrorBoundary>
            </DashboardSectionContainer>

          <DashboardSectionContainer>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => window.location.reload()}
            >
              <DashboardSectionSlider
                fullWidth
                title={messages.badgesSectionTitle}
                status={messages.performanceSectionCounter}
                content={messages.badgesSectionDescription}
                items={previewBadgeItems.map((item) => (
                  <ProgressBadge key={item} data={item[1]} />
                ))}
                buttonData={{
                  title: messages.badgesSectionBtnTitle,
                  onClick: () => {
                    setModalData(badgeItems);
                    setIsModalOpen(true);
                  },
                }}
              />
            </ErrorBoundary>
          </DashboardSectionContainer>
          {process.env.REACT_APP_SHOW_STATUS_BLOCK === 'true' && (
            <DashboardSectionContainer>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
              >
                <DashboardSection fullWidth corner={CORNER_TOP}>
                  <SliderStatusesBlock
                    status={messages.performanceSectionCounter}
                    statusItems={statusItems}
                  />
                </DashboardSection>
              </ErrorBoundary>
            </DashboardSectionContainer>
          )}
          <DashboardSectionContainer>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => window.location.reload()}
            >
              <DashboardSection fullWidth corner={CORNER_BOTTOM}>
                <ProgressChart data={progress} />
              </DashboardSection>
            </ErrorBoundary>
          </DashboardSectionContainer>
        </div>
      </div>
      <ProgressBadgesModal
        isOpen={isModalOpen}
        closeCallback={() => setIsModalOpen(false)}
        title={messages.badgesSectionAllBadgesBtnTitle}
        items={modalData}
        getItemDataFunction={(item) => item[1]}
      />
      <ProgressAvatarModal
        isOpen={isAvatarModalOpen}
        closeCallback={handleCloseProgressAvatarModal}
        title={messages.avatarSetsModalTitle}
        avatarSets={avatarSets}
        handleUpdateSelectedAvatarSet={handleUpdateSelectedAvatarSet}
        handleSelectAvatarSet={handleSelectAvatarSet}
        hasSelectedAvatarSet={hasSelectedAvatarSet}
        updateSuccess={updateSuccess}
        updateError={updateError}
        isUpdating={isUpdating}
        selectedAvatarSetId={selectedAvatarSetId}
        setSelectedAvatarSetId={setSelectedAvatarSetId}
        savedSelectedAvatarSetId={savedSelectedAvatarSetId}
      />
    </>
  );
};

DashboardWrapper.propTypes = {
  statusItems: PropTypes.arrayOf(PropTypes.shape(StatusPropType)),
  badgeItems: PropTypes.arrayOf(BadgeItemPropType),
  progress: ProgressDataPropType,
  chart: ChartDataPropType,
  avatarSets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
  gammaUserInfo: PropTypes.shape({
    user_avatar_set_info: PropTypes.shape({
      selected_avatar_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      selected_avatar_set_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
  handleUpdateSelectedAvatarSet: PropTypes.func,
  isUpdating: PropTypes.bool,
  updateSuccess: PropTypes.bool,
  updateError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.oneOf([null]),
  ]),
  setUpdateSuccess: PropTypes.func,
  setUpdateError: PropTypes.func,
  handleSelectAvatarSet: PropTypes.func,
};

DashboardWrapper.defaultProps = {
  statusItems: [],
  badgeItems: [],
  progress: {},
  chart: {},
  avatarSets: [],
  gammaUserInfo: {},
  handleUpdateSelectedAvatarSet: () => {},
  isUpdating: false,
  updateSuccess: false,
  updateError: null,
  setUpdateSuccess: () => {},
  setUpdateError: () => {},
  handleSelectAvatarSet: () => {},
};

export default DashboardWrapper;
