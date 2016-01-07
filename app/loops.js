import nanoxhr  from 'nanoxhr'
import moment   from 'moment'
import token    from 'basic-auth-token'

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
    let state = store.getState()
    let tasks = state.tasks
    tasks
        .filter(task => task.postpone != undefined)
        .forEach(task => {
            if (moment(task.postpone).isAfter(moment())) return
            delete task.postpone
            delete task.group
            state.dispatch_db({
                type  : 'DB_UPDATE_TASK',
                task  : task,
                value : {}
            })
    })
}

let init = (store) => {
    emailSync(store)
    setInterval(emailSync.bind(undefined, store), 10000)
    laterSync(store)
    setInterval(laterSync.bind(undefined, store), 10000)
}

export { init as default }
