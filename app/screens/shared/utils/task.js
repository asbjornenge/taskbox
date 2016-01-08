let utils = {
    getUserDefinedGroups : (tasks) => {
        return tasks
            .reduce((groups, task) => {
                let taskgroup = task.group ? [task.group] : []
                if (taskgroup.length == 0) return groups
                if (groups.indexOf(taskgroup[0]) >= 0) return groups
                return groups.concat(taskgroup)
            },[])
            .filter(group => ['later','done'].indexOf(group) < 0)
            .sort()
    }
}

export { utils as default }
