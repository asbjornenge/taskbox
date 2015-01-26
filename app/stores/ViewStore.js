var React             = require('react')
var _                 = require('lodash')
var EventEmitter      = require('events').EventEmitter
var Dispatcher        = require('../dispatcher')
var ActionTypes       = require('../constants').ActionTypes
var ConfigurationView = React.createFactory(require('../components/ConfigurationView'))
var TaskBoxView       = React.createFactory(require('../components/TaskBoxView'))
var TaskView          = React.createFactory(require('../components/TaskView'))
var TaskBoxActions    = React.createFactory(require('../components/ActionBoxes/TaskBoxActions'))
var TaskActions       = React.createFactory(require('../components/ActionBoxes/TaskActions'))

var state = {
    mainView     : TaskBoxView,
    actionView   : TaskBoxActions,
    selectedTask : null
}

var ViewStore = _.assign({

    state : function() {
        return state
    },

    switchView : function(view) {
        switch(view) {
            case 'taskbox':
                state.mainView   = TaskBoxView
                state.actionView = TaskBoxActions
                this.emit('change')
                break
            case 'configuration':
                state.mainView   = ConfigurationView,
                state.actionView = TaskBoxActions
                this.emit('change')    
                break
        }
    }

}, EventEmitter.prototype)

ViewStore.dispatchToken = Dispatcher.register(function (payload) {

    var action = payload.action;

    switch(action.type) {
        case ActionTypes.VIEW_SWITCH:
            ViewStore.switchView(action.view)
    }
})

module.exports = ViewStore 
