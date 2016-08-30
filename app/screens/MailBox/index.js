import React        from 'react'
import { connect }  from 'react-redux'
import nanoxhr      from 'nanoxhr'
import token        from 'basic-auth-token'
import htmlToText   from 'html-to-text'
import nav          from '../shared/utils/nav'
import MailBoxItem  from './components/MailBoxItem'
import mailBoxStyle from './mailbox.styl'
import noUserSelect from '../shared/styles/no-user-select.styl'

class MailBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            scrolling : false,
            showSelectedEmailIndex : false
        }
    }
    render() {
        let email = this.props.email
          .filter(email => {
            return this.props.emailUnCache.indexOf(email.id) < 0
          })
          .map((email, index) => {
            return (
                <MailBoxItem 
                    key={email.id} 
                    email={email}
                    index={index}
                    scrolling={this.state.scrolling}
                    onClick={nav.navigate.bind(undefined,`/mailbox/${email.id}`)}
                    handleSwipeLeft={this.taskifyEmail.bind(this)}
                    handleSwipeRight={this.archiveEmail.bind(this)}
                    selected={this.state.showSelectedEmailIndex && (index == this.props.selectedEmailIndex)} />
            )
        })
        return (
            <div className="MailBox" ref="MailBox">
                <style>{mailBoxStyle}</style>
                <style>{noUserSelect}</style>
                {email}
            </div>
        )
    }
    archiveEmail(email) {
        this.props.dispatch({
            type  : 'UNCACHE_EMAIL',
            email : email
        })
        let new_labels = email.labels
            .filter(label => label.display_name.toLowerCase() != 'inbox')
            .map(label => label.id)
        nanoxhr(`${email.form.nylasUrl}/threads/${email.id}`)
            .method('PUT')
            .set('Authorization', `Basic ${token(email.form.nylasToken,'')}`)
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
        nanoxhr(`${email.form.nylasUrl}/messages/${email.message_ids[0]}`)
            .set('Authorization', `Basic ${token(email.form.nylasToken,'')}`)
            .call(res => {
                if (res.status != 200) return
                let message = JSON.parse(res.response)
                let text = htmlToText.fromString(message.body)
                let task = {
                    type    : 'email',
                    name    : email.subject,
                    summary : text,
                    email   : email,
                    date    : new Date().getTime()
                }
                this.props.dispatch_db({
                    type : 'DB_ADD_TASK',
                    task : task
                })
                this.archiveEmail(email)
            })
    }
    onScroll() {
        if (!this.state.scrolling) this.setState({ scrolling : true })
        clearTimeout(this.scrollTimeout)
        this.scrollTimeout = setTimeout(() => {
            this.setState({ scrolling : false })
        },200)
    }
    componentDidMount() {
        this.keyDownHandler = handleKey.bind(this)
        this.onScrollHandler = this.onScroll.bind(this)
        this.refs.MailBox.addEventListener('scroll', this.onScrollHandler)
        window.addEventListener('keydown', this.keyDownHandler)
    }
    componentWillUnmount() {
        this.refs.MailBox.removeEventListener('scroll', this.onScrollHandler)
        window.removeEventListener('keydown', this.keyDownHandler)
    }
}

function handleKey(e) {
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

export default connect(state => {
    return {
        email : state.email,
        config : state.config,
        dispatch_db :  state.dispatch_db,
        emailUnCache : state.emailUnCache,
        selectedEmailIndex : state.selectedEmailIndex
    }
})(MailBox)
