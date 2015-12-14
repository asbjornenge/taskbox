import React        from 'react'
import { connect }  from 'react-redux'
import { firebase } from '../../loops'
import TaskBoxItem  from './components/TaskBoxItem'
import TaskForm     from './components/TaskForm'
import taskBoxStyle from './taskbox.styl'

class TaskBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adding : false
        }
    }
    render() {
        let tasks = this.props.tasks.map(task => {
            return <TaskBoxItem key={task.id} task={task} />
        })

        return (
            <div className="TaskBox">
                <style>{taskBoxStyle}</style>
                <div className="actions">
                    <button onClick={this.onAddClick.bind(this)}>+</button>
                </div>
                <div className="form">
                    <TaskForm adding={this.state.adding} firebase={firebase} />
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
}

export default connect(state => {
    return {
        tasks : state.tasks
    }
})(TaskBox)
