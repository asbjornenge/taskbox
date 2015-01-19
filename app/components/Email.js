var React = require('react')
var $     = React.DOM

var Email = React.createClass({
    render : function() {
        var email = this.props.currentEmail
        var body  = email.body.length > 1 ? email.body[1] : email.body[0]
        return $.div({
            key       : 'Email',
            className : 'Email MailBox'
        },[
            $.div({ key : 'Subject'}, email.subject),
            $.div({ key : 'ToFromDate'}, [
                $.span({ key : 'to' },   email.to[0].email),
                $.span({ key : 'from' }, email.from),
                $.span({ key : 'date' }, email.date)
            ]),
            $.div({ key : 'Body'}, body.content)
        ])
    }
})

module.exports = Email 
