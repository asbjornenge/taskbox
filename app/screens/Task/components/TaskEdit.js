import React         from 'react'
import t             from 'tcomb-form'

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

export default class TaskEdit extends React.Component {
    render() {
        return (
            <div className="TaskEditForm">
                <Form ref="form" type={TaskForm} options={options} value={this.props.task} />
                <div className="buttons">
                    <button onClick={this.props.saveTask.bind(this)}>Save</button>
                    <button onClick={this.props.toggleEditTask.bind(this)}>Cancel</button>
                </div>
            </div>
        )
    }
}
