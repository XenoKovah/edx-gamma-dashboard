import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button, Collapsible } from '@openedx/paragon';
import { Error as ErrorIcon, Info as InfoIcon } from '@openedx/paragon/icons';

import { useScrollToContent } from '../../generic/hooks';
import { SubHeader, Alert, Loader } from '../../generic';
import {
  DashboardSection,
  DashboardSectionHeader,
  DashboardSectionContainer,
} from '../components/sections';
import { ProgressBadge } from '../components/progress-badge';
import { useGameProfile } from '../../api/hooks/useGameProfile';
import { groupBadgesByCategory } from './utils';
import { URLS } from '../../routes/constants';

import messages from '../../i18n';

const PAGE_TITLE_ID = 'accomplishments-page-title';

const AccomplishmentsPage = () => {
  const intl = useIntl();
  const {
    data, isLoading, isError,
  } = useGameProfile();

  // Categories start expanded (the page reads the same as it always has); the
  // learner collapses the ones they are done with. Tracking the *collapsed*
  // keys rather than the open ones means a category the badge data adds later
  // shows up open, without having to seed state from the async response.
  const [collapsedKeys, setCollapsedKeys] = useState(() => new Set());

  const translations = {
    title: intl.formatMessage(messages.accomplishmentsPageHeadingText),
    otherCategory: intl.formatMessage(messages.accomplishmentsPageOtherCategoryText),
    backToDashboard: intl.formatMessage(messages.accomplishmentsPageBackToDashboardText),
    collapseAll: intl.formatMessage(messages.accomplishmentsPageCollapseAllText),
    expandAll: intl.formatMessage(messages.accomplishmentsPageExpandAllText),
    emptyTitle: intl.formatMessage(messages.performanceBadgesSectionAlertNoBadgesTitle),
    errorTitle: intl.formatMessage(messages.genericErrorFallbackTitle),
  };

  useScrollToContent(PAGE_TITLE_ID, 'a[href="#main"]');

  const groups = useMemo(
    () => groupBadgesByCategory(data?.badgeItems, translations.otherCategory),
    [data?.badgeItems, translations.otherCategory],
  );

  const handleToggleCategory = useCallback((key, isOpen) => {
    setCollapsedKeys((previous) => {
      const next = new Set(previous);
      if (isOpen) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // One button that flips between the two actions: while anything is still open
  // it offers "Collapse All", and once everything is closed it offers to open
  // them all back up.
  const hasOpenCategory = groups.some((group) => !collapsedKeys.has(group.key));

  const handleToggleAll = useCallback(() => {
    setCollapsedKeys(hasOpenCategory ? new Set(groups.map((group) => group.key)) : new Set());
  }, [groups, hasOpenCategory]);

  if (isLoading) {
    return <Loader className="text-center" />;
  }

  if (isError) {
    return (
      <Alert
        title={translations.errorTitle}
        className="dashboard-page-error-alert"
        variant="danger"
        icon={ErrorIcon}
      />
    );
  }

  return (
    <div className="dashboard-page accomplishments-page" data-testid="accomplishments-page">
      <SubHeader id={PAGE_TITLE_ID} title={translations.title} />
      <div className="accomplishments-page-toolbar mb-3">
        <a href={URLS.dashboardPage} data-testid="accomplishments-back-link">
          {translations.backToDashboard}
        </a>
        {groups.length > 0 && (
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleToggleAll}
            data-testid="accomplishments-toggle-all-btn"
          >
            {hasOpenCategory ? translations.collapseAll : translations.expandAll}
          </Button>
        )}
      </div>
      <div className="dashboard-page-body">
        {groups.length ? (
          groups.map((group) => (
            <DashboardSectionContainer key={group.key}>
              <DashboardSection fullWidth>
                <Collapsible
                  className="accomplishments-category"
                  // The section is already the card; Paragon's default "card"
                  // styling would draw a second white panel inside it (which the
                  // dark theme knows nothing about).
                  styling="basic"
                  open={!collapsedKeys.has(group.key)}
                  onToggle={(isOpen) => handleToggleCategory(group.key, isOpen)}
                  title={(
                    <DashboardSectionHeader
                      title={group.label}
                      status={intl.formatMessage(messages.badgesSectionCounterText, {
                        completedBadgeItemsLength: group.doneCount,
                        badgeItemsLength: group.items.length,
                      })}
                    />
                  )}
                >
                  <ul
                    className="progress-badges-list p-0 mb-0"
                    data-testid="accomplishments-badges-list"
                  >
                    {group.items.map((item) => (
                      <ProgressBadge key={item[0]} slug={item[0]} data={item[1]} center />
                    ))}
                  </ul>
                </Collapsible>
              </DashboardSection>
            </DashboardSectionContainer>
          ))
        ) : (
          <Alert
            variant="info"
            icon={InfoIcon}
            title={translations.emptyTitle}
          />
        )}
      </div>
    </div>
  );
};

export default AccomplishmentsPage;
