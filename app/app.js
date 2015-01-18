var React       = require('react')
var $           = React.DOM
var ActionBox   = React.createFactory(require('./components/ActionBox'))
var MailBox     = React.createFactory(require('./components/MailBox'))
var SettingsBox = React.createFactory(require('./components/SettingsBox'))

var Mailpipe = React.createClass({
    render : function() {
        return $.div({},[
            ActionBox({ 
                key           : 'ActionBox',
                switchMainBox : this.switchMainBox
            }),
            this.state.mainbox({ key : 'MainBox' })
        ])
    },
    getInitialState : function() {
        return {
            mainbox : SettingsBox 
        }
    },
    switchMainBox : function(box) {
        switch(box) {
            case 'mail':
                this.setState({ mainbox : MailBox })
                return
            case 'settings':
                this.setState({ mainbox : SettingsBox })
                return
        }
    }
})

// Livereload for dev
require('./dev')()

React.render(React.createFactory(Mailpipe)(), document.body)
