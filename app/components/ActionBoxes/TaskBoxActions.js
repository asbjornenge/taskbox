var React      = require('react')
var $          = React.DOM
var ViewAction = require('../../actions/ViewActions')
var Logo       = React.createFactory(require('./Logo'))

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
            Logo({
                key : 'Logo'
            }),
            CenterButtons({ 
                key : 'CenterButton'
            }),
            NewEmailButton({ 
                key : 'NewEmailButto' 
            })
        ])
    }
})

module.exports = ActionBoxTaskBox
