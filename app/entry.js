var React     = require('react')
var $         = React.DOM
var ActionBox = require('./components/ActionBox')
var MailBox   = require('./components/MailBox')

var Mailpipe = React.createClass({
    render : () => {
        return $.div({},[
            ActionBox(),
            MailBox()
        ])
    }
})

React.renderComponent(Mailpipe(), document.body)
