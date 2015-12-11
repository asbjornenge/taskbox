import React         from 'react'
import Logo          from './components/Logo'
import MailBoxLink   from './components/MailBoxLink'
import TaskBoxLink   from './components/TaskBoxLink'
import TweetBoxLink  from './components/TweetBoxLink'
import style         from './styles/index.styl'

export default class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <style>{style}</style>
                <div className="screenLinks">
                    <MailBoxLink />
                    <TweetBoxLink />
                    <TaskBoxLink />
                </div>
                <Logo />
            </div>
        )
    }
}
