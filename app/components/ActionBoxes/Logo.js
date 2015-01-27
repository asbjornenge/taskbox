var React      = require('react')
var $          = React.DOM
var ViewAction = require('../../actions/ViewActions')

var Logo = React.createClass({
    render : function() {
        return $.div({
            className : 'Logo',
            onClick   : this.onClick
        })
    },
    onClick : function() {
        ViewAction.switch('configuration') 
    }
})

module.exports = Logo
