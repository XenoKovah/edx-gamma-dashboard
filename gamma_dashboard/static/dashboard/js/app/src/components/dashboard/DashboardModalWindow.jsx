import React from 'react';
import PropTypes from 'prop-types';

import { useTranslate } from '../../i18n/utils';
import ModalWindow from '../utility/ModalWindow';
import RowBlockItem from './rowBlock/RowBlockItem';
import { isRtl } from './charts/ChartWithExport';

import '../../styles/app/dashboard/dashboard-modal-window.scss';

const DashboardModalWindow = ({
  title, items, getItemDataFunction, children, ...props
}) => {
  const counterTranslation = useTranslate('performance.badges.section.total.badges.button.text');
  const counterLabelText = isRtl ? `:${counterTranslation}` : `${counterTranslation}:`;

  return (
    <ModalWindow {...props}>
      <div
        className="dashboard-modal-window-title-bar"
        data-testid="dashboard-modal-window-title-bar"
      >
        <div
          className="title"
          data-testid="title"
        >
          {title}
        </div>
        <div className="counter">
          <span>{counterLabelText}</span>
          <span data-testid="counter-value">
            {items.length}
          </span>
        </div>
      </div>
      <div
        className="dashboard-modal-window-items-list"
        data-testid="dashboard-modal-window-items-list"
      >
        {items.map((item) => (
          <RowBlockItem
            key={getItemDataFunction(item).title}
            data={getItemDataFunction(item)}
            center
          />
        ))}
      </div>
      {children}
    </ModalWindow>
  );
};

const ProgressPropType = PropTypes.shape({
  count: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  title: PropTypes.string,
});

const ItemPropType = PropTypes.shape({
  id: PropTypes.string,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  progress: PropTypes.objectOf(ProgressPropType).isRequired,
  dependencies: PropTypes.arrayOf(PropTypes.string),
  statusDependency: PropTypes.string,
  done: PropTypes.bool.isRequired,
});

DashboardModalWindow.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        ItemPropType,
      ]),
    ),
  ),
  getItemDataFunction: PropTypes.func,
  children: PropTypes.node.isRequired,
};

DashboardModalWindow.defaultProps = {
  title: '',
  items: [],
  getItemDataFunction: item => item,
};

export default DashboardModalWindow;
