import React       from 'react'
import { connect } from 'react-redux'
import Header      from '../shared/components/Header'

class TaskBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adding : false
        }
    }
    render() {
        let tasks = this.props.tasks.map(task => {
            return (
                <div className="TaskBoxListItem" key={task.id}>
                    {task.name}
                </div>
            )
        })
        if (tasks.length == 0) tasks.push((
            <div className="TaskBoxListItem empty" key="empty">
                No tasks
            </div>
        ))
        let addInput, addSave
        if (this.state.adding) {
            addInput = (
                <input ref="addInput" type="text" />
            )
            addSave = (
                <button onClick={this.onSaveClick.bind(this)}>Save</button>
            )
        }
        return (
            <div className="TaskBox">
                <div className="taskActions">
                    <button onClick={this.onAddClick.bind(this)}>+</button>
                    {addInput}
                    {addSave}
                </div>
                <div className="taskList">
                    {tasks}
                </div>
            </div>
        )
    }
    onAddClick() {
        this.setState({ adding : !this.state.adding })
    }
    onSaveClick() {
        console.log('saving')
    }
}

export default connect(state => {
    return {
        tasks : state.tasks
    }
})(TaskBox)
