var React     = require('react')
var $         = React.DOM
var ActionBox = React.createFactory(require('./components/ActionBox'))
var MailBox   = React.createFactory(require('./components/MailBox'))

var Mailpipe = React.createClass({
    render : function() {
        return $.div({},[
            ActionBox({ key : 'ActionBox' }),
            MailBox({ key : 'MailBox' })
        ])
    }
})

// Livereload for dev
require('./dev')()

React.render(React.createFactory(Mailpipe)(), document.body)
