import React  from 'react'
import moment from 'moment'

export default class MailBoxItem extends React.Component {
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
        return (
            <div className={classes} onClick={this.props.onClick}>
                <div className="date">{date}</div>
                <div className="participants">{participants}</div>
                <div className="subject">{this.props.email.subject}</div>
                <div className="summary">{this.props.email.snippet.slice(0,120)}</div>
            </div>
        )
    }
}
