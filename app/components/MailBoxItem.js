var React = require('react')
var $     = React.DOM

var MailBoxItem = React.createClass({
    render : function() {
        return $.li({
            className : 'MailBoxItem'
        },[
            $.h2({
                key : 'Subject',
            }, this.props.email.subject)
        ])
    }
})

module.exports = MailBoxItem
