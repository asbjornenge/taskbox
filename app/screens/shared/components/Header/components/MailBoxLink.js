import React    from 'react'
import mailIcon from '../graphics/mail.png'

export default class Header extends React.Component {
    render() {
        return (
            <div className="MailBoxLink screenLink" onClick={this.onClick.bind(this)}>
                <img src={mailIcon} />
            </div>
        )
    }
    onClick() {
        this.props.flux.getActions('nav').navigate('/mailbox')
    }
}
