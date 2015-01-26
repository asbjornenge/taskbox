var React = require('react')
var t     = require('tcomb-form')
var $     = React.DOM
var ConfigurationActions = require('../actions/ConfigurationActions')
var ConfigurationStore   = require('../stores/ConfigurationStore')

var getStateFromStores = function() {
    return {
        firebase : ConfigurationStore.state().firebase
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

var FirebaseFields = t.struct({
   url    : t.maybe(t.Str),
   secret : t.maybe(t.Str) 
})

var SettingsBox = React.createClass({
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
        return getStateFromStores()
    },
    onSave : function() {
        ConfigurationActions.save({
            firebase : this.refs.firebaseform.getValue()
        })
    },
    onStoreChange : function() {
        console.log('config changed')
        this.setState(getStateFromStores())
    },
    componentDidMount : function() {
        ConfigurationStore.on('change', this.onStoreChange)
    }
})

module.exports = SettingsBox 
