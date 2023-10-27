import React from 'react';
import PropTypes from 'prop-types';

import ReactModal from 'react-modal';

import DashboardTableRow from './DashboardTableRow';
import DashboardTableRowBlock, { CORNER_BOTTOM, CORNER_TOP } from './rowBlock/DashboardTableRowBlock';
import CustomRowBlock from './rowBlock/CustomRowBlock';
import PointsDistributionChart from './charts/PointsDistributionChart';
import ProgressChart from './charts/ProgressChart';
import RowBlockItem from './rowBlock/RowBlockItem';
import StatusesBlock from "./rowBlock/statusesBlock/StatusesBlock";

import LogoDropdown from '../LogoDropdown';
import DashboardModalWindow from './DashboardModalWindow';

import './../../styles/app/dashboard/table.scss';

const PREVIEW_BADGES_ITEMS_COUNT = 3;

ReactModal.setAppElement('body');

const DashboardTable = ({ statusItems, badgeItems, progress, chart }) => {
    const [ isModalOpen, setIsModalOpen ] = React.useState(false);
    const [ modalData, setModalData ] = React.useState({
        title: '',
        items: [],
        getItemDataFunction: item => item
    });

    const previewBadgeItems = badgeItems.slice(0, PREVIEW_BADGES_ITEMS_COUNT);
    const points = statusItems[0]?.points;
    const doneStatuses = statusItems.filter((item) => points >= item.statusPoints);

    return (
        <React.Fragment>
        <div className="dashboard-table" data-testid="dashboard-table">
            <div className="gamification-title-wrapper d-flex justify-content-between align-items-center">
                <h1 className="DashboardTitle" data-testid="dashboard-page-title">
                    Performance
                </h1>
                <LogoDropdown />
            </div>
            <div className="dashboard-table-body">
                <DashboardTableRow>
                    <DashboardTableRowBlock fullWidth corner={CORNER_TOP}>
                        <StatusesBlock
                          status={`${doneStatuses.length} of ${statusItems.length}`}
                          statusItems={statusItems}
                        />
                    </DashboardTableRowBlock>
                </DashboardTableRow>
                <DashboardTableRow>
                    <CustomRowBlock
                      title={'Your Badges'}
                      status={`${previewBadgeItems.length} of ${badgeItems.length}`}
                      content={'You get badges for specific combo actions on the platform. Hover on a badge what to do to get one.'}
                      items={previewBadgeItems.map((item, index) => {
                          return (
                            <RowBlockItem
                              key={index}
                              data={item[1]}
                            >
                            </RowBlockItem>
                          )})}
                      buttonData={{
                          title: 'Badges',
                          onClick: () => {
                              setModalData({
                                  title: 'All Badges',
                                  items: badgeItems,
                                  getItemDataFunction: item => item[1]
                              });
                              setIsModalOpen(true);
                          }
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
            title={modalData.title}
            items={modalData.items}
            getItemDataFunction={modalData.getItemDataFunction}
        >
        </DashboardModalWindow>
        </React.Fragment>
    )
};

DashboardTable.propTypes = {
    statusItems: PropTypes.array,
    badgeItems: PropTypes.array,
    progress: PropTypes.object,
    chart: PropTypes.object,
};

DashboardTable.defaultProps = {
    statusItems: [],
    badgeItems: [],
    progress: {},
    chart: {}
};

export default DashboardTable;
