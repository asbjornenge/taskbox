import React           from 'react'
import ReactDOM        from 'react-dom'
import { createStore } from 'redux'
import { Provider }    from 'react-redux'
import Router          from 'tiny-react-router'
import Style           from '@taghub/component-style'
import TaskBox         from './screens/TaskBox'
import MailBox         from './screens/MailBox'
import TweetBox        from './screens/TweetBox'
import Settings        from './screens/Settings'
import Task            from './screens/Task'
import Mail            from './screens/Mail'
import Header          from './screens/shared/components/Header'
import reducers        from './redux'
import loops           from './loops'
import taskboxStyle    from './app.styl'

let store = createStore(reducers)

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
                <Header />
                <Provider store={store}>
                    <Router routes={routes} />
                </Provider>
            </div>
        )
    }
}

ReactDOM.render(<TaskBoxApp />, document.querySelector('#app'))

loops(store)
