var React          = require('react')
var $              = React.DOM
var ViewStore      = require('./stores/ViewStore')

var getStateFromStores = function() {
    return {
        mainView   : ViewStore.main,
        actionView : ViewStore.actions,
        mailbox    : ViewStore.mailbox,
        email      : ViewStore.email
    }
}

var Mailpipe = React.createClass({
    render : function() {
        return $.div({},[
            $.div({
                key       : 'ActionBox',
                className : 'ActionBox'
            }, [
                this.state.actionView()
            ]),
            $.div({
                key       : 'MainBox',
                className : 'MailBox'
            },[
                this.state.mainView()
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

// Livereload for dev
require('./dev')()

React.render(React.createFactory(Mailpipe)(), document.body)
