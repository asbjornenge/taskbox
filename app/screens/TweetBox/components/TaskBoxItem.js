var React  = require('react')
var $      = React.DOM
var flux   = require('fluxify')
var moment = require('moment')

var MailBoxItem = React.createClass({
    render : function() {
        var classes = 'TaskBoxItem'
        if (this.props.selected) classes += ' selected'
        var email = this.props.task
        var from  = email.from.length > 0 ? email.from[0] : { address : '' }
        return $.li({
            className : classes
//            onClick   : this.onClick
        },[
            $.div({
                key : 'Meta',
                className : 'Meta'
            },[
                $.span({ key : 'From', className : 'From' }, from.address),
                $.span({ key : 'Time', className : 'Time' }, email.date.format('h:mm'))
            ]),
            $.div({
                key : 'Subject',
                className : 'Subject'
            }, email.subject),
            $.div({
                key : 'BodySummary',
                className : 'BodySummary'
            }, email.text ? email.text.slice(0,100) : '')
        ])
    },
    onClick : function() {
        flux.doAction('viewEmail', this.props.email)
    }
})

module.exports = MailBoxItem
