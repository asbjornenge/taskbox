import React  from 'react'
import moment from 'moment'

export default class MailBoxItem extends React.Component {
    render() {
        var classes = 'MailBoxItem'
        if (this.props.selected) classes += ' selected'
        let participants = this.props.email.participants.map(participant => {
            return <span key={participant.email}>{participant.email}</span>
        })
        let date = moment(this.props.email.last_message_timestamp*1000).format('MMM Do')
        return (
            <div className={classes}>
                <div className="date">{date}</div>
                <div className="participants">{participants}</div>
                <div className="subject">{this.props.email.subject}</div>
                <div className="summary">{this.props.email.snippet}</div>
            </div>
        )
    }
}
