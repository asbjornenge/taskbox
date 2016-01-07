import React         from 'react'
import FlyoutSidebar from '../../shared/components/FlyoutSidebar'
import nav           from '../../shared/utils/nav'

export default class Sidebar extends React.Component {
    render() {
        let groups = this.props.tasks
            .reduce((groups, task) => { 
                let taskgroup = task.group ? [task.group] : []
                if (taskgroup.length == 0) return groups
                if (groups.indexOf(taskgroup[0]) >= 0) return groups
                return groups.concat(taskgroup)
            },[])
            .filter(group => ['later','done'].indexOf(group) < 0)
        let groupItems = groups.map((group, index) => {
            return (
                <li key={group+index} 
                    className="groupItem"
                    onClick={this.setGroupFilter.bind(this, group)}>
                    {group}
                </li>
            )
        })
        return (
            <FlyoutSidebar show={this.props.show} animate={true}>
                <div className="TaskBoxSidebar">
                    <ul className="groups">
                        <li className="header">Groups</li>
                        {groupItems}
                        <li className="separator">Status</li>
                        <li className="later" onClick={this.setGroupFilter.bind(this, 'later')}>Later</li>
                        <li className="later" onClick={this.setGroupFilter.bind(this, 'done')}>Done</li>
                    </ul>
                    <div className="settingsLink" onClick={nav.navigate.bind(undefined, '/settings')}>Settings</div>
                </div>
            </FlyoutSidebar>
        ) 
    }
    setGroupFilter(group) {
        this.props.setGroupFilter(group)
    }
}
