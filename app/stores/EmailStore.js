var _ = require('lodash')
var EventEmitter = require('events').EventEmitter
var EmailIO = require('../io/EmailIO')
var StorageIO = require('../io/StorageIO')

var state = {
    mailboxes : {
        unified : []
    }
}

var EmailStore = _.assign(EventEmitter.prototype, {

    mailboxes : function() {
        return state.mailboxes
    }

})

console.log('loads this file')

EmailIO.connect()
EmailIO.on('ready', function() {
    console.log('emailstore ready')
})

module.exports = EmailStore
