var React = require('react')
var $     = React.DOM

var SaveButton = React.createFactory(React.createClass({
    render : function() {
        return $.button({
            onClick : this.onClick
        },'Save')
    },
    onClick : function() {
        this.props.onSave()
    }
}))

module.exports = SaveButton
