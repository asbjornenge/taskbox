import React    from 'react'
import listIcon from '../graphics/list.png'

export default class Header extends React.Component {
    render() {
        return (
            <div className="TaskBoxLink screenLink" onClick={this.onClick.bind(this)}>
                <img src={listIcon} />
            </div>
        )
    }
    onClick() {
        this.props.flux.getActions('nav').navigate('/')
    }
}
