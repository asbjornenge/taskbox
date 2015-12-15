import React       from 'react'
import { connect } from 'react-redux'
import nanoxhr     from 'nanoxhr'

class Mail extends React.Component {
    render() {
        let email = this.pickEmail()
        if (!email) return <div>Email not found</div>
        let participants = email.participants.map((par, index) => <span key={par.email+index}>{par.email}</span>)
        console.log(email)
        return (
            <div className="Mail">
                <h1>{email.subject}</h1>
                <p>{participants}</p>
                <p>{email.snippet}</p>
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
    getFullThread() {
    }
}

export default connect(state => {
    return {
        email : state.email
    }
})(Mail)
