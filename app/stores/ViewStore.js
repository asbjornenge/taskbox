var React             = require('react')
var _                 = require('lodash')
var EventEmitter      = require('events').EventEmitter
var Dispatcher        = require('../dispatcher')
var ActionTypes       = require('../constants').ActionTypes
var ConfigurationView = React.createFactory(require('../components/ConfigurationView'))
var MailBox           = React.createFactory(require('../components/MailBox'))
var Email             = React.createFactory(require('../components/Email'))
var ActionBoxInbox    = React.createFactory(require('../components/ActionBoxes/ActionBoxInbox'))
var ActionBoxEmail    = React.createFactory(require('../components/ActionBoxes/ActionBoxEmail'))

var state = {
    mainView           : MailBox,
    actionView         : ActionBoxInbox,
    selectedMailBox    : 'unified',
    selectedEmailemail : null
}

var ViewStore = _.assign({

    state : function() {
        return state
    },

    switchView : function(view) {
        switch(view) {
            case 'mailbox':
               this.setState({ 
                   main    : MailBox,
                   actions : ActionBoxInbox,
                   mailbox : 'unified'
               })
               break
            case 'configuration':
                state.mainView   = ConfigurationView,
                state.actionView = ActionBoxInbox
                this.emit('change')    
                break
            case 'mail':
               this.setState({ 
                   main    : Email,
                   actions : ActionBoxEmail,
                   email   : value.email
               })
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
