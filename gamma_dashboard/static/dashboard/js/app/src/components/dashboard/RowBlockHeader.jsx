import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/app/dashboard/table-row-block-header.scss';

const RowBlockHeader = ({ title, status, description}) => {
    return (
        <div
            className={'table-row-block-header'}
            data-testid={'table-row-block-header'}
        >
            <div className={'table-row-block-title'} data-testid={'row-block-title'}>
                {title}
            </div>
            <div className={'table-row-block-status'} data-testid={'row-block-status'}>
                <span>{status}</span>
            </div>
            <div className={'table-row-block-description'} data-testid={'row-block-description'}>
                {description}
            </div>
        </div>
    );
}

RowBlockHeader.propTypes = {
    title: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string
};

export default RowBlockHeader;
