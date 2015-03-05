var React = require('react')
var $     = React.DOM
var Logo  = React.createFactory(require('./Logo'))

var TaskActions = React.createClass({
    render : function() {
        return $.div({
            className : 'TaskActions'
        },[
            Logo({
                key : 'Logo'
            })
        ])
    },
    onClick : function() {
        console.log('click')
        console.log(this.props)
        this.props.switchMainBox('mailbox')
    }
})

module.exports = TaskActions
