var _                  = require('lodash')
var EventEmitter       = require('events').EventEmitter
var Dispatcher         = require('../dispatcher')
var ConnectionStore    = require('./ConnectionStore')

var state = {
    taskboxes : {}
}

var TaskStore = _.assign({

    taskboxes : function() {
        return state.taskboxes
    },

    startListening : function() {
        this.connection.on('task-added',  function(task) { console.log('task added',task)  })
        this.connection.on('task-remove', function(task) { console.log('task removed',task)  })
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
