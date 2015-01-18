var flux = require('fluxify')
var EmailAPI = require('../apis/EmailAPI')
var secrets = require('../../secrets.json')

var EmailStore = flux.createStore({
    id: 'EmailStore',
    initialState: {
        email: [] 
    },
    actionCallbacks: {
        updateEmail: function( updater, email ){

            // Stores updates are only made inside store's action callbacks
            updater.set({ email : email });
        }
    }
})

// TOOD: Have a ready state instead, cause we don't want to tie us to
// contextio
EmailAPI.on('change:client', function(client, old) {
    console.log('GOT A CLIENT', client)
})

module.exports = EmailStore
