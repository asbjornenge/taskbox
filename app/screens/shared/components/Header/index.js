import React         from 'react'
import style         from './header.styl'
import mailIcon      from './graphics/mail.png'
import tweetIcon     from './graphics/twitter.png'
import listIcon      from './graphics/list.png'
import ponyIcon      from './graphics/unicorn.png'
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
                    <div className="TaskBoxLink screenLink" onClick={nav.navigate.bind(this, '/')}>
                        <img src={listIcon} />
                    </div>
                </div>
                <div className="Logo" onClick={nav.navigate.bind(this, '/settings')}>
                    <img src={ponyIcon} />
                </div>
            </div>
        )
    }
}
