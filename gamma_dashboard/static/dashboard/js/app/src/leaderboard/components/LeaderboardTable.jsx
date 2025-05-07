import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Info as InfoIcon } from '@openedx/paragon/icons';

import { Alert } from '../../generic';
import { ProfilePropType } from '../propTypes';
import LeaderboardCard from './LeaderboardCard';

import messages from '../../i18n';

const LeaderboardTable = ({
  rank, profiles = [], delimiter,
}) => {
  const intl = useIntl();

  const translations = {
    emptyTitle: intl.formatMessage(messages.leaderboardEmptyTitle),
    emptyDescription: intl.formatMessage(messages.leaderboardEmptyDescription),
  };

  return (
    <div className="leaderboard-table" data-testid="leaderboard-table">
      {!profiles.length ? (
        <Alert
          className="mb-0 mx-3"
          variant="info"
          icon={InfoIcon}
          title={translations.emptyTitle}
        >
          <p>{translations.emptyDescription}</p>
        </Alert>
      ) : (
        profiles.map((profile, index) => (
          <React.Fragment key={profile.userUid}>
            <LeaderboardCard
              rank={rank || 0}
              profile={profile}
            />
            {index === delimiter && (
            <div className="leaderboard-table-separator" data-testid="leaderboard-table-separator">
              <span /> <span /> <span />
            </div>
            )}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

LeaderboardTable.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape(ProfilePropType)),
  rank: PropTypes.number,
  delimiter: PropTypes.number,
};

LeaderboardTable.defaultProps = {
  profiles: [],
  rank: 0,
  delimiter: null,
};

export default LeaderboardTable;
