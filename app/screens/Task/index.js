import React        from 'react'
import { connect }  from 'react-redux'
import { firebase } from '../../loops'
import nav          from '../shared/utils/nav'
import taskStyle    from './task.styl'

class TaskNotFound extends React.Component {
    render() {
        return <div>No such task</div>
    }
}

class Task extends React.Component {
    render() {
        let task = this.pickTask()
        if (!task) return <TaskNotFound /> 
        return (
            <div className="Task">
                <style>{taskStyle}</style>
                <h1>{task.name}</h1>
                <div className="summary">{task.summary}</div>
                <div className="buttons">
                    <button onClick={this.removeTask.bind(this)}>Remove</button>
                </div>
            </div>
        )
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
