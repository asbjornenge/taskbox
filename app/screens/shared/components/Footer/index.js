import React         from 'react'
import Svg           from '@asbjornenge/react-svg'
import style         from './footer.styl'
import mailIcon      from '../../graphics/svg/letter121.svg'
import tweetIcon     from '../../graphics/svg/twitter42.svg'
import taskboxIcon   from '../../graphics/svg/check66.svg'
import nav           from '../../utils/nav'
import pkg           from '../../../../../package.json'

export default class Footer extends React.Component {
    render() {
        return (
            <div className="Footer">
                <style>{style}</style>
                <div className="screenLinks">
                    <div className="TaskBoxLink screenLink" onClick={nav.navigate.bind(this, '/')}>
                        <Svg svg={taskboxIcon} />
                    </div>
                    <div className="TweetBoxLink screenLink" onClick={nav.navigate.bind(this, '/tweetbox')}>
                        <Svg svg={tweetIcon} />
                    </div>
                    <div className="MailBoxLink screenLink" onClick={nav.navigate.bind(this, '/mailbox')}>
                        <Svg svg={mailIcon} />
                    </div>
                </div>
                <div className="version">{pkg.version}</div>
            </div>
        )
    }
}
