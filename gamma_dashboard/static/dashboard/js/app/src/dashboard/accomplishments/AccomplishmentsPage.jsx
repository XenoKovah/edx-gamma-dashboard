import React from 'react';
import { useIntl } from 'react-intl';
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

  const translations = {
    title: intl.formatMessage(messages.accomplishmentsPageHeadingText),
    otherCategory: intl.formatMessage(messages.accomplishmentsPageOtherCategoryText),
    backToDashboard: intl.formatMessage(messages.accomplishmentsPageBackToDashboardText),
    emptyTitle: intl.formatMessage(messages.performanceBadgesSectionAlertNoBadgesTitle),
    errorTitle: intl.formatMessage(messages.genericErrorFallbackTitle),
  };

  useScrollToContent(PAGE_TITLE_ID, 'a[href="#main"]');

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

  const groups = groupBadgesByCategory(data?.badgeItems, translations.otherCategory);

  return (
    <div className="dashboard-page" data-testid="accomplishments-page">
      <SubHeader id={PAGE_TITLE_ID} title={translations.title} />
      <div className="mb-3">
        <a href={URLS.dashboardPage} data-testid="accomplishments-back-link">
          {translations.backToDashboard}
        </a>
      </div>
      <div className="dashboard-page-body">
        {groups.length ? (
          groups.map((group) => (
            <DashboardSectionContainer key={group.key}>
              <DashboardSection fullWidth>
                <DashboardSectionHeader
                  title={group.label}
                  status={intl.formatMessage(messages.badgesSectionCounterText, {
                    completedBadgeItemsLength: group.doneCount,
                    badgeItemsLength: group.items.length,
                  })}
                />
                <ul
                  className="progress-badges-list p-0 mb-0"
                  data-testid="accomplishments-badges-list"
                >
                  {group.items.map((item) => (
                    <ProgressBadge key={item[0]} slug={item[0]} data={item[1]} center />
                  ))}
                </ul>
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
