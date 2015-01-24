var Dispatcher       = require('../dispatcher')
var ActionTypes      = require('../constants').ActionTypes

module.exports = {

    switch : function(view) {
        Dispatcher.handleViewAction({
            type : ActionTypes.VIEW_SWITCH,
            view : view
        })
    },

}
