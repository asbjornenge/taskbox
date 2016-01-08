import React  from 'react'
import moment from 'moment'

export default class MailBoxItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            x : 0
        }
    }
    render() {
        var classes = 'MailBoxItem'
        if (this.props.selected) classes += ' selected'
        let participants = this.props.email.participants
            .filter((participant, index) => index < 2)
            .map((participant, index) => {
                return <span key={participant.email+index}>{participant.email}</span>
            })
        if (this.props.email.participants.length > 2) participants.push((
            <span key="more">{'('+(this.props.email.participants.length-2)+' more)'}</span>
        ))
        let date = moment(this.props.email.last_message_timestamp*1000).format('MMM Do')
        let x = this.state.x == 0 ? 'none' : 'translateX('+this.state.x+'px)'
        let style = { 'transform' : x }
        return (
            <div className={classes} 
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}
                onTouchMove={this.onTouchMove.bind(this)}
                onClick={this.props.onClick}>
                <div style={style}>
                    <div className="firstrow">
                        <div className="subject">{this.props.email.subject}</div>
                        <div className="date">{date}</div>
                    </div>
                    <div className="participants">{participants}</div>
                    <div className="summary">{this.props.email.snippet.slice(0,120)}</div>
                </div>
            </div>
        )
    }
    onTouchMove(e) {
        if (this.props.scrolling) return
        let touch = e.targetTouches[0]
        let offset = touch.clientX - this.startX
        if (Math.abs(offset) < 15) return
        this.setState({ x : offset })
    }
    onTouchStart(e) {
        if (this.props.scrolling) return
        let touch = e.targetTouches[0]
        this.startX = touch.clientX
    }
    onTouchEnd(e) {
        if (this.state.x < -130) this.props.handleSwipeLeft(this.props.email, this.props.index)
        if (this.state.x >  130) this.props.handleSwipeRight(this.props.email)
        this.startX = 0
        this.setState({ x : 0 })
    }
}
