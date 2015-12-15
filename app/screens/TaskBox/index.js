import React        from 'react'
import { connect }  from 'react-redux'
import { firebase } from '../../loops'
import nav          from '../shared/utils/nav'
import TaskBoxItem  from './components/TaskBoxItem'
import TaskForm     from './components/TaskForm'
import taskBoxStyle from './taskbox.styl'

class TaskBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            adding : false,
            showSelectedTaskIndex : false
        }
        this.keyDownHandler = this.keyDown.bind(this)
    }
    render() {
        let tasks = this.props.tasks.map((task, index) => {
            return <TaskBoxItem key={task.id} task={task} selected={this.state.showSelectedTaskIndex && index == this.props.selectedTaskIndex} />
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
    keyDown(e) {
        let selectedIndex, showSelectedTaskIndex 
        switch(e.which) {
            case 40:
                // DOWN
                if (this.state.showSelectedTaskIndex)
                    selectedIndex = this.props.selectedTaskIndex < this.props.tasks.length-1 ? this.props.selectedTaskIndex+1 : this.props.tasks.length-1
                showSelectedTaskIndex = true
                break
            case 38:
                // UP 
                if (this.state.showSelectedTaskIndex)
                    selectedIndex = this.props.selectedTaskIndex > -1 ? this.props.selectedTaskIndex-1 : -1
                showSelectedTaskIndex = true
                break
            case 27:
                // ESC
                showSelectedTaskIndex = false
                break
            case 13:
                // ENTER
                if (this.state.showSelectedTaskIndex && this.props.selectedTaskIndex >= 0) {
                   nav.navigate(`/taskbox/${this.props.tasks[this.props.selectedTaskIndex].id}`)
                }
                break
            case 187:
                // +
                this.onAddClick()
                break
        }
        if (selectedIndex != undefined) {
            this.props.dispatch({
                type  : 'SET_SELECTED_TASK_INDEX',
                index : selectedIndex
            })
        }
        let state = {}
        if (showSelectedTaskIndex != undefined) state.showSelectedTaskIndex = showSelectedTaskIndex
        this.setState(state)
    }
    componentDidMount() {
        window.addEventListener('keydown', this.keyDownHandler)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyDownHandler)
    }
}

export default connect(state => {
    return {
        tasks : state.tasks,
        selectedTaskIndex : state.selectedTaskIndex
    }
})(TaskBox)
