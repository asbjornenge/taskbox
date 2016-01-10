import React         from 'react'
import ReactMarkdown from 'react-markdown'

export default class TaskView extends React.Component {
    render() {
        let summary = this.props.task.summary || ''
        let re = new RegExp('(http|ftp|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'gi');

        let summaryWithLinks = summary.replace(re, '[$&]($&)')
        return (
            <div className="TaskView">
                <h1>{this.props.task.name}</h1>
                <div className="summary">
                    <ReactMarkdown source={summaryWithLinks} />
                </div>
                <div className="buttons">
                    <button onClick={this.props.removeTask.bind(this)}>Remove</button>
                    <button onClick={this.props.toggleEditTask.bind(this)}>Edit</button>
                </div>
            </div>
        )
    }
}
