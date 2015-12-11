import React         from 'react'
import ReactDOM      from 'react-dom'
import Router        from 'tiny-react-router'
import Style         from '@taghub/component-style'
import TaskBox       from './screens/TaskBox'
import MailBox       from './screens/MailBox'
import TweetBox      from './screens/TweetBox'
import Settings      from './screens/Settings'
import taskboxStyle  from './app.styl'

let routes = {
    '/'         : TaskBox,
    '/mailbox'  : MailBox, 
    '/tweetbox' : TweetBox,
    '/settings' : Settings 
}

class TaskBoxApp extends React.Component {
    render() {
        return (
            <div className="TaskBoxApp">
                <Style style={taskboxStyle} />
                <Router routes={routes} />
            </div>
        )
    }
}

ReactDOM.render(<TaskBoxApp />, document.querySelector('#app'))
