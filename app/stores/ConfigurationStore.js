var flux      = require('fluxify');
var contextio;
var firebase  = { key : '', secret : ''}
try {
    contextio = JSON.parse(localStorage.getItem('contextio')) 
}
catch(e) {
    console.log(e) 
    contextio = {key : '', secret : ''}
}
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
            localStorage.setItem('contextio', JSON.stringify(values.contextio))
            localStorage.setItem('firebase',  JSON.stringify(values.firebase))
            updater.set(values)
        }
    }
})

module.exports = ConfigurationStore 
