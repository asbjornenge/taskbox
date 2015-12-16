import React from 'react'
import moment from 'moment'
import { firebase } from '../../../loops'

let options = {
    daytime : [
        { label : 'Later Today',  id : 'later_today', handler : (task) => {
            task.postpone = parseInt(moment().add(2, 'minute').format('x'))
            firebase.child('later').child(task.id).set(task, (err) => {
                if (err) return console.error(err)
                firebase.child('taskbox').child(task.id).remove()
            })
        }},
        { label : 'This Evening', id : 'this_evening' },
        { label : 'Tomorrow',     id : 'tomorrow'     },
        { label : 'This Weekend', id : 'this_weekend' },
        { label : 'Next Week',    id : 'next_week'    },
        { label : 'In a month',   id : 'in_a_month'   },
        { label : 'Someday',      id : 'someday'      },
        { label : 'Pick date',    id : 'date'         },
        { label : 'Group',        id : 'group'        }
    ]
}

export default class Postponer extends React.Component {
    constructor(props) {
        super(props)
        this.onKeyDown = this.keyDown.bind(this) 
        this.state = {
            selectedIndex : 0
        }
    }
    render() {
        let selections = options.daytime.map((opt, index) => {
            let classes = 'selection'
            if (this.state.selectedIndex == index) classes += ' selected'
            return <div className={classes} key={opt.id}>{opt.label}</div>
        })
        return (
            <div className="Postponer">
                <div className="shader"></div>
                <div className="PostponerInner">
                    <div className="centerbox">
                        <div className="info">Postpone {this.props.task.name}</div>
                        <div className="selectorbox">
                            {selections}
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
                if (this.state.selectedIndex < 3) return
                this.setState({ selectedIndex : this.state.selectedIndex-3 })
                break
            case 40:
                // DOWN
                if (this.state.selectedIndex > 5) return
                this.setState({ selectedIndex : this.state.selectedIndex+3 })
                break
            case 37:
                // LEFT
                if (this.state.selectedIndex <= 0) return
                this.setState({ selectedIndex : this.state.selectedIndex-1 })
                break
            case 39:
                if (this.state.selectedIndex >= 8) return
                this.setState({ selectedIndex : this.state.selectedIndex+1 })
                // RIGHT
                break
            case 13:
                // ENTER
                this.postpone()
                break
        }

    }
    postpone() {
        let postponeAction = options.daytime[this.state.selectedIndex]
        postponeAction.handler(this.props.task)
    }
    componentDidMount() {
        document.body.addEventListener('keydown', this.onKeyDown)
    }
    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.onKeyDown)
    }
}
