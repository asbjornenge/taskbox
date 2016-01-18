import React           from 'react'
import ReactDOM        from 'react-dom'
import { connect }     from 'react-redux'
import assign          from 'object.assign'
import Style           from '@asbjornenge/react-style'
import nav             from '../shared/utils/nav'
import Sidebar         from './components/Sidebar'
import TaskBoxItem     from './components/TaskBoxItem'
import Postponer       from './components/Postponer'
import Grouper         from './components/Grouper'
import DatePicker      from './components/DatePicker'
import taskBoxStyle    from './taskbox.styl'
import datePickerStyle from './datepicker.styl'
import noUserSelect    from '../shared/styles/no-user-select.styl'

class TaskBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scrolling             : false,
            showSidebar           : false,
            showGrouper           : false,
            showDatePicker        : false,
            showPostponer         : false,
            showSelectedTaskIndex : false,
            searchFilter          : '',
            groupFilter           : undefined
        }
    }
    render() {
        let tasks = this.getVisibleTasks()
            .map((task, index) => {
                return <TaskBoxItem 
                            key={task.id} 
                            task={task} 
                            index={index}
                            scrolling={this.state.scrolling}
                            handleSwipeLeft={this.handleSwipeLeft.bind(this)}
                            handleSwipeRight={this.handleSwipeRight.bind(this)}
                            selected={this.state.showSelectedTaskIndex && index == this.props.selectedTaskIndex} />
            })
        let grouper
        if (this.state.showGrouper) grouper = (
            <Grouper 
                task={this.getSelectedTask()} 
                tasks={this.props.tasks}
                dispatch_db={this.props.dispatch_db}
                stateSetter={this.setState.bind(this)} />
        )
        let postponer
        if (this.state.showPostponer) postponer = (
            <Postponer 
                task={this.getSelectedTask()} 
                postponeTask={this.postponeTask.bind(this)}
                stateSetter={this.setState.bind(this)} />
        )
        let datepicker
        if (this.state.showDatePicker) datepicker = (
            <DatePicker
                task={this.getSelectedTask()}
                postponeTask={this.postponeTask.bind(this)}
                stateSetter={this.setState.bind(this)} />
        )
        let groupFilterBox
        if (this.props.groupFilter) groupFilterBox = (
            <div className="groupFilterBox" onClick={this.setGroupFilter.bind(this, undefined)}>{this.props.groupFilter}</div>
        )
        return (
            <div className="TaskBox" ref="TaskBox">
                <style>{taskBoxStyle}</style>
                <style>{noUserSelect}</style>
                <Style style={datePickerStyle} />
                {datepicker}
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
    onInputChange(e) {
        this.setState({ searchFilter : e.target.value })
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
    postponeTask(task, until) {
        this.props.dispatch_db({
            type  : 'DB_UPDATE_TASK',
            task  : task,
            value : { 
                group : 'later',
                postpone : until 
            }
        }).then(() => {
            this.setState({ 
                showPostponer  : false,
                showDatePicker : false
            })
        })
    }
    setGroupFilter(filter) {
        this.props.dispatch({
            type : 'SET_GROUP_FILTER',
            filter : filter
        })
        this.setState({ 
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
    handleSwipeRight(task) {
        this.completeTask(task)
    }
    getVisibleTasks() {
        return this.props.tasks
            .filter(task => {
                if (task.group != this.props.groupFilter) return false
                return task.name.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) >= 0
            })
            .sort((a,b) => {
                return b.date - a.date 
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
    onAddClick() {
        let value = this.refs.omnibar.value
        if (!value) return this.refs.omnibar.focus()
        this.addTask(value)
        this.refs.omnibar.value = ''
        this.setState({ searchFilter : '' })
    }
    onScroll() {
        if (!this.state.scrolling) this.setState({ scrolling : true })
        clearTimeout(this.scrollTimeout)
        this.scrollTimeout = setTimeout(() => {
            this.setState({ scrolling : false })
        },200)
    }
    componentDidMount() {
        this.keyDownHandler = keyDown.bind(this)
        this.onScrollHandler = this.onScroll.bind(this) 
        this.onAddClickHandler = this.onAddClick.bind(this)
        this.onLogoClickHandler = this.onLogoClick.bind(this)
        this.props.emitter.on('logoclick', this.onLogoClickHandler)
        this.props.emitter.on('addclick', this.onAddClickHandler)
        this.refs.TaskBox.addEventListener('scroll', this.onScrollHandler)
        window.addEventListener('keydown', this.keyDownHandler)
    }
    componentWillUnmount() {
        this.props.emitter.off('logoclick', this.onLogoClickHandler)
        this.props.emitter.off('addclick', this.onAddClickHandler)
        this.refs.TaskBox.removeEventListener('scroll', this.onScrollHandler)
        window.removeEventListener('keydown', this.keyDownHandler)
    }
}

function keyDown(e) {
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
            if (this.state.showPostponer || this.state.showGrouper || this.state.showDatePicker) 
                return this.setState({ showPostponer : false, showGrouper : false, showDatePicker : false })
            showSelectedTaskIndex = false
            break
        case 13:
            // ENTER
            if (!this.state.showSelectedTaskIndex) {
                let value = this.refs.omnibar.value
                if (!value) return
                this.addTask(value)
                this.refs.omnibar.value = ''
                this.setState({ searchFilter : '' })
            }
            else if (this.state.showSelectedTaskIndex && this.props.selectedTaskIndex >= 0) {
                nav.navigate(`/taskbox/${this.getSelectedTask().id}`)
            }
            break
        case 187:
            // +
            if (!(this.refs.omnibar == document.activeElement))
                setTimeout(() => {
                    this.refs.omnibar.focus()
                }, 100)
            break
        case 90:
            // z for ctrl+z
            if (!e.ctrlKey) return
            this.props.dispatch_db({
                type : 'DB_UNDO'
            })
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

export default connect(state => {
    return {
        tasks : state.tasks,
        emitter : state.emitter,
        dispatch_db : state.dispatch_db,
        groupFilter : state.groupFilter,
        selectedTaskIndex : state.selectedTaskIndex
    }
})(TaskBox)
