var flux      = require('fluxify');
var contextio = localStorage.getItem('contextio') || { key : '', secret : '' }
var firebase  = localStorage.getItem('firebase')  || { url : '', secret : '' }

var ConfigurationStore = flux.createStore({
    id: 'ConfigurationStore',
    initialState: {
        contextio : {
            key : contextio.key,
            secret : contextio.secret
        },
        firebase : {
            url : firebase.url,
            secret : firebase.secret
        }
    },
    actionCallbacks: {
        updateSettings : function( updater, values ){
            localStorage.setItem('contextio', values.contextio)    
            localStorage.setItem('firebase',  values.firebase)    
            updater.set(values)
        }
    }
})

module.exports = ConfigurationStore 
