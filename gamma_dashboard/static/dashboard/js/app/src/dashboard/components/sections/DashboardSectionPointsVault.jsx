import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import DashboardSectionHeader from './DashboardSectionHeader';
import DashboardSection from './DashboardSection';

import messages from '../../../i18n';

import vaultImg from '../../../assets/images/vault.svg';

const DashboardSectionPointsVault = ({ points }) => {
  const intl = useIntl();

  return (
    <DashboardSection className="points-vault-section">
      <DashboardSectionHeader title={intl.formatMessage(messages.dashboardPointsVaultSectionTitle)} />
      <p className="block-description mb-4">
        {intl.formatMessage(messages.dashboardPointsVaultSectionDescription)}
      </p>
      <div className="points-vault">
        <div className="text-center points-vault-img-container">
          <svg className="points-vault-img">
            <use href={`${vaultImg}#vault-icon`} />
          </svg>
        </div>
        <p className="points-vault-total text-center">
          {intl.formatMessage(messages.dashboardPointsVaultSectionTotalPoints)} <span>{points || 0}</span>
        </p>
      </div>
    </DashboardSection>
  );
};

DashboardSectionPointsVault.propTypes = {
  points: PropTypes.number.isRequired,
};

export default DashboardSectionPointsVault;
