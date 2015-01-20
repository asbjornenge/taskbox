var flux = require('fluxify')
var EmailAPI = require('../apis/EmailAPI')
var StorageAPI = require('../apis/StorageAPI')

var EmailStore = flux.createStore({
    id: 'EmailStore',
    initialState: {
        email : StorageAPI.email 
    },
    actionCallbacks: {
        updateEmail: function( updater, email ){
            // Stores updates are only made inside store's action callbacks
            updater.set({ email : email });
        }
    }
})

var updateCurrentMailBox = function() {
    EmailAPI.inboxAll(function(err, email) {
        if (err) throw err
        StorageAPI.save('email', email)
        flux.doAction('updateEmail', email)
    })
}

if (StorageAPI.email.length == 0) {
    EmailAPI.on('change:ready', function(ready) {
        if (ready) updateCurrentMailBox()
    })
}

module.exports = EmailStore
