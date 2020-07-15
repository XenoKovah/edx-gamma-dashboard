import React from 'react';

import PropTypes from 'prop-types';

import '../../styles/app/dashboard/table-row.scss';


const DashboardTableRow = ({ children }) => {
    return (
        <div
            className="dashboard-table-row"
            data-testid="dashboard-table-row"
        >
            {children}
        </div>
    );
};

export default DashboardTableRow;
