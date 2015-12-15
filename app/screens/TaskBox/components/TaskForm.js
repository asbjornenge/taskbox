import React  from 'react'
import t      from 'tcomb-form'
import assign from 'object.assign'

let Form = t.form.Form
let TaskFormForm = t.struct({
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

export default class TaskForm extends React.Component {
    render() {
        if (!this.props.adding) return <span></span>
        return (
            <div className="TaskForm">
                <Form ref="form" type={TaskFormForm} options={options} />
                <button onClick={this.saveTask.bind(this)}>Add</button>
            </div>
        )
    }
    saveTask() {
        let value = this.refs.form.getValue()
        if (!value) return
        let task = assign({}, value, {
            type : 'task',
            date : new Date().getTime()
        })
        this.props.firebase.child('/taskbox').push(task)
    }
}
