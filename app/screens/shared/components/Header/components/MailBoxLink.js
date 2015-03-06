import React    from 'react'
import mailIcon from '../graphics/mail.png'

export default class Header extends React.Component {
    render() {
        return (
            <div className="MailBoxLink screenLink">
                <img src={mailIcon} />
            </div>
        )
    }
}
