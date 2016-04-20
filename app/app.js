import React           from 'react'
import ReactDOM        from 'react-dom'
import { Provider }    from 'react-redux'
import Router          from 'tiny-react-router'
import FastClick       from 'fastclick'
import Shake           from 'shake.js'
import queryString     from 'query-string'
import assign          from 'object.assign'
import Style           from '@asbjornenge/react-style'
import TaskBox         from './screens/TaskBox'
import MailBox         from './screens/MailBox'
import TweetBox        from './screens/TweetBox'
import Settings        from './screens/Settings'
import Task            from './screens/Task'
import Mail            from './screens/Mail'
import Header          from './screens/shared/components/Header'
import Footer          from './screens/shared/components/Footer'
import nav             from './screens/shared/utils/nav'
import store           from './redux'
import { emitter }     from './redux'
import loops           from './loops'
import taskboxStyle    from './app.styl'

let routes = {
    '/'            : TaskBox,
    '/taskbox'     : TaskBox,
    '/taskbox/:id' : Task,
    '/mailbox'     : MailBox,
    '/mailbox/:id' : Mail,
    '/tweetbox'    : TweetBox,
    '/settings'    : Settings
}

class TaskBoxApp extends React.Component {
    render() {
        return (
            <div className="TaskBoxApp">
                <Style style={taskboxStyle} />
                <Header emitter={emitter} />
                <Provider store={store}>
                    <Router routes={routes} />
                </Provider>
                <Footer />
            </div>
        )
    }
}

// Render the App
ReactDOM.render(<TaskBoxApp />, document.querySelector('#app'))

// Init loops (fetch email, check postponed etc.)
loops(store)


// FastClick (avoid 200ms delay on mobile)
window.addEventListener('load', () => {
  FastClick(document.body);
})

// Shake event for undo
let undoShake = new Shake({
    threshold: 15, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
})
undoShake.start()
window.addEventListener('shake', () => {
    let a = confirm('Undo last action?')
    if (a) store.getState().dispatch_db({
        type : 'DB_UNDO'
    })
})

// Check query params for ?access_token
let qs = queryString.parse(window.location.search)
if (qs.access_token) {
  let currentConfig = store.getState().config
  let currentNylasAccounts = currentConfig.nylasAccounts || []
  let isNew = true
  currentNylasAccounts.forEach(account => {
    if (account.email_address == qs.email_address) isNew = false
  }) 
  if (isNew) {
    currentNylasAccounts.push(qs)
    let value = assign({}, currentConfig, { nylasAccounts : currentNylasAccounts })
    store.dispatch({
      type   : 'SET_CONFIG',
      config : value
    })
  }
  setTimeout(() => {
    window.location.href = window.location.origin+"/#/settings"
  }, 200)
}
