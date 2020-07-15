import React from 'react';
import PropTypes from 'prop-types';

import DashboardTableRowBlock from './DashboardTableRowBlock';
import RowBlockHeader from '../RowBlockHeader';
import Button from '../../utility/Button';

import '../../../styles/app/dashboard/custom-row-block.scss';


const CustomRowBlock = ({
    title,
    status,
    description,
    content,
    items,
    buttonData: {
        title: buttonTitle,
        onClick: buttonOnClick
    }
}) => {

    return (
        <DashboardTableRowBlock>
            <RowBlockHeader
                title={title}
                status={status}
                description={description}
            />
            <p
                className={'row-block-text'}
                data-testid={'row-block-text'}
            >
                {content}
            </p>
            <div
                className={'row-block-items-list'}
                data-testid={'row-block-items-list'}
            >
                {items}
            </div>
            <div className={'row-block-controls'}>
                <Button
                    data-testid={'details-button'}
                    title={buttonTitle}
                    onClick={() => buttonOnClick()}
                />
            </div>
        </DashboardTableRowBlock>
    )
};

CustomRowBlock.propTypes = {
    title: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    items: PropTypes.any,  // should be component(s)
    buttonData: PropTypes.shape({
        title: PropTypes.string,
        onClick: PropTypes.func,
    })
};

CustomRowBlock.defaultProps = {
    title: '',
    status: '',
    description: '',
    content: '',
    items: null,
    buttonData: {
        title: '',
        onClick: () => {}
    }

}
export default CustomRowBlock;
