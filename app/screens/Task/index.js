import React        from 'react'
import { connect }  from 'react-redux'
import t            from 'tcomb-form'
import assign       from 'object.assign'
import { firebase } from '../../loops'
import nav          from '../shared/utils/nav'
import taskStyle    from './task.styl'

class TaskNotFound extends React.Component {
    render() {
        return <div>No such task</div>
    }
}

let Form = t.form.Form
let TaskForm = t.struct({
    name    : t.Str,
    summary : t.maybe(t.Str)
})
let options = {
    fields : {
        summary : {
            type : 'textarea'
        }
    }
}

class TaskEdit extends React.Component {
    render() {
        return (
            <div className="TaskEditForm">
                <Form ref="form" type={TaskForm} options={options} value={this.props.task} />
            </div>
        )
    }
}

class TaskView extends React.Component {
    render() {
        return (
            <div className="TaskView">
                <h1>{this.props.task.name}</h1>
                <div className="summary">{this.props.task.summary}</div>
            </div>
        )
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
        let view = this.state.editing ? <TaskEdit ref="form" task={task} /> : <TaskView task={task} /> 
        let buttons = (
            <div className="buttons">
                <button onClick={this.removeTask.bind(this)}>Remove</button>
                <button onClick={this.toggleEditTask.bind(this)}>Edit</button>
            </div>
        )
        if (this.state.editing) buttons = (
            <div className="buttons">
                <button onClick={this.saveTask.bind(this)}>Save</button>
                <button onClick={this.toggleEditTask.bind(this)}>Cancel</button>
            </div>
        )
        return (
            <div className="Task">
                <style>{taskStyle}</style>
                {view}
                {buttons}
            </div>
        )
    }
    toggleEditTask() {
        this.setState({ editing : !this.state.editing })
    }
    saveTask() {
        let value = this.refs.form.refs.form.getValue()
        if (!value) return
        firebase.child(`/taskbox/${this.props.id}`).update(value)
    }
    removeTask() {
        firebase.child(`/taskbox/${this.props.id}`).remove()
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
        tasks : state.tasks
    }
})(Task)
