import React  from 'react'
import t      from 'tcomb-form'
import assign from 'object.assign'

let Form = t.form.Form
let TaskFormForm = t.struct({
    name    : t.Str
})
let options = {
    fields : {
        name : {
            attrs : {
                className : 'focusMe'
            }
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
        this.props.addTask(task)
    }
    componentDidUpdate(prevprops, prevstate) {
        if (!prevprops.adding && this.props.adding) {
            console.log('her')
            setTimeout(() => { document.querySelector('.focusMe').focus() })
        }
    }
}
