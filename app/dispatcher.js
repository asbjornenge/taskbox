var Dispatcher     = require('flux').Dispatcher
var _              = require('lodash')
var PayloadSources = require('./constants').PayloadSources

var TaskBoxDispatcher = _.assign(new Dispatcher(), {

    handleViewAction : function (action) {
        var payload = {
            source : PayloadSources.VIEW_ACTION,
            action : action
        }
        this.dispatch(payload)
    },

    handleServerAction : function (action) {
        var payload = {
            source : PayloadSources.SERVER_ACTION,
            action : action
        }
        this.dispatch(payload)
    }

})

module.exports = TaskBoxDispatcher
