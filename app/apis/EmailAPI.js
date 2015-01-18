var ContextIO = require('contextio');
var flux      = require('fluxify')
var ConfigurationStore = require('../stores/ConfigurationStore')


var EmailAPI = flux.createStore({
    id : 'EmailAPI',
    initialState : {
        client : null
    },
    accounts : function() {
        if (!this.client) return []
    },
    inboxAll : function() {
        return []
    },
    actionCallbacks : {
        updateEmailAPIClient : function(updater, secrets) {
            if (this.client != null) return
            if (!secrets.key) return
            if (!secrets.secret) return
            updater.set({ client : new ContextIO.Client({
                key: secrets.key,
                secret: secrets.key
            })})
        }
    }

})

ConfigurationStore.on('change:contextio', function(curr, prev) {
    flux.doAction('updateEmailAPIClient', curr)
})
flux.doAction('updateEmailAPIClient', ConfigurationStore.contextio)

/*
ctxioClient.accounts(secrets.contextio.account).messages().get({folder:'INBOX'}, function (err, response) {
    if (err) throw err;
    console.log(response.body)
    var email = response.body.map(function(email) {
        return {
            to      : email.addresses.to,
            from    : email.addresses.from.email,
            subject : email.subject,
            body    : '',
            date    : email.date
        }
    })
    flux.doAction('updateEmail',email) 
});
*/

module.exports = EmailAPI 
