import nanoxhr  from 'nanoxhr'
import token    from 'basic-auth-token'
import Firebase from 'firebase/lib/firebase-web'

let emailIntervalFunc = (store) => {
    let state = store.getState()
    if (!state.config || !state.config.nylasToken || !state.config.nylasUrl) return

    nanoxhr(state.config.nylasUrl+'/threads')
        .query({ 
            in    : 'inbox',
            limit : 10 
        })
        .set('Authorization', `Basic ${token(state.config.nylasToken,'')}`)
        .call(res => {
            if (res.status != 200) return
            let email = JSON.parse(res.response)
            store.dispatch({
                type  : 'SET_EMAIL',
                email : email 
            })
        }) 
}

let firebase;
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
        task.id  = snap.name()
        store.dispatch({
            type : 'ADD_TASK',
            task : task 
        })        
    })
    firebase.child('/taskbox').on('child_removed', (snap) => {
        let task = snap.val()
        task.id  = snap.name()
        store.dispatch({
            type : 'REMOVE_TASK',
            task : task 
        }) 
    })
}

let init = (store) => {
    setInterval(emailIntervalFunc.bind(undefined, store), 10000)
    setInterval(taskListener.bind(undefined, store), 10000)
    emailIntervalFunc(store)
    taskListener(store)
}

export { 
    init as default, 
    firebase 
}
