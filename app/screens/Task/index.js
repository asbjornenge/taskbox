import React         from 'react'
import { connect }   from 'react-redux'
import assign        from 'object.assign'
import nav           from '../shared/utils/nav'
import TaskView      from './components/TaskView'
import TaskEdit      from './components/TaskEdit'
import taskStyle     from './task.styl'

class TaskNotFound extends React.Component {
    render() {
        return <div>No such task</div>
    }
}

class Task extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editing : false
        }
    }
    render() {
        let task = this.pickTask()
        if (!task) return <TaskNotFound /> 
        let view = (
            <TaskView 
                task={task}
                removeTask={this.removeTask.bind(this)}
                toggleEditTask={this.toggleEditTask.bind(this)} />
        )
        if (this.state.editing) view = ( 
            <TaskEdit 
                ref="form" 
                task={task} 
                saveTask={this.saveTask.bind(this)}
                toggleEditTask={this.toggleEditTask.bind(this)} />
        )
        return (
            <div className="Task">
                <style>{taskStyle}</style>
                {view}
            </div>
        )
    }
    toggleEditTask() {
        this.setState({ editing : !this.state.editing })
    }
    saveTask() {
        let value = this.refs.form.refs.form.getValue()
        if (!value) return
        this.props.dispatch_db({
            type  : 'DB_UPDATE_TASK',
            task  : this.pickTask(),
            value : assign({}, value)
        })
        this.setState({
            editing: false
        })
    }
    removeTask() {
        let a = confirm("Are you sure?")
        if (!a) return
        this.props.dispatch_db({
            type : 'DB_REMOVE_TASK',
            task : this.pickTask()
        })
        nav.navigate('/')
    }
    pickTask() {
        return this.props.tasks.reduce((found, task) => {
            if (found) return found
            if (task.id == this.props.id) return task
            return found
        },null)
    }
}

export default connect(state => {
    return {
        tasks : state.tasks,
        dispatch_db : state.dispatch_db
    }
})(Task)
