import React from 'react';
import PropType from 'prop-types';

import { useTranslate } from '../../i18n/utils';
import { BadgePropType } from '../propTypes';
import Badge from './Badge';

const BadgeList = ({ badges }) => {
  const badgeKeys = Object.keys(badges);
  const messages = {
    emptyBadgesText: useTranslate('performance.badges.empty.message.text'),
  };

  return (
    <ul className="badge-list list-unstyled m-0">
      {badgeKeys.length ? (
        badgeKeys.map((id) => (
          <li>
            <Badge key={id} url={badges[id].url} />
          </li>
        ))
      ) : (
        messages.emptyBadgesText
      )}
    </ul>
  );
};

BadgeList.propTypes = {
  badges: PropType.shape(BadgePropType),
};

export default BadgeList;
