import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Info as InfoIcon } from '@openedx/paragon/icons';

import { Alert } from '../../generic';
import { ProfilePropType } from '../propTypes';
import LeaderboardCard from './LeaderboardCard';

import messages from '../../i18n';

const LeaderboardTable = ({
  rank, profiles = [], delimiter, showProgress,
}) => {
  const intl = useIntl();

  const translations = {
    emptyTitle: intl.formatMessage(messages.leaderboardEmptyTitle),
    emptyDescription: intl.formatMessage(messages.leaderboardEmptyDescription),
    headerUser: intl.formatMessage(messages.leaderboardHeaderUser),
    headerCountry: intl.formatMessage(messages.leaderboardHeaderCountry),
    // In-progress sections show a grade percentage, not earned points.
    headerPoints: intl.formatMessage(
      showProgress ? messages.leaderboardHeaderProgress : messages.leaderboardHeaderEarnedPoints,
    ),
    headerAccomplishments: intl.formatMessage(messages.leaderboardHeaderAccomplishments),
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
        <>
          <div className="leaderboard-table-header" data-testid="leaderboard-table-header" aria-hidden="true">
            <span className="lh-user">{translations.headerUser}</span>
            <span className="lh-country">{translations.headerCountry}</span>
            <span className="lh-points">{translations.headerPoints}</span>
            <span className="lh-badges">{translations.headerAccomplishments}</span>
          </div>
          {profiles.map((profile, index) => (
            <React.Fragment key={profile.userUid}>
              <LeaderboardCard
                rank={rank || 0}
                profile={profile}
                showProgress={showProgress}
              />
              {index === delimiter && (
              <div className="leaderboard-table-separator" data-testid="leaderboard-table-separator">
                <span /> <span /> <span />
              </div>
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

LeaderboardTable.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape(ProfilePropType)),
  rank: PropTypes.number,
  delimiter: PropTypes.number,
  showProgress: PropTypes.bool,
};

LeaderboardTable.defaultProps = {
  profiles: [],
  rank: 0,
  delimiter: null,
  showProgress: false,
};

export default LeaderboardTable;
