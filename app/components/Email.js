var React    = require('react')
var $        = React.DOM
var keyboard = require('../io/KeyboardIO')

var Email = React.createClass({
    render : function() {
        var email = this.props.currentEmail
        var html  = email.body.length > 1
        var body  = html ? email.body[1] : email.body[0]
        if (!html) body.content = body.content.replace('\n','<br>')

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
            $.div({ key : 'body', dangerouslySetInnerHTML : { __html : body.content} })
        ])
    },
    componentDidMount : function() {
        keyboard.bind('backspace', function() { console.log('going back') })
    },
    componentWillUnmount : function() {
        keyboard.unbind('backspace')
    }
})

module.exports = Email 
