var _                  = require('lodash')
var moment             = require('moment')
var EventEmitter       = require('events').EventEmitter
var Dispatcher         = require('../dispatcher')
var ConnectionStore    = require('./ConnectionStore')

var state = {
    tasks : []
}

var TaskStore = _.assign({

    state : function() {
        return state
    },

    startListening : function() {
        this.connection.on('task-added',  (task) => {
            task.date = moment(task.headers.date)
            state.tasks.push(task)
            this.emit('change')
        })
        this.connection.on('task-removed', (task) => {
            state.tasks = state.tasks.filter(function(t) {
                return t.uid != task.uid
            })
            this.emit('change')
        })
    },

    stopListening : function() {

    }

}, EventEmitter.prototype)

ConnectionStore.on('change', function() {
    var ConnectionState = ConnectionStore.state()
    if (ConnectionState.connected) {
        TaskStore.connection = ConnectionState.connection
        TaskStore.startListening()
    }
})

module.exports = TaskStore 
