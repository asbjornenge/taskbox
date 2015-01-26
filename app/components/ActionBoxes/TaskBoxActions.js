var React      = require('react')
var $          = React.DOM
var flux       = require('fluxify')
var ViewAction = require('../../actions/ViewActions')

var SideMenuButton = React.createClass({
    render : function() {
        return $.div({
            className : 'SideMenuButton',
            onClick : this.onClick
        }, 'SideMenu')
    },
    onClick : function() {
        ViewAction.switch('configuration') 
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
        ViewAction.switch('taskbox') 
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
//        this.props.switchMainBox('mail')
    }
})

var ActionBoxTaskBox = React.createClass({
    render : function() { 
        return $.div({
            className : 'ActionBoxTaskBox'
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

module.exports = ActionBoxTaskBox
