var React          = require('react')
var $              = React.DOM
var ActionBoxInbox = React.createFactory(require('./components/ActionBoxes/ActionBoxInbox'))
var ActionBoxEmail = React.createFactory(require('./components/ActionBoxes/ActionBoxEmail'))
var MailBox        = React.createFactory(require('./components/MailBox'))
var SettingsBox    = React.createFactory(require('./components/SettingsBox'))
var Email          = React.createFactory(require('./components/Email'))

var Mailpipe = React.createClass({
    render : function() {
        return $.div({},[
            this.state.actionbox({ 
                key           : 'ActionBox',
                switchMainBox : this.switchMainBox 
            }),
            this.state.mainbox({ 
                key          : 'MainBox',
                openMail     : this.openMail,
                currentEmail : this.state.currentEmail
            })
        ])
    },
    getInitialState : function() {
        return {
            mainbox        : MailBox,
            actionbox      : ActionBoxInbox,
            currentMailBox : 'unified',
            currentEmail   : null 
        }
    },
    switchMainBox : function(box) {
        switch(box) {
            case 'mailbox':
                this.setState({ 
                    mainbox   : MailBox,
                    actionbox : ActionBoxInbox
                })
                return
            case 'settings':
                this.setState({ 
                    mainbox   : SettingsBox,
                    actionbox : ActionBoxInbox
                })
                return
            case 'mail':
                this.setState({ 
                    mainbox   : Email,
                    actionbox : ActionBoxEmail
                })
                return
        }
    },
    openMail : function(email) {
        this.setState({ currentEmail : email }, function() {
            this.switchMainBox('mail')
        }.bind(this))
    }

})

// Livereload for dev
require('./dev')()

React.render(React.createFactory(Mailpipe)(), document.body)
