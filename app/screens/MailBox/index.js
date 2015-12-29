import React        from 'react'
import { connect }  from 'react-redux'
import nanoxhr      from 'nanoxhr'
import token        from 'basic-auth-token'
import { firebase } from '../../loops'
import nav          from '../shared/utils/nav'
import MailBoxItem  from './components/MailBoxItem'
import mailBoxStyle from './mailbox.styl'

class MailBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSelectedEmailIndex : false
        }
        this.keyDownHandler = this.handleKey.bind(this)
    }
    render() {
        let email = this.props.email.map((email, index) => {
            return (
                <MailBoxItem 
                    key={email.id} 
                    email={email}
                    onClick={nav.navigate.bind(undefined,`/mailbox/${email.id}`)}
                    selected={this.state.showSelectedEmailIndex && (index == this.props.selectedEmailIndex)} />
            )
        })
        return (
            <div className="MailBox">
                <style>{mailBoxStyle}</style>
                {email}
            </div>
        )
    }
    handleKey(e) {
        let selectedIndex, showSelectedEmailIndex
        switch(e.which) {
            case 40:
                // DOWN
                if (this.state.showSelectedEmailIndex)
                    selectedIndex = this.props.selectedEmailIndex < this.props.email.length-1 ? this.props.selectedEmailIndex+1 : this.props.email.length-1
                showSelectedEmailIndex = true
                break
            case 38:
                // UP 
                if (this.state.showSelectedEmailIndex)
                    selectedIndex = this.props.selectedEmailIndex > -1 ? this.props.selectedEmailIndex-1 : -1
                showSelectedEmailIndex = true
                break
            case 27:
                // ESC
                showSelectedEmailIndex = false
                break
            case 13:
                // ENTER
                if (this.state.showSelectedEmailIndex && this.props.selectedEmailIndex >= 0) {
                   nav.navigate(`/mailbox/${this.props.email[this.props.selectedEmailIndex].id}`)
                }
                break
            case 39:
                // RIGHT
                if (this.state.showSelectedEmailIndex && this.props.selectedEmailIndex >= 0) {
                    this.archiveEmail(this.props.email[this.props.selectedEmailIndex])
                }
                break
            case 37:
                // LEFT
                if (this.state.showSelectedEmailIndex && this.props.selectedEmailIndex >= 0) {
                    this.taskifyEmail(this.props.email[this.props.selectedEmailIndex])
                }
                break
        }
        if (selectedIndex != undefined) {
            this.props.dispatch({
                type  : 'SET_SELECTED_EMAIL_INDEX',
                index : selectedIndex
            })
        }
        let state = {}
        if (showSelectedEmailIndex != undefined) state.showSelectedEmailIndex = showSelectedEmailIndex
        this.setState(state)
    }
    archiveEmail(email) {
        let new_labels = email.labels
            .filter(label => label.display_name.toLowerCase() != 'inbox')
            .map(label => label.id)
        nanoxhr(`${this.props.config.nylasUrl}/threads/${email.id}`)
            .method('PUT')
            .set('Authorization', `Basic ${token(this.props.config.nylasToken,'')}`)
            .data(JSON.stringify({
                label_ids : new_labels
            }))
            .call(res => {
                if (res.status != 200) return
                this.props.dispatch({
                    type  : 'REMOVE_EMAIL',
                    email : email
                })
            })
    }
    taskifyEmail(email) {
        let task = {
            type    : 'email',
            name    : email.subject,
            summary : email.snippet,
            email   : email,
            date    : new Date().getTime()
        }
        this.props.dispatch_db({
            type : 'DB_ADD_TASK',
            task : task
        })
        this.archiveEmail(email)
    }
    componentDidMount() {
        window.addEventListener('keydown', this.keyDownHandler)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyDownHandler)
    }
}

export default connect(state => {
    return {
        email : state.email,
        config : state.config,
        dispatch_db :  state.dispatch_db,
        selectedEmailIndex : state.selectedEmailIndex
    }
})(MailBox)
