import React        from 'react'
import { connect }  from 'react-redux'
import MailBoxItem  from './components/MailBoxItem'
import mailBoxStyle from './mailbox.styl'

class MailBox extends React.Component {
    render() {
        console.log(this.props)
        let email = this.props.email.map(email => {
            return (
                <MailBoxItem key={email.id} email={email} />
            )
        })
        return (
            <div className="MailBox">
                <style>{mailBoxStyle}</style>
                {email}
            </div>
        )
    }
}

export default connect(state => {
    return {
        email : state.email
    }
})(MailBox)
