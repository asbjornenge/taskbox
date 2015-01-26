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
    }

}, EventEmitter.prototype)

ConnectionStore.on('change', function() {
    console.log('connected', ConnectionStore.state().connected)
})

module.exports = TaskStore 
