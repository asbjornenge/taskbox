import React        from 'react'
import ReactDOM     from 'react-dom'
import { connect }  from 'react-redux'
import assign       from 'object.assign'
import nav          from '../shared/utils/nav'
import Sidebar      from './components/Sidebar'
import TaskBoxItem  from './components/TaskBoxItem'
import Postponer    from './components/Postponer'
import Grouper      from './components/Grouper'
import taskBoxStyle from './taskbox.styl'

class TaskBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSidebar : false,
            showGrouper : false,
            showPostponer : false,
            showSelectedTaskIndex : false,
            groupFilter : undefined
        }
        this.keyDownHandler = this.keyDown.bind(this)
        this.onAddClickHandler = this.onAddClick.bind(this)
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
        let grouper
        if (this.state.showGrouper) grouper = (
            <Grouper 
                task={this.getSelectedTask()} 
                groups={[]} 
                dispatch_db={this.props.dispatch_db}
                stateSetter={this.setState.bind(this)} />
        )
        let postponer
        if (this.state.showPostponer) postponer = (
            <Postponer 
                task={this.getSelectedTask()} 
                stateSetter={this.setState.bind(this)} />
        )
        let groupFilterBox
        if (this.state.groupFilter) groupFilterBox = (
            <div className="groupFilterBox" onClick={this.setGroupFilter.bind(this, undefined)}>{this.state.groupFilter}</div>
        )
        return (
            <div className="TaskBox">
                <style>{taskBoxStyle}</style>
                {postponer}
                {grouper}
                <Sidebar 
                    show={this.state.showSidebar} 
                    tasks={this.props.tasks}
                    setGroupFilter={this.setGroupFilter.bind(this)} />
                <div className="form">
                    <input ref="omnibar" type="text" placeholder="Search..." onChange={this.onInputChange.bind(this)} />
                    {groupFilterBox}
                </div>
                <div className="list">
                    {tasks}
                </div>
            </div>
        )
    }
    onAddClick() {
        let value = this.refs.omnibar.value
        if (!value) return this.refs.omnibar.focus()
        this.addTask(value)
        this.refs.omnibar.value = ""
    }
    addTask(name) {
        let task = {
            name : name,
            type : 'task',
            date : new Date().getTime()
        }
        this.props.dispatch_db({
            type : 'DB_ADD_TASK',
            task : task
        })
    }
    onInputChange(e) {
        console.log(e.target.value)
    }
    setGroupFilter(filter) {
        this.setState({ 
            groupFilter : filter,
            showSidebar : false 
        })
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
                showSelectedTaskIndex = false
                break
            case 13:
                // ENTER
                if (!this.state.showSelectedTaskIndex) {
                    let value = this.refs.omnibar.value
                    if (!value) return
                    this.addTask(value)
                    this.refs.omnibar.value = ""
                }
                else if (this.state.showSelectedTaskIndex && this.props.selectedTaskIndex >= 0) {
                   nav.navigate(`/taskbox/${this.getSelectedTask().id}`)
                }
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
        this.props.dispatch_db({
            type  : 'DB_UPDATE_TASK',
            task  : task,
            value : { group : 'done' }
        })
    }
    onLogoClick() {
        this.setState({ showSidebar : !this.state.showSidebar })
    }
    componentDidMount() {
        this.props.emitter.on('logoclick', this.onLogoClickHandler)
        this.props.emitter.on('addclick', this.onAddClickHandler)
        window.addEventListener('keydown', this.keyDownHandler)
    }
    componentWillUnmount() {
        this.props.emitter.off('logoclick', this.onLogoClickHandler)
        this.props.emitter.off('addclick', this.onAddClickHandler)
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
