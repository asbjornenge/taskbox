import React        from 'react'
import { connect }  from 'react-redux'
import assign       from 'object.assign'
import { firebase } from '../../loops'
import nav          from '../shared/utils/nav'
import TaskBoxItem  from './components/TaskBoxItem'
import TaskForm     from './components/TaskForm'
import Postponer    from './components/Postponer'
import taskBoxStyle from './taskbox.styl'

class TaskBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adding : false,
            showPostponer :  false,
            showSelectedTaskIndex : false
        }
        this.keyDownHandler = this.keyDown.bind(this)
    }
    render() {
        let tasks = this.props.tasks.map((task, index) => {
            return <TaskBoxItem key={task.id} task={task} selected={this.state.showSelectedTaskIndex && index == this.props.selectedTaskIndex} />
        })
        let postponer
        if (this.state.showPostponer) postponer = <Postponer task={this.getSeletectedTask()} /> 
        let form
        if (this.state.adding) form = <TaskForm ref="form" addTask={this.addTask.bind(this)} />
        return (
            <div className="TaskBox">
                <style>{taskBoxStyle}</style>
                {postponer}
                <div className="actions">
                    <button onClick={this.onAddClick.bind(this)}>+</button>
                </div>
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
        firebase.child('/taskbox').push(task)
        this.setState({ adding : false })
    }
    getSeletectedTask() {
        return this.props.tasks[this.props.selectedTaskIndex]
    }
    keyDown(e) {
        let selectedIndex, showSelectedTaskIndex 
        switch(e.which) {
            case 40:
                // DOWN
                if (this.state.showSelectedTaskIndex)
                    selectedIndex = this.props.selectedTaskIndex < this.props.tasks.length-1 ? this.props.selectedTaskIndex+1 : this.props.tasks.length-1
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
                    this.completeTask(this.getSeletectedTask())
                showSelectedTaskIndex = true
                break
            case 27:
                // ESC
                if (this.state.showPostponer) return this.setState({ showPostponer : false })
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
                   nav.navigate(`/taskbox/${this.props.tasks[this.props.selectedTaskIndex].id}`)
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
    getSelectedTask() {
        return this.props.tasks[this.props.selectedTaskIndex]
    }
    completeTask(task) {
        firebase.child('done').child(task.id).set(task, (err) => {
            if (err) return console.error(err)
            firebase.child('taskbox').child(task.id).remove()
        })
    }
    componentDidMount() {
        window.addEventListener('keydown', this.keyDownHandler)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyDownHandler)
    }
}

export default connect(state => {
    return {
        tasks : state.tasks,
        selectedTaskIndex : state.selectedTaskIndex
    }
})(TaskBox)
