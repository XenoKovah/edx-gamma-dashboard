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
  DashboardSectionPointsVault,
} from './components/sections';
import { ProgressBadge, ProgressBadgesModal } from './components/progress-badge';
import { ProgressAvatar, ProgressAvatarModal } from './components/progress-avatar';
import { SliderStatusesBlock } from './components/slider-statuses-block';
import { CORNER_BOTTOM, CORNER_TOP } from './components/constants';
import {
  BadgeItemPropType, ChartDataPropType, ProgressDataPropType,
  StatusPropType, AvatarProcessingStatesPropType, AvatarSetsPropType,
} from './propTypes';
import { PointsDistributionChart, ProgressChart } from './charts';
import { useDashboardWrapper } from './hooks';
import { WIDGETS, SHOW_STATUS_BLOCK } from './constants';

const DashboardWrapper = ({
  chart,
  progress,
  badgeItems,
  avatarSets,
  statusItems,
  gammaUserInfo,
  avatarHandlers,
  statusRoadmap,
}) => {
  const {
    handleSelectAvatarSet,
    avatarProcessingStates,
    handleUpdateSelectedAvatarSet,
    avatarResetProcessingMutations,
  } = avatarHandlers;

  const {
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
            {renderErrorBoundary(
              <DashboardSectionPointsVault points={statusRoadmap?.points} />,
            )}
          </DashboardSectionContainer>
          <DashboardSectionContainer>
            {renderErrorBoundary(
              <DashboardSectionSlider
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
            {renderErrorBoundary(
              <DashboardSection>
                <PointsDistributionChart data={chart} />
              </DashboardSection>,
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
          <DashboardSectionContainer>
            {renderErrorBoundary(
              <DashboardSection fullWidth corner={CORNER_BOTTOM}>
                <ProgressChart data={progress} />
              </DashboardSection>,
            )}
          </DashboardSectionContainer>
        </div>
      </div>
      <ProgressBadgesModal
        isOpen={isModalOpen}
        closeCallback={() => setIsModalOpen(false)}
        title={translations.badgesSectionAllBadgesBtnTitle}
        filteredActiveBadges={filteredActiveBadges}
        getItemDataFunction={getItemDataFunction}
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
  badgeItems: BadgeItemPropType,
  avatarSets: PropTypes.arrayOf(AvatarSetsPropType),
  statusItems: PropTypes.arrayOf(PropTypes.shape(StatusPropType)),
  gammaUserInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
    avatarSet: PropTypes.number.isRequired,
    avatar: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rules: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        action: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
        filters: PropTypes.oneOfType([
          PropTypes.objectOf(PropTypes.string),
          PropTypes.shape({
            interval: PropTypes.shape({
              start: PropTypes.string.isRequired,
              end: PropTypes.string.isRequired,
            }),
          }),
        ]),
        createdAt: PropTypes.string.isRequired,
      })).isRequired,
      stage: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  }),
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
  statusRoadmap: PropTypes.shape({
    points: PropTypes.number.isRequired,
  }).isRequired,
};

DashboardWrapper.defaultProps = {
  chart: {},
  progress: {},
  badgeItems: [],
  avatarSets: [],
  statusItems: [],
  gammaUserInfo: null,
};

export default DashboardWrapper;
