import nanoxhr  from 'nanoxhr'
import moment   from 'moment'
import token    from 'basic-auth-token'
import Firebase from 'firebase/lib/firebase-web'

let firebase;

let emailSyncTimeout;
let emailSync = (store) => {
    let state = store.getState()
    if (!state.config || !state.config.nylasToken || !state.config.nylasUrl) return

    nanoxhr(state.config.nylasUrl+'/threads')
        .query({ 
            in    : 'inbox',
            limit : 100 
        })
        .set('Authorization', `Basic ${token(state.config.nylasToken,'')}`)
        .call(res => {
            if (res.status != 200) return console.error(res) 
            let freshEmail = JSON.parse(res.response)
            let freshEmailIds = freshEmail.map(email => email.id)
            let currentEmailIds = state.email.map(email => email.id)

            let newEmail = freshEmail.filter(email => currentEmailIds.indexOf(email.id) < 0)

            let email = state.email
                .filter(email => freshEmailIds.indexOf(email.id) >= 0) // Remove what is no longer in inbox
                .concat(newEmail) // Add new

            store.dispatch({
                type  : 'SET_EMAIL',
                email : email 
            })
        }) 
}


let laterSyncTimeout
let laterSync = (store) => {
    if (firebase == undefined) return
    firebase.child('/later').once('value', snap => {
        let lateObj = snap.val()
        if (!lateObj) return
        let tasks = Object.keys(lateObj).map(id => {
            return lateObj[id]
        })
        tasks.forEach(task => {
            if (moment(task.postpone).isAfter(moment())) return
            delete task.postpone
            firebase.child('/taskbox').child(task.id).set(task, (err) => {
                if (err) return console.error(err)
                firebase.child('/later').child(task.id).remove()
            })
        })
    })
}

let taskListenerTimeout
let taskListener = (store) => {
    // Bind and unbind to the firebase depending on if settings exist
    let state = store.getState()
    if (!state.config || !state.config.firebaseUrl || !state.config.firebaseSecret) return
    // TODO: Check if firebase is online ??
    if (firebase != undefined) return
    firebase = new Firebase(state.config.firebaseUrl)
    firebase.authWithCustomToken(state.config.firebaseSecret, () => {})
    firebase.child('/taskbox').on('child_added', (snap) => {
        let task = snap.val()
        task.id  = snap.key()
        store.dispatch({
            type : 'ADD_TASK',
            task : task 
        })        
    })
    firebase.child('/taskbox').on('child_removed', (snap) => {
        let task = snap.val()
        task.id  = snap.key()
        store.dispatch({
            type : 'REMOVE_TASK',
            task : task 
        }) 
    })
    firebase.child('/taskbox').on('child_changed', (snap) => {
        let task = snap.val()
        task.id  = snap.key()
        store.dispatch({
            type : 'UPDATE_TASK',
            task : task 
        }) 
    })
}

let init = (store) => {
    emailSync(store)
    setInterval(emailSync.bind(undefined, store), 10000)
    laterSync(store)
    setInterval(laterSync.bind(undefined, store), 10000)
    taskListener(store)
    setInterval(taskListener.bind(undefined, store), 10000)
}

export { 
    init as default, 
    firebase 
}
