import React  from 'react'
import style  from './tweetbox.styl'   

export default class MailBox extends React.Component {
    render() {
        return (
            <div className="TweetBox">
                <style>{style}</style>
                Tweets
            </div>
        )
    }
}
