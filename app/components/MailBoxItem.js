var React = require('react')
var $     = React.DOM

var MailBoxItem = React.createClass({
    render : function() {
        return $.li({
            className : 'MailBoxItem'
        },[
            $.div({
                key : 'Meta',
                className : 'Meta'
            },[
                $.span({ key : 'From', className : 'From' }, this.props.email.from),
                $.span({ key : 'Time', className : 'Time' }, '3:12 PM')
            ]),
            $.div({
                key : 'Subject',
                className : 'Subject'
            }, this.props.email.subject),
            $.div({
                key : 'BodySummary',
                className : 'BodySummary'
            }, this.props.email.body.slice(0,50))
        ])
    }
})

module.exports = MailBoxItem
