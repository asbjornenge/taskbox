var React = require('react')
var $     = React.DOM
var EmailStore = require('../stores/EmailStore')
var MailBoxItem = React.createFactory(require('./MailBoxItem'))

var getStateFromStores = function() {
    return {
        email : EmailStore.email
    }
}

var MailBox = React.createClass({
    render : function() {
        var email = this.state.email.map(function(email,index) { 
            return MailBoxItem({ 
                key      : 'MailBoxItem'+index,
                email    : email,
                openMail : this.props.openMail
            })
        }.bind(this))
        console.log(this.state)
        return $.ul({
            key       : 'MailBox',
            className : 'MailBox'
        },email)
    },
    getInitialState : function() {
        return getStateFromStores()
    },
    onStoreChange : function() {
        this.setState(getStateFromStores())
    },
    componentDidMount : function() {
        EmailStore.on('change', this.onStoreChange)
    }
})

module.exports = MailBox
