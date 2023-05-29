import React from 'react';
import PropTypes from 'prop-types';

import ReactModal from 'react-modal';

import DashboardTableRow from './DashboardTableRow';
import DashboardTableRowBlock, {
    CORNER_TOP_LEFT,
    CORNER_TOP_RIGHT,
    CORNER_BOTTOM
} from './rowBlock/DashboardTableRowBlock';
import CustomRowBlock from './rowBlock/CustomRowBlock';
import PointsDistributionChart from './charts/PointsDistributionChart';
import ProgressChart from './charts/ProgressChart';
import StatusRoadmapChart from './charts/StatusRoadmapChart';
import RowBlockItem from './rowBlock/RowBlockItem';
import LogoDropdown from '../LogoDropdown';

import DashboardModalWindow from './DashboardModalWindow';
import Loader from '../utility/Loader';

import './../../styles/app/dashboard/table.scss';
import Button from '../utility/Button';


const PREVIEW_ITEMS_COUNT = 3;


ReactModal.setAppElement('body');

const DashboardTable = ({ statusItems, badgeItems, statusRoadmap, progress, chart }) => {
    const [ isModalOpen, setIsModalOpen ] = React.useState(false);
    const [ modalData, setModalData ] = React.useState({
        title: '',
        items: [],
        getItemDataFunction: item => item
    });

    const previewBadgeItems = badgeItems.slice(0, PREVIEW_ITEMS_COUNT);
    const previewStatusItems = statusItems.slice(0, PREVIEW_ITEMS_COUNT);

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
                    <DashboardTableRowBlock corner={CORNER_TOP_LEFT}>
                        <PointsDistributionChart data={chart} />
                    </DashboardTableRowBlock>
                    <DashboardTableRowBlock corner={CORNER_TOP_RIGHT}>
                        <StatusRoadmapChart
                            data={statusRoadmap.statuses}
                            points={statusRoadmap.points}
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
                    <CustomRowBlock
                        title={'Your Statuses'}
                        status={`${previewStatusItems.length} of ${statusItems.length}`}
                        content={'The more points you have, the higher status you own. Hover on a badge to know how many points you need to have it.'}
                        items={previewStatusItems.map((item, index) => (
                            <RowBlockItem
                                key={index}
                                data={item}
                            >
                            </RowBlockItem>
                        ))}
                        buttonData={{
                            title: 'Status',
                            onClick: () => {
                                setModalData({
                                    title: 'All Statuses',
                                    items: statusItems,
                                    getItemDataFunction: item => item
                                });
                                setIsModalOpen(true);
                            }
                        }}

                    />
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
    statusRoadmap: PropTypes.shape({
        points: PropTypes.number,
        statuses: PropTypes.array
    }),
    progress: PropTypes.object,
    chart: PropTypes.object,
};

DashboardTable.defaultProps = {
    statusItems: [],
    badgeItems: [],
    statusRoadmap: {
        points: 0,
        statuses: []
    },
    progress: {},
    chart: {}
};

export default DashboardTable;
