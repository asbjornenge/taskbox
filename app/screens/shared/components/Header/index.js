import React         from 'react'
import Svg           from '@asbjornenge/react-svg'
import style         from './header.styl'
import mailIcon      from './graphics/mail.png'
import tweetIcon     from './graphics/twitter.png'
import settingsIcon  from './graphics/settings.svg'
import taskboxIcon   from '../../graphics/taskbox.png'
import nav           from '../../utils/nav'

export default class Header extends React.Component {
    render() {
        return (
            <div className="Header">
                <style>{style}</style>
                <div className="screenLinks">
                    <div className="MailBoxLink screenLink" onClick={nav.navigate.bind(this, '/mailbox')}>
                        <img src={mailIcon} />
                    </div>
                    <div className="TweetBoxLink screenLink" onClick={nav.navigate.bind(this, '/tweetbox')}>
                        <img src={tweetIcon} />
                    </div>
                    <div className="SettingsLink screenLink" onClick={nav.navigate.bind(this, '/settings')}>
                        <Svg svg={settingsIcon} />
                    </div>
                </div>
                <div className="Logo" onClick={nav.navigate.bind(this, '/')}>
                    <img src={taskboxIcon} />
                </div>
            </div>
        )
    }
}
