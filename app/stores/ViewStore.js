var React          = require('react')
var _              = require('lodash')
var EventEmitter   = require('events').EventEmitter
var Dispatcher     = require('../dispatcher')
var MailBox        = React.createFactory(require('../components/MailBox'))
var Email          = React.createFactory(require('../components/Email'))
var ActionBoxInbox = React.createFactory(require('../components/ActionBoxes/ActionBoxInbox'))
var ActionBoxEmail = React.createFactory(require('../components/ActionBoxes/ActionBoxEmail'))

var state = {
    mainView           : MailBox,
    actionView         : ActionBoxInbox,
    selectedMailBox    : 'unified',
    selectedEmailemail : null
}

var ViewStore = _.assign(EventEmitter.prototype, {

    state : function() {
        return state
    },

    switchView : function(view) {
        console.log('switching to',view)
    }

})

ViewStore.dispatchToken = Dispatcher.register(function (payload) {

    var action = payload.action;

    switch(action.type) {
        case ActionTypes.VIEW_SWITCH:
            ViewStore.switchView(action.view)
    }
})

//flux.createStore({
//    id: 'ViewStore',
//    actionCallbacks: {
//        switchView : function(updater, value) {
//            switch(value.box) {
//                case 'mailbox':
//                    updater.set({ 
//                        main    : MailBox,
//                        actions : ActionBoxInbox,
//                        mailbox : 'unified'
//                    })
//                    break
//               case 'settings':
//                   updater.set({ 
//                        main    : SettingsBox,
//                        actions : ActionBoxInbox
//                    })
//                    break
//                case 'mail':
//                    updater.set({ 
//                        main    : Email,
//                        actions : ActionBoxEmail,
//                        email   : value.email
//                    })
//                    break
//            }
//        },
//    }
//})

module.exports = ViewStore 
