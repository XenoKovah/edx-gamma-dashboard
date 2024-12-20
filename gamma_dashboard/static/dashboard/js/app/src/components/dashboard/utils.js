// TODO: It is necessary to refactor this function and move its
// logic to the backend in the future.
export const parseData = (data = {}) => {
  const mergeBadges = (userBadgesInput, systemBadgesInput, statusesTitle, eventsTitle) => {
    const userBadges = userBadgesInput || {};
    const systemBadges = systemBadgesInput || [];

    const badgesGot = Object.keys(userBadges).reduce((filtered, key) => {
      const badge = userBadges[key];

      if (badge.done) {
        return { ...filtered, [key]: badge };
      }

      return filtered;
    }, {});

    const mergedBadges = { ...badgesGot };

    for (const badgeKey in systemBadges) {
      if (Object.hasOwn(systemBadges, badgeKey) && !(systemBadges[badgeKey].slug in badgesGot)) {
        const sBadge = systemBadges[badgeKey];

        const progressBase = {};
        const badgeRules = sBadge.rules || {};
        const actions = badgeRules.actions || {};

        for (const action in actions) {
          if (Object.hasOwn(actions, action)) {
            progressBase[action] = {
              count: 0,
              goal: sBadge.rules.actions[action],
              title: action in eventsTitle ? eventsTitle[action] : action,
            };
          }
        }

        const dependencyBadges = [...(badgeRules.badges || [])];

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
          statusDependency: dependencyStatusSlug in statusesTitle
            ? statusesTitle[dependencyStatusSlug]
            : dependencyStatusSlug,
          done: false,
        };

        if (badgeRules.badges) {
          badgeData.dependencies = sBadge.rules.badges;
        }

        if (sBadge.slug in userBadges) {
          const uBadge = userBadges[sBadge.slug];
          for (const action in progressBase) {
            if (Object.hasOwn(progressBase, action)) {
              if (action in uBadge.progress) {
                badgeData.progress[action].count = uBadge.progress[action].count;
              }
            }
          }
        }

        mergedBadges[sBadge.slug] = badgeData;
      }
    }

    return mergedBadges;
  };

  const badges = data.badges || {};
  const systemStatuses = data.system_statuses || [];
  const statusesTitle = Object.assign({}, ...systemStatuses.map((x) => ({ [x.slug]: x.title })));
  const systemBadges = data.system_badges || [];
  const systemEvents = data.system_events || [];
  const eventsTitle = Object.assign({}, ...systemEvents.map((x) => ({ [x.event_type]: x.title })));
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

  return {
    statusItems,
    badgeItems,
    statusRoadmap: {
      points,
      statuses: systemStatuses,
    },
    progress,
    chart,
  };
};
