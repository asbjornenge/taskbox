var flux = require('fluxify')
var Imap = require('imap')
var _ = require('lodash')
var EventEmitter = require('events').EventEmitter 
var ConfigurationStore = require('../stores/ConfigurationStore')

var EmailAPI = _.extend(EventEmitter.prototype, {
    connect : function() {

        console.log('gets here')

        var imap = new Imap({
            user     : '',
            password : '',
            host     : 'imap.gmail.com',
            port     : 993,
            tls      : true
        })

        imap.once('ready', function() {
            console.log('Im ready!')
            EmailAPI.emit('ready')
        })

        imap.on('error', function(err) {
            console.log(err)
        })

        imap.on('end', function() {
            console.log('end')
        })

        imap.connect()
        this.imap = imap

    },

    disconnect : function() {
        console.log('trying to disconnect')
        this.imap.destroy()
        setTimeout(function() {
            EmailAPI.emit('disconnected')
        },500)
    },

    openMailBox : function(box) {

    }

})

EmailAPI.accounts = function(callback) {

}
EmailAPI.archive = function(account_id, email_id, callback) {
}
EmailAPI.delete = function(account_id, email_id, callback) {
}
EmailAPI.getMail = function(account_id, email_id) {
}
EmailAPI.inboxAll = function(callback) {

}

ConfigurationStore.on('change:contextio', function(curr, prev) {

})

module.exports = EmailAPI 
