import React     from 'react'
import moment    from 'moment'
import taskUtils from '../../shared/utils/task'

export default class Grouper extends React.Component {
    constructor(props) {
        super(props)
        this.onKeyDown = this.keyDown.bind(this) 
        this.state = {
            selectedIndex : 0,
            filter: ''
        }
    }
    render() {
        let cgroups = taskUtils.getUserDefinedGroups(this.props.tasks)
          .filter((group) => {
            if (this.state.filter == '') return true
            return group.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0
          })
          .map((group,index) => {
              return <div key={group+index} className="group" onClick={this.group.bind(this, group)}>{group}</div>
          })
        return (
            <div className="Grouper OverlayMenu">
                <div className="shader"></div>
                <div className="GrouperInner inner" ref="grouperInner" onClick={this.closeGrouper.bind(this)}>
                    <div className="centerbox">
                        <div className="info">Group {this.props.task.name}</div>
                        <div className="add">
                            <input ref="newgroup" type="text" placeholder="Add to a new group" onChange={this.changeFilter.bind(this)} />
                            <button onClick={this.groupFromInput.bind(this)}>Add</button>
                        </div>
                        <div className="selectorbox">
                            {cgroups}
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
    changeFilter(e) {
      this.setState({ filter: e.target.value })
    }
    keyDown(e) {
        if ([37,38,39,40,13].indexOf(e.which) >= 0)
            e.stopPropagation()
        switch(e.which) {
            case 38:
                // UP 
                if (this.state.selectedIndex < 0) return
                this.setState({ selectedIndex : this.state.selectedIndex-1 })
                break
            case 40:
                // DOWN
                if (this.state.selectedIndex > 10) return
                this.setState({ selectedIndex : this.state.selectedIndex+1 })
                break
            case 13:
                // ENTER
                this.group()
                break
        }
    }
    closeGrouper(e) {
        if (e.target == this.refs.grouperInner)
            return this.props.stateSetter({ showGrouper :  false })
    }
    groupFromInput() {
        this.group(this.refs.newgroup.value)
    }
    group(name) {
        if (!name) return
        this.props.dispatch_db({
            type  : 'DB_UPDATE_TASK',
            task  : this.props.task,
            value : { group : name } 
        }).then((res) => {
            this.props.stateSetter({ showGrouper : false })
        })
    }
    componentDidMount() {
        document.body.addEventListener('keydown', this.onKeyDown)
    }
    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.onKeyDown)
    }
}


