var _                  = require('lodash')
var EventEmitter       = require('events').EventEmitter
var Dispatcher         = require('../dispatcher')
var FirebaseConnection = require('../io/FirebaseConnection')
var ConfigurationStore = require('../stores/ConfigurationStore')

var state = {
    connection : null,
    connected  : false
}

var ConnectionStore = _.assign({

    state : function() {
        return state
    }

}, EventEmitter.prototype)

var attemptConnection = (cred) => {
    console.log('attempting connection')
    try {
        state.connection = new FirebaseConnection(cred)
        state.connection.on('connected', function() {
            state.connected = true
            ConnectionStore.emit('change')
        })
        state.connection.connect()
    } catch(e) {
        console.log('ERROR',e)
    }
}
attemptConnection(ConfigurationStore.state().firebase)
ConfigurationStore.on('change', function() {
    state.connection = null
    state.connected = false
    ConnectionStore.emit('change')
    attemptConnection(ConfigurationStore.state().firebase)
})

module.exports = ConnectionStore 
