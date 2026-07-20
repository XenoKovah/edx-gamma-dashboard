import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from 'react-intl';

import messages from '../../i18n';

/**
 * Wraps a leaderboard page's table (or tables) with the state of the instructor filter.
 *
 * Two jobs, both of which have to sit above the tables rather than inside one, because
 * the per-badge and per-course pages each render two of them:
 *
 * - it says so when instructors are being left out. The preference is sticky across
 *   pages and visits, so a learner can arrive at a board already filtered; without a
 *   line saying why, a short board with unfamiliar rankings just looks wrong.
 * - it fades the tables while the other view is being fetched. The rows on screen are
 *   the *previous* view's, deliberately kept there instead of blanking the page, so they
 *   need to read as stale rather than current. Drive this from react-query's
 *   ``isPreviousData``, not ``isFetching``: the latter is also true during the silent
 *   revalidation after a cache hit, where the rows on screen are already the right ones
 *   and fading them would make an instant toggle look slow.
 */
const LeaderboardView = ({ instructorsHidden, isRefreshing, children }) => {
  const intl = useIntl();

  return (
    <>
      {/* Held back until the filtered rows are actually on screen: during the fetch the
          table is still showing the previous view, instructors and all, and a line
          claiming otherwise would contradict what the learner is looking at. */}
      {instructorsHidden && !isRefreshing && (
        <p className="leaderboard-instructors-hidden-note" data-testid="leaderboard-instructors-hidden-note">
          {intl.formatMessage(messages.leaderboardInstructorsHiddenNote)}
        </p>
      )}
      <div
        className={classNames('leaderboard-view', { 'leaderboard-view-refreshing': isRefreshing })}
        aria-busy={isRefreshing}
      >
        {children}
      </div>
    </>
  );
};

LeaderboardView.propTypes = {
  instructorsHidden: PropTypes.bool,
  isRefreshing: PropTypes.bool,
  children: PropTypes.node,
};

LeaderboardView.defaultProps = {
  instructorsHidden: false,
  isRefreshing: false,
  children: null,
};

export default LeaderboardView;
