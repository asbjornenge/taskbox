var _            = require('lodash')
var Firebase     = require('firebase')
var EventEmitter = require('events').EventEmitter

var FirebaseConnection = function(cred) {
    this.url    = cred.url
    this.secret = cred.secret
}
FirebaseConnection.prototype = _.assign({

    connect : function() {
        this.root = new Firebase(this.url)
        this.root.authWithCustomToken(this.secret, function(err, auth) {
            if (err) throw err
            this.emit('connected')
        }.bind(this))
    }

}, EventEmitter.prototype)

module.exports = FirebaseConnection
