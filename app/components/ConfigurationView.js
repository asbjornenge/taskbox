var React                = require('react')
var t                    = require('tcomb-form')
var $                    = React.DOM
var ConfigurationActions = require('../actions/ConfigurationActions')
var ConfigurationStore   = require('../stores/ConfigurationStore')
var SaveButton           = require('./ConfigurationView/SaveButton')

// Form

var FirebaseFields = t.struct({
   url    : t.maybe(t.Str),
   secret : t.maybe(t.Str) 
})

// View

var ConfigurationView = React.createClass({
    render : function() {
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
            $.div({ key : 'FirebaseFormTitle'},'Firebase'),
            FirebaseForm({ key : 'firebaseform', ref : 'firebaseform' }),
            SaveButton({ key : 'SaveButton', onSave : this.onSave })
        ])
    },
    getInitialState : function() {
        return {
            firebase : ConfigurationStore.state().firebase
        } 
    },
    onSave : function() {
        ConfigurationActions.save({
            firebase : this.refs.firebaseform.getValue()
        })
    },
    onStoreChange : function() {
        console.log('config changed')
        this.setState({
            firebase : ConfigurationStore.state().firebase
        })
    },
    componentDidMount : function() {
        ConfigurationStore.on('change', this.onStoreChange)
    }
})

module.exports = ConfigurationView 
