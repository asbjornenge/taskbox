var React       = require('react')
var $           = React.DOM
var _           = require('lodash')
var flux        = require('fluxify')
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
            className : 'MailBox'
        },email)
    },
    getInitialState : function() {
        return _.assign(getStateFromStores(), {
            selectedIndex : -1 
        })
    },
    moveSelected : function(e) {
        switch(e.which) {
            case 38:
                if (this.state.selectedIndex > -1) this.setState({ selectedIndex : this.state.selectedIndex-1 })
                break
            case 40:
                if (this.state.selectedIndex < this.state.email.length-1) this.setState({ selectedIndex : this.state.selectedIndex+1 })
                break
        }
    },
    isValidSelectedIndex : function() {
        var index = this.state.selectedIndex
        var email = this.state.email
        return (index >= 0 && index <= email.length)
    },
    getSelectedEmail :  function() {
        if (this.isValidSelectedIndex()) return this.state.email[this.state.selectedIndex]
    },
    openMail : function() {
        if (this.isValidSelectedIndex()) flux.doAction('viewEmail', this.getSelectedEmail())
    },
    archiveMail : function() {
        if (this.isValidSelectedIndex()) flux.doAction('archiveEmail', this.getSelectedEmail())
    },
    deleteMail : function() {
        if (this.isValidSelectedIndex()) flux.doAction('deleteEmail', this.getSelectedEmail())
    },
    onStoreChange : function() {
        this.setState(getStateFromStores())
    },
    componentDidMount : function() {
        EmailStore.on('change', this.onStoreChange)
        keyboard.bind('down',   this.moveSelected)
        keyboard.bind('up',     this.moveSelected)
        keyboard.bind('right',  this.archiveMail)
        keyboard.bind('enter',  this.openMail)
        keyboard.bind('ctrl+backspace',  this.deleteMail)
    },
    componentWillUnmount : function() {
        console.log('unmounting')
        keyboard.unbind('down')
        keyboard.unbind('up')
        keyboard.unbind('right')
        keyboard.unbind('enter')
        keyboard.unbind('ctrl+backspace')
    }
})

module.exports = MailBox
