import assign from 'object.assign'

let initialState = {
    config : JSON.parse(localStorage.getItem('taskbox-config')),
    tasks  : [],
    tweets : [],
    email  : [],
    firebase : null
}

let reducers = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_CONFIG':
            localStorage.setItem('taskbox-config', JSON.stringify(action.config))
            return assign({}, state, { 
                config        : action.config
            })
        default:
            return state
    } 
}

export { reducers as default }
