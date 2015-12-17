import React  from 'react'
import t      from 'tcomb-form'
import assign from 'object.assign'

let Form = t.form.Form
let TaskFormForm = t.struct({
    name    : t.Str
})
let options = {
    auto : 'placeholders',
    fields : {
        name : {
            attrs : {
                placeholder : 'Add a task',
                className : 'focusMe'
            }
        }
    }
}

export default class TaskForm extends React.Component {
    render() {
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
        this.props.addTask(task)
    }
    componentDidMount() {
        setTimeout(() => { document.querySelector('.focusMe').focus() })
    }
}
