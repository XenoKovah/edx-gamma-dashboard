import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { useTranslate } from '../../i18n/utils';
import LogoDropdown from '../LogoDropdown';
import DashboardTableRow from './DashboardTableRow';
import DashboardTableRowBlock from './rowBlock/DashboardTableRowBlock';
import CustomRowBlock from './rowBlock/CustomRowBlock';
import { PointsDistributionChart, ProgressChart } from './charts';
import RowBlockItem from './rowBlock/RowBlockItem';
import StatusesBlock from './rowBlock/statusesBlock/StatusesBlock';
import DashboardModalWindow from './DashboardModalWindow';
import { CORNER_BOTTOM, CORNER_TOP } from './rowBlock/constants';

const PREVIEW_BADGES_ITEMS_COUNT = 3;

ReactModal.setAppElement('body');

const DashboardTable = ({
  statusItems, badgeItems, progress, chart,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const previewBadgeItems = badgeItems.slice(0, PREVIEW_BADGES_ITEMS_COUNT);
  const points = statusItems[0]?.points;
  const doneStatuses = statusItems.filter((item) => points >= item.statusPoints);

  return (
    <>
      <div className="dashboard-table" data-testid="dashboard-table">
        <div className="gamification-title-wrapper d-flex justify-content-between align-items-center">
          <h1 className="DashboardTitle" data-testid="dashboard-page-title">
            {useTranslate('performance.heading.text')}
          </h1>
          <LogoDropdown />
        </div>
        <div className="dashboard-table-body">
          <DashboardTableRow>
            <DashboardTableRowBlock fullWidth corner={CORNER_TOP}>
              <StatusesBlock
                status={
                  useTranslate('performance.section.counter.text', {
                    previewBadgeItemsLength: doneStatuses.length,
                    badgeItemsLength: statusItems.length,
                  })
                }
                statusItems={statusItems}
              />
            </DashboardTableRowBlock>
          </DashboardTableRow>
          <DashboardTableRow>
            <CustomRowBlock
              title={useTranslate('performance.badges.section.heading.text')}
              status={
                useTranslate('performance.section.counter.text', {
                  previewBadgeItemsLength: previewBadgeItems.length,
                  badgeItemsLength: badgeItems.length,
                })
              }
              content={useTranslate('performance.badges.section.description.text')}
              items={previewBadgeItems.map((item) => (
                <RowBlockItem
                  key={item}
                  data={item[1]}
                />
              ))}
              buttonData={{
                title: useTranslate('performance.badges.section.badges.button.text'),
                onClick: () => {
                  setModalData(badgeItems);
                  setIsModalOpen(true);
                },
              }}
            />
            <DashboardTableRowBlock>
              <PointsDistributionChart data={chart} />
            </DashboardTableRowBlock>
          </DashboardTableRow>
          <DashboardTableRow>
            <DashboardTableRowBlock fullWidth corner={CORNER_BOTTOM}>
              <ProgressChart data={progress} />
            </DashboardTableRowBlock>
          </DashboardTableRow>
        </div>
      </div>
      <DashboardModalWindow
        isOpen={isModalOpen}
        closeCallback={() => setIsModalOpen(false)}
        title={useTranslate('performance.badges.section.all.badges.button.text')}
        items={modalData}
        getItemDataFunction={(item) => item[1]}
      />
    </>
  );
};

const StatusItemPropType = PropTypes.shape({
  statusUid: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  active: PropTypes.bool.isRequired,
  statusPoints: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  color: PropTypes.string,
  url: PropTypes.string,
});

const BadgeItemPropType = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    progress: PropTypes.objectOf(
      PropTypes.shape({
        count: PropTypes.number.isRequired,
        goal: PropTypes.number.isRequired,
      }),
    ),
    done: PropTypes.bool,
    active: PropTypes.bool,
    points: PropTypes.number,
    statusPoints: PropTypes.number,
  }),
);

const ProgressDataPropType = PropTypes.objectOf(
  PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
    }),
  ),
);

const ChartDataPropType = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      points: PropTypes.number.isRequired,
      title: PropTypes.string,
    }),
  ]),
);

DashboardTable.propTypes = {
  statusItems: PropTypes.arrayOf(StatusItemPropType),
  badgeItems: PropTypes.arrayOf(BadgeItemPropType),
  progress: ProgressDataPropType,
  chart: ChartDataPropType,
};

DashboardTable.defaultProps = {
  statusItems: [],
  badgeItems: [],
  progress: {},
  chart: {},
};

export default DashboardTable;
