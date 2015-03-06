import React     from 'react'
import tweetIcon from '../graphics/twitter.png'

export default class Header extends React.Component {
    render() {
        return (
            <div className="TweetBoxLink screenLink">
                <img src={tweetIcon} />
            </div>
        )
    }
}
