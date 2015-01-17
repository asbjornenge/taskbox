var flux = require('fluxify')
var secrets = require('../../secrets.json')

var ContextIO = require('contextio')
var ctxioClient = new ContextIO.Client({
    key: secrets.contextio.key,
    secret: secrets.contextio.secret
})

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

// Create a store
var EmailStore = flux.createStore({
    id: 'emailStore',
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

module.exports = EmailStore
