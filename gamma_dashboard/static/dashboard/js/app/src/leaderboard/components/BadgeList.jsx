import React from 'react';
import { useIntl } from 'react-intl';
import PropType from 'prop-types';

import { BadgePropType } from '../propTypes';
import Badge from './Badge';

import messages from '../../i18n';

const BadgeList = ({ badges }) => {
  const intl = useIntl();

  const badgeKeys = Object.keys(badges);

  const translations = {
    emptyBadgesText: intl.formatMessage(messages.performanceBadgesEmptyMessageText),
  };

  return (
    <ul className="badge-list list-unstyled m-0">
      {badgeKeys.length ? (
        badgeKeys.map((id) => (
          <li key={id}>
            <Badge
              key={id}
              url={badges[id].url}
              title={badges[id].title}
              slug={badges[id].slug}
            />
          </li>
        ))
      ) : (
        translations.emptyBadgesText
      )}
    </ul>
  );
};

BadgeList.propTypes = {
  badges: PropType.shape(BadgePropType),
};

export default BadgeList;
