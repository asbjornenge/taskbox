import React  from 'react'
import moment from 'moment'
import nav    from '../../shared/utils/nav'

export default class MailBoxItem extends React.Component {
    render() {
        var classes = 'TaskBoxItem'
        if (this.props.selected) classes += ' selected'
        let date = moment(this.props.task.date).format('MMM Do')
        return (
            <div className={classes} 
                onTouchTap={nav.navigate.bind(undefined, `/taskbox/${this.props.task.id}`)}
                onClick={nav.navigate.bind(undefined, `/taskbox/${this.props.task.id}`)}>
                <div className="date">{date}</div>
                <div className="name">{this.props.task.name}</div>
                <div className="summary">{this.props.task.summary}</div>
            </div>
        )
    }
}
