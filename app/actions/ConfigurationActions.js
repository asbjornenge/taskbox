var Dispatcher       = require('../dispatcher')
var ActionTypes      = require('../constants').ActionTypes

module.exports = {

    save : function(config) {
        Dispatcher.handleViewAction({
            type   : ActionTypes.CONFIG_SAVE,
            config : config
        })
    },

}
