var flux = require('fluxify')
var EmailAPI = require('../apis/EmailAPI')

var EmailStore = flux.createStore({
    id: 'EmailStore',
    initialState: {
        email : [] 
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
        flux.doAction('updateEmail', email)
    })
}

EmailAPI.on('change:ready', function(ready) {
    if (ready) updateCurrentMailBox()
})

module.exports = EmailStore
