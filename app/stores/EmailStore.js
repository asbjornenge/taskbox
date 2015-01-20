var flux = require('fluxify')
var EmailIO = require('../io/EmailIO')
var StorageIO = require('../io/StorageIO')

var EmailStore = flux.createStore({
    id: 'EmailStore',
    initialState: {
        email : StorageIO.email 
    },
    actionCallbacks: {
        updateEmail: function( updater, email ){
            // Stores updates are only made inside store's action callbacks
            updater.set({ email : email });
        },
        reloadAllEmail : function() {
            console.log('reloading')
            updateCurrentMailBox()
        }
    }
})

var updateCurrentMailBox = function() {
    EmailIO.inboxAll(function(err, email) {
        if (err) throw err
        StorageIO.save('email', email)
        flux.doAction('updateEmail', email)
    })
}

if (StorageIO.email.length == 0) {
    EmailIO.on('change:ready', function(ready) {
        if (ready) updateCurrentMailBox()
    })
}

module.exports = EmailStore
