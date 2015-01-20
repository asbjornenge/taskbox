var React          = require('react')
var flux           = require('fluxify')
var MailBox        = React.createFactory(require('../components/MailBox'))
var Email          = React.createFactory(require('../components/Email'))
var ActionBoxInbox = React.createFactory(require('../components/ActionBoxes/ActionBoxInbox'))
var ActionBoxEmail = React.createFactory(require('../components/ActionBoxes/ActionBoxEmail'))

var ViewStore = flux.createStore({
    id: 'ViewStore',
    initialState: {
        main    : MailBox,
        actions : ActionBoxInbox,
        mailbox : 'unified',
        email   : null
    },
    actionCallbacks: {
        switchView : function(updater, value) {
            switch(value.box) {
                case 'mailbox':
                    updater.set({ 
                        main    : MailBox,
                        actions : ActionBoxInbox,
                        mailbox : 'unified'
                    })
                    break
               case 'settings':
                   updater.set({ 
                        main    : SettingsBox,
                        actions : ActionBoxInbox
                    })
                    break
                case 'mail':
                    updater.set({ 
                        main    : Email,
                        actions : ActionBoxEmail,
                        email   : value.email
                    })
                    break
            }
        },
        viewEmail : function(updater, value) {
            flux.doAction('switchView', {
                box   : 'mail',
                email : value
            })
        },
        backToCurrentMailBox : function(updater, value) {
            flux.doAction('switchView', {
                box : 'mailbox'
            })
        }
    }
})

module.exports = ViewStore 
