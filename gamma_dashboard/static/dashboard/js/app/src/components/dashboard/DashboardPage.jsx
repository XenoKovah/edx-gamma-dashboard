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
      const mergeBadges = (userBadges, systemBadges) => {
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
                  'goal': sBadge.rules.actions[action]
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
            let statusDependencyName = dependencyStatusSlug;

            for (const status of data.statuses) {
               if (status.slug === dependencyStatusSlug) {
                  statusDependencyName = status.title;
               }
            }

            const badgeData = {
               id: badgeKey,
               url: sBadge.url,
               title: sBadge.title,
               progress: progressBase,
               dependencies: dependencyBadges,
               statusDependency: statusDependencyName,
               done: false
            };

            if (badgeRules.badges) {
               badgeData.dependencies = sBadge.rules.badges;
            }

            if (badgeRules.status_badge) {
               badgeData.status_dependency = sBadge.rules.status_badge;
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
      const systemBadges = data.system_badges || [];
      const points = data.points || 0;
      const progress = data.progress || {};
      const chart = data.chart || {};

      const mergedBadges = mergeBadges(badges, systemBadges);

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
