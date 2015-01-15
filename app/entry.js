var React = require('react')
var $     = React.DOM

var Mailpipe = React.createClass({
    render : function() {
        return $.div({},[
            ActionButtons()
        ])
    }
})

var ActionButtons = React.createClass({
    render : function() {
        return $.div({}, 'Action buttons here')
    }
})

React.renderComponent(Mailpipe(), document.body)
