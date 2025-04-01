import React, { useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Info as InfoIcon, Warning as WarningIcon } from '@openedx/paragon/icons';
import { ErrorBoundary } from 'react-error-boundary';

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
  SHOW_STATUS_BLOCK,
  SHOW_PROGRESS_CHART,
  SHOW_PROGRESS_BADGES,
  SHOW_POINTS_DISTRIBUTION_CHART,
} from '../featureFlags';
import {
  BadgeItemPropType, ChartDataPropType, ProgressDataPropType,
  StatusPropType, AvatarProcessingStatesPropType, AvatarSetsPropType,
} from './propTypes';
import { PointsDistributionChart, ProgressChart } from './charts';

import messages from '../i18n';

const PREVIEW_BADGES_ITEMS_COUNT = 3;

const DashboardWrapper = ({
  chart,
  progress,
  badgeItems,
  avatarSets,
  statusItems,
  avatarProcessingStates,
  avatarResetProcessingMutations,
  gammaUserInfo,
  handleSelectAvatarSet,
  handleUpdateSelectedAvatarSet,
}) => {
  const intl = useIntl();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [selectedAvatarSetId, setSelectedAvatarSetId] = useState(null);

  const previewBadgeItems = badgeItems.slice(0, PREVIEW_BADGES_ITEMS_COUNT);
  const points = statusItems[0]?.points;
  const doneStatuses = statusItems.filter((item) => points >= item.statusPoints);
  const hasSelectedAvatarSet = Boolean(gammaUserInfo.userAvatarSetInfo);
  const hasCompletedAvatarSet = Boolean(gammaUserInfo.userAvatarSetInfo?.selectedAvatarId);

  const savedSelectedAvatarSetId = gammaUserInfo.userAvatarSetInfo?.selectedAvatarSetId;
  const selectedAvatarId = gammaUserInfo.userAvatarSetInfo?.selectedAvatarId;

  const completedAvatar = useMemo(() => {
    if (!avatarSets || !savedSelectedAvatarSetId || !selectedAvatarId) { return null; }

    for (const set of avatarSets) {
      if (set.id === savedSelectedAvatarSetId) {
        return set.avatars?.find(avatar => avatar.id === selectedAvatarId) || null;
      }
    }

    return null;
  }, [avatarSets, savedSelectedAvatarSetId, selectedAvatarId]);

  const translations = {
    subHeaderTitle: intl.formatMessage(messages.performanceHeadingText),
    performanceSectionCounter: intl.formatMessage(messages.performanceSectionCounterText, {
      previewBadgeItemsLength: doneStatuses.length,
      badgeItemsLength: statusItems.length,
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
  };

  const handleCloseProgressAvatarModal = () => {
    setIsAvatarModalOpen(false);
    setSelectedAvatarSetId(null);

    avatarResetProcessingMutations.all();
  };

  return (
    <>
      <div className="dashboard-page" data-testid="dashboard-page">
        <SubHeader
          id="dashboard-page-title"
          title={translations.subHeaderTitle}
        />
        <div className="dashboard-page-body">

          <DashboardSectionContainer>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => window.location.reload()}
            >
              <DashboardSectionAvatar
                title={translations.avatarSectionTitle}
                content={translations.avatarSectionDescription}
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
                            ? translations.alertAvatarSetNotCompletedTitle
                            : translations.alertAvatarSetNotSelectedTitle
                        }
                      >
                        <p>
                          {hasSelectedAvatarSet
                            ? translations.alertAvatarSetNotCompletedText
                            : translations.alertAvatarSetNotSelectedText}
                        </p>
                      </Alert>
                    )
                  }
                buttonData={{
                  title: translations.avatarSectionBtnTitle,
                  onClick: () => {
                    setModalData(badgeItems);
                    setIsAvatarModalOpen(true);
                  },
                }}
              />
            </ErrorBoundary>
            {SHOW_POINTS_DISTRIBUTION_CHART && (
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
              >
                <DashboardSection>
                  <PointsDistributionChart data={chart} />
                </DashboardSection>
              </ErrorBoundary>
            )}
          </DashboardSectionContainer>

          {SHOW_PROGRESS_BADGES && (
            <DashboardSectionContainer>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
              >
                <DashboardSectionSlider
                  fullWidth
                  title={translations.badgesSectionTitle}
                  status={translations.performanceSectionCounter}
                  content={translations.badgesSectionDescription}
                  items={previewBadgeItems.map((item) => (
                    <ProgressBadge key={item} data={item[1]} />
                  ))}
                  buttonData={{
                    title: translations.badgesSectionBtnTitle,
                    onClick: () => {
                      setModalData(badgeItems);
                      setIsModalOpen(true);
                    },
                  }}
                />
              </ErrorBoundary>
            </DashboardSectionContainer>
          )}
          {SHOW_STATUS_BLOCK && (
            <DashboardSectionContainer>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onReset={() => window.location.reload()}
              >
                <DashboardSection fullWidth corner={CORNER_TOP}>
                  <SliderStatusesBlock
                    status={translations.performanceSectionCounter}
                    statusItems={statusItems}
                  />
                </DashboardSection>
              </ErrorBoundary>
            </DashboardSectionContainer>
          )}
          {SHOW_PROGRESS_CHART && (
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
          )}
        </div>
      </div>
      <ProgressBadgesModal
        isOpen={isModalOpen}
        closeCallback={() => setIsModalOpen(false)}
        title={translations.badgesSectionAllBadgesBtnTitle}
        items={modalData}
        getItemDataFunction={(item) => item[1]}
      />
      <ProgressAvatarModal
        isOpen={isAvatarModalOpen}
        closeCallback={handleCloseProgressAvatarModal}
        title={translations.avatarSetsModalTitle}
        avatarSets={avatarSets}
        handleUpdateSelectedAvatarSet={handleUpdateSelectedAvatarSet}
        handleSelectAvatarSet={handleSelectAvatarSet}
        hasSelectedAvatarSet={hasSelectedAvatarSet}
        avatarProcessingStates={avatarProcessingStates}
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
  avatarSets: AvatarSetsPropType,
  gammaUserInfo: PropTypes.shape({
    userAvatarSetInfo: PropTypes.shape({
      selectedAvatarId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      selectedAvatarSetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
  avatarProcessingStates: AvatarProcessingStatesPropType,
  avatarResetProcessingMutations: PropTypes.shape({
    all: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
  }).isRequired,
  handleUpdateSelectedAvatarSet: PropTypes.func.isRequired,
  handleSelectAvatarSet: PropTypes.func.isRequired,
};

DashboardWrapper.defaultProps = {
  statusItems: [],
  badgeItems: [],
  progress: {},
  chart: {},
};

export default DashboardWrapper;
