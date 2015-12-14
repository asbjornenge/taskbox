import nanoxhr from 'nanoxhr'
import token   from 'basic-auth-token'

let nylasBaseUrl = 'https://api.nylas.com'

let emailIntervalFunc = (store) => {
    let state = store.getState()
    if (!state.config || !state.config.nylasToken) return

    nanoxhr(nylasBaseUrl+'/threads')
        .query({ limit : 10 })
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

let init = (store) => {
    setInterval(emailIntervalFunc.bind(undefined, store), 10000)
}

export { init as default }
