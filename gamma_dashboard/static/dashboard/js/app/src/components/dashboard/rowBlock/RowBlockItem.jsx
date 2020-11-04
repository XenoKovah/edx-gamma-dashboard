import React from 'react';
import PropTypes from 'prop-types';

import RowBlockItemPopup from './RowBlockItemPopup';
import { usePopper } from 'react-popper';
import { buildURL } from '../../../utility/urlTools';

import '../../../styles/app/dashboard/row-block-item.scss';


const RowBlockItem = ({ slug, data, center, children }) => {
    const [ showPopup, setShowPopup ] = React.useState(false);
    const [ referenceElement, setReferenceElement ] = React.useState(null);
    const [ popperElement, setPopperElement ] = React.useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'auto',
        scroll: false
    });

    const {
        title,
        url: imageSrc,
        progress,
        points,
        statusPoints
    } = data;
    const dependencies = data.dependencies || [];

    const itemProps = {};
    const popupProps = {};
    let hasPopup = false;

    // Define the behavior for badge & status separately.
    if (data.done !== undefined) {
        hasPopup = !data.done;
    } else if (data.active !== undefined) {
        hasPopup = !data.active || points < statusPoints;
    }

    if (hasPopup) {
        itemProps.onMouseEnter = () => setShowPopup(true);
        itemProps.onMouseLeave = () => setShowPopup(false);

        if (showPopup) {
            popupProps.style = {
                visibility: 'visible',
                opacity: 1
            };
        }

        popupProps.data = {
            badgeDependencies: dependencies,
            statusDependency: data.statusDependency || null,
            progress: progress || {},
            points: points,
            statusPoints: statusPoints
        };
    }

    return (
        <div
            className={`row-block-item ${center ? 'row-block-item-center' : ''}`}
            data-testid={'row-block-item'}
            {... itemProps}
        >
            <div
                className={`row-block-item-figure ${hasPopup ? 'row-block-item-figure-disabled' : ''}`}
                data-testid={'row-block-item-figure'}
                ref={setReferenceElement}
            >
                <img
                    className={'row-block-item-figure-image'}
                    src={buildURL(imageSrc)}
                />
            </div>
            <div className={'row-block-item-title'} data-testid={'row-block-item-title'}>
                {title}
            </div>
            { hasPopup ?
                <RowBlockItemPopup
                    ref={setPopperElement}
                    title={title}
                    style={{... styles.popper, ... popupProps.style}}
                    data={popupProps.data}
                    {... attributes.popper}
                />
            : null }
            {children}
        </div>
    );
};

RowBlockItem.propTypes = {
    slug: PropTypes.string,
    data: PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
        progress: PropTypes.object,
        done: PropTypes.bool,
        active: PropTypes.bool,
        points: PropTypes.number,
        statusPoints: PropTypes.number
    }),
    center: PropTypes.bool,
    children: PropTypes.any
};

RowBlockItem.defaultProps = {
    slug: '',
    data: {
        title: '',
        url: '',
        progress: {},
        done: false,
        active: false,
        points: -1,
        statusPoints: 0,
    },
    center: false,
    children: null
};

export default RowBlockItem;
