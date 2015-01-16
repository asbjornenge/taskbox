var React = require('react')
var $     = React.DOM

var MailBoxItem = React.createClass({
    render : function() {
        return $.li({
            className : 'MailBoxItem'
        },[
            $.div({
                key : 'Meta'
            },[
                $.span({ key : 'From' }, this.props.email.from),
                $.span({ key : 'Time' }, '3:12 PM')
            ]),
            $.h3({
                key : 'Subject',
            }, this.props.email.subject),
            $.div({
                key : 'Summary'
            }, this.props.email.body.slice(0,50))
        ])
    }
})

module.exports = MailBoxItem
