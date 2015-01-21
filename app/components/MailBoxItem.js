var React  = require('react')
var $      = React.DOM
var flux   = require('fluxify')
var moment = require('moment')

var MailBoxItem = React.createClass({
    render : function() {
        var classes = 'MailBoxItem'
        if (this.props.selected) classes += ' selected'
        var email = this.props.email
        return $.li({
            className : classes
//            onClick   : this.onClick
        },[
            $.div({
                key : 'Meta',
                className : 'Meta'
            },[
                $.span({ key : 'From', className : 'From' }, email.from),
                $.span({ key : 'Time', className : 'Time' }, this.formatDateTime(email.date))
            ]),
            $.div({
                key : 'Subject',
                className : 'Subject'
            }, email.subject),
            $.div({
                key : 'BodySummary',
                className : 'BodySummary'
            }, email.body.length > 0 ? email.body[0].content.slice(0,100) : '')
        ])
    },
    onClick : function() {
        flux.doAction('viewEmail', this.props.email)
    },
    formatDateTime : function(date) {
        return moment(date).format('h:mm')
    }
})

module.exports = MailBoxItem
