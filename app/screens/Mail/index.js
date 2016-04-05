import React       from 'react'
import { connect } from 'react-redux'
import nanoxhr     from 'nanoxhr'
import token       from 'basic-auth-token'
import mailStyle   from './mail.styl'

class Message extends React.Component {
    render() {
        return (
            <div className="Message">
                <div className="body"i dangerouslySetInnerHTML={{ __html : this.props.message.body}}></div>
            </div>
        )
    }
}

class Mail extends React.Component {
    render() {
        let email = this.pickEmail()
        if (!email) return <div>Email not found</div>
        let participants = email.participants.map((par, index) => <span key={par.email+index}>{par.email}</span>)
        let messages
        if (!email.fullThread) this.getFullThread(email)
        else messages = email.fullThread.map(msg => <Message key={msg.id} message={msg} />)
        return (
            <div className="Mail">
                <style>{mailStyle}</style>
                <h1>{email.subject}</h1>
                <p>{participants}</p>
                <div className="messages">
                    {messages}
                </div>
            </div>
        )
    }
    pickEmail() {
        return this.props.email.reduce((found, email) => {
            if (found) return found
            if (email.id == this.props.id) return email
            return found
        }, null)
    }
    getFullThread(email) {
        if (this.querying) return
        this.querying = true
        nanoxhr(`${email.form.nylasUrl}/messages`)
            .query({
                thread_id : email.id
            })
            .set('Authorization', `Basic ${token(email.form.nylasToken,'')}`)
            .call(res => {
                if (res.status != 200) return
                let fullThread = JSON.parse(res.response)
                email.fullThread = fullThread
                this.forceUpdate()
            })
    }
}

export default connect(state => {
    return {
        email  : state.email,
        config : state.config
    }
})(Mail)
