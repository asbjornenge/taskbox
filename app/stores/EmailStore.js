var _            = require('lodash')
var EventEmitter = require('events').EventEmitter
var Dispatcher   = require('../dispatcher')
//var StorageIO = require('../io/StorageIO')

var state = {
    mailboxes : {
        unified : []
    }
}

var EmailStore = _.assign({

    mailboxes : function() {
        return state.mailboxes
    }

}, EventEmitter.prototype)

console.log('loads this file')

//EmailIO.connect()
//EmailIO.on('ready', function() {
//    console.log('emailstore ready')
//})

module.exports = EmailStore
