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
        },
        archiveEmail : function(updater, email) {
            var filteredEmail = this.email.filter(function(e) {
                return e.id != email.id
            })
            StorageIO.save('email', filteredEmail)
            updater.set({ email : filteredEmail })

            EmailIO.archive(email.account, email.id, function(err) {
                if (err) { console.log(err); }
            }.bind(this))
        },
        deleteEmail : function(updater, email) {
            var filteredEmail = this.email.filter(function(e) {
                return e.id != email.id
            })
            StorageIO.save('email', filteredEmail)
            updater.set({ email : filteredEmail })
            EmailIO.delete(email.account, email.id, function(err) {
                if (err) { console.log(err); return }
            }.bind(this))
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
