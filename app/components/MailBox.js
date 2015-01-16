var React = require('react')
var $     = React.DOM
var EmailStore = require('../stores/EmailStore')
var MailBoxItem = React.createFactory(require('./MailBoxItem'))

var getStateFromStores = () => {
    return {
        email : EmailStore.email
    }
}

var MailBox = React.createClass({
    render : function() {
        var email = this.state.email.map((email,index) => 
            MailBoxItem({email : email, key : 'MailBoxItem'+index})
        )
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
