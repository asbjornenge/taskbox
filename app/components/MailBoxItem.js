var React  = require('react')
var $      = React.DOM
var flux   = require('fluxify')
var moment = require('moment')

var MailBoxItem = React.createClass({
    render : function() {
        var classes = 'MailBoxItem'
        if (this.props.selected) classes += ' selected'
        return $.li({
            className : classes,
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
            }, this.props.email.body[0].content.slice(0,100))
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
