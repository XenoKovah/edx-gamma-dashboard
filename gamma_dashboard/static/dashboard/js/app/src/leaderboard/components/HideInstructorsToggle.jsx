import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Button, Spinner } from '@openedx/paragon';

import messages from '../../i18n';

/**
 * The one button that flips a leaderboard between "everyone" and "learners only".
 *
 * Instructors head every board because writing class material pays far more than taking
 * it, so this drops them and re-ranks whoever is left. It offers the action *not* in
 * effect — "Hide Instructors" while they are shown — the way the accomplishments page's
 * Collapse/Expand All button does.
 *
 * While the other view is being fetched the button stays put and shows a spinner rather
 * than disappearing: the table behind it keeps the rows it already had, so the page
 * never blanks out mid-toggle.
 */
const HideInstructorsToggle = ({ hideInstructors, onToggle, isBusy }) => {
  const intl = useIntl();

  const label = intl.formatMessage(
    hideInstructors ? messages.leaderboardShowInstructorsText : messages.leaderboardHideInstructorsText,
  );

  return (
    <Button
      variant="outline-primary"
      size="sm"
      onClick={onToggle}
      disabled={isBusy}
      aria-busy={isBusy}
      // The button reflects a state rather than firing a one-off action, so screen
      // readers get the on/off nature of it as well as the label.
      aria-pressed={hideInstructors}
      className="leaderboard-hide-instructors-toggle"
      data-testid="leaderboard-hide-instructors-btn"
    >
      {isBusy && (
        // Decorative: the button's own label is its accessible name and aria-busy
        // already announces the wait, so the spinner must not be read out as well.
        <Spinner
          animation="border"
          size="sm"
          aria-hidden="true"
          className="leaderboard-hide-instructors-spinner"
        />
      )}
      {label}
    </Button>
  );
};

HideInstructorsToggle.propTypes = {
  hideInstructors: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  isBusy: PropTypes.bool,
};

HideInstructorsToggle.defaultProps = {
  hideInstructors: false,
  isBusy: false,
};

export default HideInstructorsToggle;
