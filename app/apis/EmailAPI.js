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
            console.log('settings email client',this.client)
            if (this.client != null) return
            if (!secrets.key) return
            if (!secrets.secret) return
            console.log('CREATING CONTEXTIO CLIENT')
            updater.set({ client : new ContextIO.Client({
                key: secrets.key,
                secret: secrets.key
            })})
        }
    }

})

ConfigurationStore.on('change:contextio', function(curr, prev) {
    console.log('config store updated')
    flux.doAction('updateEmailAPIClient', curr)
})
setTimeout(function() {
    console.log('there', ConfigurationStore.contextio)
    flux.doAction('updateEmailAPIClient', ConfigurationStore.contextio)
},500)

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
