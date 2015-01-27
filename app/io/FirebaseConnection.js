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
            this.startListening()
        }.bind(this))
    },

    init : function() {
        this.root.once('value', function(snap) {
            console.log(snap.val())
        })
    },

    startListening : function() {
        this.root.child('taskbox').on('child_added', function(snap) {
            this.emit('task-added', snap.val())
        }.bind(this))
        this.root.child('taskbox').on('child_removed', function(snap) {
            this.emit('task-removed', snap.val())
        }.bind(this))
    }

}, EventEmitter.prototype)

module.exports = FirebaseConnection
