import React from 'react'
import moment from 'moment'
import { firebase } from '../../../loops'

let options = {
    daytime : [
        { label : 'Later Today',  id : 'later_today', handler : (task) => {
            task.postpone = parseInt(moment().add(2, 'hours').format('x'))
            firebase.child('later').child(task.id).set(task, (err) => {
                if (err) return console.error(err)
                firebase.child('taskbox').child(task.id).remove()
            })
        }},
        { label : 'This Evening', id : 'this_evening', handler : (task) => {
            task.postpone = parseInt(moment().endOf('day').subtract(4, 'hours').format('x'))
            if (moment(task.postpone).isBefore(moment()))
                task.postpone = parseInt(moment().add(1, 'hours').format('x'))
//            let test = moment(task.postpone).format('YYYY-MM-DD HH:mm')
//            console.log(test)
            firebase.child('later').child(task.id).set(task, (err) => {
                if (err) return console.error(err)
                firebase.child('taskbox').child(task.id).remove()
            })
        }},
        { label : 'Tomorrow',     id : 'tomorrow', handler : (task) => {
            task.postpone = parseInt(moment().add(1,'day').startOf('day').add(7,'hours').format('x'))
            firebase.child('later').child(task.id).set(task, (err) => {
                if (err) return console.error(err)
                firebase.child('taskbox').child(task.id).remove()
            })
        }},
        { label : 'This Weekend', id : 'this_weekend', handler : (task) => {
            task.postpone = parseInt(moment().endOf('week').startOf('day').add(9, 'hours').format('x'))
//            let test = moment(task.postpone).format('YYYY-MM-DD HH:mm')
//            console.log(test)
            firebase.child('later').child(task.id).set(task, (err) => {
                if (err) return console.error(err)
                firebase.child('taskbox').child(task.id).remove()
            })
        }},
        { label : 'Next Week',    id : 'next_week', handler : (task) => {
            task.postpone = parseInt(moment().endOf('week').add(2, 'days').startOf('day').add(7, 'hours').format('x'))
//            let test = moment(task.postpone).format('YYYY-MM-DD HH:mm')
//            console.log(test)
            firebase.child('later').child(task.id).set(task, (err) => {
                if (err) return console.error(err)
                firebase.child('taskbox').child(task.id).remove()
            })
        }},
        { label : 'In a month',   id : 'in_a_month', handler : (task) => {
            task.postpone = parseInt(moment().add(1, 'month').startOf('day').add(9, 'hours').format('x'))
//            let test = moment(task.postpone).format('YYYY-MM-DD HH:mm')
//            return console.log(test)
            firebase.child('later').child(task.id).set(task, (err) => {
                if (err) return console.error(err)
                firebase.child('taskbox').child(task.id).remove()
            })
        }},
        { label : 'Someday',      id : 'someday', handler : (task) => {
            let days = Math.floor(Math.random() * 60) + 10
            task.postpone = parseInt(moment().add(days, 'days').startOf('day').add(9, 'hours').format('x'))
//            let test = moment(task.postpone).format('YYYY-MM-DD HH:mm')
//            return console.log(test)
            firebase.child('later').child(task.id).set(task, (err) => {
                if (err) return console.error(err)
                firebase.child('taskbox').child(task.id).remove()
            })
        }},
        { label : 'Pick date',    id : 'date'         },
        { label : 'Group',        id : 'group', handler : (task, props) => {
            props.stateSetter({ showPostponer : false, showGrouper : true })
        }}
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
            return <div onClick={this.setIndexAndPostpone.bind(this,index)} className={classes} key={opt.id}>{opt.label}</div>
        })
        return (
            <div className="Postponer">
                <div onClick={this.closePostponer.bind(this)} className="shader"></div>
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
    closePostponer() {
        this.props.stateSetter({ showPostponer : false })
    }
    setIndexAndPostpone(index) {
        this.setState({ selectedIndex : index }, () => {
            this.postpone()
        })
    }
    postpone() {
        let postponeAction = options.daytime[this.state.selectedIndex]
        postponeAction.handler(this.props.task, this.props)
    }
    componentDidMount() {
        document.body.addEventListener('keydown', this.onKeyDown)
    }
    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.onKeyDown)
    }
}
