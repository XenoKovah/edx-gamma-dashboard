import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../generic';
import RowBlockHeader from '../RowBlockHeader';
import DashboardTableRowBlock from './DashboardTableRowBlock';

const CustomRowBlock = ({
  title,
  status,
  description,
  content,
  items,
  buttonData: {
    title: buttonTitle,
    onClick: buttonOnClick,
  },
}) => (
  <DashboardTableRowBlock>
    <RowBlockHeader
      title={title}
      status={status}
      description={description}
    />
    <p
      className="slider-statuses-block-description"
      data-testid="slider-statuses-block-description"
    >
      {content}
    </p>
    <ul
      className="progress-badges-list p-0"
      data-testid="progress-badges-list"
      aria-label="Budges list"
    >
      {items}
    </ul>
    <div className="row-block-controls">
      <Button
        data-testid="details-button"
        title={buttonTitle}
        onClick={() => buttonOnClick()}
      />
    </div>
  </DashboardTableRowBlock>
);

CustomRowBlock.propTypes = {
  title: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string,
  content: PropTypes.string,
  items: PropTypes.arrayOf(React.Component),
  buttonData: PropTypes.shape({
    title: PropTypes.string,
    onClick: PropTypes.func,
  }),
};

CustomRowBlock.defaultProps = {
  title: '',
  status: '',
  description: '',
  content: '',
  items: null,
  buttonData: {
    title: '',
    onClick: () => {},
  },

};
export default CustomRowBlock;
