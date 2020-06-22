export const getUserStatus = (systemStatuses, userPoints) => {
    // systemStatuses should be ordered ascending on backend side
    if (!systemStatuses || systemStatuses.length == 0){
        return "No status so far";
    }
    for (var i = 0; i < systemStatuses.length; i++){
        if (userPoints < systemStatuses[i].points){
            if (i === 0){
                return "No status so far";
            }
            else {
                return systemStatuses[i - 1].title;
            }
        }
    }
    return systemStatuses[i - 1].title;
};
