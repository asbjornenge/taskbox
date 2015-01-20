var React       = require('react')
var $           = React.DOM
var merge       = require('react/lib/merge')
var keyboard    = require('../io/KeyboardIO')
var EmailStore  = require('../stores/EmailStore')
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
                selected : this.state.selectedIndex === index,
                openMail : this.props.openMail
            })
        }.bind(this))
        return $.ul({
            key       : 'MailBox',
            className : 'MailBox',
        },email)
    },
    getInitialState : function() {
        return merge(getStateFromStores(), {
            selectedIndex : -1 
        })
    },
    moveSelected : function(e) {
        console.log(e.which, this.state.selectedIndex, this.state.email.length)
        switch(e.which) {
            case 38:
                if (this.state.selectedIndex > -1) this.setState({ selectedIndex : this.state.selectedIndex-1 })
                break
            case 40:
                if (this.state.selectedIndex < this.state.email.length-1) this.setState({ selectedIndex : this.state.selectedIndex+1 })
                break
        }
    },
    openMail : function() {
        if (this.state.selectedIndex >= 0) this.props.openMail(this.state.email[this.state.selectedIndex])
    },
    onStoreChange : function() {
        this.setState(getStateFromStores())
    },
    componentDidMount : function() {
        EmailStore.on('change', this.onStoreChange)
        keyboard.bind('down',   this.moveSelected)
        keyboard.bind('up',     this.moveSelected)
        keyboard.bind('enter',  this.openMail)
    },
    componentWillUnmount : function() {
        console.log('unmounting')
        keyboard.unbind('down')
        keyboard.unbind('up')
        keyboard.unbind('enter')
    }
})

module.exports = MailBox
