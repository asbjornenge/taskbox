var flux           = require('fluxify');
var MailBox        = require('../components/MailBox')
var ActionBoxInbox = require('../components/ActionBoxes/ActionBoxInbox')
var ActionBoxEmail = require('../components/ActionBoxes/ActionBoxEmail')

var ViewStore = flux.createStore({
    id: 'ViewStore',
    initialState: {
        main    : MailBox,
        actions : ActionBoxInbox,
        mailbox : 'unified',
        email   : null
    },
    actionCallbacks: {
        switchView : function( updater, value ) {            
            switch(value.box) {
                case 'mailbox':
                    this.setState({ 
                        main    : MailBox,
                        actions : ActionBoxInbox,
                        mailbox : 'unified'
                    })
                    return
               case 'settings':
                   this.setState({ 
                        main    : SettingsBox,
                        actions : ActionBoxInbox
                    })
                    return
                case 'mail':
                    this.setState({ 
                        main    : Email,
                        actions : ActionBoxEmail,
                        email   : value.email
                    })
                    return
            }
        }
    }
})

module.exports = ViewStore 
