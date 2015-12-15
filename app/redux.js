import assign from 'object.assign'

let initialState = {
    config : JSON.parse(localStorage.getItem('taskbox-config')),
    tasks  : [],
    tweets : [],
    email  : [],
    firebase : null,
    selectedEmailIndex : -1
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
        case 'REMOVE_EMAIL':
            return assign({}, state, {
                email : state.email.filter(email => email.id != action.email.id) 
            })
        case 'ADD_TASK':
            return assign({}, state, {
                tasks : [action.task].concat(state.tasks)
            })
        case 'REMOVE_TASK':
            return assign({}, state, {
                tasks : state.tasks.filter(task => task.id != action.task.id) 
            })
        case 'SET_SELECTED_EMAIL_INDEX':
            return assign({}, state, {
                selectedEmailIndex : action.index 
            })
        default:
            return state
    } 
}

export { reducers as default }
