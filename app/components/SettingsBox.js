var React = require('react')
var flux  = require('fluxify')
var t     = require('tcomb-form')
var $     = React.DOM
var ConfigurationStore = require('../stores/ConfigurationStore')

var getStateFromStores = function() {
    return {
        contextio : ConfigurationStore.contextio,
        firebase  : ConfigurationStore.firebase
    }
}

var SaveButton = React.createClass({
    render : function() {
        return $.button({
            onClick : this.onClick
        },'Save')
    },
    onClick : function() {
        this.props.onSave()
    }
})

var ImapFields = t.struct({
    user : t.maybe(t.Str),
    password : t.maybe(t.Password),
    host : t.maybe(t.Str),
    port : t.maybe(t.Number),
    tls  : t.maybe(t.Boolean)
})
var FirebaseFields = t.struct({
   url : t.maybe(t.Str),
   secret : t.maybe(t.Str) 
})

var SettingsBox = React.createClass({
    render : function() {
        var ImapForm = t.form.create(ImapFields, {
        })
        var FirebaseForm = t.form.create(FirebaseFields, {
            value : {
                url : this.state.firebase.url,
                secret : this.state.firebase.secret
            }
        })
        return $.ul({
            key       : 'SettingsBox',
            className : 'SettingsBox'
        },[
            $.div({ key : 'ContextIOFormTitle'},'IMAP'),
            ImapForm({ key : 'contextioform', ref : 'contextioform' }),
            $.div({ key : 'FirebaseFormTitle'},'Firebase'),
            FirebaseForm({ key : 'firebaseform', ref : 'firebaseform' }),
            SaveButton({ key : 'SaveButton', onSave : this.onSave })
        ])
    },
    getInitialState : function() {
        return getStateFromStores()
    },
    onSave : function() {
        flux.doAction('updateSettings', {
            accounts : this.refs.contextioform.getValue(), 
            firebase : this.refs.firebaseform.getValue()
        })
    },
    onStoreChange : function() {
        this.setState(getStateFromStores())
    },
    componentDidMount : function() {
        ConfigurationStore.on('change', this.onStoreChange)
    }
})

module.exports = SettingsBox 
