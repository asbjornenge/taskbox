
var storage = {
    get : function(key) {
        try { return JSON.parse(localStorage.getItem(key)) } catch(e) { console.log(e); return null } 
    },
    set : function(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    }
}

module.exports = storage 
