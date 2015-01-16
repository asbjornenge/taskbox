var flux = require('fluxify')

var emails = [
    {
        subject : 'This is an email',
        from    : 'asbjorn@hanafjedle.net',
        to      : 'asbjorn@hanafjedle.net',
        body    : 'This is the content'
    },
    {
        subject : 'This is another',
        from    : 'asbjorn@hanafjedle.net',
        to      : 'asbjorn@hanafjedle.net',
        body    : 'This is the content'
    },
    {
        subject : 'This is a third',
        from    : 'asbjorn@hanafjedle.net',
        to      : 'asbjorn@hanafjedle.net',
        body    : 'This is the content'
    }
]

// Create a store
var EmailStore = flux.createStore({
    id: 'emailStore',
    initialState: {
        email: emails 
    },
    actionCallbacks: {
        changeName: function( updater, name ){

            // Stores updates are only made inside store's action callbacks
            updater.set( {name: name} );
        }
    }
})

module.exports = EmailStore
