var React    = require('react')
var $        = React.DOM
var flux     = require('fluxify')
var moment   = require('moment')
var jq       = require('jquery')
var open     = require('open')
var keyboard = require('../io/KeyboardIO')

var Email = React.createClass({
    render : function() {
        var email = this.props.selectedEmail
        if (email.body.length == 0) email.body.push({content : ''})
        var html  = email.body.length > 1
        var body  = html ? email.body[1] : email.body[0]
        if (!html) body.content = body.content.replace('\n','<br>')

        return $.div({
            key       : 'Email',
            className : 'Email MailBox'
        },[
            $.div({ 
                key       : 'Subject',
                className : 'Subject'
            }, email.subject),
            $.div({ 
                key       : 'ToFromDate',
                className : 'ToFromDate'
            }, [
                $.span({ key : 'from', className : 'from' }, email.from),
                $.span({ key : 'sep',  className : 'sep'  }, 'to'),
                $.span({ key : 'to',   className : 'to'   }, email.to[0].email),
                $.span({ key : 'date', className : 'date' }, moment(email.date).format('DD MMM'))
            ]),
            $.div({ 
                key       : 'Body', 
                className : 'Body',
                dangerouslySetInnerHTML : { __html : body.content} })
        ])
    },
    componentDidMount : function() {
        keyboard.bind('backspace', function() { flux.doAction('backToCurrentMailBox') })
        jq('.Email.MailBox a').on('click', function(e) {
            e.preventDefault()
            open(e.target.href, 'google-chrome-stable --no-sandbox', function(err, stdout, stderr) {
                console.log('HERE',err)
            })
        })
    },
    componentWillUnmount : function() {
        keyboard.unbind('backspace')
    }
})

module.exports = Email 
