var ContextIO = require('contextio');
var flux      = require('fluxify')
var ConfigurationStore = require('../stores/ConfigurationStore')


var EmailAPI = flux.createStore({
    id : 'EmailAPI',
    initialState : {
        ready  : false,
        client : null
    },
    actionCallbacks : {
        updateEmailAPIClient : function(updater, secrets) {
            if (this.client != null) return
            if (!secrets.key) return
            if (!secrets.secret) return
            updater.set({ ready : true, client : new ContextIO.Client({
                key: secrets.key,
                secret: secrets.secret
            })})
        }
    }

})

EmailAPI.accounts = function(callback) {
    if (!this.client) return []
    this.client.accounts().get(callback)
}
EmailAPI.getMail = function(account_id, email_id) {
    if (!this.client) return null
    this.client.accounts(account_id).messages(email_id).get({}, function(err, response) {
        console.log(response)
    }) 
}
EmailAPI.inboxAll = function(callback) {
    if (!this.client) return []
    console.log('loading new email')
    var client = this.client
    this.accounts(function(err, response) {
        if (err) { callback(err); return }
        //if (accounts.statusCode != 200) 

        var queried_accounts = 0
        var email = []
        var error = []
        var check_complete = function() {
            if (queried_accounts < response.body.length) return
            console.log('finished loading mail',error)
            callback(error.lenght > 0 ? error : null, email)
        }

        response.body.forEach(function(account) {
            client.accounts(account.id).messages().get({folder:'INBOX', include_body:1}, function(err, response) {
                queried_accounts += 1
                if (err) { error.push(err); return }
                var _email = response.body.map(function(email) {
                    return {
                        id      : email.message_id,
                        to      : email.addresses.to,
                        from    : email.addresses.from.email,
                        subject : email.subject,
                        body    : email.body,
                        date    : email.date,
                        account : account.id
                    }
                })
                email = email.concat(_email)
                check_complete() 
            })
        })
    })
}

ConfigurationStore.on('change:contextio', function(curr, prev) {
    flux.doAction('updateEmailAPIClient', curr)
})
flux.doAction('updateEmailAPIClient', ConfigurationStore.contextio)

module.exports = EmailAPI 
