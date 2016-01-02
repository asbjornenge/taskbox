import React        from 'react'
import { connect }  from 'react-redux'
import assign       from 'object.assign'
import { firebase } from '../../loops'
import nav          from '../shared/utils/nav'
import Sidebar      from '../shared/components/FlyoutSidebar'
import TaskBoxItem  from './components/TaskBoxItem'
import TaskForm     from './components/TaskForm'
import Postponer    from './components/Postponer'
import Grouper      from './components/Grouper'
import taskBoxStyle from './taskbox.styl'

class TaskBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adding : false,
            showSidebar : false,
            showGrouper : false,
            showPostponer : false,
            showSelectedTaskIndex : false,
            groupFilter : undefined
        }
        this.keyDownHandler = this.keyDown.bind(this)
        this.onLogoClickHandler = this.onLogoClick.bind(this)
    }
    render() {
        let tasks = this.getVisibleTasks()
            .map((task, index) => {
                return <TaskBoxItem 
                            key={task.id} 
                            task={task} 
                            index={index}
                            handleSwipeLeft={this.handleSwipeLeft.bind(this)}
                            selected={this.state.showSelectedTaskIndex && index == this.props.selectedTaskIndex} />
            })
//        tasks.push(
//            <TaskBoxItem key="test" task={{id:1,name:'test'}} /> 
//        )
        let groups = this.props.tasks.reduce((groups, task) => { // TODO: Move to some utils or class function? 
            let taskgroup = task.group ? [task.group] : []
            if (taskgroup.length == 0) return groups
            if (groups.indexOf(taskgroup[0]) >= 0) return groups
            return groups.concat(taskgroup)
        },[])
        let groupTabs = groups.map((group, index) => {
            let classes = "groupTab"
            if (this.state.groupFilter == group) classes += ' selected'
            return (
                <span 
                    key={group+index} 
                    className={classes}
                    onClick={this.setGroupFilter.bind(this, group)}>{group}</span>
            )
        })
        groupTabs.push(
            <span 
                key="nofilter" 
                className={"groupTab "+(this.state.groupFilter == undefined ? 'selected' : '')} 
                onClick={this.setGroupFilter.bind(this, undefined)}>TODO</span>
        )
        let form
        if (this.state.adding) form = <TaskForm ref="form" addTask={this.addTask.bind(this)} />
        let grouper
        if (this.state.showGrouper) grouper = (
            <Grouper 
                task={this.getSelectedTask()} 
                groups={groups} 
                stateSetter={this.setState.bind(this)} />
        )
        let postponer
        if (this.state.showPostponer) postponer = (
            <Postponer 
                task={this.getSelectedTask()} 
                stateSetter={this.setState.bind(this)} />
        )
        return (
            <div className="TaskBox">
                <style>{taskBoxStyle}</style>
                {postponer}
                {grouper}
                <Sidebar show={this.state.showSidebar} animate={true}>
                    <div>Sidebar!!</div>
                </Sidebar>
                <div className="form">
                   {form} 
                </div>
                <div className="list">
                    {tasks}
                </div>
            </div>
        )
    }
    onAddClick() {
        this.setState({ adding : !this.state.adding })
    }
    addTask(task) {
        this.props.dispatch_db({
            type : 'DB_ADD_TASK',
            task : task
        })
        this.setState({ adding : false })
    }
    setGroupFilter(filter) {
        this.setState({ groupFilter : filter })
    }
    handleSwipeLeft(task, index) {
        this.props.dispatch({
            type  : 'SET_SELECTED_TASK_INDEX',
            index : index
        })
        // TODO: fix! does not redux offer a callback for this?
        setTimeout(() => {
            this.setState({ showPostponer : true })
        },10)
    }
    keyDown(e) {
        let selectedIndex, showSelectedTaskIndex 
        switch(e.which) {
            case 40:
                // DOWN
                if (this.state.showSelectedTaskIndex)
                    selectedIndex = this.props.selectedTaskIndex < this.getVisibleTasks().length-1 ? this.props.selectedTaskIndex+1 : this.getVisibleTasks().length-1
                showSelectedTaskIndex = true
                break
            case 38:
                // UP 
                if (this.state.showSelectedTaskIndex)
                    selectedIndex = this.props.selectedTaskIndex > -1 ? this.props.selectedTaskIndex-1 : -1
                showSelectedTaskIndex = true
                break
            case 37:
                // LEFT
                if (this.state.showSelectedTaskIndex)
                    this.setState({ showPostponer : true })
                showSelectedTaskIndex = true
                break
            case 39:
                // RIGHT
                if (this.state.showSelectedTaskIndex)
                    this.completeTask(this.getSelectedTask())
                showSelectedTaskIndex = true
                break
            case 27:
                // ESC
                if (this.state.showPostponer || this.state.showGrouper) return this.setState({ showPostponer : false, showGrouper : false })
                if (this.state.adding) return this.setState({ adding : false })
                showSelectedTaskIndex = false
                break
            case 13:
                // ENTER
                if (this.state.adding) {
                    let value = this.refs.form.refs.form.getValue()
                    if (!value) return
                    let task = assign({}, value, {
                        type : 'task',
                        date : new Date().getTime()
                    })
                    this.addTask(task)
                }
                else if (this.state.showSelectedTaskIndex && this.props.selectedTaskIndex >= 0) {
                   nav.navigate(`/taskbox/${this.getSelectedTask().id}`)
                }
                break
            case 187:
                // +
                this.setState({ adding : true })
                break
        }
        if (selectedIndex != undefined) {
            this.props.dispatch({
                type  : 'SET_SELECTED_TASK_INDEX',
                index : selectedIndex
            })
        }
        let state = {}
        if (showSelectedTaskIndex != undefined) state.showSelectedTaskIndex = showSelectedTaskIndex
        if (Object.keys(state).length > 0) this.setState(state)
    }
    getVisibleTasks() {
        return this.props.tasks.filter(task => {
            return task.group == this.state.groupFilter
        })
    }
    getSelectedTask() {
        return this.getVisibleTasks()[this.props.selectedTaskIndex]
    }
    completeTask(task) {
        firebase.child('done').child(task.id).set(task, (err) => {
            if (err) return console.error(err)
            firebase.child('taskbox').child(task.id).remove()
        })
    }
    onLogoClick() {
        this.setState({ showSidebar : !this.state.showSidebar })
    }
    componentDidMount() {
        this.props.emitter.on('logoclick', this.onLogoClickHandler)
        window.addEventListener('keydown', this.keyDownHandler)
    }
    componentWillUnmount() {
        this.props.emitter.off('logoclick', this.onLogoClickHandler)
        window.removeEventListener('keydown', this.keyDownHandler)
    }
}

export default connect(state => {
    return {
        tasks : state.tasks,
        emitter : state.emitter,
        dispatch_db : state.dispatch_db,
        selectedTaskIndex : state.selectedTaskIndex
    }
})(TaskBox)
