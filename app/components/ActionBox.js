var React = require('react')
var $     = React.DOM

var ActionBox = React.createClass({
    render : function() { 
        return $.div({
            className : 'ActionBox'
        }, 'Action buttons here')
    }
})

module.exports = ActionBox
