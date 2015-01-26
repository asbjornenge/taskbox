var _            = require('lodash')
var EventEmitter = require('events').EventEmitter
var ActionTypes  = require('../constants').ActionTypes
var Dispatcher   = require('../dispatcher')
var StorageIO    = require('../io/StorageIO')

// State

var state = {
    firebase : {
        url    : '',
        secret : ''
    }
}
if (StorageIO.get('config')) state = StorageIO.get('config')
console.log(state)

// Store

var ConfigurationStore = _.assign({

    state : function() {
        return state
    },

    save : function(config) {
        StorageIO.set('config', config)
        state = config
        this.emit('change')
    }

}, EventEmitter.prototype)

// Actions

ConfigurationStore.dispatchToken = Dispatcher.register(function (payload) {

    var action = payload.action;

    switch(action.type) {
        case ActionTypes.CONFIG_SAVE:
            ConfigurationStore.save(action.config)
    }
})

module.exports = ConfigurationStore 
