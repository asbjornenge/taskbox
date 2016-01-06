import React  from 'react'
import moment from 'moment'

export default class Grouper extends React.Component {
    constructor(props) {
        super(props)
        this.onKeyDown = this.keyDown.bind(this) 
        this.state = {
            selectedIndex : 0
        }
    }
    render() {
        let cgroups = this.props.groups.map((group,index) => {
            return <div key={group+index} className="group" onClick={this.group.bind(this, group)}>{group}</div>
        })
        return (
            <div className="Grouper">
                <div className="shader"></div>
                <div className="GrouperInner">
                    <div className="centerbox">
                        <div className="info">Group {this.props.task.name}</div>
                        <div className="add">
                            <input ref="newgroup" type="text" placeholder="Add to a new group" />
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


