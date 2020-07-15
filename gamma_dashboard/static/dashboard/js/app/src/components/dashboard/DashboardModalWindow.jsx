import React from 'react';
import PropTypes from 'prop-types';

import RowBlockItem from './rowBlock/RowBlockItem';
import ModalWindow from '../utility/ModalWindow';

import '../../styles/app/dashboard/dashboard-modal-window.scss';

const DashboardModalWindow = ({ title, items, getItemDataFunction, children, ...props }) => {
    return (
        <ModalWindow {...props}>
            <div
                className={'dashboard-modal-window-title-bar'}
                data-testid={'dashboard-modal-window-title-bar'}
            >
                <div
                    className={'title'}
                    data-testid={'title'}
                >
                    {title}
                </div>
                <div className={'counter'}>
                    <span>
                        Total badges:
                    </span>&nbsp;
                    <span data-testid={'counter-value'}>
                        {items.length}
                    </span>
                </div>
            </div>
            <div
                className={'dashboard-modal-window-items-list'}
                data-testid={'dashboard-modal-window-items-list'}
            >
                {items.map((item, index) => (
                    <RowBlockItem
                        key={index}
                        data={getItemDataFunction(item)}
                        center
                    >
                    </RowBlockItem>
                ))}
            </div>
            {children}
        </ModalWindow>
    );
};

DashboardModalWindow.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
    getItemDataFunction: PropTypes.func
};

DashboardModalWindow.defaultProps = {
    title: '',
    items: [],
    getItemDataFunction: item => item
};

export default DashboardModalWindow;
