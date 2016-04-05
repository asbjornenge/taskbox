import nanoxhr  from 'nanoxhr'
import moment   from 'moment'
import token    from 'basic-auth-token'

let emailSyncTimeout;
let emailSync = (store) => {
    let state = store.getState()
    if (!state.config || !state.config.nylasForms) return

    state.config.nylasForms.forEach(form => {
      nanoxhr(form.nylasUrl+'/threads')
          .query({ 
              in    : 'inbox',
              limit : 100 
          })
          .set('Authorization', `Basic ${token(form.nylasToken,'')}`)
          .call(res => {
              if (res.status != 200) return console.error(res) 
              let freshEmail = JSON.parse(res.response).map(email => {
                email.form = form
                return email
              })

              let currentEmailState = store.getState().email

              let currentAccountEmail = currentEmailState
                .filter(email => email.form.nylasToken == form.nylasToken) // Only relevant for current

              let email = currentEmailState 
                .filter(email => email.form.nylasToken != form.nylasToken) // Remove all for current account 
                .concat(freshEmail) // Add the fresh fetch for this account
                .map(email => { // Replace the fresh with the current - because it might have messages
                  currentAccountEmail.forEach(currentEmail => {
                    if (currentEmail.id == email.id) email = currentEmail
                  })
                  return email
                })
                .sort((a,b) => {
                  return b.last_message_timestamp - a.last_message_timestamp
                })

              store.dispatch({
                  type  : 'SET_EMAIL',
                  email : email 
              })
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
