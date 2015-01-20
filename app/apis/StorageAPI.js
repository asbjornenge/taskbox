
var storage = {

    email : [],

    loadAll : function() {
        try { storage.email = JSON.parse(localStorage.getItem('email')) || [] } catch(e) { console.log(e) }
    },

    save : function(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }

}

storage.loadAll()
console.log(storage)
module.exports = storage 
