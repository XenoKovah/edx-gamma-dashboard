import React from 'react';

import DashboardTable from './DashboardTable';

import gammaApi from '../../api/ApiRequests';

import '../../styles/app/dashboard/page.scss';


class DashboardPage extends React.Component {
   constructor() {
      super();

      this.state = {
         tableDataProps: {}
      };
   }

   componentDidMount() {
      gammaApi.dashboard.getGameProfile((data) => {

         this.setState({
            tableDataProps: this.parseData(data)
         });
      });
   }

   parseData(data) {
      const mergeBadges = (userBadges, systemBadges, statusesTitle, eventsTitle) => {
         userBadges = userBadges || {};
         systemBadges = systemBadges || [];

         const badgesGot = Object.keys(userBadges).reduce((filtered, key) => {
            const badge = userBadges[key];

            if (badge.done) {
               filtered[key] = userBadges[key];
            }

            return filtered;
         }, {});

         // first, output all badges with done = True regardless their presence in active system badges
         const mergedBadges = { ...badgesGot };

         // then, output only badges that are in system badges
         for (const badgeKey in systemBadges) {
            const sBadge = systemBadges[badgeKey];
            if (sBadge.slug in badgesGot) {
               continue;
            }

            const progressBase = {};
            const badgeRules = sBadge.rules || {};
            const actions = badgeRules.actions || {};

            for (const action in actions) {
               progressBase[action] = {
                  'count': 0,
                  'goal': sBadge.rules.actions[action],
                  'title': action in eventsTitle ? eventsTitle[action]: action
               };
            }

            const dependencyBadges = badgeRules.badges || [];

            for (const systemBadge of systemBadges) {
               const badgeIndex = dependencyBadges.indexOf(systemBadge.slug);

               if (badgeIndex >= 0) {
                  dependencyBadges.splice(badgeIndex, 1, systemBadge.title);
               }
            }

            const dependencyStatusSlug = badgeRules.status_badge || '';

            const badgeData = {
               id: badgeKey,
               url: sBadge.url,
               title: sBadge.title,
               progress: progressBase,
               dependencies: dependencyBadges,
               statusDependency: (dependencyStatusSlug in statusesTitle ) ? statusesTitle[dependencyStatusSlug] : dependencyStatusSlug,
               done: false
            };

            if (badgeRules.badges) {
               badgeData.dependencies = sBadge.rules.badges;
            }

            if (sBadge.slug in userBadges) {
               const uBadge = userBadges[sBadge.slug];
               for (const action in progressBase) {
                  if (action in uBadge.progress) {
                     badgeData.progress[action].count = uBadge.progress[action].count;
                  }
               }
            }

            mergedBadges[sBadge.slug] = badgeData;
         }
         return mergedBadges;
      };

      data = data || {};
      const badges = data.badges || {};
      const systemStatuses = data.system_statuses || [];
      const statusesTitle = Object.assign({}, ...systemStatuses.map((x) => ({[x.slug]: x.title})));
      const systemBadges = data.system_badges || [];
      const systemEvents = data.system_events || [];
      const eventsTitle = Object.assign({}, ...systemEvents.map((x) => ({[x.event_type]: x.title})));
      const points = data.points || 0;
      const progress = data.progress || {};
      const chart = data.chart || {};

      const mergedBadges = mergeBadges(badges, systemBadges, statusesTitle, eventsTitle);

      const badgeItems = Object.entries(mergedBadges) || [];

      const statusItems = systemStatuses.map(status => {
         const formattedStatus = { ...status };

         formattedStatus.statusPoints = formattedStatus.status_points;
         delete formattedStatus.status_points;

         formattedStatus.points = points;

         return formattedStatus;
      });

      const returnData = {
         statusItems,
         badgeItems,
         statusRoadmap: {
            points: points,
            statuses: systemStatuses,
         },
         progress: progress,
         chart: chart
      };

      return returnData;
}

render() {
   const {tableDataProps} = this.state;

   return (
      <React.Fragment>
         <DashboardTable {...tableDataProps}/>
      </React.Fragment>
   )
}
}

export default DashboardPage;
