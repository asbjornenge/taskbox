import React         from 'react'
import ReactMarkdown from 'react-markdown'

export default class TaskView extends React.Component {
    render() {
        return (
            <div className="TaskView">
                <h1>{this.props.task.name}</h1>
                <div className="summary">
                    <ReactMarkdown source={this.props.task.summary || ''} />
                </div>
                <div className="buttons">
                    <button onClick={this.props.removeTask.bind(this)}>Remove</button>
                    <button onClick={this.props.toggleEditTask.bind(this)}>Edit</button>
                </div>
            </div>
        )
    }
}
