var React     = require('react')
var $         = React.DOM
var ActionBox = React.createFactory(require('./components/ActionBox'))
var MailBox   = React.createFactory(require('./components/MailBox'))

var Mailpipe = React.createClass({
    render : () => {
        return $.div({},[
            ActionBox({ key : 'ActionBox' }),
            MailBox({ key : 'MailBox' })
        ])
    }
})

React.render(React.createFactory(Mailpipe)(), document.body)
