var React = require('react')
var $     = React.DOM

var Mailpipe = React.createClass({
    render : function() {
        $.div({},'This will be the mailapp')
    }
})

React.renderComponent(Mailpipe(), document.body)
