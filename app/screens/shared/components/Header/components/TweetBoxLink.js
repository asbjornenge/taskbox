import React     from 'react'
import tweetIcon from '../graphics/twitter.png'

export default class Header extends React.Component {
    render() {
        return (
            <div className="TweetBoxLink screenLink" onClick={this.onClick.bind(this)}>
                <img src={tweetIcon} />
            </div>
        )
    }
    onClick() {
        this.props.flux.getActions('nav').navigate('/tweetbox')
    }
}
