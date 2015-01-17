var ContextIO = require('contextio');
var ConfigurationStore = require('../stores/ConfigurationStore')

//var ctxioClient = new ContextIO.Client({
//    key: "YOUR CONTEXT.IO CONSUMER KEY",
//    secret: "YOUR CONTEXT.IO CONSUMER SECRET"
//})

var email = {

    client : null,

    accounts : function() {
        if (!email.client) return []
    }

}

ConfigurationStore.on('change', function(curr, prev) {
    console.log('config updated', curr, prev)
})

module.exports = email
