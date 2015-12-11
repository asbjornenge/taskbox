import React         from 'react'
import ReactDOM      from 'react-dom'
import Router        from 'tiny-react-router'
import TaskBox       from './screens/TaskBox'
import MailBox       from './screens/MailBox'
import TweetBox      from './screens/TweetBox'
import Settings      from './screens/Settings'

let routes = {
    '/'         : TaskBox,
    '/mailbox'  : MailBox, 
    '/tweetbox' : TweetBox,
    '/settings' : Settings 
}

ReactDOM.render(
    <Router routes={routes} />,
    document.body
)

