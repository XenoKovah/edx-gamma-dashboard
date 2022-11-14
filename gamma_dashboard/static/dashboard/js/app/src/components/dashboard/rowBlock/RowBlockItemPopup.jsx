import React from 'react';
import PropTypes from 'prop-types';
import { isRtl } from '../charts/ChartWithExport';

import '../../../styles/app/dashboard/row-block-item-popup.scss';


const RowBlockItemPopup = React.forwardRef(({title, data, ...props}, ref) => {
    const { statusDependency } = data;
    const badgeDependencies = data.badgeDependencies || [];
    const progress = data.progress || {};
    const points = data.points || 0;
    const statusPoints = data.statusPoints || 0;

    const bodyItems = [];
    for (const progressItem in progress) {
        const progressValues = progress[progressItem];

        const progressTitle = `${progressValues.title.charAt(0).toUpperCase()}${progressValues.title.slice(1)}`;

        bodyItems.push((
            <ul key={`progress-${progressItem}`} className={'item-list'}>
                <li className={'item-list-item'}>
                    <span className={'list-item-counter-text'}>
                        {`${progressValues.count}/${progressValues.goal}`}
                    </span>
                    {progressTitle}
                </li>
            </ul>
        ));
    }

    if (badgeDependencies.length > 0) {
        bodyItems.push((
            <React.Fragment key={'badge-dependencies'}>
                <div className={'list-item-dependency-title'}>
                    { isRtl ? ':Depends on badges' : 'Depends on badges:' }
                </div>
                <ul className={'item-list'}>
                    {badgeDependencies.map((badge, index) => (
                        <li key={index} className={'item-list-item'}>
                            {badge}
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        ));
    }

    if (statusDependency) {
        bodyItems.push((
            <React.Fragment key={'status-dependencies'}>
                <div className={'list-item-dependency-title'}>
                    { isRtl ? ':Depends on status' : 'Depends on status:' }
                </div>
                <ul className={'item-list'}>
                    <li className={'item-list-item'}>
                        {statusDependency}
                    </li>
                </ul>
            </React.Fragment>
        ));
    }

    bodyItems.push((
        <ul key={'status-points'} className={'item-list'}>
            <li className={'item-list-item'}>
                <span className={'list-item-counter-text'}>
                    {`${points}/${statusPoints}`}
                </span>
            </li>
        </ul>
    ));

    return (
        <div
            className={'row-block-item-popup'}
            data-testid={'row-block-item-popup'}
            ref={ref}
            {... props}
        >
            <div className={'item-head'} data-testid={'item-head'}>
                {title}
            </div>
            <div className={'item-body'} data-testid={'item-body'}>
                {bodyItems}
            </div>
        </div>
    );
});

RowBlockItemPopup.propTypes = {
    title: PropTypes.string,
    data: PropTypes.shape({
        badgeDependencies: PropTypes.array,
        statusDependency: PropTypes.string,
        progress: PropTypes.object,
        points: PropTypes.number,
        statusPoints: PropTypes.number
    })
};

RowBlockItemPopup.defaultProps = {
    title: '',
    data: {
        badgeDependencies: [],
        statusDependency: '',
        progress: {},
        points: -1,
        statusPoints: 0,
    },
}

export default RowBlockItemPopup;
