import uid             from 'uid'
import nanoemitter     from 'nanoemitter'
import assign          from 'object.assign'
import PouchDB         from 'pouchdb'
import PouchDBUndo     from 'pouchdb-undo'
import { createStore } from 'redux'

PouchDB.plugin(PouchDBUndo)
let db = new PouchDB('taskbox')
db.enableUndo({ limit : 10 })
let emitter = nanoemitter()

// DB action handlers

let db_undo_ids = []
let db_handlers = (action, callback) => {
    switch(action.type) {
        case 'DB_ADD_TASK':
            let task = action.task
            task.id  = uid(10)
            task._id = task.id 
            return db.put(action.task)
        case 'DB_REMOVE_TASK':
            return db.remove(action.task).then((res) => {
                db_undo_ids.push(res.undoId)
            })
        case 'DB_UPDATE_TASK':
            let updatedTask = assign(action.task, action.value)
            return db.put(updatedTask).then((res) => {
                db_undo_ids.push(res.undoId)
            })
        case 'DB_UNDO':
            let lastUndoId = db_undo_ids.pop()
            if (!lastUndoId) return
            db.undo(lastUndoId)
            break
    }
}

// Initial state

let initialState = {
    config             : JSON.parse(localStorage.getItem('taskbox-config')),
    tasks              : [],
    tweets             : [],
    email              : [],
    emailUnCache       : [], // Temporary storage for email while waiting for Nylas
    selectedEmailIndex : -1,
    selectedTaskIndex  : -1,
    groupFilter        : undefined,
    dispatch_db        : db_handlers,
    emitter            : emitter
}

// State reducers

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
        case 'UNCACHE_EMAIL':
            return assign({}, state, {
                emailUnCache : [action.email.id].concat(state.emailUnCache)
            })
        case 'REMOVE_EMAIL':
            return assign({}, state, {
                email : state.email.filter(email => email.id != action.email.id)
            })
        case 'SET_TASKS':
            return assign({}, state, {
                tasks : action.tasks
            })
        case 'ADD_TASK':
            return assign({}, state, {
                tasks : [action.task].concat(state.tasks)
            })
        case 'REMOVE_TASK':
            return assign({}, state, {
                tasks : state.tasks.filter(task => task.id != action.task.id) 
            })
        case 'UPDATE_TASK':
            return assign({}, state, {
                tasks : state.tasks.map(task => {
                    if (task.id != action.task.id) return task
                    return action.task
                }) 
            })
        case 'SET_SELECTED_EMAIL_INDEX':
            return assign({}, state, {
                selectedEmailIndex : action.index 
            })
        case 'SET_SELECTED_TASK_INDEX':
            return assign({}, state, {
                selectedTaskIndex : action.index 
            })
        case 'SET_GROUP_FILTER':
            return assign({}, state, {
                groupFilter : action.filter 
            })
        default:
            return state
    } 
}

// Store

let store = createStore(reducers)

// DB listeners

db.allDocs({
  include_docs: true
}).then(function (result) {
    // handle result
    let tasks = result.rows.map(r => r.doc)
    store.dispatch({
        type  : 'SET_TASKS',
        tasks : tasks
    })
    bindChanges()
    // TODO - replication
}).catch(function (err) {
    console.log(err);
})

let bindChanges = () => {
    let state = store.getState()
    db.changes({
        since: 'now',
        live: true,
        include_docs: true
    }).on('change', function(change) {
        if (change.deleted) {
            let task = { id : change.doc._id }
            return store.dispatch({
                type : 'REMOVE_TASK',
                task : task 
            })
        }
        let taskIds = state.tasks.map(task => task.id)
        if (taskIds.indexOf(change.id) >= 0) {
            return store.dispatch({
                type : 'UPDATE_TASK', 
                task : change.doc
            })
        }
        store.dispatch({
            type : 'ADD_TASK', 
            task : change.doc
        })
    }).on('complete', function(info) {
        // changes() was canceled
        console.log('complete', info)
    }).on('error', function (err) {
        console.log(err);
    });
    if (state.config && state.config.replicationUrl) {
        let opts = {
          continuous: true
        }
        db.replicate.to(state.config.replicationUrl, opts)
        db.replicate.from(state.config.replicationUrl, opts)
    }
}

// Exports

export { store as default, emitter }
