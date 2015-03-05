var React       = require('react')
var $           = React.DOM
var _           = require('lodash')
var flux        = require('fluxify')
var keyboard    = require('../io/KeyboardIO')
var TaskStore   = require('../stores/TaskStore')
var TaskBoxItem = React.createFactory(require('./TaskBoxView/TaskBoxItem'))
var ViewActions = require('../actions/ViewActions')

var getStateFromStores = function(mailbox) {
    return {
        tasks : TaskStore.state().tasks
    }
}

var TaskBoxView = React.createClass({
    render : function() {
        var tasks = this.sortedTasks().map(function(task,index) { 
            return TaskBoxItem({ 
                key      : 'MailBoxItem'+index,
                task     : task,
                selected : this.state.selectedIndex === index,
                openTask : this.props.openTask
            })
        }.bind(this))
        return $.ul({
            key       : 'TaskBoxView',
            className : 'TaskBoxView'
        },tasks)
    },
    getInitialState : function() {
        return _.assign(getStateFromStores(), {
            selectedIndex : -1 
        })
    },
    moveSelected : function(e) {
        switch(e.which) {
            case 38:
                if (this.state.selectedIndex > -1) this.setState({ selectedIndex : this.state.selectedIndex-1 })
                break
            case 40:
                if (this.state.selectedIndex < this.state.tasks.length-1) this.setState({ selectedIndex : this.state.selectedIndex+1 })
                break
        }
    },
    sortedTasks : function() {
        var tasks = _.sortBy(this.state.tasks, 'date').reverse().reduce(function(groups, task, index, tasks) {
            if (groups[task.subject]) groups[task.subject].conversation.push(task)
            else { groups[task.subject] = task; task.conversation = [] }
            if (index == tasks.length-1) return Object.keys(groups).map(function(group) { return groups[group] }) 
            return groups
        },{})
        return (tasks instanceof Array) ? tasks : []
    },
    isValidSelectedIndex : function() {
        var index = this.state.selectedIndex
        var email = this.state.tasks
        return (index >= 0 && index <= email.length)
    },
    getSelectedTask :  function() {
        if (this.isValidSelectedIndex()) return this.sortedTasks()[this.state.selectedIndex]
    },
    openTask : function() {
        if (this.isValidSelectedIndex()) ViewActions.switch('task', { task : this.getSelectedTask() })
    },
    archiveTask : function() {
    },
    deleteTask : function() {
    },
    onStoreChange : function() {
        this.setState(getStateFromStores())
    },
    componentDidMount : function() {
        TaskStore.on('change', this.onStoreChange)
        keyboard.bind('down',   this.moveSelected)
        keyboard.bind('up',     this.moveSelected)
        keyboard.bind('right',  this.archiveTask)
        keyboard.bind('enter',  this.openTask)
        keyboard.bind('ctrl+backspace',  this.deleteTask)
    },
    componentWillUnmount : function() {
        TaskStore.removeListener('change', this.onStoreChange)
        keyboard.unbind('down')
        keyboard.unbind('up')
        keyboard.unbind('right')
        keyboard.unbind('enter')
        keyboard.unbind('ctrl+backspace')
    }
})

module.exports = TaskBoxView 
