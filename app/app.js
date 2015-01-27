var React          = require('react')
var $              = React.DOM
var EventEmitter   = require('events').EventEmitter
var keyboard       = require('./io/KeyboardIO')
var ViewStore      = require('./stores/ViewStore')
var emitter        = new EventEmitter()

var getStateFromStores = function() {
    return {
        views : ViewStore.state()
    }
}

var TaskBox = React.createClass({
    render : function() {
        return $.div({},[
            $.div({
                key       : 'ActionBox',
                className : 'ActionBox'
            }, [
                this.state.views.actionView()
            ]),
            $.div({
                key       : 'MainBox',
                className : 'MailBox'
            },[
                this.state.views.mainView({
                    key             : 'MainView',
                    emitter         : emitter,
                    selectedTask    : this.state.views.selectedTask
                })
            ])
        ])
    },
    getInitialState : function() {
        return getStateFromStores()
    },
    onStoreChange : function() {
        this.setState(getStateFromStores())
    },
    componentDidMount : function() {
        ViewStore.on('change', this.onStoreChange)
    },
    componentWillUnmount : function() {
        ViewStore.off('change', this.onStoreChange)
    }
})

React.render(React.createFactory(TaskBox)(), document.body)
