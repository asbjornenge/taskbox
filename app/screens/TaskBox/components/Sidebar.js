import React         from 'react'
import FlyoutSidebar from '../../shared/components/FlyoutSidebar'
import nav           from '../../shared/utils/nav'
import taskUtils     from '../../shared/utils/task'

export default class Sidebar extends React.Component {
    render() {
        let groups = taskUtils.getUserDefinedGroups(this.props.tasks).map((group, index) => {
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
                        {groups}
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
