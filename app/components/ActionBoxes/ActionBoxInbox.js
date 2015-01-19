var React = require('react')
var $     = React.DOM

var SideMenuButton = React.createClass({
    render : function() {
        return $.div({
            className : 'SideMenuButton',
            onClick : this.onClick
        }, 'SideMenu')
    },
    onClick : function() {
        this.props.switchMainBox('settings')
    }
})

var CenterButtons = React.createClass({
    render : function() {
        return $.div({
            className : 'CenterButtons',
            onClick   : this.onClick
        }, 'Center')
    },
    onClick : function() {
        this.props.switchMainBox('mailbox')
    }
})

var NewEmailButton = React.createClass({
    render : function() {
        return $.div({
            className : 'NewEmailButton',
            onClick   : this.onClick
        }, 'New')
    },
    onClick : function() {
        this.props.switchMainBox('mail')
    }
})

var ActionBox = React.createClass({
    render : function() { 
        return $.div({
            className : 'ActionBox'
        }, [
            SideMenuButton({ 
                key           : 'SideMenuButton',
                switchMainBox : this.props.switchMainBox
            }),
            CenterButtons({ 
                key : 'CenterButton', 
                switchMainBox : this.props.switchMainBox
            }),
            NewEmailButton({ key : 'NewEmailButto' })
        ])
    }
})

module.exports = ActionBox
