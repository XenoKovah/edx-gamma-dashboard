import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useTranslate } from '../../i18n/utils';
import { DashboardSection, DashboardSectionSlider, DashboardSectionContainer } from './components/sections';
import { ProgressBadge, ProgressBadgesModal } from './components/progress-badge';
import { SliderStatusesBlock } from './components/slider-statuses-block';
import { CORNER_BOTTOM, CORNER_TOP } from './components/constants';
import { SubHeader } from '../sub-header';
import { StatusPropType } from '../propTypes';
import { BadgeItemPropType, ChartDataPropType, ProgressDataPropType } from './propTypes';
import { PointsDistributionChart, ProgressChart } from './charts';

const PREVIEW_BADGES_ITEMS_COUNT = 3;

const DashboardWrapper = ({
  statusItems, badgeItems, progress, chart,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const previewBadgeItems = badgeItems.slice(0, PREVIEW_BADGES_ITEMS_COUNT);
  const points = statusItems[0]?.points;
  const doneStatuses = statusItems.filter((item) => points >= item.statusPoints);

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
            <DashboardSection fullWidth corner={CORNER_TOP}>
              <SliderStatusesBlock
                status={messages.performanceSectionCounter}
                statusItems={statusItems}
              />
            </DashboardSection>
          </DashboardSectionContainer>
          <DashboardSectionContainer>
            <DashboardSectionSlider
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
            <DashboardSection>
              <PointsDistributionChart data={chart} />
            </DashboardSection>
          </DashboardSectionContainer>
          <DashboardSectionContainer>
            <DashboardSection fullWidth corner={CORNER_BOTTOM}>
              <ProgressChart data={progress} />
            </DashboardSection>
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
    </>
  );
};

DashboardWrapper.propTypes = {
  statusItems: PropTypes.arrayOf(PropTypes.shape(StatusPropType)),
  badgeItems: PropTypes.arrayOf(BadgeItemPropType),
  progress: ProgressDataPropType,
  chart: ChartDataPropType,
};

DashboardWrapper.defaultProps = {
  statusItems: [],
  badgeItems: [],
  progress: {},
  chart: {},
};

export default DashboardWrapper;
