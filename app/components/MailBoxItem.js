var React  = require('react')
var $      = React.DOM
var moment = require('moment')

var MailBoxItem = React.createClass({
    render : function() {
        return $.li({
            className : 'MailBoxItem',
            onClick   : this.onClick
        },[
            $.div({
                key : 'Meta',
                className : 'Meta'
            },[
                $.span({ key : 'From', className : 'From' }, this.props.email.from),
                $.span({ key : 'Time', className : 'Time' }, this.formatDateTime(this.props.email.date))
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
    },
    onClick : function() {
        this.props.openMail(this.props.email)
    },
    formatDateTime : function(date) {
        return moment(date).format('h:mm')
    }
})

module.exports = MailBoxItem
