var Dispatcher       = require('../dispatcher')
var ActionTypes      = require('../constants').ActionTypes

module.exports = {

    switch : function(view, meta) {
        Dispatcher.handleViewAction({
            type : ActionTypes.VIEW_SWITCH,
            view : view,
            meta : meta
        })
    },

}
