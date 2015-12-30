import React         from 'react'
import Svg           from '@asbjornenge/react-svg'
import style         from './footer.styl'
import mailIcon      from './graphics/mail.png'
import tweetIcon     from './graphics/twitter.png'
import settingsIcon  from './graphics/settings.svg'
import taskboxIcon   from '../../graphics/taskbox.png'
import nav           from '../../utils/nav'

export default class Footer extends React.Component {
    render() {
        return (
            <div className="Footer">
                <style>{style}</style>
                <div className="screenLinks">
                    <div className="TaskBoxLink screenLink" onClick={nav.navigate.bind(this, '/')}>
                        <img src={taskboxIcon} />
                    </div>
                    <div className="TweetBoxLink screenLink" onClick={nav.navigate.bind(this, '/tweetbox')}>
                        <img src={tweetIcon} />
                    </div>
                    <div className="MailBoxLink screenLink" onClick={nav.navigate.bind(this, '/mailbox')}>
                        <img src={mailIcon} />
                    </div>
                </div>
            </div>
        )
    }
}
