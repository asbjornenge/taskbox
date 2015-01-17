var React = require('react')
var $     = React.DOM

var SideMenuButton = React.createClass({
    render : function() {
        return $.div({
            className : 'SideMenuButton'
        }, 'SideMenu')
    }
})

var ActionBox = React.createClass({
    render : function() { 
        return $.div({
            className : 'ActionBox'
        }, [
            SideMenuButton({ key : 'SideMenuButton' }),
            $.div({}, 'Center buttons'),
            $.div({}, 'New')
        ])
    }
})

module.exports = ActionBox
