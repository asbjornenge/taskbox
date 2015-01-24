var React          = require('react')
var $              = React.DOM
var flux           = require('fluxify')
var EventEmitter   = require('events').EventEmitter
var keyboard       = require('./io/KeyboardIO')
var ViewStore      = require('./stores/ViewStore')
var emitter        = new EventEmitter()

var getStateFromStores = function() {
    return {
        views : ViewStore.state()
    }
    return {
        mainView        : ViewStore.main,
        actionView      : ViewStore.actions,
        selectedMailBox : ViewStore.mailbox,
        selectedEmail   : ViewStore.email
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
                    selectedMailBox : this.state.views.selectedMailBox,
                    selectedEmail   : this.state.views.selectedEmail
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
        keyboard.bind('ctrl+r', function() { emitter.emit('reload') })
    },
    componentWillUnmount : function() {
        ViewStore.off('change', this.onStoreChange)
    }
})

// Livereload for dev
require('./dev')()

// Reload interval
setInterval(function() {
    console.log('reload interval')
//    flux.doAction('reloadAllEmail')
}, 300*1000)

React.render(React.createFactory(TaskBox)(), document.body)
