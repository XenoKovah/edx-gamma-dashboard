import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
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
import { ACCOMPLISHMENTS_CATEGORY_PARAM, URLS } from '../../routes/constants';

import messages from '../../i18n';

const PAGE_TITLE_ID = 'accomplishments-page-title';

// Headroom left above a deep-linked category, matching useScrollToContent's.
const SCROLL_OFFSET = 100;

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

  // Deep link from a per-badge leaderboard: ?category=<free-text category> opens
  // that category alone and scrolls to it. The value is matched against the raw
  // category, which is also the group key.
  const [searchParams] = useSearchParams();
  const focusedCategory = searchParams.get(ACCOMPLISHMENTS_CATEGORY_PARAM);
  const categoryNodes = useRef(new Map());
  const [seededFor, setSeededFor] = useState(null);
  const [scrollToKey, setScrollToKey] = useState(null);

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

  // Every collapsible on the page: top-level categories and their sub-categories.
  const allKeys = useMemo(
    () => groups.flatMap((group) => [group.key, ...group.children.map((child) => child.key)]),
    [groups],
  );

  // Seeded during render rather than from an effect, so the sections mount
  // already closed: Paragon then plays no collapse animation, the page never
  // flashes fully-expanded, and — the reason it has to be this way — layout is
  // final before the scroll below measures it. Scrolling into a page that is
  // still collapsing aims at an offset the collapse is about to delete, and the
  // browser clamps the smooth scroll back to the top.
  // Guarded on the category itself so a react-query refetch cannot re-seed and
  // snap the learner's own choices shut again.
  if (focusedCategory && groups.length && seededFor !== focusedCategory) {
    setSeededFor(focusedCategory);
    // An unknown category (renamed, deactivated, or hand-typed) leaves the page
    // in its normal all-expanded state rather than collapsing everything.
    // A sub-category is opened along with its parent, which has to be open for
    // it to be seen; a parent is opened along with all of its sub-categories.
    const focusedGroup = groups.find((group) => group.key === focusedCategory
      || group.children.some((child) => child.key === focusedCategory));
    if (focusedGroup) {
      const isParent = focusedGroup.key === focusedCategory;
      setCollapsedKeys(new Set(
        allKeys.filter((key) => key !== focusedCategory
          && key !== focusedGroup.key
          && !(isParent && focusedGroup.children.some((child) => child.key === key))),
      ));
      setScrollToKey(focusedCategory);
    }
  }

  // Offset rather than scrollIntoView({ block: 'start' }), for the same reason
  // useScrollToContent offsets: the LMS chrome is sticky, so a section scrolled
  // flush to the top sits underneath it.
  useEffect(() => {
    const node = scrollToKey && categoryNodes.current.get(scrollToKey);
    if (!node) {
      return;
    }
    window.scrollTo({
      top: Math.max(0, node.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET),
      behavior: 'smooth',
    });
  }, [scrollToKey]);

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
  const hasOpenCategory = allKeys.some((key) => !collapsedKeys.has(key));

  const handleToggleAll = useCallback(() => {
    setCollapsedKeys(hasOpenCategory ? new Set(allKeys) : new Set());
  }, [allKeys, hasOpenCategory]);

  const registerNode = (key) => (node) => {
    if (node) {
      categoryNodes.current.set(key, node);
    } else {
      categoryNodes.current.delete(key);
    }
  };

  const renderBadgeList = (items) => (
    <ul
      className="progress-badges-list p-0 mb-0"
      data-testid="accomplishments-badges-list"
    >
      {items.map((item) => (
        <ProgressBadge key={item[0]} slug={item[0]} data={item[1]} center />
      ))}
    </ul>
  );

  const renderCounter = (group) => intl.formatMessage(messages.badgesSectionCounterText, {
    completedBadgeItemsLength: group.doneCount,
    badgeItemsLength: group.totalCount,
  });

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
            <DashboardSectionContainer
              key={group.key}
              ref={registerNode(group.key)}
            >
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
                      status={renderCounter(group)}
                    />
                  )}
                >
                  {group.items.length > 0 && renderBadgeList(group.items)}
                  {group.children.map((child) => (
                    <div
                      key={child.key}
                      ref={registerNode(child.key)}
                      className="accomplishments-subcategory"
                    >
                      <Collapsible
                        className="accomplishments-category"
                        styling="basic"
                        open={!collapsedKeys.has(child.key)}
                        onToggle={(isOpen) => handleToggleCategory(child.key, isOpen)}
                        title={(
                          <DashboardSectionHeader
                            title={child.label}
                            status={renderCounter(child)}
                          />
                        )}
                      >
                        {renderBadgeList(child.items)}
                      </Collapsible>
                    </div>
                  ))}
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
