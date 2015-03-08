import React         from 'react'
import Router        from 'tiny-react-router'
import FluxComponent from 'flummox/component'
import Flux          from './flux'
import TaskBox       from './screens/TaskBox'
import MailBox       from './screens/MailBox'
import TweetBox      from './screens/TweetBox'
import Settings      from './screens/Settings'

let flux = new Flux()
let routes = {
    '/'         : TaskBox,
    '/mailbox'  : MailBox, 
    '/tweetbox' : TweetBox,
    '/settings' : Settings 
}

React.render(
    <FluxComponent flux={flux}>
        <Router routes={routes} />
    </FluxComponent>, 
    document.body
)

