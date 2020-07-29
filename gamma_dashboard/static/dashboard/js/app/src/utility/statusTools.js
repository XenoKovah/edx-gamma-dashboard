export const getUserStatus = (systemStatuses, userPoints) => {
    const noStatusTitle = "No status so far";
    // systemStatuses should be ordered ascending on backend side

    // Empty systemStatuses
    if (!systemStatuses || systemStatuses.length == 0) return noStatusTitle;
    // Check for obvious noStatusTitle

    if (userPoints < systemStatuses[0].status_points) return noStatusTitle;

    let i = 0;
    try {
        while(systemStatuses[++i].status_points <= userPoints);
    } catch {}

    return systemStatuses[--i].title;
};
