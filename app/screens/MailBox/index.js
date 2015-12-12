import React       from 'react'
import { connect } from 'react-redux'
import Header      from '../shared/components/Header'

class MailBox extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="MailBox">
                Mail
            </div>
        )
    }
}

export default connect(state => {
    return {
        email : state.email
    }
})(MailBox)
