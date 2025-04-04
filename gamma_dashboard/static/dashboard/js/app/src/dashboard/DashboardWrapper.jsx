import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { Info as InfoIcon, Warning as WarningIcon } from '@openedx/paragon/icons';

import { SubHeader, ErrorFallback, Alert } from '../generic';
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
  SHOW_POINTS_DISTRIBUTION_CHART,
} from '../featureFlags';
import {
  BadgeItemPropType, ChartDataPropType, ProgressDataPropType,
  StatusPropType, AvatarProcessingStatesPropType, AvatarSetsPropType,
} from './propTypes';
import { PointsDistributionChart, ProgressChart } from './charts';
import { useDashboardWrapper } from './hooks';

const WIDGETS = {
  BADGES: 'badges',
  AVATAR: 'avatar',
};

const DashboardWrapper = ({
  chart,
  progress,
  badgeItems,
  avatarSets,
  statusItems,
  gammaUserInfo,
  avatarHandlers,
}) => {
  const {
    handleSelectAvatarSet,
    avatarProcessingStates,
    handleUpdateSelectedAvatarSet,
    avatarResetProcessingMutations,
  } = avatarHandlers;

  const {
    modalData,
    isModalOpen,
    translations,
    setIsModalOpen,
    completedAvatar,
    handleOpenModal,
    isAvatarModalOpen,
    previewBadgeItems,
    selectedAvatarSetId,
    hasSelectedAvatarSet,
    hasCompletedAvatarSet,
    setSelectedAvatarSetId,
    savedSelectedAvatarSetId,
    handleCloseProgressAvatarModal,
  } = useDashboardWrapper({
    badgeItems,
    statusItems,
    avatarSets,
    gammaUserInfo,
    avatarResetProcessingMutations,
  });

  const renderErrorBoundary = (children) => (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      {children}
    </ErrorBoundary>
  );

  const renderItems = (type, options) => {
    switch (type) {
      case WIDGETS.BADGES: {
        if (!options.items.length) {
          return (
            <Alert
              className="mb-0 mx-3"
              variant="info"
              icon={InfoIcon}
              title={options.emptyTitle}
            >
              <p>{options.emptyDescription}</p>
            </Alert>
          );
        }

        return options.items.map((item) => <ProgressBadge key={item[0]} data={item[1]} />);
      }

      case WIDGETS.AVATAR: {
        if (options.hasCompletedAvatarSet) {
          return <ProgressAvatar avatarSetData={options.completedAvatar} />;
        }

        return (
          <Alert
            className="mb-0 mx-3"
            variant={options.hasSelectedAvatarSet ? 'warning' : 'info'}
            icon={options.hasSelectedAvatarSet ? WarningIcon : InfoIcon}
            title={
              options.hasSelectedAvatarSet
                ? options.translations.alertAvatarSetNotCompletedTitle
                : options.translations.alertAvatarSetNotSelectedTitle
            }
          >
            <p>
              {options.hasSelectedAvatarSet
                ? options.translations.alertAvatarSetNotCompletedText
                : options.translations.alertAvatarSetNotSelectedText}
            </p>
          </Alert>
        );
      }

      default:
        console.warn(`Unknown render type: ${type}`); // eslint-disable-line no-console
        return null;
    }
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
            {renderErrorBoundary(
              <DashboardSectionAvatar
                title={translations.avatarSectionTitle}
                content={translations.avatarSectionDescription}
                items={renderItems(WIDGETS.AVATAR, {
                  hasCompletedAvatarSet,
                  completedAvatar,
                  hasSelectedAvatarSet,
                  translations,
                })}
                buttonData={{
                  title: translations.avatarSectionBtnTitle,
                  onClick: () => handleOpenModal(WIDGETS.AVATAR),
                }}
              />,
            )}
            {SHOW_POINTS_DISTRIBUTION_CHART && renderErrorBoundary(
              <DashboardSection>
                <PointsDistributionChart data={chart} />
              </DashboardSection>,
            )}
          </DashboardSectionContainer>
          <DashboardSectionContainer>
            {renderErrorBoundary(
              <DashboardSectionSlider
                fullWidth
                title={translations.badgesSectionTitle}
                status={translations.badgeSectionCounter}
                content={translations.badgesSectionDescription}
                items={renderItems(WIDGETS.BADGES, {
                  items: previewBadgeItems,
                  emptyTitle: translations.alertBadgesEmptyListTitle,
                  emptyDescription: translations.alertBadgesEmptyListDescription,
                })}
                buttonData={{
                  title: translations.badgesSectionBtnTitle,
                  onClick: () => handleOpenModal(WIDGETS.BADGES),
                }}
              />,
            )}
          </DashboardSectionContainer>
          {SHOW_STATUS_BLOCK && (
            <DashboardSectionContainer>
              {renderErrorBoundary(
                <DashboardSection fullWidth corner={CORNER_TOP}>
                  <SliderStatusesBlock
                    status={translations.performanceSectionCounter}
                    statusItems={statusItems}
                  />
                </DashboardSection>,
              )}
            </DashboardSectionContainer>
          )}
          {SHOW_PROGRESS_CHART && (
            <DashboardSectionContainer>
              {renderErrorBoundary(
                <DashboardSection fullWidth corner={CORNER_BOTTOM}>
                  <ProgressChart data={progress} />
                </DashboardSection>,
              )}
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
  chart: ChartDataPropType,
  progress: ProgressDataPropType,
  badgeItems: PropTypes.arrayOf(BadgeItemPropType),
  avatarSets: PropTypes.arrayOf(AvatarSetsPropType),
  statusItems: PropTypes.arrayOf(PropTypes.shape(StatusPropType)),
  gammaUserInfo: PropTypes.shape({
    userAvatarConfig: PropTypes.shape({
      selectedAvatarId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      selectedAvatarSetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
  avatarHandlers: PropTypes.shape({
    handleSelectAvatarSet: PropTypes.func.isRequired,
    avatarProcessingStates: AvatarProcessingStatesPropType,
    handleUpdateSelectedAvatarSet: PropTypes.func.isRequired,
    avatarResetProcessingMutations: PropTypes.shape({
      all: PropTypes.func.isRequired,
      update: PropTypes.func.isRequired,
      select: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

DashboardWrapper.defaultProps = {
  chart: {},
  progress: {},
  badgeItems: [],
  avatarSets: [],
  statusItems: [],
};

export default DashboardWrapper;
