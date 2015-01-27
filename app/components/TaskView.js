var React       = require('react')
var $           = React.DOM
var moment      = require('moment')
var jq          = require('jquery')
var open        = require('open')
var keyboard    = require('../io/KeyboardIO')
var ViewActions = require('../actions/ViewActions')

var Email = React.createClass({
    render : function() {
        var email = this.props.selectedTask
        var body  = email.html || email.text
        if (!email.html) body = body.replace('\n','<br>')
        return $.div({
            key       : 'TaskView',
            className : 'TaskView'
        },[
            $.div({ 
                key       : 'Subject',
                className : 'Subject'
            }, email.subject),
            $.div({ 
                key       : 'ToFromDate',
                className : 'ToFromDate'
            }, [
                $.span({ key : 'from', className : 'from' }, email.from[0].address),
                $.span({ key : 'sep',  className : 'sep'  }, 'to'),
                $.span({ key : 'to',   className : 'to'   }, email.to[0].address),
                $.span({ key : 'date', className : 'date' }, moment(email.date).format('DD MMM'))
            ]),
            $.div({ 
                key       : 'Body', 
                className : 'Body',
                dangerouslySetInnerHTML : { __html : body } })
        ])
    },
    componentDidMount : function() {
        keyboard.bind('backspace', function() { ViewActions.switch('taskbox') })
        jq('.Email.MailBox a').attr('target','_blank')
    },
    componentWillUnmount : function() {
        keyboard.unbind('backspace')
    }
})

module.exports = Email 
