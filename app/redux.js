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
        case 'SET_EMAIL':
            return assign({}, state, { 
                email : action.email
            })
        case 'ADD_TASK':
            return assign({}, state, {
                tasks : [action.task].concat(state.tasks)
            })
        case 'REMOVE_TASK':
            return assign({}, state, {
                tasks : state.tasks.filter(task => task.id != action.task.id) 
            })
        default:
            return state
    } 
}

export { reducers as default }
