var React = require('react')
var $     = React.DOM

var ActionBoxEmail = React.createClass({
    render : function() {
        return $.div({
            onClick : this.onClick
        },'back')
    },
    onClick : function() {
        console.log('click')
        console.log(this.props)
        this.props.switchMainBox('mailbox')
    }
})

module.exports = ActionBoxEmail
